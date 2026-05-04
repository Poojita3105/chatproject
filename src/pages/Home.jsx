import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  animate as motionAnimate,
} from 'framer-motion'
import { useScrollAnimations } from '../hooks/useScrollAnimation'
import { TornEdgeTop, GoldLine } from '../components/TornEdge'

/* ─────────────────────────── constants ─────────────────────────── */

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=80',
  'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1600&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1600&q=80',
]

const STATS = [
  { num: '200+', label: 'Projects Delivered' },
  { num: '8+',   label: 'Years Experience'  },
  { num: '50+',  label: 'Design Awards'      },
  { num: '100%', label: 'Client Satisfaction'},
]

/* ── The 4 featured projects become the center "scaler" image
      plus the three surrounding layer images ── */
const CENTER_IMG =
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=90'

// Layer 1 – outer column images (left col odd, right col even)
const LAYER1 = [
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80',
  'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80',
  'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=600&q=80',
]
// Layer 2 – inner columns
const LAYER2 = [
  'https://images.unsplash.com/photo-1597534458220-9fb4969f2df5?w=600&q=80',
  'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600&q=80',
  'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80',
  'https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?w=600&q=80',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
]
// Layer 3 – center column top/bottom
const LAYER3 = [
  'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80',
  'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=600&q=80',
]

