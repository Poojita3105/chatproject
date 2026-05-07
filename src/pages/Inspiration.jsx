import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useScrollAnimations } from '../hooks/useScrollAnimation'
import { TornEdgeTop } from '../components/TornEdge'

// ─── DATA ────────────────────────────────────────────────────────

const STYLE_CATEGORIES = [
  {
    id: 'modern',
    name: 'Modern Minimalist',
    desc: 'Clean lines, uncluttered spaces, purposeful restraint. Where silence becomes luxury.',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    accent: '#C9A84C',
    count: '24 Projects',
  },
  {
    id: 'luxury',
    name: 'Luxury Contemporary',
    desc: 'Rich materials, statement pieces, and effortless grandeur redefined for modern lives.',
    img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80',
    accent: '#B8860B',
    count: '31 Projects',
  },
  {
    id: 'indian',
    name: 'Contemporary Indian',
    desc: 'The warmth of Indian craftsmanship fused with global sensibility. Heritage reimagined.',
    img: 'https://i.pinimg.com/736x/80/4f/27/804f2762422c1dfcf7b208b96dd43420.jpg?w=800&q=80',
    accent: '#C9A84C',
    count: '18 Projects',
  },
  {
    id: 'boho',
    name: 'Warm Earthy Boho',
    desc: 'Textured layers, organic forms, and soulful imperfection. A home that truly breathes.',
    img: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80',
    accent: '#A07060',
    count: '15 Projects',
  },
  {
    id: 'scandi',
    name: 'Scandinavian Calm',
    desc: 'Hygge-inspired softness. Light, function, and the poetry of everyday objects.',
    img: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80',
    accent: '#C9A84C',
    count: '12 Projects',
  },
  {
    id: 'industrial',
    name: 'Industrial Loft',
    desc: 'Exposed structure, raw materiality, and a confident urban edge that commands attention.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    accent: '#8a8078',
    count: '9 Projects',
  },
]

const ROOM_TABS = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Dining', 'Home Office']



const BEFORE_AFTER = [
  {
    label: 'Living Room',
    location: 'Mysuru, Karnataka',
    style: 'Warm Contemporary',
    story: 'A dim, cluttered 3BHK living room transformed into an open, luminous sanctuary with custom joinery and a thoughtful furniture layout that doubled the feel of space.',
    after: 'https://i.pinimg.com/1200x/5a/29/96/5a2996c92756c9f11e8ab5380cfd2515.jpg?w=700&q=80',
    before: 'https://i.pinimg.com/736x/5b/c3/c1/5bc3c1dc3f9d14c6f5ee1153c395ee3e.jpg?w=700&q=80',
  },
  {
    label: 'Master Bedroom',
    location: 'Bengaluru, Karnataka',
    style: 'Luxury Minimal',
    story: 'A basic builder-grade bedroom with no character turned into a hotel-style suite with layered lighting, bespoke headboard, and a custom walk-in wardrobe.',
    after: 'https://i.pinimg.com/736x/83/8a/bc/838abc28acd97388cd13a6effab77059.jpg?w=700&q=80',
    before: 'https://i.pinimg.com/736x/35/b0/79/35b079c70d7acd1c3acc2238c939ba80.jpg?w=700&q=80',
  },
  {
    label: 'Modular Kitchen',
    location: 'Chennai, Tamil Nadu',
    style: 'Modern Modular',
    story: 'An outdated 1990s kitchen completely gutted and rebuilt — new layout, marble countertops, warm pendant lighting for a family that loves to cook together.',
    after: 'https://i.pinimg.com/736x/d8/fd/e7/d8fde767bc0870d3da26cf00a74a1edb.jpg?w=700&q=80',
    before: 'https://i.pinimg.com/1200x/df/e4/55/dfe4558fc7987b8e3290e26cc1dacf5a.jpg?w=700&q=80',
  },
]

const MATERIAL_COMBOS = [
  {
    name: 'Marble + Brass + Oak',
    mood: 'Timeless Luxury',
    desc: 'The trinity of premium interiors. Each material elevates the others — cold stone warmed by natural wood, unified by the gleam of polished brass.',
    swatches: ['#E8E4DC', '#C9A84C', '#8B6914', '#D2B48C', '#F5F0E8'],
    img: 'https://i.pinimg.com/1200x/79/84/a4/7984a4bb2f0dc23848174e620e8474a7.jpg?w=600&q=80',
  },
  {
    name: 'Velvet + Dark Walls + Gold',
    mood: 'Dramatic Opulence',
    desc: 'Deep jewel-toned velvets against moody painted walls, accented with antique gold fixtures. Theatrical but never garish.',
    swatches: ['#2C2416', '#4A3728', '#8B7355', '#C9A84C', '#E8C96A'],
    img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80',
  },
  {
    name: 'Concrete + Black Steel + Linen',
    mood: 'Urban Sophistication',
    desc: 'Raw industrial materials softened by natural linen and organic forms. The balance between hard and soft is everything.',
    swatches: ['#C5BEB5', '#8A8078', '#3A3530', '#1A1410', '#E7DECF'],
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  },
  {
    name: 'Terracotta + Rattan + White',
    mood: 'Earthy & Soulful',
    desc: 'Sun-baked earth tones with handwoven textures. This combination feels ancient, warm, and deeply human.',
    swatches: ['#E2A07A', '#C5773A', '#A07060', '#D4C4A8', '#F5EFE6'],
    img: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80',
  },
]

