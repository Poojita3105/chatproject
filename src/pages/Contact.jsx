import React, { useState, useRef, useEffect } from 'react'
import { useScrollAnimations } from '../hooks/useScrollAnimation'
import { TornEdgeTop } from '../components/TornEdge'
import { Link } from 'react-router-dom'

// ─── Constants ───────────────────────────────────────────────────
const SERVICES_LIST = ['Residential Design', 'Commercial Spaces', 'Turnkey Solution', '3D Visualization', 'Consultation Only']
const BUDGETS       = ['Under ₹5 Lakhs', '₹5–15 Lakhs', '₹15–30 Lakhs', '₹30–60 Lakhs', '₹60 Lakhs+']
const TIMELINES     = ['ASAP', '1–3 Months', '3–6 Months', '6+ Months']
const MODAL_SERVICES = ['🏠 Home Interiors', '🏢 Office Spaces', '🍽️ Restaurant & Café', 'All of the above']

const FAQS = [
  { q: 'How long does a typical interior design project take?', a: 'Project timelines vary based on scope. A single room takes 4–8 weeks, a full apartment 3–6 months, and a villa or commercial space 6–12 months. We provide a detailed timeline during our initial consultation.' },
  { q: 'Do you work outside Mumbai?', a: "Absolutely! We've completed projects across Mumbai, Delhi, Bangalore, Pune, Hyderabad, and several tier-2 cities. We also offer virtual consultations for clients outside our primary service areas." },
  { q: 'What is included in a turnkey package?', a: 'Our turnkey service covers everything: civil work, electrical & plumbing, false ceilings, flooring, custom furniture, built-ins, decor, art curation, and final styling — with a 1-year post-handover warranty.' },
  { q: 'Can I see the design before execution begins?', a: 'Yes! We present full 3D renders, material boards, furniture layouts, and lighting plans before any physical work begins. You approve everything at every stage.' },
  { q: 'Is the first consultation really free?', a: "Yes — completely. Our 60-minute initial consultation is free, with no obligation. We'll understand your needs, discuss possibilities, and give you a rough estimate." },
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
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : tr[direction],
      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  )
}

// ─── FAQ Row ─────────────────────────────────────────────────────
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '26px 8px', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
            <span style={{
              fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', fontWeight: 600,
              color: open ? '#C9A84C' : 'rgba(201, 168, 76, 0.94)',
              lineHeight: 1, flexShrink: 0, transition: 'color 0.3s ease', minWidth: '28px',
            }}>{String(index + 1).padStart(2, '0')}</span>
            <div style={{ width: 1, height: 28, background: 'rgba(201,168,76,0.2)', flexShrink: 0 }} />
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', fontWeight: 400,
              color: open ? '#C9A84C' : '#2C2416',
              lineHeight: 1.35, transition: 'color 0.3s ease', margin: 0,
            }}>{faq.q}</p>
          </div>
          <div style={{
            width: 32, height: 32, flexShrink: 0,
            border: `1px solid ${open ? '#C9A84C' : 'rgba(201,168,76,0.3)'}`,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: open ? '#C9A84C' : 'transparent',
            transition: 'all 0.35s ease', position: 'relative',
          }}>
            <div style={{ position: 'absolute', width: 12, height: 1.5, background: open ? '#2C2416' : '#C9A84C', transition: 'background 0.3s ease' }} />
            <div style={{
              position: 'absolute', width: 1.5, height: 12,
              background: open ? '#2C2416' : '#C9A84C',
              transition: 'transform 0.35s ease, opacity 0.35s ease, background 0.3s ease',
              transform: open ? 'rotate(90deg) scaleY(0)' : 'rotate(0deg) scaleY(1)',
              opacity: open ? 0 : 1,
            }} />
          </div>
        </div>
        <div style={{ maxHeight: open ? '220px' : '0', overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
          <p style={{
            fontFamily: '"Josefin Sans", sans-serif',
            fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)', color: '#5A4A3A',
            lineHeight: 2, fontWeight: 500,
            padding: '0 8px 28px calc(28px + 20px + 1px + 20px)', letterSpacing: '0.025em',
          }}>{faq.a}</p>
        </div>
      </div>
    </SlideIn>
  )
}

