import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useScrollAnimations } from '../hooks/useScrollAnimation'
import { TornEdgeBottom, TornEdgeTop, GoldLine } from '../components/TornEdge'


const ALL_PROJECTS = [
  { id: '1', title: 'The Ivory Suite', category: 'living room', client: 'Aryan & Priya', location: 'Mumbai', img: 'https://i.pinimg.com/1200x/ca/10/f3/ca10f386a9f85d0c37e2a5d10e209371.jpg?w=800&q=80', tag: 'VILLA NOIR' },
  { id: '2', title: 'Velvet Commerce', category: 'office', client: 'NexGen Corp', location: 'Bangalore', img: 'https://i.pinimg.com/736x/b5/e4/fc/b5e4fcfae3bb2c0a198c8900b4432037.jpg?w=800&q=80', tag: 'NEXGEN TOWER' },
  { id: '3', title: 'The Bronze Loft', category: 'kitchen', client: 'Rohan & Sneha', location: 'Pune', img: 'https://i.pinimg.com/1200x/b0/0d/8b/b00d8bef45550c2ac16a11ca7915da92.jpg?w=800&q=80', tag: 'BRONZE RESIDENCY' },
  { id: '4', title: 'Silk Penthouse', category: 'bedroom', client: 'Amit Kapoor', location: 'Delhi', img: 'https://i.pinimg.com/736x/6c/3b/59/6c3b59b330088059538df39e9187d339.jpg?w=800&q=80', tag: 'SILK HEIGHTS' },
  { id: '5', title: 'Onyx Living', category: 'living room', client: 'Sharma Family', location: 'Hyderabad', img: 'https://i.pinimg.com/1200x/55/43/8d/55438d23309d8e910e533c977c941f49.jpg?w=800&q=80', tag: 'ONYX VILLAS' },
  { id: '6', title: 'Pearl Bedroom', category: 'bedroom', client: 'Vikram & Ananya', location: 'Chennai', img: 'https://i.pinimg.com/736x/69/85/1f/69851f1eefe8a7ace29395295b1ec82f.jpg?w=800&q=80', tag: 'PEARL TOWERS' },
  { id: '7', title: 'Ember Kitchen', category: 'kitchen', client: 'Gupta Residence', location: 'Jaipur', img: 'https://i.pinimg.com/736x/fa/70/e1/fa70e15777f42c61dad8d7453dcd8299.jpg?w=800&q=80', tag: 'EMBER ESTATE' },
  { id: '8', title: 'Marble Office', category: 'office', client: 'FinPulse Ltd', location: 'Gurgaon', img: 'https://i.pinimg.com/1200x/9b/1c/ab/9b1cabdb313037ab55905f305c7f7d3e.jpg?w=800&q=80', tag: 'FINPULSE HQ' },
  { id: '9', title: 'Sage Suite', category: 'bedroom', client: 'Mehra & Co.', location: 'Kolkata', img: 'https://i.pinimg.com/1200x/dc/49/a1/dc49a159ef8d5f1040ebe5a6ae523052.jpg?w=800&q=80', tag: 'SAGE MANOR' },
  { id: '10', title: 'Olive Lounge', category: 'living room', client: 'Patel Family', location: 'Ahmedabad', img: 'https://i.pinimg.com/1200x/31/a0/50/31a0504ba84c86e391342cb3121c9de4.jpg?w=800&q=80', tag: 'OLIVE VILLA' },
  { id: '11', title: 'Modern Workspace', category: 'office', client: 'TechHive', location: 'Pune', img: 'https://i.pinimg.com/1200x/f2/d5/21/f2d5211000b33d46d344af200c065c97.jpg?w=800&q=80', tag: 'TECHHIVE HUB' },
  { id: '12', title: 'Minimal Kitchen', category: 'kitchen', client: 'Shah Residence', location: 'Surat', img: 'https://i.pinimg.com/1200x/37/6c/6c/376c6c90352c7af346aa47e9bdca404c.jpg?w=800&q=80', tag: 'MINIMAL ESTATE' },
  { id: '13', title: 'Luxury Bedroom', category: 'bedroom', client: 'Kapoor Family', location: 'Delhi', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80', tag: 'ROYAL HEIGHTS' },
  { id: '14', title: 'Classic Living', category: 'living room', client: 'Verma Family', location: 'Lucknow', img: 'https://i.pinimg.com/736x/04/18/4d/04184deaef29edc99d28b44ac35dea31.jpg?w=800&q=80', tag: 'CLASSIC HOME' },
  { id: '15', title: 'Executive Office', category: 'office', client: 'BizCore', location: 'Mumbai', img: 'https://i.pinimg.com/736x/f2/e3/e5/f2e3e5413e211a088c19f83267fc779b.jpg?w=800&q=80', tag: 'BIZCORE HQ' },
  { id: '16', title: 'Elegant Kitchen', category: 'kitchen', client: 'Reddy Family', location: 'Hyderabad', img: 'https://i.pinimg.com/1200x/e7/d8/dc/e7d8dcc4ecacb060976990245ed9cd46.jpg?w=800&q=80', tag: 'ELEGANT SPACE' },
  { id: '17', title: 'Cozy Bedroom', category: 'bedroom', client: 'Singh Family', location: 'Chandigarh', img: 'https://i.pinimg.com/736x/2a/cb/0d/2acb0d3ef5e89f4fac7f3b5ae5257dab.jpg?w=800&q=80', tag: 'COZY NEST' },
  { id: '18', title: 'Urban Living', category: 'living room', client: 'Mehta Family', location: 'Bangalore', img: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80', tag: 'URBAN LOFT' },
]

const FILTERS = ['all', 'living room', 'bedroom', 'kitchen', 'office']

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [visible, setVisible] = useState(true)
  const [visibleCount, setVisibleCount] = useState(12)
  const [animatedIds, setAnimatedIds] = useState(new Set())

  useScrollAnimations()

  const filtered = activeFilter === 'all'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter((p) => p.category === activeFilter)

  // Animate initial cards on mount and after filter changes
 useEffect(() => {
  const ids = filtered.slice(0, visibleCount).map((p) => p.id)

  // STEP 1: reset (cards hidden)
  setAnimatedIds(new Set())

  // STEP 2: delay so browser shows initial position first
  setTimeout(() => {
    setAnimatedIds(new Set(ids))
  }, 100) // 👈 THIS LINE FIXES YOUR SLIDE-UP
}, [activeFilter, visibleCount])

  const handleFilter = (f) => {
    setVisible(false)
    setAnimatedIds(new Set())
    setTimeout(() => {
      setActiveFilter(f)
      setVisibleCount(12)
      setVisible(true)
    }, 300)
  }

  const handleLoadMore = () => {
    const nextCount = visibleCount + 6
    setVisibleCount(nextCount)
    // Animate only the newly added cards
    setTimeout(() => {
      const newIds = filtered.slice(visibleCount, nextCount).map((p) => p.id)
      setAnimatedIds((prev) => {
        const next = new Set(prev)
        newIds.forEach((id) => next.add(id))
        return next
      })
    }, 50)
  }

  return (
    <div style={{ background: 'linear-gradient(180deg, #E7DECF 0%, #EEECE0 40%, #CCB9B5 70%, #B8B2AA 100%)' }}>

      {/* Hero */}
      <section
        style={{
          height: '70vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scale(1.05)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,20,16,0.65)' }} />
        <div className="relative z-10 text-center" style={{ animation: 'revealUp 1s cubic-bezier(0.16,1,0.3,1) 0.3s both' }}>
          <p className="section-label mb-4" style={{ color: '#E8C96A' }}>Our Work</p>
          <h1 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 300,
            color: '#EEECE0',
            letterSpacing: '0.05em',
          }}>
            Portfolio
          </h1>
          <div style={{ width: 100, height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin: '20px auto' }} />
          <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.8rem', color: 'rgba(238,236,224,0.7)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 300 }}>
            Bedroom · Living Room · Kitchen · Office
          </p>
        </div>
      </section>

      {/* Gold torn */}
      <div style={{ background: '#EEECE0' }}>
        <TornEdgeTop fillColor="rgba(26,20,16,0.8)" />
      </div>

      {/* Filter bar */}
      <section style={{ background: '#ccb9b5', padding: '60px 6vw 40px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center flex-wrap gap-4 mt-12 mb-4 slide-up">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                style={{
                  fontFamily: '"Josefin Sans", sans-serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  padding: '10px 28px',
background: activeFilter === f
  ? 'linear-gradient(135deg, #C9A84C, #E8C96A)'
  : '#EEECE0',                  border: `1.5px solid ${activeFilter === f ? '#C9A84C' : 'rgba(44,36,22,0.3)'}`,
                  color: activeFilter === f ? '#211603' : '#110901', backgroundColor: "#EEECE0",
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: activeFilter === f ? 700 : 600,
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== f) {
                    e.currentTarget.style.borderColor = '#cc9a12'
                    e.currentTarget.style.color = '#d46b0e'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== f) {
                    e.currentTarget.style.borderColor = 'rgba(44,36,22,0.3)'
                    e.currentTarget.style.color = '#412e1c'
                  }
                }}
              >
                {f === 'all' ? 'All Projects' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project grid */}
      <section style={{ background: '#ccb9b5', padding: '20px 6vw 100px' }}>
        <div className="max-w-7xl mx-auto">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '60px 40px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {filtered.slice(0, visibleCount).map((project, i) => (
              <ArchProjectCard
                key={project.id}
                project={project}
                delay={i * 0.08}
                isAnimated={animatedIds.has(project.id)}
              />
            ))}
          </div>

          {visibleCount < filtered.length && (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <button
                onClick={handleLoadMore}
                style={{
                  fontFamily: '"Josefin Sans", sans-serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  padding: '14px 40px',
                  background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
                  border: '1px solid #C9A84C',
                  color: '#2C2416',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.85'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Gold divider */}
      <div style={{ background: '#B8B2AA' }}>
        <TornEdgeTop fillColor="#EEECE0" />
      </div>

      {/* 3D Room Design CTA */}
      <section style={{ background: '#B8B2AA', padding: '100px 6vw', textAlign: 'center' }}>
        <div className="max-w-3xl mx-auto slide-up">
          <p className="section-label mb-4">Try Before You Buy</p>
          <h2 className="section-title" style={{ color: '#2C2416', marginBottom: '20px' }}>
            3D Room Design <em style={{ fontStyle: 'italic', color: '#5A4A3A' }}>Studio</em>
          </h2>
          <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.9rem', color: '#5A4A3A', lineHeight: 1.9, fontWeight: 800, marginBottom: '40px' }}>
            Visualize your dream space in photorealistic 3D before committing to a single piece of furniture. Our affordable design software helps you see exactly how your space will look.
          </p>
          <Link to="/services">
            <button className="btn-gold"><span>Try 3D Demo</span></button>
          </Link>
        </div>
      </section>

    </div>
  )
}

function ArchProjectCard({ project, delay, isAnimated }) {
  const [hovered, setHovered] = useState(false)

  return (
   <div
 style={{
  opacity: isAnimated ? 1 : 0,

  transform: isAnimated
    ? `translateY(${hovered ? '-12px' : '0px'}) scale(${hovered ? 1.02 : 1})`
    : 'translateY(60px) scale(0.95)',

  filter: isAnimated ? 'blur(0px)' : 'blur(8px)',

  transition: `
    opacity 0.8s ease,
    transform 0.8s cubic-bezier(0.16,1,0.3,1),
    filter 0.6s ease
  `,

  transitionDelay: `${delay}s`,
}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Arched card */}
      <div style={{
        borderRadius: '200px 200px 0 0',
        overflow: 'hidden',
        border: '3px solid #C9A84C',
        background: '#EEECE0',
        position: 'relative',
        maxWidth: '340px',
        margin: '0 auto',
      }}>

        {/* Inner gold border ring */}
        <div style={{
          position: 'absolute',
          inset: '10px',
          borderRadius: '190px 190px 0 0',
          border: '1.5px solid rgba(236, 195, 72, 0.51)',
          zIndex: 5,
          pointerEvents: 'none',
        }} />

        {/* Image */}
        <div style={{
          height: '420px',
          overflow: 'hidden',
          position: 'relative',
          borderRadius: '200px 200px 0 0',
        }}>
       <div
  className="project-img-wrapper"
  style={{
    height: '450px',
    overflow: 'hidden',
  }}
>
  <img
    src={project.img}
    alt={project.title}
    className="project-img"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'all 0.5s ease',
      filter: 'brightness(0.85)',
       transform: hovered ? 'scale(1.08)' : 'scale(1)',
    }}
  />
</div>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.25))',
          }} />
        </div>

        {/* Info section */}
        <div style={{
          background: 'linear-gradient(135deg, #2C2416, #1a1410)',
          padding: '28px 24px 24px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: '"Josefin Sans", sans-serif',
            fontSize: '0.58rem',
            letterSpacing: '0.35em',
            color: '#C9A84C',
            textTransform: 'uppercase',
            fontWeight: 500,
            marginBottom: '8px',
          }}>
            {project.tag}
          </p>
          <h3 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1.5rem',
            fontWeight: 400,
            color: '#E7DECF',
            marginBottom: '6px',
            letterSpacing: '0.03em',
            lineHeight: 1.2,
          }}>
            {project.title}
          </h3>
          <p style={{
            fontFamily: '"Josefin Sans", sans-serif',
            fontSize: '0.65rem',
            color: '#B8B2AA',
            letterSpacing: '0.1em',
            fontWeight: 300,
            marginBottom: '20px',
          }}>
            {project.client} | {project.location}
          </p>
          <Link to={`/portfolio/${project.id}`}>
            <button
              className="btn-outline"
              style={{
                width: '100%',
                fontSize: '0.62rem',
                padding: '11px',
                borderColor: hovered ? '#C9A84C' : 'rgba(201,168,76,0.5)',
                color: hovered ? '#E8C96A' : '#C9A84C',
              }}
            >
              View Project
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}