const LIGHTING_MOODS = [
  {
    name: 'Warm Ambient',
    desc: 'Soft 2700K light that wraps a room in golden warmth. Perfect for living rooms and bedrooms — makes every space feel like golden hour.',
    img: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80',
    tag: '2700K • Warm',
  },
  {
    name: 'Luxury Pendant',
    desc: 'A statement chandelier or sculptural pendant is the jewellery of a room. It draws the eye, anchors the space, and announces the design intent.',
    img: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=600&q=80',
    tag: 'Statement Piece',
  },
  {
    name: 'Layered Task Light',
    desc: 'Recessed, task, and accent lighting working in harmony. No single source — instead, depth, shadow, and drama that shifts with the time of day.',
    img: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80',
    tag: 'Multi-Layer',
  },
  {
    name: 'Natural Daylight Design',
    desc: 'Spaces designed around natural light — strategic windows, mirrors, and light materials that amplify the sun\'s movement through the day.',
    img: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=600&q=80',
    tag: 'Biophilic',
  },
]

const LIFESTYLE_STORIES = [
  {
    headline: 'A Home for a Young Couple Starting Their Journey',
    sub: '2BHK · Mysuru · ₹18L Budget',
    desc: 'Newly married, maximizing every square foot. We created a layout that grows with them — flexible dining that doubles as a workspace, and a bedroom that feels like a private escape even in a compact flat.',
    img: 'https://i.pinimg.com/1200x/f7/b3/e2/f7b3e2684684b4a8cfdd0318baca934f.jpg?w=700&q=80',
    tags: ['Smart Storage', 'Flexible Layout', 'Romantic Aesthetic'],
  },
  {
    headline: 'A Peaceful Workspace for a Remote Founder',
    sub: 'Home Office + Studio · Bengaluru · ₹8L Budget',
    desc: 'Video calls demand good lighting. Deep work demands quiet. This founder\'s home office was designed for both — a focused, handsome space that communicates success without distraction.',
    img: 'https://i.pinimg.com/736x/f1/23/45/f123452787f67bb7727eb830402fea54.jpg?w=700&q=80',
    tags: ['Acoustic Design', 'Natural Light', 'Premium Furniture'],
  },
  {
    headline: 'A Luxury Villa Built for Family Gatherings',
    sub: '4BHK Villa · Chennai · ₹65L Budget',
    desc: 'Three generations live here. We designed spaces that speak to each — a grandparent\'s calm study, teen bedrooms with personality, a kitchen built for big Sunday meals, and a living room that anchors it all.',
    img: 'https://i.pinimg.com/1200x/8a/7f/bd/8a7fbd667a97609d6616f843991c2f87.jpg?w=700&q=80',
    tags: ['Multi-generational', 'Grand Scale', 'Indian Aesthetic'],
  },
]

const TRENDING = [
  { icon: '◎', title: 'Smart Home Integration', desc: 'Automated lighting, climate, and security embedded invisibly into beautiful design.' },
  { icon: '◈', title: 'Biophilic Interiors', desc: 'Living walls, natural materials, and spaces that blur the line between inside and outside.' },
  { icon: '◇', title: 'Space-Saving Furniture', desc: 'Transformable, modular pieces that make compact homes feel expansive and thoughtful.' },
  { icon: '✦', title: 'Sustainable Design', desc: 'Reclaimed materials, low-VOC finishes, and choices that are as kind to the planet as they are beautiful.' },
  { icon: '◉', title: 'Japandi Style', desc: 'The East meets North — Japanese wabi-sabi and Scandinavian hygge creating perfect calm.' },
  { icon: '△', title: 'Curved Architecture', desc: 'Arched doors, rounded shelving, organic forms — softness as a design language.' },
]

const DESIGN_TIPS = [
  { tip: 'Use mirrors strategically to double perceived space and bounce natural light.', num: '01' },
  { tip: 'Layer your lighting — always have ambient, task, and accent sources in each room.', num: '02' },
  { tip: 'A neutral base with bold textural accents is timeless. Let the material speak, not the colour.', num: '03' },
  { tip: 'Invest most in the pieces you touch daily — your bed, your sofa, your dining chair.', num: '04' },
  { tip: 'Ceiling height is free luxury. Strip false ceilings wherever structurally possible.', num: '05' },
]

