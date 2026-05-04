import React from 'react'
import { Link } from 'react-router-dom'
import { useScrollAnimations } from '../hooks/useScrollAnimation'
import { TornEdgeTop, GoldLine } from '../components/TornEdge'

const TEAM = [
  { name: 'Aanya Mehra', role: 'Founder & Lead Designer', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', quote: 'Every space has a soul. Our job is to reveal it.' },
  { name: 'Rohan Verma', role: 'Architecture & Spatial Lead', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', quote: 'Structure is the skeleton; design is the spirit.' },
  { name: 'Kavya Nair', role: 'Materials & Textures Expert', img: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&q=80', quote: 'Touch tells stories that eyes often miss.' },
]

const VALUES = [
  { title: 'Authenticity', desc: 'Every design decision is rooted in your unique story, never generic templates.' },
  { title: 'Excellence', desc: 'From concept to final nail, we hold every detail to the highest standard.' },
  { title: 'Sustainability', desc: 'Beautiful spaces that tread lightly on the earth — always our intention.' },
  { title: 'Transparency', desc: 'Open communication, honest budgets, and clear timelines. No surprises.' },
]

export default function About() {
  useScrollAnimations()

  return (
    <div style={{ background: 'linear-gradient(180deg, #A7B2AA 0%, #E7DECF 30%, #EEECE0 60%, #CCB9B5 85%, #B8B2AA 100%)' }}>

      {/* Hero */}
      <section style={{ height: '80vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1600&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,20,16,0.85) 0%, rgba(26,20,16,0.4) 60%, transparent 100%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full" style={{ animation: 'revealUp 1s cubic-bezier(0.16,1,0.3,1) 0.3s both' }}>
          <p className="section-label mb-4" style={{ color: '#E8C96A' }}>Our Story</p>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 300, color: '#EEECE0', lineHeight: 1, maxWidth: 700 }}>
            Designing<br />
            <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>moods,</em><br />
            not spaces.
          </h1>
          <div style={{ width: 80, height: 1, background: '#C9A84C', margin: '28px 0' }} />
          <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.88rem', color: 'rgba(238,236,224,0.75)', maxWidth: 460, lineHeight: 1.9, fontWeight: 300 }}>
            Founded in 2016, MoodyCraft Interior has grown into one of India's most sought-after boutique design studios.
          </p>
        </div>
      </section>

      {/* Torn edge */}
      <div style={{ background: '#EEECE0' }}>
        <TornEdgeTop fillColor="rgba(26,20,16,0.8)" />
      </div>

      {/* Story section */}
      <section style={{ background: '#EEECE0', padding: '100px 6vw' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          {/* Image - artistic treatment like reference */}
          <div className="slide-left">
            <div style={{ position: 'relative' }}>
              {/* Main image */}
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
                alt="MoodyCraft studio"
                style={{
                  width: '100%',
                  height: '600px',
                  objectFit: 'cover',
                  display: 'block',
                  clipPath: 'polygon(0 0, 100% 0, 100% 88%, 85% 100%, 0 100%)',
                }}
              />
              {/* Gold corner accents */}
              <div style={{ position: 'absolute', top: 20, left: 20, width: 50, height: 50, borderTop: '2px solid #C9A84C', borderLeft: '2px solid #C9A84C' }} />
              <div style={{ position: 'absolute', bottom: 60, right: 20, width: 50, height: 50, borderBottom: '2px solid #C9A84C', borderRight: '2px solid #C9A84C' }} />
              {/* Floating stat card */}
              <div style={{
                position: 'absolute', bottom: -30, right: -30,
                background: '#2C2416',
                padding: '28px 32px',
                borderLeft: '3px solid #C9A84C',
                boxShadow: '0 20px 60px rgba(44,36,22,0.3)',
              }}>
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3rem', fontWeight: 300, color: '#C9A84C', lineHeight: 1 }}>8+</div>
                <div style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#B8B2AA', textTransform: 'uppercase', marginTop: '6px' }}>Years of Excellence</div>
              </div>
              {/* Overlapping image */}
              <div style={{
                position: 'absolute', top: -30, right: -30,
                width: '45%',
                border: '3px solid #EEECE0',
                boxShadow: '0 10px 40px rgba(44,36,22,0.2)',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&q=80"
                  alt="Design detail"
                  style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="slide-right" style={{ paddingTop: '40px' }}>
            <p className="section-label mb-4">Who We Are</p>
            <h2 className="section-title" style={{ color: '#2C2416', marginBottom: '28px' }}>
              More than design.<br />
              <em style={{ fontStyle: 'italic', color: '#5A4A3A' }}>A feeling.</em>
            </h2>
            <div style={{ width: 60, height: 1, background: '#C9A84C', marginBottom: '28px' }} />
            <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.85rem', color: '#5A4A3A', lineHeight: 2, fontWeight: 300, marginBottom: '20px' }}>
              MoodyCraft Interior is a modern design studio that transforms spaces into immersive, emotion-driven experiences. Inspired by the refined simplicity of contemporary living, we blend modern aesthetics with functional design.
            </p>
            <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.85rem', color: '#5A4A3A', lineHeight: 2, fontWeight: 300, marginBottom: '20px' }}>
              At MoodyCraft, design is not just about structure — it's about mood, texture, and storytelling. Our signature style embraces subtle contrasts and artistic details, giving each project a raw yet sophisticated character.
            </p>
            <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.85rem', color: '#5A4A3A', lineHeight: 2, fontWeight: 300 }}>
              From concept to completion, our process is centered around understanding your vision and translating it into a space that reflects your lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <div style={{ background: '#2C2416' }}>
        <TornEdgeTop fillColor="#EEECE0" />
      </div>
      <section style={{ background: '#2C2416', padding: '100px 6vw' }}>
        <div className="max-w-7xl mx-auto">
          <div className="slide-up text-center mb-16">
            <p className="section-label mb-4">Our Foundation</p>
            <h2 className="section-title" style={{ color: '#E7DECF' }}>
              Core <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Values</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {VALUES.map((val, i) => (
              <div
                key={val.title}
                className="slide-up"
                style={{
                  transitionDelay: `${i * 0.1}s`,
                  padding: '40px 28px',
                  border: '1px solid rgba(201,168,76,0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s ease, background 0.3s ease',
                  cursor: 'default',
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
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3rem', fontWeight: 200, color: 'rgba(201,168,76,0.15)', lineHeight: 1, marginBottom: '12px' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', fontWeight: 400, color: '#E7DECF', marginBottom: '14px' }}>
                  {val.title}
                </h3>
                <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.78rem', color: '#B8B2AA', lineHeight: 1.8, fontWeight: 300 }}>
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background: '#CCB9B5', padding: '100px 6vw' }}>
        <TornEdgeTop fillColor="#2C2416" />
        <div className="max-w-7xl mx-auto" style={{ marginTop: '60px' }}>
          <div className="slide-up text-center mb-16">
            <p className="section-label mb-4">The Creators</p>
            <h2 className="section-title" style={{ color: '#2C2416' }}>
              Meet the <em style={{ fontStyle: 'italic' }}>Team</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                className="slide-up card-3d"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '0' }}>
                  {/* Image with artistic clip */}
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={member.img}
                      alt={member.name}
                      style={{
                        width: '100%',
                        height: '400px',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        display: 'block',
                        filter: 'sepia(15%) contrast(1.05)',
                        transition: 'filter 0.4s ease',
                      }}
                      onMouseEnter={(e) => e.target.style.filter = 'sepia(0) contrast(1.1)'}
                      onMouseLeave={(e) => e.target.style.filter = 'sepia(15%) contrast(1.05)'}
                    />
                    {/* Gold corner frames */}
                    <div style={{ position: 'absolute', top: 12, left: 12, width: 30, height: 30, borderTop: '1.5px solid #C9A84C', borderLeft: '1.5px solid #C9A84C' }} />
                    <div style={{ position: 'absolute', bottom: 0, right: 0, left: 0, padding: '24px 20px', background: 'linear-gradient(to top, rgba(44,36,22,0.9), transparent)' }}>
                      <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', fontStyle: 'italic', color: 'rgba(238,236,224,0.8)', lineHeight: 1.5 }}>
                        "{member.quote}"
                      </p>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(238,236,224,0.6)', backdropFilter: 'blur(10px)', padding: '20px', borderLeft: '3px solid #C9A84C' }}>
                    <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontWeight: 500, color: '#2C2416' }}>{member.name}</h3>
                    <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase', marginTop: '4px', fontWeight: 400 }}>{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#B8B2AA', padding: '100px 6vw', textAlign: 'center' }}>
        <div className="slide-up max-w-2xl mx-auto">
          <p className="section-label mb-4">Let's Create Together</p>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, color: '#2C2416', lineHeight: 1.2, marginBottom: '24px' }}>
            Your dream space is <em style={{ fontStyle: 'italic', color: '#5A4A3A' }}>one conversation away</em>
          </h2>
          <Link to="/contact">
            <button className="btn-gold"><span>Get in Touch</span></button>
          </Link>
        </div>
      </section>

    </div>
  )
}