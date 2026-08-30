const VOICE_API_BASE_URL = (import.meta.env.VITE_VOICE_API_BASE_URL || '').replace(/\/$/, '');

const VOICE_PREFERENCES = {
  en: { name: 'English', exact: ['en-in', 'en-us'], prefix: 'en' },
  as: { name: 'Assamese', exact: ['as-in', 'bn-in'], prefix: 'as' },
  hi: { name: 'Hindi', exact: ['hi-in'], prefix: 'hi' },
  kn: { name: 'Kannada', exact: ['kn-in'], prefix: 'kn' },
};

let activeAudio = null;
let activePlayback = null;
let voiceRequestId = 0;

function voiceApiUrl(path) {
  return `${VOICE_API_BASE_URL}${path}`;
}

function getSpeechSynthesis() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
    ? window.speechSynthesis
    : null;
}

function stopActivePlayback() {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }

  const speechSynthesis = getSpeechSynthesis();
  speechSynthesis?.cancel();

  if (activePlayback) {
    activePlayback.finish({ success: false, cancelled: true });
  }
}

export function stopVoicePlayback() {
  voiceRequestId += 1;
  stopActivePlayback();
}

export async function getVoiceLanguages() {
  try {
    const response = await fetch(voiceApiUrl('/voice/languages'));
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.languages)) {
        return data.languages;
      }
    }
  } catch {
    // Return default supported list if backend is loading
  }

  return [
    { code: 'en', name: 'English', native_name: 'English' },
    { code: 'as', name: 'Assamese', native_name: 'অসমীয়া' },
    { code: 'hi', name: 'Hindi', native_name: 'हिन्दी' },
    { code: 'kn', name: 'Kannada', native_name: 'ಕನ್ನಡ' },
  ];
}

async function getAvailableSpeechVoices(speechSynthesis) {
  let voices = speechSynthesis.getVoices();
  if (voices.length > 0) {
    return voices;
  }

  await new Promise((resolve) => {
    const timeout = window.setTimeout(done, 1200);

    function done() {
      window.clearTimeout(timeout);
      speechSynthesis.removeEventListener?.('voiceschanged', done);
      resolve();
    }

    speechSynthesis.addEventListener?.('voiceschanged', done, { once: true });
  });

  return speechSynthesis.getVoices();
}

function selectSpeechVoice(voices, language) {
  if (!voices || voices.length === 0) {
    return null;
  }

  const preference = VOICE_PREFERENCES[language];
  if (preference) {
    const normalized = voices.map((voice) => ({ voice, locale: voice.lang.toLowerCase() }));
    for (const locale of preference.exact) {
      const match = normalized.find((item) => item.locale === locale);
      if (match) {
        return match.voice;
      }
    }
    const prefixMatch = normalized.find(
      (item) => item.locale === preference.prefix || item.locale.startsWith(`${preference.prefix}-`)
    );
    if (prefixMatch) {
      return prefixMatch.voice;
    }
  }

  // Fallback to default or first available browser voice so TTS never fails silently
  return voices.find((v) => v.default) || voices[0] || null;
}

function createPlayback(resolve) {
  const playback = {
    settled: false,
    finish(result) {
      if (playback.settled) {
        return;
      }

      playback.settled = true;
      if (activePlayback === playback) {
        activePlayback = null;
      }
      resolve(result);
    },
  };
  activePlayback = playback;
  return playback;
}

function playAudioSource(src) {
  return new Promise((resolve) => {
    const playback = createPlayback(resolve);
    const audio = new Audio(src);
    activeAudio = audio;

    audio.onended = () => playback.finish({ success: true, mode: 'audio_stream' });
    audio.onerror = () => playback.finish({ success: false, error: 'Audio source could not be played.' });
    audio.play().catch(() => playback.finish({ success: false, error: 'Audio playback error.' }));
  });
}

async function speakWithBrowserTts(text, language, requestId) {
  const speechSynthesis = getSpeechSynthesis();
  if (!speechSynthesis) {
    return { success: false, error: 'Browser text-to-speech is unavailable.' };
  }

  const voice = selectSpeechVoice(await getAvailableSpeechVoices(speechSynthesis), language);
  if (requestId !== voiceRequestId) {
    return { success: false, cancelled: true };
  }

  return new Promise((resolve) => {
    const playback = createPlayback(resolve);
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.onend = () => playback.finish({ success: true, mode: 'browser_tts' });
    utterance.onerror = () => playback.finish({ success: false, error: 'Browser text-to-speech could not play.' });
    speechSynthesis.resume();
    speechSynthesis.speak(utterance);
  });
}

/**
 * Synthesize & speak text using Backend FastAPI gTTS service first.
 * Falls back to browser TTS if backend is offline.
 */
async function speakWithBackendTts(text, language, requestId) {
  try {
    const response = await fetch(voiceApiUrl('/api/voice/synthesize'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language, speed_rate: 1.0 }),
    });

    if (response.ok) {
      const data = await response.json();
      if (requestId !== voiceRequestId) {
        return { success: false, cancelled: true };
      }

      if (data.audio_base64) {
        return playAudioSource(`data:audio/mp3;base64,${data.audio_base64}`);
      } else if (data.audio_url) {
        return playAudioSource(voiceApiUrl(data.audio_url));
      }
    }
  } catch {
    // Fall back to browser TTS if backend fails or network offline
  }

  if (requestId !== voiceRequestId) {
    return { success: false, cancelled: true };
  }
  return speakWithBrowserTts(text, language, requestId);
}

export async function speakVoiceText(text, language = 'en') {
  const requestId = ++voiceRequestId;
  stopActivePlayback();
  return speakWithBackendTts(text, language, requestId);
}

export async function speakVoicePrompt(language, keyOrText) {
  const requestId = ++voiceRequestId;
  stopActivePlayback();

  // 1. If keyOrText is a direct sentence string, speak via Backend TTS
  if (typeof keyOrText === 'string' && (keyOrText.includes(' ') || keyOrText.length > 25)) {
    return speakWithBackendTts(keyOrText, language, requestId);
  }

  // 2. Try fetching localized backend prompt
  let prompt;
  try {
    const response = await fetch(voiceApiUrl(`/voice/prompt/${language}/${keyOrText}`));
    if (response.ok) {
      prompt = await response.json();
    }
  } catch {
    // fallback below
  }

  if (requestId !== voiceRequestId) {
    return { success: false, cancelled: true };
  }

  if (prompt && prompt.success && prompt.text) {
    if (prompt.audio_available && prompt.audio_url) {
      const audioResult = await playAudioSource(voiceApiUrl(prompt.audio_url));
      if (audioResult.success || audioResult.cancelled || requestId !== voiceRequestId) {
        return audioResult;
      }
    }
    return speakWithBackendTts(prompt.text, language, requestId);
  }

  // Fallback: Synthesize keyOrText directly
  return speakWithBackendTts(keyOrText, language, requestId);
}
