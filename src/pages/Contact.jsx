import React, { useState, useRef, useEffect } from 'react'
import { useScrollAnimations } from '../hooks/useScrollAnimation'
import { TornEdgeTop } from '../components/TornEdge'
import { Link } from 'react-router-dom'

// ─── Constants ───────────────────────────────────────────────────
const SERVICES_LIST = ['Residential Design', 'Commercial Spaces', 'Turnkey Solution', '3D Visualization', 'Consultation Only']
const BUDGETS      = ['Under ₹5 Lakhs', '₹5–15 Lakhs', '₹15–30 Lakhs', '₹30–60 Lakhs', '₹60 Lakhs+']
const TIMELINES    = ['ASAP', '1–3 Months', '3–6 Months', '6+ Months']

const FAQS = [
  {
    q: 'How long does a typical interior design project take?',
    a: 'Project timelines vary based on scope. A single room takes 4–8 weeks, a full apartment 3–6 months, and a villa or commercial space 6–12 months. We provide a detailed timeline during our initial consultation.',
  },
  {
    q: 'Do you work outside Mumbai?',
    a: "Absolutely! We've completed projects across Mumbai, Delhi, Bangalore, Pune, Hyderabad, and several tier-2 cities. We also offer virtual consultations for clients outside our primary service areas.",
  },
  {
    q: 'What is included in a turnkey package?',
    a: 'Our turnkey service covers everything: civil work, electrical & plumbing, false ceilings, flooring, custom furniture, built-ins, decor, art curation, and final styling — with a 1-year post-handover warranty.',
  },
  {
    q: 'Can I see the design before execution begins?',
    a: 'Yes! We present full 3D renders, material boards, furniture layouts, and lighting plans before any physical work begins. You approve everything at every stage.',
  },
  {
    q: 'Is the first consultation really free?',
    a: "Yes — completely. Our 60-minute initial consultation is free, with no obligation. We'll understand your needs, discuss possibilities, and give you a rough estimate.",
  },
]

// ─── useInView hook ───────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

function SlideIn({ direction = 'up', delay = 0, children }) {
  const [ref, inView] = useInView()
  const tr = { up: 'translateY(50px)', left: 'translateX(-56px)', right: 'translateX(56px)' }
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : tr[direction],
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// ─── FAQ Row — opens on hover ─────────────────────────────────────
function FaqRow({ faq, index }) {
  const [open, setOpen] = useState(false)

  return (
    <SlideIn direction="up" delay={index * 0.07}>
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        style={{
          borderBottom: '1px solid rgba(201,168,76,0.2)',
          cursor: 'default',
          background: open ? 'rgba(201,168,76,0.03)' : 'transparent',
          transition: 'background 0.4s ease',
        }}
      >
        {/* Question row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '26px 8px',
          gap: 20,
        }}>
          {/* Index + question */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
            <span style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.5rem',
              fontWeight: 600,
              color: open ? '#C9A84C' : 'rgba(201, 168, 76, 0.94)',
              lineHeight: 1,
              flexShrink: 0,
              transition: 'color 0.3s ease',
              minWidth: '28px',
            }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div style={{ width: 1, height: 28, background: 'rgba(201,168,76,0.2)', flexShrink: 0 }} />
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              fontWeight: 400,
              color: open ? '#C9A84C' : '#2C2416',
              lineHeight: 1.35,
              transition: 'color 0.3s ease',
              margin: 0,
            }}>
              {faq.q}
            </p>
          </div>

          {/* Animated plus/minus */}
          <div style={{
            width: 32, height: 32, flexShrink: 0,
            border: `1px solid ${open ? '#C9A84C' : 'rgba(201,168,76,0.3)'}`,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: open ? '#C9A84C' : 'transparent',
            transition: 'all 0.35s ease',
            position: 'relative',
          }}>
            {/* Horizontal bar */}
            <div style={{ position: 'absolute', width: 12, height: 1.5, background: open ? '#2C2416' : '#C9A84C', transition: 'background 0.3s ease' }} />
            {/* Vertical bar — rotates to disappear */}
            <div style={{
              position: 'absolute', width: 1.5, height: 12,
              background: open ? '#2C2416' : '#C9A84C',
              transition: 'transform 0.35s ease, opacity 0.35s ease, background 0.3s ease',
              transform: open ? 'rotate(90deg) scaleY(0)' : 'rotate(0deg) scaleY(1)',
              opacity: open ? 0 : 1,
            }} />
          </div>
        </div>

        {/* Answer — expands smoothly */}
        <div style={{
          maxHeight: open ? '220px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <p style={{
            fontFamily: '"Josefin Sans", sans-serif',
            fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)',
            color: '#5A4A3A',
            lineHeight: 2,
            fontWeight: 500,
            padding: '0 8px 28px calc(28px + 20px + 1px + 20px)',
            letterSpacing: '0.025em',
          }}>
            {faq.a}
          </p>
        </div>
      </div>
    </SlideIn>
  )
}