// Featured cards shown AFTER the reveal animation
const FEATURED_CARDS = [
  { id: '1', title: 'The Ivory Suite',  category: 'Residential', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80' },
  { id: '2', title: 'Velvet Commerce',  category: 'Commercial',  img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80' },
  { id: '3', title: 'The Bronze Loft',  category: 'Turnkey',     img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80' },
  { id: '4', title: 'Silk Penthouse',   category: 'Residential', img: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80' },
]

/* ─────────────── ScrollGrid component (the main animation) ─────────────── */

function ScrollGrid() {
  /* The outer wrapper needs 240vh so the sticky content has room to animate */
  const sectionRef   = useRef(null)
  const scalerImgRef = useRef(null)
  const layer1Ref    = useRef(null)
  const layer2Ref    = useRef(null)
  const layer3Ref    = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  /* ── Center image: width/height shrink from 100vw/100vh → natural ── */
  const imgW = useTransform(scrollYProgress, [0, 0.8], ['100vw', '100%'])
  const imgH = useTransform(scrollYProgress, [0, 0.8], ['100vh', '100%'])

  /* ── Layer opacity: hold 0 until 55 %, then rise to 1 ── */
 const layer1Opacity = useTransform(scrollYProgress, [0.35, 0.5, 0.7], [0, 0.6, 1])
const layer2Opacity = useTransform(scrollYProgress, [0.4, 0.55, 0.75], [0, 0.6, 1])
const layer3Opacity = useTransform(scrollYProgress, [0.45, 0.6, 0.8], [0, 0.6, 1])

  /* ── Layer scale: hold 0 until 30 %, then rise to 1 ── */
const layer1Scale = useTransform(scrollYProgress, [0.35, 0.7], [0.6, 1])
const layer2Scale = useTransform(scrollYProgress, [0.4, 0.75], [0.6, 1])
const layer3Scale = useTransform(scrollYProgress, [0.45, 0.8], [0.6, 1])

  /* Add spring smoothing */
  const springCfg = { stiffness: 80, damping: 22, restDelta: 0.001 }
  const sl1 = useSpring(layer1Scale,   springCfg)
  const sl2 = useSpring(layer2Scale,   { stiffness: 55, damping: 18 })
  const sl3 = useSpring(layer3Scale,   { stiffness: 40, damping: 15 })
  const ol1 = useSpring(layer1Opacity, springCfg)
  const ol2 = useSpring(layer2Opacity, { stiffness: 55, damping: 18 })
  const ol3 = useSpring(layer3Opacity, { stiffness: 40, damping: 15 })

  /* Section label fade out as grid appears */
  const labelOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const labelY       = useTransform(scrollYProgress, [0, 0.25], [0, -30])

  return (
    <div
      ref={sectionRef}
      style={{
        /* 240 vh gives the scroll-driven animation enough runway */
        minHeight: '150vh',
        position: 'relative',
        background: '#EEECE0',
      }}
    >
      {/* ── Floating label that fades as grid reveals ── */}
      <motion.div
        style={{
          position: 'sticky',
          top: '12vh',
          zIndex: 20,
          textAlign: 'center',
          pointerEvents: 'none',
          opacity: 1,
          y: labelY,
        }}
      >
        <p
  style={{
    fontFamily: '"Josefin Sans", sans-serif',
    fontSize: '0.7rem',
    letterSpacing: '0.45em',
    textTransform: 'uppercase',
    color: '#5A4720',   // 🔥 darker gold
    fontWeight: 500,
    marginBottom: '10px',
  }}
>
  Our Work
</p>

<h2
  style={{
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
    fontWeight: 400,
    color: '#0F0C08',   // 🔥 almost black
    lineHeight: 1.1,
  }}
>
  Featured{' '}
  <em style={{ color: '#A8842C', fontStyle: 'italic' }}>
    Projects
  </em>
</h2>
      </motion.div>

      {/* ── Sticky grid wrapper ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'top',
          
        }}
      >
        {/* 5-column × 3-row grid */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            translate: '-50% -50%',
            width: 'min(1600px, calc(100% - 4rem))',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            height: '100%',
            gap: 'clamp(6px, 6.35vw, 50px)',
          }}
        >
          {/* ── LAYER 1: outer edges ── */}
          <motion.div
            ref={layer1Ref}
            style={{
              display: 'grid',
              gridColumn: '1 / -1',
              gridRow:    '1 / -1',
              gridTemplateColumns: 'subgrid',
              gridTemplateRows:    'subgrid',
              opacity: ol1,
              scale:   sl1,
            }}
          >
            {LAYER1.map((src, i) => (
              <div
                key={i}
                style={{
                  gridColumn: i % 2 === 0 ? '1' : '-2',
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{
                    width: '100%',
                    aspectRatio: '4/5',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    display: 'block',
                  }}
                />
              </div>
            ))}
          </motion.div>

          {/* ── LAYER 2: inner columns ── */}
          <motion.div
            ref={layer2Ref}
            style={{
              display: 'grid',
              gridColumn: '1 / -1',
              gridRow:    '1 / -1',
              gridTemplateColumns: 'subgrid',
              gridTemplateRows:    'subgrid',
              opacity: ol2,
              scale:   sl2,
            }}
          >
            {LAYER2.map((src, i) => (
              <div
                key={i}
                style={{
                  gridColumn: i % 2 === 0 ? '2' : '-3',
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{
                    width: '100%',
                    aspectRatio: '4/5',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    display: 'block',
                  }}
                />
              </div>
            ))}
          </motion.div>

          {/* ── LAYER 3: center column top + bottom ── */}
          <motion.div
            ref={layer3Ref}
            style={{
              display: 'grid',
              gridColumn: '1 / -1',
              gridRow:    '1 / -1',
              gridTemplateColumns: 'subgrid',
              gridTemplateRows:    'subgrid',
              opacity: ol3,
              scale:   sl3,
            }}
          >
            <div style={{ gridColumn: '3', gridRow: '1' }}>
              <img src={LAYER3[0]} alt="" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: '12px', display: 'block' }} />
            </div>
            <div style={{ gridColumn: '3', gridRow: '-1' }}>
              <img src={LAYER3[1]} alt="" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: '12px', display: 'block' }} />
            </div>
          </motion.div>

          {/* ── CENTER scaler image ── */}
          <div
            style={{
              gridArea: '2 / 3',
              position: 'relative',
              zIndex: 2,
              width: '100%',
              height: '100%',
            }}
          >
            <motion.img
              ref={scalerImgRef}
              src={CENTER_IMG}
              alt="Featured interior"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                translate: '-50% -50%',
                objectFit: 'cover',
                borderRadius: '14px',
                width:  imgW,
                height: imgH,
                zIndex: 3,
                boxShadow: '0 30px 80px rgba(44,36,22,0.35)',
              }}
            />
            {/* Gold corner accents on center image */}
            <div style={{ position: 'absolute', top: 16, left: 16, width: 36, height: 36, borderTop: '2px solid #C9A84C', borderLeft: '2px solid #C9A84C', zIndex: 4, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 16, right: 16, width: 36, height: 36, borderBottom: '2px solid #C9A84C', borderRight: '2px solid #C9A84C', zIndex: 4, pointerEvents: 'none' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────── Featured Cards (after scroll grid) ─────────────── */

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 60 },
  show: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

function FeaturedCards() {
  return (
    <section style={{ background: '#EEECE0', padding: '60px 6vw 100px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {FEATURED_CARDS.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <Link to={`/portfolio/${project.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ cursor: 'none' }}
                >
                  {/* Arch card — same as Portfolio page */}
                  <div
                    style={{
                      borderRadius: '120px 120px 12px 12px',
                      overflow: 'hidden',
                      border: '2px solid #C9A84C',
                      boxShadow: '0 0 0 1px rgba(201,168,76,0.2), 0 10px 40px rgba(44,36,22,0.12)',
                      position: 'relative',
                    }}
                  >
                    {/* Inner ring */}
                    <div style={{
                      position: 'absolute', inset: '4px',
                      borderRadius: '117px 117px 9px 9px',
                      border: '1px solid rgba(232,201,106,0.35)',
                      zIndex: 5, pointerEvents: 'none',
                    }} />
                    {/* Image */}
                    <div style={{ height: '360px', overflow: 'hidden' }}>
                      <motion.img
                        src={project.img}
                        alt={project.title}
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    {/* Card info */}
                    <div style={{ background: '#2C2416', padding: '20px', textAlign: 'center' }}>
                      <p style={{
                        fontFamily: '"Josefin Sans", sans-serif',
                        fontSize: '0.6rem', letterSpacing: '0.3em',
                        color: '#C9A84C', textTransform: 'uppercase',
                        fontWeight: 400, marginBottom: '8px',
                      }}>
                        {project.category}
                      </p>
                      <h3 style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: '1.4rem', fontWeight: 400,
                        color: '#E7DECF', marginBottom: '16px',
                        letterSpacing: '0.03em',
                      }}>
                        {project.title}
                      </h3>
                      <button
                        style={{
                          width: '100%', fontSize: '0.6rem', padding: '10px',
                          fontFamily: '"Josefin Sans", sans-serif',
                          letterSpacing: '0.2em', textTransform: 'uppercase',
                          background: 'transparent',
                          border: '1px solid rgba(201,168,76,0.5)',
                          color: '#C9A84C', cursor: 'none',
                          transition: 'all 0.3s ease', fontWeight: 300,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#C9A84C'
                          e.currentTarget.style.color = '#2C2416'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.color = '#C9A84C'
                        }}
                      >
                        View Project
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          style={{ marginTop: '60px' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/portfolio">
            <button
              className="btn-gold"
              style={{ padding: '16px 52px', fontSize: '0.72rem', letterSpacing: '0.25em' }}
            >
              <span>View All Projects</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────── Trust Slider ─────────────── */

const TRUST_ITEMS = [
  {
      img: 'https://img.magnific.com/premium-vector/black-gold-vector-modern-luxury-certificate-corporate-template-design-appreciation-achievement-awards-education-competition-diploma-template_249611-29626.jpg?semt=ais_hybrid',
      title: '🏡Certified Services',
      desc: 'This certificate is presented to MoodyCraft for successfully completing the Interior Design course and demonstrating proficiency in design concepts, creativity, and space planning.',
    },
    {
      img: 'https://www.unioncameremarche.it/wp-content/uploads/2018/12/architetto-on-line.jpeg?w=400',
      title: '📐Expert Design & Execution',
      desc: 'From concept to completion, we handle everything with precision and high-quality standards.',
    },
    {
      img: 'https://i.pinimg.com/1200x/84/9e/bf/849ebff7ecbb629d4a2a6503637f55ca.jpg?w=800',
      title: '🛠️Quality Materials Only',
      desc: 'We use durable, premium materials that ensure long-lasting interiors.',
    },
    {
      img: 'https://i.pinimg.com/1200x/ae/2a/b0/ae2ab07be19159e40f9c8f57a02e7212.jpg?w=800',
      title: '🔑Trusted & Verified Team',
      desc: 'Our designers and workers are background-verified professionals you can rely on.',
    },
     {
      img: 'https://i.pinimg.com/736x/15/b7/9b/15b79b8c0b1d3d1afe6288b63bc8ee56.jpg?w=800',
      title: '⏱️ On-Time Delivery',
      desc: 'We respect your time and ensure projects are completed within the promised schedule.',
    },
  ]

function TrustSlider() {
  const trackRef = useRef(null)

  return (
    <div style={{ overflow: 'hidden', marginTop: '40px', paddingBottom: '12px' }}>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '24px',
          overflowX: 'auto',
          paddingBottom: '8px',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'thin',
          scrollbarColor: '#C9A84C #EEECE0',
        }}
      >
        {TRUST_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              minWidth: '300px',
              height: '360px',
              position: 'relative',
              borderRadius: '14px',
              overflow: 'hidden',
              flex: '0 0 auto',
              cursor: 'none',
              border: '1px solid rgba(201,168,76,0.25)',
              boxShadow: '0 8px 32px rgba(44,36,22,0.12)',
            }}
          >
            <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(26,20,16,0.88) 0%, rgba(26,20,16,0.2) 55%, transparent 100%)',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              padding: '24px',
            }}>
              <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.25rem', color: '#E7DECF', marginBottom: '8px', letterSpacing: '0.02em' }}>
                {item.title}
              </h3>
              <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.76rem', color: 'rgba(238,236,224,0.75)', lineHeight: 1.7, fontWeight: 300 }}>
                {item.desc}
              </p>
            </div>
            {/* Gold top accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════ MAIN HOME EXPORT ═══════════════════════ */

export default function Home() {
  const [heroIdx,  setHeroIdx]  = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  useScrollAnimations()

  /* Hero slideshow */
  useEffect(() => {
    const t = setInterval(() => setHeroIdx((p) => (p + 1) % HERO_IMAGES.length), 5000)
    return () => clearInterval(t)
  }, [])

  /* 3-D parallax on mouse */
  useEffect(() => {
    const onMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth  - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div style={{ background: 'linear-gradient(180deg, #A7B2AA 0%, #E7DECF 30%, #EEECE0 60%, #CCB9B5 80%, #B8B2AA 100%)' }}>

      {/* ══════════════════ HERO ══════════════════ */}
     <section ref={heroRef} style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>

  {/* ✅ ADD HERE */}

{/*<video
  autoPlay
  loop
  muted
  playsInline
  style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100vw',
    height: '56.25vw',
    minHeight: '100vh',
    minWidth: '177.77vh',
    transform: 'translate(-50%, -50%)',
    objectFit: 'cover',
    zIndex: 0,
    filter: 'brightness(0.6)'
  }}
>
  <source src="/videos/bg.mp4" type="video/mp4" />
</video>*/}




  <iframe
  src="https://www.youtube.com/embed/NoWyNgAQe34?autoplay=1&mute=1&controls=0&loop=1&playlist=NoWyNgAQe34&modestbranding=1&playsinline=1"
  title="Background Video"
  frameBorder="0"
  allow="autoplay; fullscreen"
  style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100vw',
    height: '56.25vw',   // 16:9 ratio
    minHeight: '100vh',
    minWidth: '177.77vh',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    zIndex: 0,
  }}
/>

  {/* ✅ KEEP THESE */}
  <div className="video-overlay" />
  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,20,16,0.65) 0%, rgba(44,36,22,0.3) 50%, transparent 100%)' }} />

  {/* rest of your code stays SAME */}

        <div className="video-overlay" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,20,16,0.65) 0%, rgba(44,36,22,0.3) 50%, transparent 100%)' }} />

        {/* Orbs */}
        <div className="orb" style={{ width: 500, height: 500, background: '#A7B2AA', top: '-10%', right: '-5%', opacity: 0.15 }} />
        <div className="orb" style={{ width: 300, height: 300, background: '#CCB9B5', bottom: '20%', left: '5%', opacity: 0.15, animationDelay: '3s' }} />

        {/* Hero text */}
        <div
          className="relative z-10 flex flex-col justify-end h-full"
          style={{
            padding: '0 6vw 2vh',
            transform: `perspective(1200px) rotateX(${mousePos.y * 0.02}deg) rotateY(${mousePos.x * 0.02}deg)`,
            transition: 'transform 0.1s ease',
          }}
        >
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1, ease: [0.16,1,0.3,1] }}>
            <p className="section-label mb-4" style={{ color: '#E8C96A', }}>Welcome to MoodyCraft Interior</p>
          </motion.div>

          <motion.h1
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.16,1,0.3,1] }}
            style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', fontWeight: 300, color: '#EEECE0', lineHeight: 1.0, maxWidth: '800px' }}
          >
            Design
            <br />
            <em style={{ color: '#E8C96A', fontStyle: 'italic', fontWeight: 400 }}>moods,</em>
            <br />
            not spaces.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.16,1,0.3,1] }}
            style={{
              fontFamily: '"Josefin Sans", sans-serif',
              fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
              color: 'rgba(238,236,224,0.75)',
              maxWidth: 480, lineHeight: 1.9,
              fontWeight: 300, letterSpacing: '0.05em',
              marginTop: '2rem', marginBottom: '3rem',
            }}
          >
            Transforming spaces into immersive, emotion-driven experiences. Every detail crafted for your lifestyle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.16,1,0.3,1] }}
            style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}
          >
            <Link to="/portfolio"><button className="btn-gold"><span>Explore Portfolio</span></button></Link>
            <Link to="/contact"><button className="btn-outline" style={{ color: '#E7DECF', borderColor: 'rgba(238,236,224,0.5)' }}>Book Consultation</button></Link>
          </motion.div>
        </div>

        {/* Slide dots */}
        <div style={{ position: 'absolute', bottom: '40px', left: '6vw', display: 'flex', gap: '12px', zIndex: 10 }}>
          {HERO_IMAGES.map((_, i) => (
            <button key={i} onClick={() => setHeroIdx(i)} style={{
              width: i === heroIdx ? 40 : 12, height: 3,
              background: i === heroIdx ? '#C9A84C' : 'rgba(238,236,224,0.4)',
              border: 'none', cursor: 'none', transition: 'all 0.4s ease', borderRadius: '2px',
            }} />
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', right: '6vw', bottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            style={{ width: 1, height: '60px', background: 'linear-gradient(to bottom, transparent, #C9A84C)' }} />
          <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(238,236,224,0.6)', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>Scroll</p>
        </div>
      </section>

      {/* Torn edge */}
      <div style={{ background: '#2C2416', marginTop: '-4px' }}>
        <TornEdgeTop fillColor="#A7B2AA" />
      </div>

      {/* ══════════════════ ABOUT STRIP ══════════════════ */}
      <section style={{ background: '#2C2416', padding: '25px 3vw' }}>
        <GoldLine />
        <div style={{ height: 70 }} />
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-20 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
          >
            <p className="section-label mb-4">Our Philosophy</p>
            <h2 className="section-title" style={{ color: '#E7DECF' }}>
              Where art meets<br />
              <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>architecture</em>
            </h2>
            <div style={{ width: 80, height: 1, background: 'linear-gradient(90deg, #C9A84C, transparent)', margin: '28px 0' }} />
            <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.86rem', color: '#B8B2AA', lineHeight: 2, fontWeight: 300 }}>
              MoodyCraft Interior is a modern design studio that transforms spaces into immersive, emotion-driven experiences. We blend contemporary aesthetics with functional design to create interiors that feel personal, elegant, and timeless.
            </p>
            <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.86rem', color: '#B8B2AA', lineHeight: 2, fontWeight: 300, marginTop: '14px' }}>
              At MoodyCraft, design is not just about structure — it's about mood, texture, and storytelling. Every space is thoughtfully crafted with a balance of clean layouts, earthy tones, and expressive elements.
            </p>
            <Link to="/about">
              <button className="btn-outline" style={{ marginTop: '36px' }}>Discover Our Story</button>
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
          >
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80" alt="Studio" style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', top: 20, left: 20, width: 60, height: 60, borderTop: '2px solid #C9A84C', borderLeft: '2px solid #C9A84C' }} />
              <div style={{ position: 'absolute', bottom: 20, right: 20, width: 60, height: 60, borderBottom: '2px solid #C9A84C', borderRight: '2px solid #C9A84C' }} />
              <div style={{ position: 'absolute', bottom: 40, left: 40, background: 'rgba(44,36,22,0.85)', backdropFilter: 'blur(10px)', padding: '16px 24px', borderLeft: '2px solid #C9A84C' }}>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', color: '#E7DECF', fontStyle: 'italic' }}>Since 2016</p>
                <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase' }}>Crafting Excellence</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div style={{ height: 70 }} />
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16,1,0.3,1] }}
            >
              <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: '#C9A84C', lineHeight: 1 }}>{stat.num}</div>
              <div style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.65rem', letterSpacing: '0.25em', color: '#B8B2AA', textTransform: 'uppercase', marginTop: '8px', fontWeight: 300 }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
        <div style={{ height: 50 }} />
        <GoldLine />
      </section>

      {/* Torn edge */}
      <div style={{ background: '#EEECE0', marginTop: '-4px' }}>
        <TornEdgeTop fillColor="#2C2416" />
      </div>

      {/* ══════════════════ WHY CHOOSE US ══════════════════ */}
      <section style={{ background: '#EEECE0', padding: '40px 6vw 50px' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            style={{ marginBottom: '50px' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
          >
            <p className="section-label mb-4">Why Choose Us</p>
            <h2 className="section-title" style={{ color: '#2C2416' }}>
              Reasons you can<br />
              <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>trust us with your keys</em>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10" style={{ marginBottom: '40px' }}>
            {[
              { title: 'End-to-End Execution',  desc: 'From concept to completion, we handle everything with precision and care.' },
              { title: 'Transparent Process',    desc: 'Clear pricing, honest timelines, and absolutely no hidden surprises.' },
              { title: 'Personalized Design',    desc: 'Every space reflects your lifestyle and personality, never a template.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16,1,0.3,1] }}
              >
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.6rem', color: '#2C2416', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.8rem', color: '#5A4A3A', lineHeight: 1.85, fontWeight: 300 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <TrustSlider />
        </div>
      </section>

      {/* ══════════════ SCROLL GRID REVEAL — FEATURED PROJECTS ══════════════ */}
      <ScrollGrid />

      

      {/* Torn divider */}
      <div style={{ background: '#CCB9B5' }}>
        <TornEdgeTop fillColor="#EEECE0" />
      </div>

      {/* ══════════════════ SERVICES PREVIEW ══════════════════ */}
      <section style={{ background: '#CCB9B5', padding: '20px 4vw' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            style={{ marginBottom: '60px' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
          >
            <p className="section-label mb-4">What We Do</p>
            <h2 className="section-title" style={{ color: '#2C2416' }}>
              Our <em style={{ fontStyle: 'italic', color: '#2C2416' }}>Services</em>
            </h2>
          </motion.div>
<div className="grid grid-cols-4 gap-16">
              {[
              { icon: '🏠', title: 'Residential',     desc: 'Luxurious homes crafted to reflect your personal narrative' },
              { icon: '🏢', title: 'Commercial',      desc: 'Smart, impactful spaces that elevate your brand identity'   },
              { icon: '🔑', title: 'Turnkey',         desc: 'Complete end-to-end interior solutions, worry-free'         },
              { icon: '🎨', title: '3D Visualization', desc: 'Photorealistic renders before a single nail is hammered'   },
            ].map((service, i) => (
             <motion.div
  key={service.title}
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: i * 0.12 }}

  whileHover={{
    y: -10,
    borderColor: '#C9A84C',
    boxShadow: '0 20px 50px rgba(229, 186, 66, 0.29)',
  }}

  style={{
    background: 'rgba(60, 20, 5, 0.6)',
    border: '1px solid rgba(201,168,76,0.2)',
    padding: '30px',
    position: 'relative',
    overflow: 'hidden',

    // ⭐ KEY PART
    aspectRatio: '1 / 1',
    width: '100%',
alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }}
>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
                <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{service.icon}</div>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.6rem', fontWeight: 400, color: '#d4a822', marginBottom: '12px' }}>{service.title}</h3>
                <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.78rem', color: '#f1eeeb', lineHeight: 1.8, fontWeight: 300 }}>{service.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center" style={{ marginTop: '56px' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <Link to="/services"><button className="btn-gold"><span>All Services</span></button></Link>
          </motion.div>
        </div>
      </section>

      {/* Torn divider */}
      <div style={{ background: '#2C2416' }}>
        <TornEdgeTop fillColor="#CCB9B5" />
      </div>

      
      {/* ══════════════════ CTA ══════════════════ */}
      <section style={{ background: 'linear-gradient(135deg, #2C2416 0%, #1a1410 50%, #2C2416 100%)', padding: '70px 6vw', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 600, height: 600, background: '#C9A84C', top: '-30%', left: '50%', transform: 'translateX(-50%)', opacity: 0.08 }} />
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <p className="section-label mb-4" style={{ color: '#C9A84C' }}>Ready to Transform?</p>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, color: '#E7DECF', lineHeight: 1.1, marginBottom: '24px' }}>
            Let's craft your{' '}
            <em className="gold-shimmer" style={{ fontStyle: 'italic' }}>dream space</em>
            <br />together.
          </h2>
          <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.88rem', color: '#B8B2AA', maxWidth: 480, margin: '0 auto 48px', lineHeight: 1.9, fontWeight: 300 }}>
            Book a free consultation and let our experts understand your vision. Your perfect space is one conversation away.
          </p>
          <Link to="/contact">
            <button className="btn-gold" style={{ padding: '18px 56px', fontSize: '0.75rem', letterSpacing: '0.3em' }}>
              <span>Start Your Journey</span>
            </button>
          </Link>
        </motion.div>
      </section>

    </div>
  )
}