const QUOTES = [
  { text: 'Design is not what it looks like — it\'s how it makes you feel.', attr: '— Aanya Mehra, Founder' },
  { text: 'Every space deserves a story worth living in.', attr: '— MoodyCraft Philosophy' },
  { text: 'We design homes that live with you, not just for you.', attr: '— MoodyCraft Design Studio' },
]

// ─── useInView Hook ──────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, inView]
}

function SlideIn({ direction = 'up', delay = 0, children, style = {} }) {
  const [ref, inView] = useInView()
  const tr = { up: 'translateY(50px)', left: 'translateX(-60px)', right: 'translateX(60px)' }
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : tr[direction],
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ─── Before/After Card ───────────────────────────────────────────
function BeforeAfterCard({ item }) {
  const [showAfter, setShowAfter] = useState(false)
  const [sliderX, setSliderX] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef(null)

  const handleMove = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    setSliderX(pct)
  }

  return (
    <SlideIn direction="up">
      <div style={{ border: '1px solid rgba(201,168,76,0.2)', overflow: 'hidden', background: '#F8F5F0' }}>
        {/* Comparison slider */}
        <div
          ref={containerRef}
          style={{ position: 'relative', height: '320px', cursor: 'ew-resize', userSelect: 'none' }}
          onMouseMove={(e) => { if (dragging) handleMove(e.clientX) }}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        >
          {/* Before */}
          <img src={item.before} alt="Before" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          {/* After clipped */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', width: `${sliderX}%` }}>
            <img src={item.after} alt="After" style={{ position: 'absolute', inset: 0, width: `${10000 / sliderX}%`, maxWidth: 'none', height: '100%', objectFit: 'cover' }} />
          </div>
          {/* Divider line */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${sliderX}%`, width: '2px', background: '#C9A84C', transform: 'translateX(-50%)' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 36, height: 36, borderRadius: '50%', background: '#C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.4)', fontSize: '0.65rem', color: '#2C2416', fontWeight: 700 }}>⟺</div>
          </div>
          {/* Labels */}
          <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(26,20,16,0.8)', padding: '4px 12px' }}>
            <span style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.52rem', letterSpacing: '0.2em', color: '#B8B2AA', textTransform: 'uppercase' }}>Before</span>
          </div>
          <div style={{ position: 'absolute', top: 14, right: 14, background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', padding: '4px 12px' }}>
            <span style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.52rem', letterSpacing: '0.2em', color: '#2C2416', textTransform: 'uppercase', fontWeight: 700 }}>After</span>
          </div>
        </div>
        {/* Info */}
        <div style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.35rem', fontWeight: 500, color: '#2C2416', marginBottom: '2px' }}>{item.label}</h3>
              <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.58rem', letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase' }}>{item.location}</p>
            </div>
            <span style={{ background: '#2C2416', padding: '4px 14px', fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.52rem', letterSpacing: '0.15em', color: '#C9A84C', textTransform: 'uppercase' }}>{item.style}</span>
          </div>
          <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.76rem', color: '#5A4A3A', lineHeight: 1.85, fontWeight: 300 }}>{item.story}</p>
        </div>
      </div>
    </SlideIn>
  )
}

// ─── Hero Slide Data ─────────────────────────────────────────────
const HERO_SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1800&q=90',
    label: 'Luxury Contemporary',
    tagline: 'Spaces That',
    taglineItalic: 'Reflect Who',
    taglineEnd: 'You Are.',
  },
  {
    img: 'https://i.pinimg.com/1200x/fc/fc/93/fcfc9338d22b86b12b0a19ff53a06370.jpg?w=1800&q=90',
    label: 'Warm Minimalist',
    tagline: 'Timeless Spaces',
    taglineItalic: 'Spaces That',
    taglineEnd: 'Inspire Life.',
  },
  {
    img: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1800&q=90',
    label: 'Earthy Boho',
    tagline: 'Home Glow',
    taglineItalic: 'Design That',
    taglineEnd: 'Feels Warm.',
  },
  {
    img: 'https://i.pinimg.com/1200x/1b/04/41/1b04414e2a29da8f5d9aa8b5ea738ea7.jpg?w=1800&q=90',
    label: 'Indian Contemporary',
    tagline: 'Every Corner',
    taglineItalic: 'Has A Story',
    taglineEnd: 'To Tell.',
  },
]

// ─── HeroCarousel Component ──────────────────────────────────────
function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef(null)

  const goTo = (idx) => {
    if (animating || idx === current) return
    setAnimating(true)
    setPrev(current)
    setCurrent(idx)
    setTimeout(() => { setPrev(null); setAnimating(false) }, 1000)
  }

  const next = () => goTo((current + 1) % HERO_SLIDES.length)
  const back = () => goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)

  // Auto-advance every 5 seconds
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => {
        const n = (c + 1) % HERO_SLIDES.length
        setPrev(c)
        setAnimating(true)
        setTimeout(() => { setPrev(null); setAnimating(false) }, 1000)
        return n
      })
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [])

  const slide = HERO_SLIDES[current]
  const prevSlide = prev !== null ? HERO_SLIDES[prev] : null

  return (
    <section style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* ── Previous slide (fading out) ── */}
      {prevSlide && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url(${prevSlide.img})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0,
          animation: 'slideOut 1s ease forwards',
        }} />
      )}

      {/* ── Current slide (fading in with zoom) ── */}
      <div
        key={current}
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          backgroundImage: `url(${slide.img})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          animation: 'slideIn 1s ease forwards, slowZoom 8s ease-out forwards',
        }}
      />

      {/* Overlays */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(26,20,16,0.25) 0%, rgba(26,20,16,0.55) 50%, rgba(26,20,16,0.88) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.05) 0%, transparent 60%)' }} />

      {/* Gold top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', zIndex: 10, background: 'linear-gradient(90deg, transparent, #C9A84C, #E8C96A, #C9A84C, transparent)' }} />

      {/* ── Progress bar ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', zIndex: 10, background: 'rgba(201,168,76,0.2)' }}>
        <div
          key={current + '-bar'}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #C9A84C, #E8C96A)',
            animation: 'progressBar 5s linear forwards',
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '0 6vw', maxWidth: '1000px' }}>

        {/* Label badge */}
        <div key={current + '-label'} style={{ animation: 'revealUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.35)',
            padding: '6px 20px', marginBottom: '28px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A84C', display: 'inline-block' }} />
            <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.55rem', letterSpacing: '0.35em', color: '#E8C96A', textTransform: 'uppercase', margin: 0 }}>
              {slide.label}
            </p>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A84C', display: 'inline-block' }} />
          </div>
        </div>

        {/* Headline */}
        <div key={current + '-h1'} style={{ animation: 'revealUp 0.85s cubic-bezier(0.16,1,0.3,1) 0.35s both' }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(3.2rem, 10vw, 9rem)', fontWeight: 300, color: '#EEECE0', lineHeight: 0.92, letterSpacing: '-0.02em', marginBottom: 0 }}>
            {slide.tagline}
          </h1>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 300, fontStyle: 'italic', color: '#C9A84C', lineHeight: 0.92, letterSpacing: '-0.02em', marginBottom: 0 }}>
            {slide.taglineItalic}
          </h1>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(3.2rem, 10vw, 9rem)', fontWeight: 300, color: '#EEECE0', lineHeight: 0.92, letterSpacing: '-0.02em', marginBottom: '32px' }}>
            {slide.taglineEnd}
          </h1>
        </div>

        {/* Divider + sub */}
        <div key={current + '-sub'} style={{ animation: 'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both' }}>
          <div style={{ width: 100, height: '1px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin: '0 auto 24px' }} />
          <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.83rem', color: 'rgba(238,236,224,0.7)', maxWidth: '480px', lineHeight: 1.9, fontWeight: 500, margin: '0 auto 36px', letterSpacing: '0.04em' }}>
            A curated gallery of design ideas, mood boards, and real transformations to help you imagine your perfect home.
          </p>
        </div>

        {/* CTAs */}
        <div key={current + '-cta'} style={{ animation: 'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s both', display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact">
            <button style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', color: '#2C2416', border: 'none', padding: '14px 32px', cursor: 'pointer', fontWeight: 700 }}>
              Start Your Project
            </button>
          </Link>
          <a href="#styles">
            <button style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', background: 'transparent', color: '#E7DECF', border: '1px solid rgba(238,236,224,0.35)', padding: '14px 32px', cursor: 'pointer', fontWeight: 300 }}>
              Explore Styles
            </button>
          </a>
        </div>
      </div>

      {/* ── Dot indicators ── */}
      <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '10px', alignItems: 'center' }}>
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: current === i ? 32 : 8,
              height: 8,
              borderRadius: '4px',
              background: current === i ? '#c9a84c34' : 'rgba(201,168,76,0.4)',
              border: 'none', cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* ── Thumbnail strip (bottom right) ── */}
      <div style={{
        position: 'absolute', bottom: 28, right: '6vw', zIndex: 10,
        display: 'flex', gap: '8px', alignItems: 'center',
      }}>
        {HERO_SLIDES.map((s, i) => (
          <div
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: current === i ? '80px' : '52px',
              height: current === i ? '54px' : '36px',
              backgroundImage: `url(${s.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer',
              border: `2px solid ${current === i ? '#C9A84C' : 'rgba(201,168,76,0.25)'}`,
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              opacity: current === i ? 1 : 0.6,
              filter: current === i ? 'none' : 'grayscale(30%)',
            }}
          />
        ))}
      </div>

      {/* ── Arrow nav ── */}
      <button
        onClick={back}
        style={{ position: 'absolute', left: '4vw', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 48, height: 48, borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', backdropFilter: 'blur(8px)' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#2C2416' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.15)'; e.currentTarget.style.color = '#C9A84C' }}
      >‹</button>
      <button
        onClick={next}
        style={{ position: 'absolute', right: '4vw', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 48, height: 48, borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', backdropFilter: 'blur(8px)' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#2C2416' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.15)'; e.currentTarget.style.color = '#C9A84C' }}
      >›</button>

     

      <style>{`
        @keyframes slideIn   { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideOut  { from { opacity: 1; } to { opacity: 0; } }
        @keyframes slowZoom  { 0% { transform: scale(1.08); } 100% { transform: scale(1.02); } }
        @keyframes progressBar { from { width: 0%; } to { width: 100%; } }
        @keyframes bounce    { 0%,100% { opacity: 0.4; transform: translateX(-50%) translateY(0); } 50% { opacity: 1; transform: translateX(-50%) translateY(8px); } }
        @keyframes revealUp  { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn    { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </section>
  )
}

// ─── Main Page ───────────────────────────────────────────────────
export default function Inspiration() {
  const [activeRoom, setActiveRoom] = useState('Living Room')
  const [lightbox, setLightbox] = useState(null)
  const [activeQuote, setActiveQuote] = useState(0)
  useScrollAnimations()

  // Auto-rotate quotes
  useEffect(() => {
    const t = setInterval(() => setActiveQuote(q => (q + 1) % QUOTES.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ background: '#F2EDE4', fontFamily: '"Josefin Sans", sans-serif' }}>

      {/* ══ HERO — AUTO-SLIDING CAROUSEL ════════════════════════ */}
      <HeroCarousel />

  

      {/* ══ STYLE CATEGORIES ══════════════════════════════════════ */}
      <section id="styles" style={{ background: '#ede3e1', padding: '40px 6vw' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <SlideIn direction="up">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '12px' }}>Browse By Style</p>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 300, color: '#2C2416', lineHeight: 1.1 }}>
                Find your <em style={{ fontStyle: 'italic', color: '#8a6a3a' }}>aesthetic</em>
              </h2>
            </div>
          </SlideIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }} className="styles-grid">
            {STYLE_CATEGORIES.map((cat, i) => (
              <StyleCard key={cat.id} cat={cat} delay={i * 0.07} i={i} />
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.styles-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

  {/* Torn divider */}
           <div style={{ background: '#c7beac' }}>
             <TornEdgeTop fillColor="#ede3e1" />
           </div>
     
      {/* ══ BEFORE & AFTER ════════════════════════════════════════ */}
      <section style={{ background: '#c7beac', padding: '30px 6vw' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <SlideIn direction="up">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
<div style={{
  display: 'inline-block',
  padding: '8px 13px',
  background: 'linear-gradient(135deg, rgba(160, 123, 21, 0.35), rgba(203, 167, 167, 0.18), rgba(173, 124, 0, 0.67))',
  border: '1px solid rgba(151, 114, 12, 0.86)',
  boxShadow: '0 0 18px rgba(201, 168, 76, 0.25)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  borderRadius: '6px',
  marginBottom: '12px'
}}>
  <p style={{
    fontSize: '0.7rem',
    letterSpacing: '0.35em',
    color: '#4f3c05',
    textTransform: 'uppercase',
    margin: 0
  }}>
    Real Transformations
  </p>
</div>              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 300, color: '#2C2416', lineHeight: 1.1 }}>
                Before & <em style={{ fontStyle: 'italic', color: '#88560a' }}>After</em>
              </h2>
              <p style={{ fontSize: '0.86rem', color: '#8a6a3a', maxWidth: '440px', margin: '14px auto 0', lineHeight: 1.9, fontWeight: 400 }}>
                Drag the slider to reveal the transformation. Real projects, real impact.
              </p>
            </div>
          </SlideIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="ba-grid">
            {BEFORE_AFTER.map((item, i) => <BeforeAfterCard key={i} item={item} />)}
          </div>
        </div>
        <style>{`@media(max-width:900px){.ba-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

       {/* Torn divider */}
           <div style={{ background: '#1a1410' }}>
             <TornEdgeTop fillColor="#c7beac" />
           </div>

      {/* ══ LIFESTYLE STORIES ═════════════════════════════════════ */}
      <section style={{ background: '#1a1410', padding: '40px 6vw', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.05) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <SlideIn direction="up">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '12px' }}>
                
                
                Client Lifestyle Stories</p>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 300, color: '#E7DECF', lineHeight: 1.1 }}>
                Homes with <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>meaning</em>
              </h2>
            </div>
          </SlideIn>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {LIFESTYLE_STORIES.map((story, i) => (
              <LifestoryCard key={i} story={story} i={i} />
            ))}
          </div>
        </div>
      </section>

 {/* Torn divider */}
           <div style={{ background: '#EEECE0' }}>
             <TornEdgeTop fillColor="#1a1410" />
           </div>

      {/* ══ MATERIAL & TEXTURE ════════════════════════════════════ */}
      <section style={{ background: '#EEECE0', padding: '40px 6vw' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <SlideIn direction="up">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '12px' }}>Materials & Textures</p>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 300, color: '#2C2416', lineHeight: 1.1 }}>
                Signature <em style={{ fontStyle: 'italic', color: '#8a6a3a' }}>combinations</em>
              </h2>
            </div>
          </SlideIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }} className="mat-grid">
            {MATERIAL_COMBOS.map((m, i) => (
              <MaterialCard key={m.name} m={m} delay={i * 0.1} i={i} />
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.mat-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

       {/* Torn divider */}
           <div style={{ background: '#CCB9B5' }}>
             <TornEdgeTop fillColor="#EEECE0" />
           </div>
      {/* ══ TRENDING IDEAS ════════════════════════════════════════ */}
      <section style={{ background: '#CCB9B5', padding: '40px 6vw' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <SlideIn direction="up">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', color: '#4a3909', textTransform: 'uppercase', marginBottom: '12px' }}>What's Trending</p>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 500, color: '#2C2416', lineHeight: 1.1 }}>
                Design ideas for <em style={{ fontStyle: 'italic', color: '#ac6b0a' }}>2025</em>
              </h2>
            </div>
          </SlideIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }} className="trend-grid">
            {TRENDING.map((t, i) => (
              <SlideIn key={t.title} direction="up" delay={i * 0.08}>
                <TrendCard t={t} />
              </SlideIn>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.trend-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

     

      {/* ══ CTA ══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '120px 6vw', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
  <iframe
    src="https://www.youtube.com/embed/32ey5Cu30Mo?autoplay=1&mute=1&loop=1&playlist=32ey5Cu30Mo&controls=0&showinfo=0&modestbranding=1&rel=0"
    title="background video"
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      pointerEvents: 'none',
      transform: 'scale(1.2)',
       filter: 'brightness(1)'
    }}
  />
</div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(44, 36, 22, 0.41) 0%, rgba(26,20,16,0.7) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <SlideIn direction="up">
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '20px' }}>Ready?</p>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 300, color: '#EEECE0', lineHeight: 1.05, marginBottom: '20px' }}>
              Turn your inspiration<br /><em style={{ fontStyle: 'italic', color: '#C9A84C' }}>into reality.</em>
            </h2>
            <div style={{ width: 80, height: '1px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin: '0 auto 32px' }} />
            <p style={{ fontSize: '0.82rem', color: 'rgba(238,236,224,0.7)', maxWidth: '460px', lineHeight: 1.9, fontWeight: 300, margin: '0 auto 44px' }}>
              Every idea on this page can be yours. Let's have a conversation and begin designing the space you've always imagined.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact"><button style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', color: '#2C2416', border: 'none', padding: '16px 36px', cursor: 'pointer', fontWeight: 700 }}>Book Free Consultation</button></Link>
              <Link to="/portfolio"><button style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', background: 'transparent', color: '#E7DECF', border: '1px solid rgba(238,236,224,0.35)', padding: '16px 36px', cursor: 'pointer', fontWeight: 300 }}>View Our Portfolio</button></Link>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(20, 26, 16, 0.97)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.3s ease' }}
          onClick={() => setLightbox(null)}
        >
          <div style={{ position: 'relative', maxWidth: '90vw' }} onClick={e => e.stopPropagation()}>
            <img src={lightbox.src?.replace('w=700', 'w=1400')} alt={lightbox.label} style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', display: 'block' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px', background: 'linear-gradient(to top, rgba(26,20,16,0.9), transparent)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', color: '#E7DECF', fontStyle: 'italic', marginBottom: '2px' }}>{lightbox.label}</p>
                <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase' }}>{lightbox.style}</p>
              </div>
              <span style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(184,178,170,0.6)', textTransform: 'uppercase' }}>MoodyCraft</span>
            </div>
            <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: -16, right: -16, width: 44, height: 44, borderRadius: '50%', background: '#C9A84C', border: 'none', color: '#2C2416', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>✕</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Sub-components ──────────────────────────────────────────────

function StyleCard({ cat, delay, i }) {
  const [hovered, setHovered] = useState(false)
  // Make first and last cards taller for asymmetry
  const tall = i === 0 || i === 3
  return (
    <SlideIn direction={i % 3 === 0 ? 'left' : i % 3 === 2 ? 'right' : 'up'} delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: 'relative', overflow: 'hidden', height: tall ? '360px' : '360px', cursor: 'pointer' }}
      >
       <div style={{
  width: '100%',
  height: '100%',   // keep full card height
  overflow: 'hidden'
}}>
  <img
    src={cat.img}
    alt={cat.name}
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }}
  />
</div>
        <div style={{ position: 'absolute', inset: 0, background: hovered ? 'linear-gradient(to top, rgba(44,36,22,0.9) 0%, rgba(44,36,22,0.2) 70%)' : 'linear-gradient(to top, rgba(44,36,22,0.75) 0%, transparent 60%)', transition: 'background 0.5s ease' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px' }}>
          <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.52rem', letterSpacing: '0.25em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '6px' }}>{cat.count}</p>
          <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.6rem', fontWeight: 400, color: '#EEECE0', marginBottom: '0', lineHeight: 1.1 }}>{cat.name}</h3>
          <div style={{ maxHeight: hovered ? '80px' : '0', overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)', marginTop: hovered ? '10px' : 0 }}>
            <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.72rem', color: 'rgba(238,236,224,0.75)', lineHeight: 1.75, fontWeight: 300 }}>{cat.desc}</p>
          </div>
        </div>
        {/* Gold top accent on hover */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${cat.accent}, transparent)`, opacity: hovered ? 1 : 0, transition: 'opacity 0.4s ease' }} />
      </div>
    </SlideIn>
  )
}

function RoomImage({ img, delay, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <SlideIn direction="up" delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        style={{ position: 'relative', overflow: 'hidden', height: '280px', cursor: 'pointer', transform: hovered ? 'scale(1.02)' : 'scale(1)', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)', boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.5)' : 'none', zIndex: hovered ? 2 : 1 }}
      >
        <img src={img.src} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: hovered ? 'brightness(0.7) saturate(1.1)' : 'brightness(0.9)', transition: 'filter 0.5s ease' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,36,22,0.85) 0%, transparent 55%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.4s ease' }} />
        <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.4s ease' }}>
          <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.52rem', letterSpacing: '0.22em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '4px' }}>{img.style}</p>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', color: '#EEECE0', fontStyle: 'italic' }}>{img.label}</p>
        </div>
        <div style={{ position: 'absolute', top: 12, right: 12, width: 24, height: 24, borderTop: '1.5px solid #C9A84C', borderRight: '1.5px solid #C9A84C', opacity: hovered ? 1 : 0, transition: 'opacity 0.4s ease' }} />
      </div>
    </SlideIn>
  )
}

