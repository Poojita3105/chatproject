import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useScrollAnimations } from '../hooks/useScrollAnimation'
import { TornEdgeTop, GoldLine } from '../components/TornEdge'

const TEAM = [
  {
    name: 'Aanya Mehra',
    role: 'Founder & Lead Designer',
    expertise: '12+ years',
    isFounder: true,
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    quote: 'Every space has a soul. Our job is to reveal it.',
    desc: 'Aanya founded MoodyCraft with a vision to redefine interior design in India. Trained in Milan and Mumbai, she brings a rare blend of European minimalism and Indian warmth to every project she leads.',
    founderBio: [
      "Aanya Mehra grew up in Mysuru surrounded by her grandmother's exquisitely curated home — where every corner told a story and every object had memory baked into it. That childhood shaped everything.",
      'After earning her design degree from NID Ahmedabad, she spent three years training in Milan under renowned architect Giulia Ferrante, studying how European minimalism could be softened with warmth. She returned to India in 2014 with a singular mission: to create spaces that don\'t just look beautiful, but feel like coming home.',
      'In 2016, she founded MoodyCraft Interior — a boutique studio built on the belief that design is deeply personal. Today, with 320+ projects across India and 18 national awards, she continues to lead every project with her hands-on philosophy and obsessive attention to emotional detail.',
    ],
  },
  {
    name: 'Rohan Verma',
    role: 'Architecture & Spatial Lead',
    expertise: '10+ years',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    quote: 'Structure is the skeleton; design is the spirit.',
    desc: 'Rohan oversees all spatial planning and architectural decisions. His background in structural engineering ensures every beautiful space is also perfectly functional and built to last.',
  },
  {
    name: 'Kavya Nair',
    role: 'Materials & Textures Expert',
    expertise: '8+ years',
    img: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&q=80',
    quote: 'Touch tells stories that eyes often miss.',
    desc: 'Kavya curates every surface, fabric, and finish with a meticulous eye for detail.   Her expertise in sustainable materials ensures interiors that are both timeless and environmentally conscious.',
  },
  {
    name: 'Arjun Desai',
    role: '3D Visualization & Tech Lead',
    expertise: '7+ years',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    quote: "See it before you build it — that's the future.",
    desc: 'Arjun leads our photorealistic 3D rendering studio, giving clients a perfect preview of their space before a single nail is hammered. His tech-forward approach keeps MoodyCraft ahead of the curve.',
  },
]

const VALUES = [
  { icon: '✦', title: 'Tailor-made Designs', desc: 'Every project begins with your story. No templates, no shortcuts — only spaces that are unmistakably yours.' },
  { icon: '◈', title: 'On-time Delivery', desc: 'We respect your time as much as your taste. Every project ships on schedule, every time.' },
  { icon: '◇', title: 'Premium Materials', desc: 'Only the finest sourced materials make it into your space — handpicked for beauty, durability, and feel.' },
  { icon: '◉', title: 'Transparent Pricing', desc: 'No hidden costs. No surprises. Clear budgets from day one so you can design with total confidence.' },
]

const ACHIEVEMENTS = [
  { number: '8+',  label: 'Years of Excellence', sub: 'Since 2016' },
  { number: '320+', label: 'Projects Completed',  sub: 'Across India' },
  { number: '18',   label: 'Design Awards',        sub: 'National & Regional' },
  { number: '98%',  label: 'Client Satisfaction',  sub: 'Google Reviews' },
]

const founder = TEAM.find(m => m.isFounder)
const others  = TEAM.filter(m => !m.isFounder)

