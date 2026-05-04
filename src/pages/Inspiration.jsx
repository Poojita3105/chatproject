import React, { useState } from 'react'
import { useScrollAnimations } from '../hooks/useScrollAnimation'
import { TornEdgeTop, GoldLine } from '../components/TornEdge'

const MOOD_IMAGES = [
  { id: 1, src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80', tag: 'Living Room', tall: true },
  { id: 2, src: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80', tag: 'Bedroom', tall: false },
  { id: 3, src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80', tag: 'Kitchen', tall: false },
  { id: 4, src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', tag: 'Lounge', tall: true },
  { id: 5, src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', tag: 'Kitchen', tall: false },
  { id: 6, src: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80', tag: 'Bedroom', tall: true },
  { id: 7, src: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80', tag: 'Living Room', tall: false },
  { id: 8, src: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80', tag: 'Office', tall: false },
  { id: 9, src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', tag: 'Office', tall: true },
  { id: 10, src: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=600&q=80', tag: 'Bedroom', tall: false },
  { id: 11, src: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80', tag: 'Kitchen', tall: false },
  { id: 12, src: 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=600&q=80', tag: 'Bedroom', tall: true },
  { id: 13, src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80', tag: 'Office', tall: false },
  { id: 14, src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80', tag: 'Living Room', tall: false },
  { id: 15, src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80', tag: 'Bathroom', tall: true },
  { id: 16, src: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=600&q=80', tag: 'Dining', tall: false },
  { id: 17, src: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&q=80', tag: 'Living Room', tall: false },
  { id: 18, src: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=600&q=80', tag: 'Bathroom', tall: false },
]

const TAGS = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Office', 'Bathroom', 'Dining', 'Lounge']

const PALETTES = [
  {
    name: 'Warm Ivory',
    colors: ['#EEECE0', '#E7DECF', '#CCB9B5', '#C9A84C', '#2C2416'],
    mood: 'Serene & Grounded',
  },
  {
    name: 'Sage Noir',
    colors: ['#A7B2AA', '#6B7F74', '#3D5248', '#1a2e26', '#C9A84C'],
    mood: 'Calm & Sophisticated',
  },
  {
    name: 'Blush Stone',
    colors: ['#F5EAE5', '#E0C8C0', '#C5A89E', '#A07060', '#4A2C22'],
    mood: 'Romantic & Warm',
  },
  {
    name: 'Graphite Gold',
    colors: ['#F0EDEA', '#C0B8B0', '#807870', '#3A3530', '#C9A84C'],
    mood: 'Bold & Refined',
  },
]

export default function Inspiration() {
  const [activeTag, setActiveTag] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  useScrollAnimations()

  const filtered = activeTag === 'All'
    ? MOOD_IMAGES
    : MOOD_IMAGES.filter((img) => img.tag === activeTag)

  return (
    <div style={{ background: 'linear-gradient(180deg, #CCB9B5 0%, #E7DECF 25%, #EEECE0 55%, #A7B2AA 100%)' }}>

      {/* Hero */}
      <section
        style={{
          height: '75vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background collage */}
        <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {MOOD_IMAGES.slice(0, 4).map((img) => (
            <div key={img.id} style={{ overflow: 'hidden' }}>
              <img
                src={img.src}
                alt=""
                style={{ width: '100%', height: '75vh', objectFit: 'cover', filter: 'brightness(0.45) saturate(0.7)' }}
              />
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(44,36,22,0.6) 0%, rgba(26,20,16,0.4) 100%)' }} />

        {/* Video strip */}
        <video
          autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25, mixBlendMode: 'overlay' }}
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 text-center px-6" style={{ animation: 'revealUp 1s cubic-bezier(0.16,1,0.3,1) 0.3s both' }}>
          <p className="section-label mb-5" style={{ color: '#E8C96A' }}>Mood Board</p>
          <h1
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(3rem, 9vw, 7.5rem)',
              fontWeight: 300,
              color: '#EEECE0',
              lineHeight: 1,
              letterSpacing: '-0.01em',
            }}
          >
            Inspiration
          </h1>
          <div style={{ width: 120, height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin: '24px auto' }} />
          <p
            style={{
              fontFamily: '"Josefin Sans", sans-serif',
              fontSize: '0.82rem',
              color: 'rgba(238,236,224,0.72)',
              maxWidth: 500,
              lineHeight: 1.9,
              fontWeight: 300,
              margin: '0 auto',
              letterSpacing: '0.04em',
            }}
          >
            A curated collection of moods, textures, and aesthetics that define the MoodyCraft design language.
          </p>
        </div>
      </section>

      {/* Torn edge */}
      <div style={{ background: '#EEECE0' }}>
        <TornEdgeTop fillColor="rgba(26,20,16,0.85)" />
      </div>

      {/* Filter tags */}
      <section style={{ background: '#EEECE0', padding: '60px 6vw 0' }}>
        <div className="max-w-7xl mx-auto">
          <GoldLine />
          <div className="flex flex-wrap justify-center gap-3 mt-12 mb-10 slide-up">
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  fontFamily: '"Josefin Sans", sans-serif',
                  fontSize: '0.62rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  padding: '9px 22px',
                  background: activeTag === tag
                    ? 'linear-gradient(135deg, #C9A84C, #E8C96A)'
                    : 'transparent',
                  border: `1px solid ${activeTag === tag ? '#C9A84C' : 'rgba(44,36,22,0.25)'}`,
                  color: activeTag === tag ? '#2C2416' : '#5A4A3A',
                  cursor: 'none',
                  transition: 'all 0.3s ease',
                  fontWeight: activeTag === tag ? 500 : 300,
                  borderRadius: '2px',
                }}
                onMouseEnter={(e) => {
                  if (activeTag !== tag) {
                    e.currentTarget.style.borderColor = '#C9A84C'
                    e.currentTarget.style.color = '#C9A84C'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTag !== tag) {
                    e.currentTarget.style.borderColor = 'rgba(44,36,22,0.25)'
                    e.currentTarget.style.color = '#5A4A3A'
                  }
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section style={{ background: '#EEECE0', padding: '20px 6vw 100px' }}>
        <div className="max-w-7xl mx-auto">
          <div
            style={{
              columns: '3',
              columnGap: '16px',
            }}
            className="masonry-grid"
          >
            {filtered.map((img, i) => (
              <MasonryItem
                key={img.id}
                img={img}
                delay={i * 0.05}
                onClick={() => setLightbox(img)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(26,20,16,0.96)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.3s ease',
          }}
          onClick={() => setLightbox(null)}
        >
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src.replace('w=600', 'w=1200')}
              alt={lightbox.tag}
              style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', display: 'block' }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '20px 24px',
              background: 'linear-gradient(to top, rgba(26,20,16,0.9), transparent)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            }}>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', color: '#E7DECF', fontStyle: 'italic' }}>
                {lightbox.tag}
              </span>
              <span style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase' }}>
                MoodyCraft
              </span>
            </div>
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: 'absolute',
                top: -16,
                right: -16,
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#C9A84C',
                border: 'none',
                color: '#2C2416',
                fontSize: '1.2rem',
                cursor: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 300,
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Colour Palettes section */}
      <div style={{ background: '#2C2416' }}>
        <TornEdgeTop fillColor="#EEECE0" />
      </div>

      <section style={{ background: '#2C2416', padding: '100px 6vw' }}>
        <div className="max-w-7xl mx-auto">
          <div className="slide-up text-center mb-16">
            <p className="section-label mb-4" style={{ color: '#C9A84C' }}>Colour Stories</p>
            <h2 className="section-title" style={{ color: '#E7DECF' }}>
              Signature <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Palettes</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PALETTES.map((palette, i) => (
              <div
                key={palette.name}
                className="slide-up card-3d"
                style={{
                  transitionDelay: `${i * 0.1}s`,
                  border: '1px solid rgba(201,168,76,0.2)',
                  padding: '32px 24px',
                  transition: 'border-color 0.3s ease, background 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C9A84C'
                  e.currentTarget.style.background = 'rgba(201,168,76,0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {/* Color swatches */}
                <div style={{ display: 'flex', marginBottom: '20px', overflow: 'hidden', borderRadius: '2px' }}>
                  {palette.colors.map((color, ci) => (
                    <div
                      key={ci}
                      style={{
                        flex: 1,
                        height: '60px',
                        background: color,
                        transition: 'flex 0.3s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.flex = '2'}
                      onMouseLeave={(e) => e.currentTarget.style.flex = '1'}
                    />
                  ))}
                </div>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontWeight: 400, color: '#E7DECF', marginBottom: '8px' }}>
                  {palette.name}
                </h3>
                <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.62rem', letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase', fontWeight: 300 }}>
                  {palette.mood}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Styles section */}
      <section style={{ background: '#A7B2AA', padding: '100px 6vw' }}>
        <TornEdgeTop fillColor="#2C2416" />
        <div className="max-w-7xl mx-auto" style={{ marginTop: '60px' }}>
          <div className="slide-up text-center mb-16">
            <p className="section-label mb-4">Design Styles</p>
            <h2 className="section-title" style={{ color: '#2C2416' }}>
              Find your <em style={{ fontStyle: 'italic', color: '#2C2416' }}>aesthetic</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                style: 'Contemporary Luxe',
                desc: 'Clean lines, rich materials, restrained opulence. For those who believe less is more — but more should be extraordinary.',
                img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
              },
              {
                style: 'Warm Minimalism',
                desc: 'Organic textures meet purposeful simplicity. Earthy, honest, and deeply calming. A home that breathes.',
                img: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80',
              },
              {
                style: 'Artisan Eclectic',
                desc: 'Bold, layered, and deeply personal. A curated mix of eras, cultures, and materials that tells a story.',
                img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
              },
            ].map((style, i) => (
              <div
                key={style.style}
                className="slide-up card-3d"
                style={{ transitionDelay: `${i * 0.1}s`, overflow: 'hidden' }}
              >
                <div style={{ position: 'relative', overflow: 'hidden', height: '300px' }}>
                  <img
                    src={style.img}
                    alt={style.style}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,36,22,0.8) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                    <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', fontWeight: 400, color: '#E7DECF' }}>
                      {style.style}
                    </h3>
                  </div>
                </div>
                <div style={{ background: 'rgba(238,236,224,0.7)', backdropFilter: 'blur(10px)', padding: '24px', borderLeft: '3px solid #C9A84C' }}>
                  <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.78rem', color: '#2C2416', lineHeight: 1.9, fontWeight: 300 }}>
                    {style.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

function MasonryItem({ img, delay, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="slide-up"
      style={{
        breakInside: 'avoid',
        marginBottom: '16px',
        transitionDelay: `${delay}s`,
        cursor: 'none',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(201,168,76,0.15)',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease',
        boxShadow: hovered ? '0 20px 60px rgba(44,36,22,0.25)' : '0 4px 20px rgba(44,36,22,0.08)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <img
        src={img.src}
        alt={img.tag}
        style={{
          width: '100%',
          display: 'block',
          height: img.tall ? 'auto' : 'auto',
          objectFit: 'cover',
          filter: hovered ? 'brightness(0.8) saturate(1.1)' : 'brightness(1) saturate(1)',
          transition: 'filter 0.4s ease',
        }}
      />
      {/* Tag overlay on hover */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(44,36,22,0.7) 0%, transparent 50%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '16px',
      }}>
        <div>
          <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.58rem', letterSpacing: '0.25em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '4px' }}>
            {img.tag}
          </p>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.9rem', color: '#E7DECF', fontStyle: 'italic' }}>
            Click to expand
          </p>
        </div>
        {/* Gold corner accent */}
        <div style={{ position: 'absolute', top: 12, right: 12, width: 24, height: 24, borderTop: '1.5px solid #C9A84C', borderRight: '1.5px solid #C9A84C' }} />
      </div>
    </div>
  )
}