function LifestoryCard({ story, i }) {
  const [hovered, setHovered] = useState(false)
  const dir = i % 2 === 0
  return (
    <SlideIn direction={dir ? 'left' : 'right'}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'grid',
          gridTemplateColumns: dir ? '1fr 1fr' : '1fr 1fr',
          ...(dir ? {} : {}),
          gap: 0,
          transition: 'transform 0.4s ease',
          transform: hovered ? 'scale(1.005)' : 'scale(1)',
        }}
        className="story-row"
      >
        {/* Image side */}
        <div style={{ order: dir ? 0 : 1, overflow: 'hidden', height: '300px' }}>
          <img src={story.img} alt={story.headline} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)', filter: hovered ? 'brightness(1.05)' : 'brightness(0.9)' }} />
        </div>
        {/* Content side */}
        <div style={{ order: dir ? 1 : 0, background: hovered ? 'rgba(201,168,76,0.07)' : 'rgba(255,255,255,0.04)', padding: '40px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid rgba(201,168,76,0.12)', transition: 'background 0.4s ease' }}>
          <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.55rem', letterSpacing: '0.25em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '14px' }}>{story.sub}</p>
          <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)', fontWeight: 400, color: '#E7DECF', lineHeight: 1.25, marginBottom: '18px' }}>{story.headline}</h3>
          <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.76rem', color: 'rgba(184,178,170,0.8)', lineHeight: 1.9, fontWeight: 300, marginBottom: '22px' }}>{story.desc}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {story.tags.map(tag => (
              <span key={tag} style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.52rem', letterSpacing: '0.15em', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.35)', padding: '4px 12px', textTransform: 'uppercase' }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </SlideIn>
  )
}