// ─── Map Section ─────────────────────────────────────────────────
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
        <SlideIn direction="up">
          <div style={{ textAlign: 'center', padding: '0 6vw', marginBottom: '40px' }}>
            <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.58rem', letterSpacing: '0.35em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '14px' }}>Visit Us</p>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 300, color: '#E7DECF', lineHeight: 1.05 }}>
              Come see us <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>in person</em>
            </h2>
          </div>
        </SlideIn>

        <SlideIn direction="up" delay={0.1}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 0, padding: '0 6vw', marginBottom: '60px', flexWrap: 'wrap' }}>
            {[
              { icon: '☕', title: 'Design Café', desc: 'Explore material libraries over specialty coffee in our relaxed studio lounge.' },
              { icon: '🎨', title: '2000+ Materials', desc: 'Touch and feel every fabric, stone, and finish before you decide.' },
              { icon: '🥽', title: 'VR Walk-Through', desc: 'Step inside your future space with our immersive VR experience station.' },
              { icon: '📐', title: 'Live Consultation', desc: 'Meet our designers face-to-face and co-create your space in real time.' },
            ].map((item, i) => (
              <div key={item.title} style={{
                flex: '1 1 200px', padding: '32px 24px',
                borderRight: i < 3 ? '1px solid rgba(201,168,76,0.12)' : 'none',
                textAlign: 'center', transition: 'background 0.4s ease', cursor: 'default',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(113, 87, 15, 0.36)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>{item.icon}</div>
                <h4 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontWeight: 400, color: '#E7DECF', marginBottom: '8px' }}>{item.title}</h4>
                <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.7rem', color: 'rgba(184,178,170,0.7)', lineHeight: 1.8, fontWeight: 300 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </SlideIn>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', minHeight: '460px' }} className="map-layout">
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <iframe
              title="MoodyCraft Studio"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.822!2d72.8296!3d19.0596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBandra+West%2C+Mumbai!5e0!3m2!1sen!2sin!4v1620000000000"
              width="100%" height="100%"
              style={{ border: 0, filter: 'grayscale(1) brightness(0.35) sepia(0.5)', minHeight: '460px', display: 'block' }}
              allowFullScreen="" loading="lazy"
            />
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(135deg, rgba(26,20,16,0.55) 0%, rgba(44,36,22,0.3) 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(201,168,76,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.06) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
            {PINS.map(pin => (
              <div key={pin.id} style={{ position: 'absolute', left: pin.x, top: pin.y, transform: 'translate(-50%,-100%)', zIndex: 10, cursor: 'pointer' }}
                onMouseEnter={() => setActivePin(pin.id)} onMouseLeave={() => setActivePin(null)}>
                {pin.primary && (
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 48, height: 48, borderRadius: '50%', border: '1.5px solid rgba(201,168,76,0.5)', animation: 'pinRipple 2s ease-out infinite' }} />
                )}
                <div style={{
                  width: pin.primary ? 16 : 12, height: pin.primary ? 16 : 12,
                  borderRadius: '50%',
                  background: pin.primary ? '#C9A84C' : 'rgba(201,168,76,0.6)',
                  border: `2px solid ${pin.primary ? '#E8C96A' : 'rgba(201,168,76,0.4)'}`,
                  boxShadow: pin.primary ? '0 0 20px rgba(201,168,76,0.6)' : '0 0 8px rgba(201,168,76,0.3)',
                  transition: 'transform 0.3s ease',
                  transform: activePin === pin.id ? 'scale(1.4)' : 'scale(1)',
                }} />
                {activePin === pin.id && (
                  <div style={{ position: 'absolute', bottom: '140%', left: '50%', transform: 'translateX(-50%)', background: '#2C2416', border: '1px solid rgba(201,168,76,0.4)', padding: '10px 16px', whiteSpace: 'nowrap', animation: 'tooltipIn 0.25s ease', pointerEvents: 'none' }}>
                    <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.95rem', fontWeight: 400, color: '#E7DECF', marginBottom: '2px' }}>{pin.label}</p>
                    <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.55rem', letterSpacing: '0.15em', color: '#C9A84C', textTransform: 'uppercase' }}>{pin.sub}</p>
                    <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: 8, height: 8, background: '#2C2416', borderRight: '1px solid rgba(201,168,76,0.4)', borderBottom: '1px solid rgba(201,168,76,0.4)' }} />
                  </div>
                )}
              </div>
            ))}
            <div style={{ position: 'absolute', bottom: 20, left: 24, fontFamily: '"Cormorant Garamond", serif', fontSize: '0.75rem', fontStyle: 'italic', color: 'rgba(201,168,76,0.5)', letterSpacing: '0.1em', pointerEvents: 'none' }}>MoodyCraft Interior · Mumbai</div>
          </div>

          <div style={{ background: '#2C2416', borderLeft: '1px solid rgba(201,168,76,0.15)', padding: '48px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '32px' }}>
            <div>
              <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.52rem', letterSpacing: '0.3em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '12px' }}>Studio Address</p>
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontWeight: 300, color: '#E7DECF', lineHeight: 1.6 }}>42, Design Quarter<br />Bandra West<br />Mumbai — 400050</p>
            </div>
            <div style={{ width: '100%', height: '1px', background: 'rgba(201,168,76,0.15)' }} />
            <div>
              <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.52rem', letterSpacing: '0.3em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '10px' }}>Phone</p>
              <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.82rem', color: '#B8B2AA', fontWeight: 300, lineHeight: 1.8 }}>+91 98765 43210<br />+91 98765 43211</p>
            </div>
            <div style={{ width: '100%', height: '1px', background: 'rgba(201,168,76,0.15)' }} />
            <div>
              <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.52rem', letterSpacing: '0.3em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '10px' }}>Studio Hours</p>
              <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.78rem', color: '#B8B2AA', fontWeight: 300, lineHeight: 1.8 }}>
                Mon – Sat &nbsp;·&nbsp; 10:00 AM – 7:00 PM<br />
                <span style={{ color: 'rgba(184,178,170,0.5)' }}>Sunday by appointment only</span>
              </p>
            </div>
            <div style={{ width: '100%', height: '1px', background: 'rgba(201,168,76,0.15)' }} />
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.22em', color: '#C9A84C', textTransform: 'uppercase', textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid rgba(201,168,76,0.3)', transition: 'color 0.3s ease, border-color 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#E8C96A'; e.currentTarget.style.borderColor = '#E8C96A' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)' }}
            ><span>Get Directions</span><span style={{ fontSize: '0.8rem' }}>→</span></a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pinRipple { 0% { transform: translate(-50%,-50%) scale(0.6); opacity: 0.8; } 100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0; } }
        @keyframes tooltipIn { from { opacity: 0; transform: translateX(-50%) translateY(6px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @media (max-width: 768px) { .map-layout { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

// ─── Consultation Login Modal ─────────────────────────────────────
function ConsultationLoginModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('login')
  const [status, setStatus] = useState('form') // form | success

  // Login state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPass, setLoginPass] = useState('')
  const [loginErrors, setLoginErrors] = useState({})

  // Register state
  const [regFirst, setRegFirst] = useState('')
  const [regLast, setRegLast] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPhone, setRegPhone] = useState('')
  const [regService, setRegService] = useState('')
  const [regPass, setRegPass] = useState('')
  const [regErrors, setRegErrors] = useState({})

  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) doClose()
  }

  const doClose = () => {
    onClose()
    setTimeout(() => {
      setTab('login'); setStatus('form')
      setLoginEmail(''); setLoginPass(''); setLoginErrors({})
      setRegFirst(''); setRegLast(''); setRegEmail('')
      setRegPhone(''); setRegService(''); setRegPass(''); setRegErrors({})
    }, 300)
  }

  // ── Validation helpers ──
  // Name: only letters and spaces
  const handleNameInput = (setter, errKey) => (e) => {
    const val = e.target.value.replace(/[^a-zA-Z\s]/g, '')
    setter(val)
    if (val) setRegErrors(p => ({ ...p, [errKey]: false }))
  }

  // Phone: only digits, max 10
  const handlePhoneInput = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10)
    setRegPhone(val)
    if (val.length === 10) setRegErrors(p => ({ ...p, phone: false }))
  }

  const handleLogin = () => {
    const errors = {}
    if (!loginEmail) errors.email = true
    if (!loginPass)  errors.pass = true
    if (Object.keys(errors).length) { setLoginErrors(errors); return }
    setStatus('success')
  }

  const handleRegister = () => {
    const errors = {}
    if (!regFirst.trim()) errors.first = true
    if (!regLast.trim())  errors.last = true
    if (!regEmail.trim()) errors.email = true
    if (regPhone.length !== 10) errors.phone = true
    if (!regPass.trim())  errors.pass = true
    if (Object.keys(errors).length) { setRegErrors(errors); return }
    setStatus('success')
  }

  const inp = (hasErr) => ({
    width: '100%', padding: '11px 15px',
    background: 'rgba(255,255,255,0.05)',
    border: `1.5px solid ${hasErr ? 'rgba(224,92,92,0.65)' : 'rgba(201,168,76,0.15)'}`,
    borderRadius: 8, color: '#EEECE0',
    fontFamily: "'Josefin Sans', sans-serif", fontSize: '0.76rem',
    outline: 'none', transition: 'border-color .25s, background .25s',
    boxSizing: 'border-box',
  })

  const lbl = {
    display: 'block', fontSize: '0.62rem', letterSpacing: '.1em',
    color: '#8B7D6B', textTransform: 'uppercase', marginBottom: 7,
    fontFamily: "'Josefin Sans', sans-serif",
  }

  const submitBtn = {
    width: '100%', padding: '13px',
    background: 'linear-gradient(135deg,#D4AF37,#B8960C)',
    border: 'none', borderRadius: 10,
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '.1em',
    color: '#1a0a00', cursor: 'pointer', textTransform: 'uppercase',
    boxShadow: '0 6px 20px rgba(212,175,55,0.25)', transition: 'all .3s',
  }

  return (
    <>
      <style>{`
        @keyframes cmFadeIn  { from{opacity:0}           to{opacity:1} }
        @keyframes cmSlideUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cmPulse   { 0%{transform:scale(.8);opacity:0} 100%{transform:scale(1);opacity:1} }
        .cm-input:focus { border-color: rgba(201,168,76,0.5) !important; background: rgba(201,168,76,0.05) !important; }
        .cm-social:hover { border-color: rgba(201,168,76,0.4) !important; color: #C9A84C !important; }
        .cm-submit:hover { transform: translateY(-1px); box-shadow: 0 10px 30px rgba(212,175,55,0.35) !important; }
        .cm-close:hover  { background: rgba(201,168,76,0.12) !important; color: #C9A84C !important; }
        .cm-link { font-size:.68rem; color:#8B7D6B; cursor:pointer; }
        .cm-link:hover { color:#C9A84C; }
        .cm-err { font-size:.6rem; color:rgba(224,92,92,0.9); margin-top:4px; font-family:"Josefin Sans",sans-serif; }
      `}</style>

      {/* Overlay */}
      <div onClick={handleOverlayClick} style={{
        position: 'fixed', inset: 0,
        background: 'rgba(10,8,4,0.82)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, animation: 'cmFadeIn .3s ease',
      }}>
        {/* Modal card */}
        <div style={{
          background: 'linear-gradient(160deg, #1e1710 0%, #2C2416 100%)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: 20, width: '100%', maxWidth: 440,
          position: 'relative',
          animation: 'cmSlideUp .4s cubic-bezier(0.16,1,0.3,1)',
          overflow: 'hidden', maxHeight: '92vh', overflowY: 'auto',
        }}>
          {/* Glow blob */}
          <div style={{ position: 'absolute', top: -80, right: -80, width: 200, height: 200, background: 'radial-gradient(circle, rgba(201,168,76,0.1), transparent 70%)', pointerEvents: 'none' }} />

          {/* Close button */}
          <button className="cm-close" onClick={doClose} style={{
            position: 'absolute', top: 16, right: 16,
            width: 32, height: 32,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(201,168,76,0.15)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#8B7D6B', fontSize: 16,
            transition: 'all .2s', zIndex: 10,
          }}>✕</button>

          {status === 'form' ? (
            <>
              {/* Header */}
              <div style={{ padding: '32px 32px 0', textAlign: 'center' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: 'rgba(201,168,76,0.12)',
                  border: '1.5px solid rgba(201,168,76,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px', fontSize: 20,
                }}>✦</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.75rem', color: '#EEECE0', fontWeight: 300, marginBottom: 6 }}>
                  {tab === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p style={{ fontSize: '0.72rem', color: '#8B7D6B', lineHeight: 1.7 }}>
                  {tab === 'login'
                    ? 'Sign in to book your free consultation'
                    : 'Create an account to begin your design journey'}
                </p>
              </div>

              {/* Tabs */}
              <div style={{
                display: 'flex', margin: '22px 32px 0',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 999, padding: 4,
                border: '1px solid rgba(201,168,76,0.1)',
              }}>
                {['login', 'register'].map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{
                    flex: 1, padding: '9px 0',
                    border: 'none', cursor: 'pointer',
                    borderRadius: 999,
                    background: tab === t ? '#C9A84C' : 'transparent',
                    color: tab === t ? '#2C2416' : '#6B5B4B',
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: '0.68rem', letterSpacing: '.08em',
                    fontWeight: tab === t ? 600 : 400,
                    textTransform: 'uppercase', transition: 'all .25s',
                  }}>
                    {t === 'login' ? 'Sign In' : 'Create Account'}
                  </button>
                ))}
              </div>

              {/* ── LOGIN FORM ── */}
              {tab === 'login' && (
                <div style={{ padding: '22px 32px 32px' }}>
                  {/* Social */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
                    {[
                      { label: 'Google', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
                      { label: 'Facebook', icon: <svg width="15" height="15" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                    ].map(({ label, icon }) => (
                      <button key={label} className="cm-social" style={{
                        padding: '10px', borderRadius: 8,
                        border: '1.5px solid rgba(201,168,76,0.15)',
                        background: 'rgba(255,255,255,0.03)',
                        color: '#B8B2AA', fontSize: '0.7rem', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        fontFamily: "'Josefin Sans', sans-serif", transition: 'all .2s',
                      }}>{icon} {label}</button>
                    ))}
                  </div>

                  {/* Or divider */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                    <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgba(201,168,76,0.1)' }} />
                    <span style={{ fontSize: '0.62rem', color: '#4B3C2C', letterSpacing: '.08em' }}>OR CONTINUE WITH EMAIL</span>
                    <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgba(201,168,76,0.1)' }} />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={lbl}>Email Address</label>
                    <input className="cm-input" type="email" placeholder="you@example.com"
                      value={loginEmail} onChange={e => { setLoginEmail(e.target.value); setLoginErrors(p => ({ ...p, email: false })) }}
                      style={inp(loginErrors.email)} />
                    {loginErrors.email && <p className="cm-err">Email is required</p>}
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={lbl}>Password</label>
                    <input className="cm-input" type="password" placeholder="••••••••"
                      value={loginPass} onChange={e => { setLoginPass(e.target.value); setLoginErrors(p => ({ ...p, pass: false })) }}
                      style={inp(loginErrors.pass)} />
                    {loginErrors.pass && <p className="cm-err">Password is required</p>}
                  </div>

                  <button className="cm-submit" onClick={handleLogin} style={submitBtn}>Sign In & Book Consultation</button>
                  <div style={{ textAlign: 'center', marginTop: 14 }}>
                    <span className="cm-link" onClick={() => setTab('register')}>Don't have an account? Create one →</span>
                  </div>
                </div>
              )}

              {/* ── REGISTER FORM ── */}
              {tab === 'register' && (
                <div style={{ padding: '22px 32px 32px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div style={{ marginBottom: 16 }}>
                      <label style={lbl}>First Name *</label>
                      <input className="cm-input" type="text" placeholder="Arjun"
                        value={regFirst}
                        onChange={handleNameInput(setRegFirst, 'first')}
                        style={inp(regErrors.first)} />
                      {regErrors.first && <p className="cm-err">First name required (letters only)</p>}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={lbl}>Last Name *</label>
                      <input className="cm-input" type="text" placeholder="Sharma"
                        value={regLast}
                        onChange={handleNameInput(setRegLast, 'last')}
                        style={inp(regErrors.last)} />
                      {regErrors.last && <p className="cm-err">Last name required (letters only)</p>}
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={lbl}>Email Address *</label>
                    <input className="cm-input" type="email" placeholder="you@example.com"
                      value={regEmail} onChange={e => { setRegEmail(e.target.value); setRegErrors(p => ({ ...p, email: false })) }}
                      style={inp(regErrors.email)} />
                    {regErrors.email && <p className="cm-err">Email is required</p>}
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={lbl}>Phone Number * (10 digits)</label>
                    <input className="cm-input" type="tel" placeholder="9876543210"
                      value={regPhone}
                      onChange={handlePhoneInput}
                      maxLength={10}
                      inputMode="numeric"
                      style={inp(regErrors.phone)} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                      {regErrors.phone && <p className="cm-err">Enter a valid 10-digit phone number</p>}
                      <p style={{ fontSize: '0.6rem', color: regPhone.length === 10 ? '#C9A84C' : '#6B5B4B', marginLeft: 'auto', fontFamily: "'Josefin Sans', sans-serif" }}>
                        {regPhone.length}/10
                      </p>
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={lbl}>Interested In</label>
                    <select className="cm-input" value={regService} onChange={e => setRegService(e.target.value)}
                      style={{ ...inp(false), background: '#2C2416', color: regService ? '#EEECE0' : '#4B3C2C', cursor: 'pointer' }}>
                      <option value="">Select a service…</option>
                      {MODAL_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={lbl}>Password *</label>
                    <input className="cm-input" type="password" placeholder="Create a password"
                      value={regPass} onChange={e => { setRegPass(e.target.value); setRegErrors(p => ({ ...p, pass: false })) }}
                      style={inp(regErrors.pass)} />
                    {regErrors.pass && <p className="cm-err">Password is required</p>}
                  </div>

                  <button className="cm-submit" onClick={handleRegister} style={submitBtn}>Create Account & Book</button>
                  <div style={{ textAlign: 'center', marginTop: 14 }}>
                    <span className="cm-link" onClick={() => setTab('login')}>Already have an account? Sign in →</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            // ── SUCCESS STATE ──
            <div style={{ padding: '48px 32px', textAlign: 'center' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'rgba(201,168,76,0.15)', border: '2px solid #C9A84C',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px', fontSize: 28,
                animation: 'cmPulse .5s ease',
              }}>✦</div>
              <span style={{
                display: 'inline-block',
                background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)',
                color: '#C9A84C', padding: '5px 14px', borderRadius: 20,
                fontSize: '0.65rem', letterSpacing: '.1em', marginBottom: 16,
              }}>CONSULTATION BOOKED</span>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: '#EEECE0', fontWeight: 300, marginBottom: 10 }}>
                You're all set!
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#8B7D6B', lineHeight: 1.8 }}>
                Our design consultant will reach out within 24 hours to schedule your free session.<br /><br />
                Check your email for a confirmation.
              </p>
              <button className="cm-submit" onClick={doClose} style={{ ...submitBtn, marginTop: 24 }}>Done →</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// ─── Main Contact Page ────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '',
    service: '', budget: '', timeline: '',
    message: '', area: '',
  })
  const [formErrors, setFormErrors] = useState({})
  const [submitted, setSubmitted]   = useState(false)
  const [focused, setFocused]       = useState('')
  const [showModal, setShowModal]   = useState(false)
  useScrollAnimations()

  // ── Validation for the main contact form ──
  const handleNameChange = (e) => {
    const val = e.target.value.replace(/[^a-zA-Z\s]/g, '')
    setForm({ ...form, name: val })
    if (val) setFormErrors(p => ({ ...p, name: false }))
  }

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10)
    setForm({ ...form, phone: val })
    if (val.length === 10) setFormErrors(p => ({ ...p, phone: false }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setFormErrors(p => ({ ...p, [name]: false }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = {}
    if (!form.name.trim()) errors.name = true
    if (form.phone.length !== 10) errors.phone = true
    if (!form.email.trim()) errors.email = true
    if (Object.keys(errors).length) { setFormErrors(errors); return }
    setSubmitted(true)
  }

  const iStyle = (name) => ({
    width: '100%', padding: '14px 18px', boxSizing: 'border-box',
    background: focused === name ? 'rgba(201,168,76,0.05)' : 'rgba(238,236,224,0.5)',
    border: `1px solid ${formErrors[name] ? 'rgba(224,92,92,0.6)' : focused === name ? '#C9A84C' : 'rgba(44,36,22,0.2)'}`,
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

  const errMsg = { fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.6rem', color: 'rgba(224,92,92,0.9)', marginTop: 4 }

  return (
    <div style={{ background: 'linear-gradient(180deg, #B8B2AA 0%, #CCB9B5 20%, #E7DECF 50%, #EEECE0 100%)' }}>

      {/* ── HERO ── */}
      <section style={{ height: '90vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1600&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          animation: 'heroZoom 14s ease-out forwards',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,20,16,0.92) 0%, rgba(26,20,16,0.55) 65%, rgba(26,20,16,0.15) 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #C9A84C, #E8C96A, #C9A84C, transparent)' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto', padding: '13px 6vw 0', width: '100%' }}>
          <div style={{ animation: 'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both' }}>
            <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.58rem', letterSpacing: '0.35em', color: '#E8C96A', textTransform: 'uppercase', marginBottom: '20px' }}>
              ✦ Begin Your Journey
            </p>
          </div>
          <div style={{ animation: 'revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s both' }}>
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.2rem, 6vw, 5.8rem)', fontWeight: 300, color: '#EEECE0', lineHeight: 0.92, letterSpacing: '-0.025em', marginBottom: 0 }}>Let's create</h1>
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.2rem, 6vw, 5.8rem)', fontWeight: 300, fontStyle: 'italic', color: '#C9A84C', lineHeight: 0.92, letterSpacing: '-0.025em', marginBottom: 0 }}>something</h1>
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.2rem, 6vw, 5.8rem)', fontWeight: 300, color: '#EEECE0', lineHeight: 0.92, letterSpacing: '-0.025em', marginBottom: '36px' }}>extraordinary.</h1>
          </div>
          <div style={{ animation: 'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.65s both' }}>
            <div style={{ width: 72, height: '2px', background: 'linear-gradient(90deg, #C9A84C, transparent)', marginBottom: '22px' }} />
            <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: 'clamp(0.68rem, 1vw, 0.78rem)', color: 'rgba(238,236,224,0.68)', maxWidth: '420px', lineHeight: 1.95, fontWeight: 300, letterSpacing: '0.04em' }}>
              Book a free consultation and let our experts understand your vision. Your perfect space is one conversation away.
            </p>
          </div>
        </div>

        <style>{`
          @keyframes heroZoom { 0% { transform: scale(1.1); } 100% { transform: scale(1.02); } }
          @keyframes revealUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </section>

      {/* Torn edge */}
      <div style={{ background: '#EEECE0' }}><TornEdgeTop fillColor="rgba(26,20,16,0.85)" /></div>

      {/* ── CONTACT + FORM ── */}
      <section style={{ background: '#EEECE0', padding: '50px 6vw' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '80px', alignItems: 'start' }} className="contact-grid">

          {/* LEFT: Info */}
          <SlideIn direction="left">
            <div>
              <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.99rem', letterSpacing: '0.2em', color: '#d39d07', textTransform: 'uppercase', marginBottom: '14px', fontWeight: 900 }}>Contact Us</p>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 500, color: '#2C2416', lineHeight: 1.1, marginBottom: '20px' }}>
                Get in <em style={{ fontStyle: 'italic', color: '#985410' }}>Touch</em>
              </h2>
              <div style={{ width: 350, height: '2px', background: 'linear-gradient(90deg, #C9A84C, transparent)', marginBottom: '40px' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '44px' }}>
                {[
                  { icon: '◎', label: 'Studio', lines: ['42, Design Quarter', 'Bandra West, Mumbai — 400050'] },
                  { icon: '◇', label: 'Phone', lines: ['+91 98765 43210', '+91 98765 43211'] },
                  { icon: '◈', label: 'Email', lines: ['hello@moodycraft.in', 'projects@moodycraft.in'] },
                  { icon: '✦', label: 'Hours', lines: ['Mon – Sat: 10:00 AM – 7:00 PM', 'Sun: By appointment only'] },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, flexShrink: 0, border: '1px solid rgba(201, 168, 76, 0.63)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', color: '#C9A84C' }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.67rem', letterSpacing: '0.28em', color: '#bc9730', textTransform: 'uppercase', marginBottom: '5px', fontWeight: 1000 }}>{item.label}</p>
                      {item.lines.map((l, i) => (
                        <p key={i} style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: 'clamp(0.82rem, 1.1vw, 0.8rem)', color: '#5b4128', fontWeight: 400, lineHeight: 1.8 }}>{l}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <p style={labelStyle}>Follow Our Journey</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
                {[
                  { name: 'Instagram', icon: 'IG', url: 'https://instagram.com' },
                  { name: 'Pinterest',  icon: 'PT', url: 'https://pinterest.com' },
                  { name: 'Facebook',   icon: 'FB', url: 'https://facebook.com' },
                  { name: 'YouTube',    icon: 'YT', url: 'https://youtube.com' },
                ].map(s => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}
                    style={{ width: 44, height: 44, border: '1px solid rgba(72, 54, 24, 0.36)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.72rem', letterSpacing: '0.1em', color: '#5A4A3A', fontWeight: 600, textDecoration: 'none', transition: 'all 0.3s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.background = 'rgba(201,168,76,0.06)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(44,36,22,0.2)'; e.currentTarget.style.color = '#5A4A3A'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >{s.icon}</a>
                ))}
              </div>
            </div>
          </SlideIn>

          {/* RIGHT: Form */}
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
                  onClick={() => { setSubmitted(false); setForm({ name:'',email:'',phone:'',city:'',service:'',budget:'',timeline:'',message:'',area:'' }); setFormErrors({}) }}
                  style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', background: 'transparent', color: '#5A4A3A', border: '1px solid rgba(44,36,22,0.25)', padding: '12px 28px', cursor: 'pointer', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#C9A84C' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(44,36,22,0.25)'; e.currentTarget.style.color = '#5A4A3A' }}
                >Submit Another</button>
              </div>
            ) : (
              <div style={{ border: '1px solid rgba(201,168,76,0.18)', padding: '56px 48px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
                <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.55rem', letterSpacing: '0.3em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '10px' }}>Book Consultation</p>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 400, color: '#2C2416', marginBottom: '36px' }}>
                  Tell Us About Your <em style={{ fontStyle: 'italic', color: '#c28d58', fontWeight: 700 }}>Project</em>
                </h3>

                <form onSubmit={handleSubmit}>
                  {/* Name + Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="form-row">
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input type="text" name="name" value={form.name}
                        onChange={handleNameChange}
                        onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                        placeholder="Aryan Mehta" required style={iStyle('name')} />
                      {formErrors.name && <p style={errMsg}>Name is required (letters only)</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address *</label>
                      <input type="email" name="email" value={form.email}
                        onChange={handleChange}
                        onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                        placeholder="aryan@example.com" required style={iStyle('email')} />
                      {formErrors.email && <p style={errMsg}>Email is required</p>}
                    </div>
                  </div>

                  {/* Phone + City */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="form-row">
                    <div>
                      <label style={labelStyle}>Phone Number * (10 digits)</label>
                      <input type="tel" name="phone" value={form.phone}
                        onChange={handlePhoneChange}
                        onFocus={() => setFocused('phone')} onBlur={() => setFocused('')}
                        placeholder="9876543210"
                        maxLength={10}
                        inputMode="numeric"
                        style={iStyle('phone')} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                        {formErrors.phone && <p style={errMsg}>Enter a valid 10-digit number</p>}
                        <p style={{ fontSize: '0.6rem', color: form.phone.length === 10 ? '#C9A84C' : '#B8B2AA', marginLeft: 'auto', fontFamily: '"Josefin Sans", sans-serif' }}>
                          {form.phone.length}/10
                        </p>
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>City</label>
                      <input type="text" name="city" value={form.city}
                        onChange={handleChange}
                        onFocus={() => setFocused('city')} onBlur={() => setFocused('')}
                        placeholder="Mumbai" style={iStyle('city')} />
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
                        }}>{s}</button>
                      ))}
                    </div>
                  </div>

                  {/* Budget + Timeline */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="form-row">
                    <div>
                      <label style={labelStyle}>Budget Range</label>
                      <select name="budget" value={form.budget} onChange={handleChange} onFocus={() => setFocused('budget')} onBlur={() => setFocused('')} style={{ ...iStyle('budget'), cursor: 'pointer' }}>
                        <option value="">Select budget</option>
                        {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Timeline</label>
                      <select name="timeline" value={form.timeline} onChange={handleChange} onFocus={() => setFocused('timeline')} onBlur={() => setFocused('')} style={{ ...iStyle('timeline'), cursor: 'pointer' }}>
                        <option value="">Select timeline</option>
                        {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Area */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Space Area (approx.)</label>
                    <input type="text" name="area" value={form.area} onChange={handleChange} onFocus={() => setFocused('area')} onBlur={() => setFocused('')} placeholder="e.g., 1500 sq ft" style={iStyle('area')} />
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: '32px' }}>
                    <label style={labelStyle}>Your Vision</label>
                    <textarea name="message" value={form.message} onChange={handleChange} onFocus={() => setFocused('message')} onBlur={() => setFocused('')} placeholder="Tell us about your dream space, preferred style, or any specific requirements..." rows={4} style={{ ...iStyle('message'), resize: 'none', lineHeight: 1.85 }} />
                  </div>

                  {/* Submit — opens Login Modal */}
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    style={{
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
            .form-row { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* Map */}
      <MapSection />

      {/* FAQ */}
      <section style={{ background: '#F2EDE4', padding: '100px 6vw' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <SlideIn direction="up">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '56px', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.55rem', letterSpacing: '0.35em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '12px' }}>Have Questions?</p>
                <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, color: '#2C2416', lineHeight: 1.05 }}>
                  Common <em style={{ fontStyle: 'italic', color: '#8a6a3a' }}>Queries</em>
                </h2>
              </div>
              <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.62rem', color: 'rgba(90,74,58,0.55)', fontWeight: 300, letterSpacing: '0.06em', fontStyle: 'italic', alignSelf: 'flex-end', paddingBottom: '6px' }}>
                Hover to reveal answers
              </p>
            </div>
          </SlideIn>
          <SlideIn direction="up" delay={0.05}>
            <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, #C9A84C, transparent)', marginBottom: '8px' }} />
          </SlideIn>
          {FAQS.map((faq, i) => <FaqRow key={i} faq={faq} index={i} />)}
        </div>
      </section>

      {/* Final CTA strip */}
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
          >Call Us Now</a>
        </SlideIn>
      </section>

      {/* Consultation Login Modal */}
      <ConsultationLoginModal isOpen={showModal} onClose={() => setShowModal(false)} />

    </div>
  )
}