// ─── Animated Counter ────────────────────────────────────────────
function AnimatedCounter({ target, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  const numericTarget = parseInt(target.replace(/\D/g, ''))
  const suffix = target.replace(/[0-9]/g, '')

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const step = numericTarget / (duration / 16)
        const timer = setInterval(() => {
          start += step
          if (start >= numericTarget) { setCount(numericTarget); clearInterval(timer) }
          else setCount(Math.floor(start))
        }, 16)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [numericTarget, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

// ─── useInView Hook ──────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, inView]
}

// ─── SlideIn Wrapper ─────────────────────────────────────────────
function SlideIn({ direction = 'up', delay = 0, children }) {
  const [ref, inView] = useInView()
  const transforms = {
    up:    'translateY(52px)',
    left:  'translateX(-60px)',
    right: 'translateX(60px)',
  }
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate(0,0)' : transforms[direction],
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// ─── Team Member Card ────────────────────────────────────────────
function TeamMemberCard({ member, delay, slideDir = 'up' }) {
  const [hovered, setHovered] = useState(false)

  return (
    <SlideIn direction={slideDir} delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          gap: '22px',
          padding: '28px',
          border: `1px solid ${hovered ? 'rgba(201,168,76,0.55)' : 'rgba(201,168,76,0.15)'}`,
          background: hovered ? 'rgba(44,36,22,0.04)' : 'rgba(255,255,255,0.3)',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.4s ease',
          transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
          cursor: 'default',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top gold line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }} />

        {/* Portrait */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '88px', height: '88px', borderRadius: '50%', overflow: 'hidden',
            border: `2px solid ${hovered ? '#C9A84C' : 'rgba(201,168,76,0.3)'}`,
            transition: 'border-color 0.4s ease',
          }}>
            <img
              src={member.img}
              alt={member.name}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center top',
                filter: hovered ? 'brightness(1.05)' : 'brightness(0.9) sepia(8%)',
                transition: 'filter 0.4s ease',
              }}
            />
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
            padding: '3px 10px', borderRadius: '12px',
          }}>
            <span style={{
              fontFamily: '"Josefin Sans", sans-serif',
              fontSize: '0.48rem', letterSpacing: '0.1em',
              color: '#2C2416', fontWeight: 700, textTransform: 'uppercase',
            }}>{member.expertise}</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1.3rem', fontWeight: 500, color: '#2C2416', marginBottom: '2px',
          }}>{member.name}</h3>
          <p style={{
            fontFamily: '"Josefin Sans", sans-serif',
            fontSize: '0.53rem', letterSpacing: '0.22em',
            color: '#C9A84C', textTransform: 'uppercase', fontWeight: 600, marginBottom: '10px',
          }}>{member.role}</p>
          <p style={{
            fontFamily: '"Josefin Sans", sans-serif',
            fontSize: '0.76rem', color: '#5A4A3A',
            lineHeight: 1.85, fontWeight: 300, marginBottom: '10px',
          }}>{member.desc}</p>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '0.85rem', fontStyle: 'italic', color: '#8a6a3a',
            opacity: hovered ? 1 : 0.55, transition: 'opacity 0.4s ease',
          }}>"{member.quote}"</p>
        </div>
      </div>
    </SlideIn>
  )
}

// ─── YouTube Section ─────────────────────────────────────────────
// Replace VIDEO_ID with your actual YouTube video ID
const VIDEO_ID = '_y4cqMMlO9g'