function MaterialCard({ m, delay, i }) {
  const [hovered, setHovered] = useState(false)
  const dir = i < 2 ? 'up' : 'up'
  return (
    <SlideIn direction={i % 2 === 0 ? 'left' : 'right'} delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden', border: `1px solid ${hovered ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.15)'}`, transition: 'border-color 0.4s ease, transform 0.4s ease', transform: hovered ? 'translateY(-4px)' : 'none', boxShadow: hovered ? '0 20px 60px rgba(44,36,22,0.15)' : 'none' }}
        className="mat-card"
      >
        {/* Image */}
        <div style={{ overflow: 'hidden', height: '280px' }}>
          <img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)', filter: hovered ? 'brightness(1.05) saturate(1.1)' : 'brightness(0.95)' }} />
        </div>
        {/* Content */}
        <div style={{ padding: '32px 28px', background: '#F8F5F0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Swatches */}
          <div style={{ display: 'flex', gap: 4, marginBottom: '20px' }}>
            {m.swatches.map((c, si) => (
              <div key={si} style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: '2px solid rgba(255,255,255,0.8)', boxShadow: '0 2px 6px rgba(0,0,0,0.12)', transition: 'transform 0.3s ease', transform: hovered ? 'scale(1.15)' : 'scale(1)', transitionDelay: `${si * 0.05}s` }} />
            ))}
          </div>
          <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.25rem', fontWeight: 500, color: '#2C2416', marginBottom: '4px' }}>{m.name}</h3>
          <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '14px', fontWeight: 600 }}>{m.mood}</p>
          <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.74rem', color: '#5A4A3A', lineHeight: 1.85, fontWeight: 300 }}>{m.desc}</p>
        </div>
      </div>
      <style>{`@media(max-width:600px){.mat-card{grid-template-columns:1fr!important;}}`}</style>
    </SlideIn>
  )
}

function LightingCard({ l, delay }) {
  const [hovered, setHovered] = useState(false)
  return (
    <SlideIn direction="up" delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: 'relative', overflow: 'hidden', height: '400px', cursor: 'default' }}
      >
        <img src={l.img} alt={l.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)', filter: hovered ? 'brightness(0.6)' : 'brightness(0.5) saturate(0.7)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,20,16,0.95) 0%, rgba(26,20,16,0.2) 60%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 20px' }}>
          <span style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.5rem', letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase', border: '1px solid rgba(201,168,76,0.4)', padding: '3px 10px', display: 'inline-block', marginBottom: '10px' }}>{l.tag}</span>
          <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontWeight: 400, color: '#EEECE0', marginBottom: '8px' }}>{l.name}</h3>
          <div style={{ maxHeight: hovered ? '100px' : '0', overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
            <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.7rem', color: 'rgba(238,236,224,0.72)', lineHeight: 1.8, fontWeight: 300 }}>{l.desc}</p>
          </div>
        </div>
        <div style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderTop: '1.5px solid rgba(201,168,76,0.5)', borderRight: '1.5px solid rgba(201,168,76,0.5)', opacity: hovered ? 1 : 0, transition: 'opacity 0.4s ease' }} />
      </div>
    </SlideIn>
  )
}

function TrendCard({ t }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '36px 32px',
        border: '1px solid rgba(201,168,76,0.25)',
        background: hovered ? '#1a1410' : '#120d0a',   // 🔥 DARK BASE
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-6px)' : 'none',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* top gold line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* icon */}
      <div
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '2.2rem',
          color: '#C9A84C',
          marginBottom: '16px',
        }}
      >
        {t.icon}
      </div>

      {/* title - BOLD & WHITE */}
      <h3
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '1.15rem',
          fontWeight: 600,
          color: '#EEECE0',   // 🔥 bright luxury white
          marginBottom: '12px',
          letterSpacing: '0.02em',
        }}
      >
        {t.title}
      </h3>

      {/* description - softer but still dark theme */}
      <p
        style={{
          fontFamily: '"Josefin Sans", sans-serif',
          fontSize: '0.78rem',
          color: 'rgba(238,236,224,0.75)',
          lineHeight: 1.9,
          fontWeight: 400,
        }}
      >
        {t.desc}
      </p>
    </div>
  )
}

function TipRow({ tip }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '32px',
        padding: '28px 32px',
        border: '1px solid rgba(201,168,76,0.1)',
        background: hovered ? 'rgba(201,168,76,0.05)' : 'transparent',
        transition: 'all 0.3s ease',
        cursor: 'default',
      }}
    >
      <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.5rem', fontWeight: 300, color: hovered ? '#C9A84C' : 'rgba(201,168,76,0.3)', lineHeight: 1, flexShrink: 0, transition: 'color 0.3s ease', minWidth: '50px' }}>{tip.num}</div>
      <div style={{ width: '1px', height: '40px', background: 'rgba(201,168,76,0.25)', flexShrink: 0 }} />
      <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.82rem', color: hovered ? '#E7DECF' : 'rgba(184,178,170,0.75)', lineHeight: 1.85, fontWeight: 300, transition: 'color 0.3s ease', flex: 1 }}>{tip.tip}</p>
    </div>
  )
}