// ─── Unique Map Section ───────────────────────────────────────────
function MapSection() {
  const [activePin, setActivePin] = useState(null)

  const PINS = [
    { id: 'studio', label: 'Our Studio', sub: 'Bandra West, Mumbai', x: '52%', y: '44%', primary: true },
    { id: 'showroom', label: 'Material Showroom', sub: 'Lower Parel, Mumbai', x: '49%', y: '52%', primary: false },
    { id: 'site', label: 'Active Project Site', sub: 'Juhu, Mumbai', x: '46%', y: '38%', primary: false },
  ]

  return (
    <section style={{ background: '#1a1410', padding: '0', position: 'relative', overflow: 'hidden' }}>
      <TornEdgeTop fillColor="#EEECE0" />

      <div style={{ padding: '50px 0 0', position: 'relative' }}>

        {/* Section header */}
        <SlideIn direction="up">
          <div style={{ textAlign: 'center', padding: '0 6vw', marginBottom: '40px' }}>
            <p style={{
              fontFamily: '"Josefin Sans", sans-serif',
              fontSize: '0.58rem', letterSpacing: '0.35em',
              color: '#C9A84C', textTransform: 'uppercase', marginBottom: '14px',
            }}>
              Visit Us
            </p>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 300, color: '#E7DECF', lineHeight: 1.05,
            }}>
              Come see us <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>in person</em>
            </h2>
          </div>
        </SlideIn>

        {/* Studio features strip */}
        <SlideIn direction="up" delay={0.1}>
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 0,
            padding: '0 6vw', marginBottom: '60px', flexWrap: 'wrap',
          }}>
            {[
              { icon: '☕', title: 'Design Café', desc: 'Explore material libraries over specialty coffee in our relaxed studio lounge.' },
              { icon: '🎨', title: '2000+ Materials', desc: 'Touch and feel every fabric, stone, and finish before you decide.' },
              { icon: '🥽', title: 'VR Walk-Through', desc: 'Step inside your future space with our immersive VR experience station.' },
              { icon: '📐', title: 'Live Consultation', desc: 'Meet our designers face-to-face and co-create your space in real time.' },
            ].map((item, i) => (
              <div
                key={item.title}
                style={{
                  flex: '1 1 200px', padding: '32px 24px',
                  borderRight: i < 3 ? '1px solid rgba(201,168,76,0.12)' : 'none',
                  textAlign: 'center',
                  transition: 'background 0.4s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(113, 87, 15, 0.36)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>{item.icon}</div>
                <h4 style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '1.1rem', fontWeight: 400, color: '#E7DECF', marginBottom: '8px',
                }}>{item.title}</h4>
                <p style={{
                  fontFamily: '"Josefin Sans", sans-serif',
                  fontSize: '0.7rem', color: 'rgba(184,178,170,0.7)',
                  lineHeight: 1.8, fontWeight: 300,
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </SlideIn>

        {/* ── MAP + INFO LAYOUT ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', minHeight: '460px' }} className="map-layout">

          {/* Map iframe with pin overlays */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Iframe */}
            <iframe
              title="MoodyCraft Studio"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.822!2d72.8296!3d19.0596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBandra+West%2C+Mumbai!5e0!3m2!1sen!2sin!4v1620000000000"
              width="100%" height="100%"
              style={{ border: 0, filter: 'grayscale(1) brightness(0.35) sepia(0.5)', minHeight: '460px', display: 'block' }}
              allowFullScreen="" loading="lazy"
            />

            {/* Dark overlay with gold tint */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(135deg, rgba(26,20,16,0.55) 0%, rgba(44,36,22,0.3) 100%)',
            }} />

            {/* Gold grid overlay */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'linear-gradient(rgba(201,168,76,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.06) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }} />

            {/* Animated pins */}
            {PINS.map(pin => (
              <div
                key={pin.id}
                style={{ position: 'absolute', left: pin.x, top: pin.y, transform: 'translate(-50%,-100%)', zIndex: 10, cursor: 'pointer' }}
                onMouseEnter={() => setActivePin(pin.id)}
                onMouseLeave={() => setActivePin(null)}
              >
                {/* Ripple ring */}
                {pin.primary && (
                  <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 48, height: 48, borderRadius: '50%',
                    border: '1.5px solid rgba(201,168,76,0.5)',
                    animation: 'pinRipple 2s ease-out infinite',
                  }} />
                )}
                {/* Pin body */}
                <div style={{
                  width: pin.primary ? 16 : 12,
                  height: pin.primary ? 16 : 12,
                  borderRadius: '50%',
                  background: pin.primary ? '#C9A84C' : 'rgba(201,168,76,0.6)',
                  border: `2px solid ${pin.primary ? '#E8C96A' : 'rgba(201,168,76,0.4)'}`,
                  boxShadow: pin.primary ? '0 0 20px rgba(201,168,76,0.6)' : '0 0 8px rgba(201,168,76,0.3)',
                  transition: 'transform 0.3s ease',
                  transform: activePin === pin.id ? 'scale(1.4)' : 'scale(1)',
                }} />
                {/* Tooltip */}
                {activePin === pin.id && (
                  <div style={{
                    position: 'absolute', bottom: '140%', left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#2C2416',
                    border: '1px solid rgba(201,168,76,0.4)',
                    padding: '10px 16px',
                    whiteSpace: 'nowrap',
                    animation: 'tooltipIn 0.25s ease',
                    pointerEvents: 'none',
                  }}>
                    <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.95rem', fontWeight: 400, color: '#E7DECF', marginBottom: '2px' }}>{pin.label}</p>
                    <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.55rem', letterSpacing: '0.15em', color: '#C9A84C', textTransform: 'uppercase' }}>{pin.sub}</p>
                    {/* Arrow */}
                    <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: 8, height: 8, background: '#2C2416', borderRight: '1px solid rgba(201,168,76,0.4)', borderBottom: '1px solid rgba(201,168,76,0.4)' }} />
                  </div>
                )}
              </div>
            ))}

            {/* MoodyCraft watermark on map */}
            <div style={{
              position: 'absolute', bottom: 20, left: 24,
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '0.75rem', fontStyle: 'italic',
              color: 'rgba(201,168,76,0.5)',
              letterSpacing: '0.1em',
              pointerEvents: 'none',
            }}>
              MoodyCraft Interior · Mumbai
            </div>
          </div>

          {/* Right info panel */}
          <div style={{
            background: '#2C2416',
            borderLeft: '1px solid rgba(201,168,76,0.15)',
            padding: '48px 36px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            gap: '32px',
          }}>
            {/* Address */}
            <div>
              <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.52rem', letterSpacing: '0.3em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '12px' }}>Studio Address</p>
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontWeight: 300, color: '#E7DECF', lineHeight: 1.6 }}>
                42, Design Quarter<br />
                Bandra West<br />
                Mumbai — 400050
              </p>
            </div>

            <div style={{ width: '100%', height: '1px', background: 'rgba(201,168,76,0.15)' }} />

            {/* Phone */}
            <div>
              <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.52rem', letterSpacing: '0.3em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '10px' }}>Phone</p>
              <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.82rem', color: '#B8B2AA', fontWeight: 300, lineHeight: 1.8 }}>
                +91 98765 43210<br />+91 98765 43211
              </p>
            </div>

            <div style={{ width: '100%', height: '1px', background: 'rgba(201,168,76,0.15)' }} />

            {/* Hours */}
            <div>
              <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.52rem', letterSpacing: '0.3em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '10px' }}>Studio Hours</p>
              <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.78rem', color: '#B8B2AA', fontWeight: 300, lineHeight: 1.8 }}>
                Mon – Sat &nbsp;·&nbsp; 10:00 AM – 7:00 PM<br />
                <span style={{ color: 'rgba(184,178,170,0.5)' }}>Sunday by appointment only</span>
              </p>
            </div>

            <div style={{ width: '100%', height: '1px', background: 'rgba(201,168,76,0.15)' }} />

            {/* CTA */}
            <a
              href="https://maps.google.com"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                fontFamily: '"Josefin Sans", sans-serif',
                fontSize: '0.6rem', letterSpacing: '0.22em',
                color: '#C9A84C', textTransform: 'uppercase',
                textDecoration: 'none',
                padding: '12px 0',
                borderBottom: '1px solid rgba(201,168,76,0.3)',
                transition: 'color 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#E8C96A'; e.currentTarget.style.borderColor = '#E8C96A' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)' }}
            >
              <span>Get Directions</span>
              <span style={{ fontSize: '0.8rem' }}>→</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pinRipple {
          0%   { transform: translate(-50%,-50%) scale(0.6); opacity: 0.8; }
          100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0; }
        }
        @keyframes tooltipIn {
          from { opacity: 0; transform: translateX(-50%) translateY(6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @media (max-width: 768px) {
          .map-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

// ─── Main Page ────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '',
    service: '', budget: '', timeline: '',
    message: '', area: '',
  })
  const [submitted, setSubmitted]   = useState(false)
  const [focused, setFocused]       = useState('')
  useScrollAnimations()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true) }

  const inputStyle = name => ({
    width: '100%', padding: '14px 18px', boxSizing: 'border-box',
    background: focused === name ? 'rgba(201,168,76,0.05)' : 'rgba(238,236,224,0.5)',
    border: `1px solid ${focused === name ? '#C9A84C' : 'rgba(44,36,22,0.2)'}`,
    color: '#2C2416',
    fontFamily: '"Josefin Sans", sans-serif',
    fontSize: 'clamp(0.75rem, 1.2vw, 0.82rem)',
    fontWeight: 300, letterSpacing: '0.04em',
    outline: 'none', transition: 'all 0.3s ease', borderRadius: '2px',
  })

  const labelStyle = {
    fontFamily: '"Josefin Sans", sans-serif',
    fontSize: '0.65rem', letterSpacing: '0.28em',
    textTransform: 'uppercase', color: '#C9A84C',
    fontWeight: 600, display: 'block', marginBottom: '8px',
  }

  return (
    <div style={{ background: 'linear-gradient(180deg, #B8B2AA 0%, #CCB9B5 20%, #E7DECF 50%, #EEECE0 100%)' }}>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section style={{ height: '90vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center'}}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1600&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          animation: 'heroZoom 14s ease-out forwards',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,20,16,0.92) 0%, rgba(26,20,16,0.55) 65%, rgba(26,20,16,0.15) 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #C9A84C, #E8C96A, #C9A84C, transparent)' }} />

       <div style={{
  position: 'relative',
  zIndex: 2,
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '13px 6vw 0',
  width: '100%',
}}>
          <div style={{ animation: 'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both' }}>
            <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.58rem', letterSpacing: '0.35em', color: '#E8C96A', textTransform: 'uppercase', marginBottom: '20px' }}>
              ✦ Begin Your Journey
            </p>
          </div>
          <div style={{ animation: 'revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s both' }}>
            <h1 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(2.2rem, 6vw, 5.8rem)',
              fontWeight: 300, color: '#EEECE0',
              lineHeight: 0.92, letterSpacing: '-0.025em',
              marginBottom: 0,
            }}>
              Let's create
            </h1>
            <h1 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(2.2rem, 6vw, 5.8rem)',
              fontWeight: 300, fontStyle: 'italic', color: '#C9A84C',
              lineHeight: 0.92, letterSpacing: '-0.025em',
              marginBottom: 0,
            }}>
              something
            </h1>
            <h1 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(2.2rem, 6vw, 5.8rem)',
              fontWeight: 300, color: '#EEECE0',
              lineHeight: 0.92, letterSpacing: '-0.025em',
              marginBottom: '36px',
            }}>
              extraordinary.
            </h1>
          </div>
          <div style={{ animation: 'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.65s both' }}>
            <div style={{ width: 72, height: '2px', background: 'linear-gradient(90deg, #C9A84C, transparent)', marginBottom: '22px' }} />
            <p style={{
              fontFamily: '"Josefin Sans", sans-serif', fontSize: 'clamp(0.68rem, 1vw, 0.78rem)',
              color: 'rgba(238,236,224,0.68)', maxWidth: '420px', lineHeight: 1.95,
              fontWeight: 300, letterSpacing: '0.04em',
            }}>
              Book a free consultation and let our experts understand your vision. Your perfect space is one conversation away.
            </p>
          </div>
        </div>

        <style>{`
          @keyframes heroZoom { 0% { transform: scale(1.1); } 100% { transform: scale(1.02); } }
          @keyframes revealUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </section>

      {/* ══ TORN EDGE ══════════════════════════════════════════════ */}
      <div style={{ background: '#EEECE0' }}><TornEdgeTop fillColor="rgba(26,20,16,0.85)" /></div>

      {/* ══ CONTACT + FORM ════════════════════════════════════════ */}
      <section style={{ background: '#EEECE0', padding: '50px 6vw' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '80px', alignItems: 'start' }} className="contact-grid">

          {/* ── LEFT: info ── */}
          <SlideIn direction="left">
            <div>
              <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.99rem', letterSpacing: '0.2em', color: '#d39d07', textTransform: 'uppercase', marginBottom: '14px', fontWeight: 900 }}>
                Contact Us
              </p>
              <h2 style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                fontWeight: 500, color: '#2C2416', lineHeight: 1.1, marginBottom: '20px',
              }}>
                Get in <em style={{ fontStyle: 'italic', color: '#985410' }}>Touch</em>
              </h2>
              <div style={{ width: 350, height: '2px', background: 'linear-gradient(90deg, #C9A84C, transparent)', marginBottom: '40px' }} />

              {/* Contact items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '44px' }}>
                {[
                  { icon: '◎', label: 'Studio', lines: ['42, Design Quarter', 'Bandra West, Mumbai — 400050'] },
                  { icon: '◇', label: 'Phone', lines: ['+91 98765 43210', '+91 98765 43211'] },
                  { icon: '◈', label: 'Email', lines: ['hello@moodycraft.in', 'projects@moodycraft.in'] },
                  { icon: '✦', label: 'Hours', lines: ['Mon – Sat: 10:00 AM – 7:00 PM', 'Sun: By appointment only'] },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: 40, height: 40, flexShrink: 0,
                      border: '1px solid rgba(201, 168, 76, 0.63)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem',
                      color: '#C9A84C',
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.67rem', letterSpacing: '0.28em', color: '#bc9730', textTransform: 'uppercase', marginBottom: '5px', fontWeight: 1000 }}>
                        {item.label}
                      </p>
                      {item.lines.map((l, i) => (
                        <p key={i} style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: 'clamp(0.82rem, 1.1vw, 0.8rem)', color: '#5b4128', fontWeight: 400, lineHeight: 1.8 }}>{l}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <p style={labelStyle}>Follow Our Journey</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
                {[
                  { name: 'Instagram', icon: 'IG', url: 'https://instagram.com' },
                  { name: 'Pinterest', icon: 'PT', url: 'https://pinterest.com' },
                  { name: 'Facebook', icon: 'FB', url: 'https://facebook.com' },
                  { name: 'YouTube',  icon: 'YT', url: 'https://youtube.com' },
                ].map(s => (
                  <a
                    key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                    title={s.name}
                    style={{
                      width: 44, height: 44,
                      border: '1px solid rgba(72, 54, 24, 0.36)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.72rem',
                      letterSpacing: '0.1em', color: '#5A4A3A', fontWeight: 600,
                      textDecoration: 'none', transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.background = 'rgba(201,168,76,0.06)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(44,36,22,0.2)'; e.currentTarget.style.color = '#5A4A3A'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </SlideIn>

          {/* ── RIGHT: form ── */}
          <SlideIn direction="right" delay={0.1}>
            {submitted ? (
              <div style={{ border: '1px solid rgba(161, 128, 36, 0.64)', padding: '80px 60px', textAlign: 'center', animation: 'revealUp 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3rem', color: '#C9A84C', marginBottom: '16px' }}>✦</div>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 600, color: '#2C2416', marginBottom: '14px' }}>
                  Thank you, {form.name.split(' ')[0]}!
                </h3>
                <div style={{ width: 52, height: '1px', background: '#C9A84C', margin: '0 auto 22px' }} />
                <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: 'clamp(0.75rem, 1.2vw, 0.83rem)', color: '#5A4A3A', lineHeight: 1.95, fontWeight: 500, maxWidth: 360, margin: '0 auto 20px' }}>
                  Your consultation request has been received. Our design team will reach out within 24 hours to schedule your session.
                </p>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', fontStyle: 'italic', color: '#C9A84C', marginBottom: '28px', fontWeight: 500 }}>
                  Designing moods, not just spaces.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name:'',email:'',phone:'',city:'',service:'',budget:'',timeline:'',message:'',area:'' }) }}
                  style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', background: 'transparent', color: '#5A4A3A', border: '1px solid rgba(44,36,22,0.25)', padding: '12px 28px', cursor: 'pointer', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#C9A84C' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(44,36,22,0.25)'; e.currentTarget.style.color = '#5A4A3A' }}
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <div style={{ border: '1px solid rgba(201,168,76,0.18)', padding: '56px 48px', position: 'relative' }}>
                {/* Gold top bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />

                <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.55rem', letterSpacing: '0.3em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '10px' }}>
                  Book Consultation
                </p>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 400, color: '#2C2416', marginBottom: '36px' }}>
                  Tell Us About Your <em style={{ fontStyle: 'italic', color: '#c28d58',  fontWeight: 700 }}>Project</em>
                </h3>

                <form onSubmit={handleSubmit}>
                  {/* Name + Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="form-row">
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} placeholder="Aryan Mehta" required style={inputStyle('name')} />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} placeholder="aryan@example.com" required style={inputStyle('email')} />
                    </div>
                  </div>

                  {/* Phone + City */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="form-row">
                    <div>
                      <label style={labelStyle}>Phone Number *</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} onFocus={() => setFocused('phone')} onBlur={() => setFocused('')} placeholder="+91 98765 43210" required style={inputStyle('phone')} />
                    </div>
                    <div>
                      <label style={labelStyle}>City</label>
                      <input type="text" name="city" value={form.city} onChange={handleChange} onFocus={() => setFocused('city')} onBlur={() => setFocused('')} placeholder="Mumbai" style={inputStyle('city')} />
                    </div>
                  </div>

                  {/* Service pills */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Service Required *</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {SERVICES_LIST.map(s => (
                        <button key={s} type="button" onClick={() => setForm({ ...form, service: s })} style={{
                          fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.58rem',
                          letterSpacing: '0.14em', padding: '8px 16px',
                          background: form.service === s ? 'linear-gradient(135deg, #C9A84C, #E8C96A)' : 'transparent',
                          border: `1px solid ${form.service === s ? '#C9A84C' : 'rgba(44,36,22,0.2)'}`,
                          color: form.service === s ? '#2C2416' : '#5A4A3A',
                          cursor: 'pointer', transition: 'all 0.3s ease',
                          textTransform: 'uppercase', fontWeight: form.service === s ? 600 : 300,
                        }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget + Timeline */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="form-row">
                    <div>
                      <label style={labelStyle}>Budget Range</label>
                      <select name="budget" value={form.budget} onChange={handleChange} onFocus={() => setFocused('budget')} onBlur={() => setFocused('')} style={{ ...inputStyle('budget'), cursor: 'pointer' }}>
                        <option value="">Select budget</option>
                        {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Timeline</label>
                      <select name="timeline" value={form.timeline} onChange={handleChange} onFocus={() => setFocused('timeline')} onBlur={() => setFocused('')} style={{ ...inputStyle('timeline'), cursor: 'pointer' }}>
                        <option value="">Select timeline</option>
                        {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Area */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Space Area (approx.)</label>
                    <input type="text" name="area" value={form.area} onChange={handleChange} onFocus={() => setFocused('area')} onBlur={() => setFocused('')} placeholder="e.g., 1500 sq ft" style={inputStyle('area')} />
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: '32px' }}>
                    <label style={labelStyle}>Your Vision</label>
                    <textarea name="message" value={form.message} onChange={handleChange} onFocus={() => setFocused('message')} onBlur={() => setFocused('')} placeholder="Tell us about your dream space, preferred style, or any specific requirements..." rows={4} style={{ ...inputStyle('message'), resize: 'none', lineHeight: 1.85 }} />
                  </div>

                  <button type="submit" style={{
                    width: '100%', padding: '17px',
                    fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.65rem',
                    letterSpacing: '0.28em', textTransform: 'uppercase',
                    background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
                    color: '#2C2416', border: 'none', cursor: 'pointer', fontWeight: 700,
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    Book Free Consultation
                  </button>
                  <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.62rem', color: '#B8B2AA', textAlign: 'center', marginTop: '14px', fontWeight: 300, letterSpacing: '0.04em' }}>
                    We'll respond within 24 hours. No spam, ever.
                  </p>
                </form>
              </div>
            )}
          </SlideIn>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .contact-grid { grid-template-columns: 1fr !important; gap: 50px !important; }
            .form-row     { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ══ MAP SECTION ════════════════════════════════════════════ */}
      <MapSection />

      {/* ══ FAQ SECTION ════════════════════════════════════════════ */}
      <section style={{ background: '#F2EDE4', padding: '100px 6vw' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>

          <SlideIn direction="up">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '56px', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.55rem', letterSpacing: '0.35em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '12px' }}>
                  Have Questions?
                </p>
                <h2 style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 300, color: '#2C2416', lineHeight: 1.05,
                }}>
                  Common <em style={{ fontStyle: 'italic', color: '#8a6a3a' }}>Queries</em>
                </h2>
              </div>
              {/* Hover hint */}
              <p style={{
                fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.62rem',
                color: 'rgba(90,74,58,0.55)', fontWeight: 300,
                letterSpacing: '0.06em', fontStyle: 'italic',
                alignSelf: 'flex-end', paddingBottom: '6px',
              }}>
                Hover to reveal answers
              </p>
            </div>
          </SlideIn>

          {/* Gold divider */}
          <SlideIn direction="up" delay={0.05}>
            <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, #C9A84C, transparent)', marginBottom: '8px' }} />
          </SlideIn>

          {/* FAQ rows */}
          {FAQS.map((faq, i) => (
            <FaqRow key={i} faq={faq} index={i} />
          ))}
        </div>
      </section>

      {/* ══ FINAL CTA STRIP ═══════════════════════════════════════ */}
      <section style={{ background: '#2C2416', padding: '60px 6vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
        <SlideIn direction="left">
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', fontWeight: 300, color: '#E7DECF', margin: 0 }}>
            Your dream space is <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>one conversation away.</em>
          </p>
        </SlideIn>
        <SlideIn direction="right">
          <a href="tel:+919876543210" style={{
            fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.62rem', letterSpacing: '0.22em',
            textTransform: 'uppercase', background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
            color: '#2C2416', border: 'none', padding: '15px 32px', cursor: 'pointer', fontWeight: 700,
            textDecoration: 'none', display: 'inline-block', transition: 'opacity 0.3s ease',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Call Us Now
          </a>
        </SlideIn>
      </section>

    </div>
  )
}