function YoutubeSection() {
  return (
    <section style={{
      background: '#1a1410', padding: '100px 6vw',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>

        <SlideIn direction="up">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p className="section-label mb-4" style={{ color: '#C9A84C' }}>See Us In Action</p>
            <h2 className="section-title" style={{ color: '#E7DECF' }}>
              Know our <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>story</em>
            </h2>
            <p style={{
              fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.82rem',
              color: 'rgba(184,178,170,0.75)', maxWidth: '480px',
              margin: '16px auto 0', lineHeight: 1.9, fontWeight: 300,
            }}>
              Step inside MoodyCraft — watch how we transform raw spaces into soulful experiences, from first sketch to final reveal.
            </p>
          </div>
        </SlideIn>

        <SlideIn direction="up" delay={0.15}>
          <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
            {/* Gold corner frames */}
            {[
              { top: -14, left: -14, borderTop: '2px solid #C9A84C', borderLeft: '2px solid #C9A84C' },
              { top: -14, right: -14, borderTop: '2px solid #C9A84C', borderRight: '2px solid #C9A84C' },
              { bottom: -14, left: -14, borderBottom: '2px solid #C9A84C', borderLeft: '2px solid #C9A84C' },
              { bottom: -14, right: -14, borderBottom: '2px solid #C9A84C', borderRight: '2px solid #C9A84C' },
            ].map((style, i) => (
              <div key={i} style={{ position: 'absolute', width: 50, height: 50, zIndex: 2, ...style }} />
            ))}

            {/* Video embed */}
            <div style={{
              position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden',
              border: '1px solid rgba(201,168,76,0.25)',
              boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
            }}>
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
                title="About MoodyCraft Interior"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '100%', border: 'none',
                }}
              />
            </div>
          </div>
        </SlideIn>

        {/* Below-video stats */}
        <SlideIn direction="up" delay={0.28}>
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '40px',
            marginTop: '56px', flexWrap: 'wrap',
          }}>
            {[
              { val: '10K+', label: 'Views' },
              { val: '500+', label: 'Subscribers' },
              { val: 'Weekly', label: 'New Content' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 300, color: '#C9A84C', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(184,178,170,0.6)', textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </SlideIn>
      </div>
    </section>
  )
}

// ─── Main Page ───────────────────────────────────────────────────
export default function About() {
  useScrollAnimations()

  return (
    <div style={{ background: 'linear-gradient(180deg, #A7B2AA 0%, #E7DECF 30%, #EEECE0 60%, #CCB9B5 85%, #B8B2AA 100%)' }}>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section style={{ height: '90vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', paddingTop: '150px', paddingLeft: '30px' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', animation: 'heroZoom 10s ease-out forwards' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,20,16,0.92) 0%, rgba(26,20,16,0.5) 60%, rgba(26,20,16,0.15) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,20,16,0.6) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #C9A84C, #E8C96A, #C9A84C, transparent)', animation: 'fadeIn 2s ease 0.5s both' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div style={{ animation: 'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both' }}>
            <p className="section-label mb-5" style={{ color: '#E8C96A' }}>Our Story</p>
          </div>
          <div style={{ animation: 'revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s both' }}>
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontWeight: 300, color: '#EEECE0', lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: 0 }}>Designing</h1>
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontWeight: 300, fontStyle: 'italic', color: '#C9A84C', lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: 0 }}>moods,</h1>
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontWeight: 300, color: '#EEECE0', lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: '36px' }}>not spaces.</h1>
          </div>
          <div style={{ animation: 'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both', width: 80, height: '2px', background: 'linear-gradient(90deg, #C9A84C, transparent)', marginBottom: '28px' }} />
          <div style={{ animation: 'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s both' }}>
            <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.88rem', color: 'rgba(238,236,224,0.75)', maxWidth: '460px', lineHeight: 1.9, fontWeight: 300, marginBottom: '40px' }}>
              Founded in 2016, MoodyCraft Interior has grown into one of India's most sought-after boutique design studios — crafting spaces that speak to the soul.
            </p>
          </div>
          <div style={{ animation: 'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.85s both', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {['8+ Years', '320+ Projects', '18 Awards'].map(stat => (
              <span key={stat} style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2C2416', background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', padding: '8px 20px', fontWeight: 600 }}>{stat}</span>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes heroZoom { 0% { transform: scale(1.12); } 100% { transform: scale(1.02); } }
          @keyframes fadeIn   { from { opacity: 0; } to { opacity: 1; } }
        `}</style>
      </section>

      {/* ══ TORN EDGE ══════════════════════════════════════════════ */}
      <div style={{ background: '#EEECE0' }}><TornEdgeTop fillColor="rgba(26,20,16,0.8)" /></div>

      {/* ══ WHO WE ARE ════════════════════════════════════════════ */}
      <section style={{ background: '#EEECE0', padding: '10px 6vw' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="slide-left">
            <div style={{ position: 'relative', paddingBottom: '40px', paddingRight: '40px' }}>
              <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80" alt="MoodyCraft studio" style={{ width: '100%', height: '580px', objectFit: 'cover', display: 'block', clipPath: 'polygon(0 0, 100% 0, 100% 88%, 85% 100%, 0 100%)', filter: 'brightness(0.95)', transition: 'filter 0.4s ease' }} onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.05)'} onMouseLeave={e => e.currentTarget.style.filter = 'brightness(0.95)'} />
              <div style={{ position: 'absolute', top: 20, left: 20, width: 50, height: 50, borderTop: '2px solid #C9A84C', borderLeft: '2px solid #C9A84C' }} />
              <div style={{ position: 'absolute', bottom: 80, right: 60, width: 50, height: 50, borderBottom: '2px solid #C9A84C', borderRight: '2px solid #C9A84C' }} />
              <div style={{ position: 'absolute', bottom: 10, right: 10, background: '#2C2416', padding: '28px 32px', borderLeft: '3px solid #C9A84C', boxShadow: '0 20px 60px rgba(44,36,22,0.4)', transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3.5rem', fontWeight: 300, color: '#C9A84C', lineHeight: 1 }}>8+</div>
                <div style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.58rem', letterSpacing: '0.25em', color: '#B8B2AA', textTransform: 'uppercase', marginTop: '6px' }}>Years of Excellence</div>
              </div>
              <div style={{ position: 'absolute', top: -20, right: 0, width: '42%', border: '4px solid #EEECE0', boxShadow: '0 10px 40px rgba(44,36,22,0.25)', transition: 'transform 0.4s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                <img src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&q=80" alt="Design detail" style={{ width: '100%', height: '210px', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          </div>
          <div className="slide-right" style={{ paddingTop: '20px' }}>
            <p className="section-label mb-4">Who We Are</p>
            <h2 className="section-title" style={{ color: '#2C2416', marginBottom: '16px' }}>More than design.<br /><em style={{ fontStyle: 'italic', color: '#d0a90b' }}>A Feeling.</em></h2>
            <div style={{ width: 900, height: '2px', background: 'linear-gradient(90deg, #C9A84C, transparent)', marginBottom: '28px' }} />
            <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.95rem', color: '#5A4A3A', lineHeight: 2.1, fontWeight: 500, marginBottom: '18px' }}>MoodyCraft Interior is a modern design studio that transforms spaces into immersive, emotion-driven experiences. Inspired by the refined simplicity of contemporary living, we blend modern aesthetics with functional design.</p>
            <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.95rem', color: '#5A4A3A', lineHeight: 2.1, fontWeight: 500, marginBottom: '18px' }}>At MoodyCraft, design is not just about structure — it's about mood, texture, and storytelling. Our signature style embraces subtle contrasts and artistic details, giving each project a raw yet sophisticated character.</p>
            <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.95rem', color: '#5A4A3A', lineHeight: 2.1, fontWeight: 500, marginBottom: '36px' }}>From concept to completion, our process is centered around understanding your vision and translating it into a space that reflects your lifestyle, your personality, and your aspirations.</p>
            <Link to="/contact"><button className="btn-gold"><span>Start Your Project</span></button></Link>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ══════════════════════════════════════════ */}
      <div style={{ background: '#2C2416' }}><TornEdgeTop fillColor="#EEECE0" /></div>
      <section style={{ background: '#2C2416', padding: '100px 6vw' }}>
        <div className="max-w-7xl mx-auto">
          <div className="slide-up text-center mb-16">
            <p className="section-label mb-4" style={{ color: '#C9A84C' }}>Why Choose Us</p>
            <h2 className="section-title" style={{ color: '#E7DECF' }}>What makes us <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>different</em></h2>
            <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.82rem', color: 'rgba(184,178,170,0.8)', maxWidth: '520px', margin: '16px auto 0', lineHeight: 1.9, fontWeight: 300 }}>We don't just design rooms — we craft experiences that you'll feel every single day.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {VALUES.map((val, i) => (
              <div key={val.title} className="slide-up" style={{ transitionDelay: `${i * 0.1}s`, padding: '40px 28px', border: '1px solid rgba(201,168,76,0.2)', position: 'relative', overflow: 'hidden', cursor: 'default', transition: 'border-color 0.4s ease, background 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.background = 'rgba(201,168,76,0.07)'; e.currentTarget.style.transform = 'translateY(-8px)' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', color: '#C9A84C', marginBottom: '20px', opacity: 0.7 }}>{val.icon}</div>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', fontWeight: 400, color: '#E7DECF', marginBottom: '14px' }}>{val.title}</h3>
                <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.76rem', color: '#B8B2AA', lineHeight: 1.9, fontWeight: 300 }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ACHIEVEMENTS ══════════════════════════════════════════ */}
      <section style={{ background: '#1a1410', padding: '80px 6vw', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,168,76,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(201,168,76,0.04) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div className="max-w-7xl mx-auto">
          <div className="slide-up text-center mb-16">
            <p className="section-label mb-4" style={{ color: '#C9A84C' }}>Our Track Record</p>
            <h2 className="section-title" style={{ color: '#E7DECF' }}>Numbers that <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>speak</em></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {ACHIEVEMENTS.map((a, i) => (
              <div key={a.label} className="slide-up" style={{ transitionDelay: `${i * 0.12}s`, textAlign: 'center', padding: '48px 24px', borderRight: i < 3 ? '1px solid rgba(201,168,76,0.15)' : 'none', position: 'relative', transition: 'background 0.4s ease', cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.04)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 300, color: '#C9A84C', lineHeight: 1, marginBottom: '10px' }}><AnimatedCounter target={a.number} /></div>
                <div style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', color: '#E7DECF', textTransform: 'uppercase', fontWeight: 500, marginBottom: '6px' }}>{a.label}</div>
                <div style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(184,178,170,0.6)', textTransform: 'uppercase', fontWeight: 300 }}>{a.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ══ CREATORS — FULLY REDESIGNED ══════════════════════════ */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section style={{ background: '#F2EDE4', padding: '0 0 120px', position: 'relative', overflow: 'hidden' }}>
        <TornEdgeTop fillColor="#1a1410" />

        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.06) 0%, transparent 50%)', pointerEvents: 'none' }} />

        <div className="max-w-7xl mx-auto px-6" style={{ paddingTop: '80px', position: 'relative', zIndex: 1 }}>

          {/* Section header */}
          <SlideIn direction="up">
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <p className="section-label mb-4">The Creators</p>
              <h2 className="section-title" style={{ color: '#2C2416' }}>
                People behind the <em style={{ fontStyle: 'italic', color: '#8a6a3a' }}>magic</em>
              </h2>
              <div style={{ width: 60, height: '2px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin: '20px auto 0' }} />
            </div>
          </SlideIn>

          {/* ── FOUNDER SPOTLIGHT ──────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '100px' }} className="founder-grid">

            {/* Left: portrait */}
            <SlideIn direction="left">
              <div style={{ position: 'relative' }}>
                {/* Dark accent block behind photo */}
                <div style={{ position: 'absolute', top: 30, left: -20, width: '85%', height: '90%', background: 'linear-gradient(135deg, #2C2416, #3d2f1e)', zIndex: 0 }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <img
                    src={founder.img}
                    alt={founder.name}
                    style={{ width: '100%', height: '620px', objectFit: 'cover', objectPosition: 'center top', display: 'block', filter: 'brightness(0.96)' }}
                  />
                  {/* Corner accents */}
                  <div style={{ position: 'absolute', top: 16, left: 16, width: 40, height: 40, borderTop: '2px solid #C9A84C', borderLeft: '2px solid #C9A84C' }} />
                  <div style={{ position: 'absolute', bottom: 16, right: 16, width: 40, height: 40, borderBottom: '2px solid #C9A84C', borderRight: '2px solid #C9A84C' }} />

                  {/* Floating quote */}
                  <div style={{ position: 'absolute', bottom: -28, right: -28, background: '#C9A84C', padding: '24px 28px', maxWidth: '220px', boxShadow: '0 20px 60px rgba(44,36,22,0.35)' }}>
                    <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.2rem', color: '#2C2416', lineHeight: 1, marginBottom: '6px' }}>"</div>
                    <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.95rem', fontStyle: 'italic', color: '#2C2416', lineHeight: 1.6, fontWeight: 500 }}>{founder.quote}</p>
                  </div>
                </div>

                {/* Experience chip */}
                <div style={{ position: 'absolute', top: -16, right: 0, zIndex: 2, background: '#2C2416', padding: '12px 20px', borderLeft: '3px solid #C9A84C' }}>
                  <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 300, color: '#C9A84C', lineHeight: 1 }}>12+</div>
                  <div style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.5rem', letterSpacing: '0.2em', color: '#B8B2AA', textTransform: 'uppercase', marginTop: '2px' }}>Years Experience</div>
                </div>
              </div>
            </SlideIn>

            {/* Right: founder story */}
            <SlideIn direction="right" delay={0.1}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ width: 36, height: '1px', background: '#C9A84C' }} />
                  <span style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.58rem', letterSpacing: '0.3em', color: '#C9A84C', textTransform: 'uppercase', fontWeight: 600 }}>Founder & Visionary</span>
                </div>

                <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.4rem, 4vw, 3.8rem)', fontWeight: 300, color: '#2C2416', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '6px' }}>
                  {founder.name}
                </h2>
                <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.65rem', letterSpacing: '0.22em', color: '#8a6a3a', textTransform: 'uppercase', fontWeight: 500, marginBottom: '32px' }}>
                  {founder.role}
                </p>
                <div style={{ width: 60, height: '2px', background: 'linear-gradient(90deg, #C9A84C, transparent)', marginBottom: '32px' }} />

                {founder.founderBio.map((para, idx) => (
                  <p key={idx} style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.90rem', color: '#4f3419', lineHeight: 2.1, fontWeight: 400, marginBottom: idx < founder.founderBio.length - 1 ? '18px' : '36px' }}>
                    {para}
                  </p>
                ))}

                {/* Signature */}
                <div style={{ borderTop: '2px solid rgba(201,168,76,0.25)', paddingTop: '28px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div>
                    <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.6rem', fontStyle: 'italic', fontWeight: 550, color: '#2C2416', lineHeight: 1 }}>{founder.name}</div>
                    <div style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#8a6a3a', textTransform: 'uppercase', marginTop: '4px', fontWeight: 500 }}>Founder, MoodyCraft Interior</div>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>

          {/* ── TEAM MEMBERS ──────────────────────── */}
          <SlideIn direction="up" delay={0.05}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '44px' }}>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(201,168,76,0.4), transparent)' }} />
              <div style={{ textAlign: 'center' }}>
                <p className="section-label mb-1">The Dream Team</p>
                <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.72rem', color: '#8a6a3a', fontWeight: 300 }}>The people who bring every vision to life</p>
              </div>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4))' }} />
            </div>
          </SlideIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
            {others.map((member, i) => (
              <TeamMemberCard
                key={member.name}
                member={member}
                delay={i * 0.12}
                slideDir={i % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .founder-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
          }
        `}</style>
      </section>

      {/* ══ YOUTUBE VIDEO ══════════════════════════════════════════ */}
      <YoutubeSection />

      {/* ══ EMOTIONAL CONNECT ══════════════════════════════════════ */}
      <section style={{ background: '#EEECE0', padding: '100px 6vw', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(8rem, 20vw, 18rem)', fontWeight: 300, color: 'rgba(44,36,22,0.04)', whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.04em' }}>MoodyCraft</div>
        <div className="max-w-4xl mx-auto text-center" style={{ position: 'relative', zIndex: 1 }}>
          <div className="slide-up">
            <p className="section-label mb-6">Our Promise</p>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', fontWeight: 300, color: '#2C2416', lineHeight: 1.15, marginBottom: '32px', letterSpacing: '-0.01em' }}>
              We don't just hand over keys.<br /><em style={{ fontStyle: 'italic', color: '#8a6a3a' }}>We hand over a feeling.</em>
            </h2>
            <div style={{ width: 80, height: '2px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin: '0 auto 32px' }} />
            <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.88rem', color: '#5A4A3A', lineHeight: 2.1, fontWeight: 300, maxWidth: '600px', margin: '0 auto 48px' }}>
              Every project at MoodyCraft is a deeply personal journey. We listen, we understand, and we pour our hearts into creating spaces that make you feel exactly the way you've always dreamed. That's not just interior design — that's MoodyCraft.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact"><button className="btn-gold"><span>Get in Touch</span></button></Link>
              <Link to="/portfolio"><button className="btn-outline"><span>View Our Work</span></button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA STRIP ══════════════════════════════════════════════ */}
      <section style={{ background: '#2C2416', padding: '60px 6vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
        <div className="slide-left">
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 300, color: '#E7DECF', margin: 0 }}>
            Your dream space is <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>one conversation away.</em>
          </p>
        </div>
        <div className="slide-right">
          <Link to="/contact"><button className="btn-gold"><span>Book a Free Consultation</span></button></Link>
        </div>
      </section>

    </div>
  )
}