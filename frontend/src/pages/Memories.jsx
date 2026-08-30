import React, { useState } from 'react';
import { Plus, Users, Home, Award, Compass, X, Image as ImageIcon } from 'lucide-react';

export default function Memories() {
  const [albums, setAlbums] = useState([
    {
      id: 'family',
      title: 'Family',
      count: 24,
      subText: 'Last added yesterday',
      icon: Users,
      coverUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?auto=format&fit=crop&q=80&w=800',
      images: [
        'https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
      ]
    },
    {
      id: 'home',
      title: 'My Home',
      count: 12,
      subText: '12 photos',
      icon: Home,
      coverUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
      images: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800',
      ]
    },
    {
      id: 'happy',
      title: 'Happy Moments',
      count: 38,
      subText: '38 photos',
      icon: Award,
      coverUrl: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=800',
      images: [
        'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800',
      ]
    },
    {
      id: 'places',
      title: 'Special Places',
      count: 18,
      subText: '18 photos',
      icon: Compass,
      coverUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800',
      images: [
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800',
      ]
    }
  ]);

  const [activeAlbum, setActiveAlbum] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('family');
  const [newDesc, setNewDesc] = useState('');

  const handleCreateMemory = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // Add image helper
    const defaultCovers = {
      family: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
      home: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800',
      happy: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800',
      places: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800',
    };

    const targetUrl = defaultCovers[newCategory] || defaultCovers.family;

    setAlbums(prev => prev.map(album => {
      if (album.id === newCategory) {
        return {
          ...album,
          count: album.count + 1,
          coverUrl: targetUrl,
          images: [targetUrl, ...album.images]
        };
      }
      return album;
    }));

    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
    alert("New memory added successfully to your album!");
  };

  return (
    <div style={styles.container}>
      {/* Header Row */}
      <div style={styles.headerRow}>
        <div>
          <h1 style={styles.title}>My Memories</h1>
          <p style={styles.subtitle}>
            A comforting space to look back at special moments, family, and places that bring joy.
          </p>
        </div>
        <button style={styles.addBtn} onClick={() => setShowAddModal(true)}>
          <Plus size={20} /> Add Memory
        </button>
      </div>

      {/* Album grid */}
      <div style={styles.grid}>
        {albums.map((album, idx) => {
          const Icon = album.icon;
          // Album 1 is featured larger as shown in the layout mockup Image 4
          const isLarge = idx === 0;
          return (
            <div 
              key={album.id} 
              style={{
                ...styles.albumCard,
                gridColumn: isLarge ? 'span 2' : 'span 1',
                height: isLarge ? '340px' : '260px'
              }}
              onClick={() => setActiveAlbum(album)}
            >
              <img src={album.coverUrl} alt={album.title} style={styles.albumImg} />
              <div style={styles.cardGradient} />
              
              <div style={styles.cardMeta}>
                <div style={styles.iconBadgeRow}>
                  <div style={styles.badgeIconBox}>
                    <Icon size={18} color="white" />
                  </div>
                  <span style={styles.badgeText}>{album.title}</span>
                </div>
                
                <div style={styles.countText}>
                  {album.count} photos • {album.subText}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Album Viewer Lightbox */}
      {activeAlbum && (
        <div style={styles.overlay} onClick={() => setActiveAlbum(null)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ImageIcon size={24} color="var(--primary-green)" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>{activeAlbum.title} Gallery</h3>
              </div>
              <button style={styles.closeBtn} onClick={() => setActiveAlbum(null)}>
                <X size={26} />
              </button>
            </div>
            
            <div style={styles.slideshowGrid}>
              {activeAlbum.images.map((imgUrl, i) => (
                <div key={i} style={styles.gallerySlideCard}>
                  <img src={imgUrl} alt={`Album slide ${i}`} style={styles.gallerySlideImg} />
                </div>
              ))}
            </div>
            
            <p style={styles.albumCaption}>
              Looking back at these warm memories keeps our minds active and connected.
            </p>
          </div>
        </div>
      )}

      {/* Add Memory Modal */}
      {showAddModal && (
        <div style={styles.overlay} onClick={() => setShowAddModal(false)}>
          <form style={styles.formModal} onSubmit={handleCreateMemory} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '800' }}>Add a New Memory</h3>
              <button type="button" style={styles.closeBtn} onClick={() => setShowAddModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Memory Title</label>
              <input 
                type="text" 
                placeholder="e.g. Diwali in Kolkata, Priya's Graduation"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Choose Album Category</label>
              <select 
                value={newCategory} 
                onChange={e => setNewCategory(e.target.value)}
                style={styles.select}
              >
                <option value="family">Family</option>
                <option value="home">My Home</option>
                <option value="happy">Happy Moments</option>
                <option value="places">Special Places</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Short Note / Description</label>
              <textarea 
                rows="3"
                placeholder="Write a sweet description to remind you about this moment."
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                style={styles.textarea}
              />
            </div>

            <button type="submit" style={styles.submitBtn}>
              Save Memory
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  title: {
    fontSize: '2.1rem',
    fontWeight: '800',
    color: 'var(--text-main)',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
  },
  addBtn: {
    backgroundColor: 'var(--primary-green)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 24px',
    fontWeight: '700',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  },
  albumCard: {
    position: 'relative',
    borderRadius: '24px',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: 'var(--shadow-card)',
  },
  albumImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
  },
  cardGradient: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(10, 30, 15, 0.7) 0%, rgba(10, 30, 15, 0.1) 60%, transparent 100%)',
  },
  cardMeta: {
    position: 'absolute',
    bottom: '24px',
    left: '24px',
    right: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  iconBadgeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  badgeIconBox: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary-green)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1.5px solid rgba(255, 255, 255, 0.4)',
  },
  badgeText: {
    fontSize: '1.35rem',
    fontWeight: '800',
    color: 'white',
  },
  countText: {
    fontSize: '0.98rem',
    color: '#d4ebd8',
    fontWeight: '600',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(20, 36, 24, 0.45)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '24px',
    padding: '32px',
    maxWidth: '700px',
    width: '90%',
    position: 'relative',
    boxShadow: '0 20px 45px rgba(0,0,0,0.18)',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: {
    color: 'var(--text-muted)',
    padding: '4px',
  },
  slideshowGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
    maxHeight: '400px',
    overflowY: 'auto',
  },
  gallerySlideCard: {
    borderRadius: '16px',
    overflow: 'hidden',
    height: '140px',
    boxShadow: 'var(--shadow-subtle)',
  },
  gallerySlideImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  albumCaption: {
    fontSize: '1.05rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: '1.45',
  },
  formModal: {
    backgroundColor: 'white',
    borderRadius: '24px',
    padding: '32px',
    maxWidth: '440px',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    boxShadow: '0 20px 45px rgba(0,0,0,0.18)',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.98rem',
    fontWeight: '700',
    color: 'var(--text-main)',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1.5px solid var(--border-color)',
    fontSize: '1rem',
    fontWeight: '500',
  },
  select: {
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1.5px solid var(--border-color)',
    fontSize: '1rem',
    fontWeight: '600',
    backgroundColor: 'white',
  },
  textarea: {
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1.5px solid var(--border-color)',
    fontSize: '1rem',
    fontWeight: '500',
    fontFamily: 'inherit',
    resize: 'none',
  },
  submitBtn: {
    backgroundColor: 'var(--primary-green)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '14px',
    fontWeight: '700',
    fontSize: '1.05rem',
    marginTop: '8px',
  }
};
