import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollAnimations } from '../hooks/useScrollAnimation'
import { TornEdgeTop, GoldLine } from '../components/TornEdge'

const SERVICES = [
  {
    icon: '🏠',
    title: 'Residential Design',
    subtitle: 'Your home, your story',
    desc: 'We craft homes that breathe your personality. From sprawling villas to intimate apartments, our residential design service covers everything from spatial planning to material selection and styling. We believe your home should be an extension of who you are.',
    features: ['Concept Development', 'Space Planning', 'Material Curation', 'Furniture Design', 'Lighting Design', 'Art Curation'],
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    price: 'From ₹800/sq ft',
  },
  {
    icon: '🏢',
    title: 'Commercial Spaces',
    subtitle: 'Design that means business',
    desc: "Your workspace is your brand's physical manifestpiece. We design offices, retail spaces, restaurants, and hotels that communicate your brand story while maximizing functionality and employee wellbeing.",
    features: ['Brand Integration', 'Ergonomic Planning', 'MEP Coordination', 'Acoustic Design', 'Signage Design', 'Phased Execution'],
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    price: 'From ₹600/sq ft',
  },
  {
    icon: '🔑',
    title: 'Turnkey Solutions',
    subtitle: 'Complete. Worry-free. Yours.',
    desc: 'Hand us the keys and we hand them back transformed. Our turnkey service manages everything from design conception to final installation — civil work, electrical, plumbing, furniture, decor, and commissioning.',
    features: ['Complete Project Management', 'Civil & Structural', 'MEP Works', 'Custom Furniture', 'Decor & Styling', '1-Year Warranty'],
    img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    price: 'Custom Packages',
  },
  {
    icon: '🎨',
    title: '3D Visualization',
    subtitle: 'See it before you build it',
    desc: 'Our photorealistic 3D renders let you walk through your space before a single brick is laid. Understand scale, light, and material interactions with absolute clarity, reducing costly on-site changes.',
    features: ['Photorealistic Renders', 'Walkthrough Videos', 'VR Experience', 'Material Sampling', 'Day/Night Views', 'Unlimited Revisions'],
    img: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80',
    price: 'From ₹25,000',
  },
]

const PROCESS = [
  { num: '01', title: 'Consultation', desc: 'We start with your vision — your ideas, your requirements, your lifestyle. This is where your journey begins.' },
  { num: '02', title: 'Concept Design', desc: 'We lay out layouts, 3D renders, pick materials, and refine every detail until it feels just right.' },
  { num: '03', title: 'Execution', desc: 'Our team rolls up their sleeves to execute all ideas, keeping you updated every step of the way.' },
  { num: '04', title: 'Quality Check', desc: 'Before handover, we do a thorough inspection to make sure things meet our exacting standards.' },
  { num: '05', title: 'Handover & Follow-up', desc: 'We schedule a follow-up inspection post-completion to ensure everything is functioning perfectly.' },
]

export default function Services() {
  const [activeService, setActiveService] = useState(0)
  useScrollAnimations()

  return (
    <div style={{ background: 'linear-gradient(180deg, #B8B2AA 0%, #CCB9B5 30%, #E7DECF 60%, #EEECE0 100%)' }}>

      {/* Hero */}
      <section style={{ height: '75vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,20,16,0.75), rgba(44,36,22,0.5))' }} />

        {/* Video embed */}
        <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 text-center px-6" style={{ animation: 'revealUp 1s cubic-bezier(0.16,1,0.3,1) 0.3s both' }}>
          <p className="section-label mb-4" style={{ color: '#E8C96A' }}>What We Offer</p>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 300, color: '#EEECE0', lineHeight: 1 }}>
            Our Services
          </h1>
          <div style={{ width: 100, height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin: '24px auto' }} />
          <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.8rem', color: 'rgba(238,236,224,0.7)', maxWidth: 480, lineHeight: 1.9, fontWeight: 300, margin: '0 auto' }}>
            From concept to completion, every service is designed with precision, artistry, and your vision at heart.
          </p>
        </div>
      </section>

      {/* Torn edge */}
      <div style={{ background: '#EEECE0' }}>
        <TornEdgeTop fillColor="rgba(26,20,16,0.8)" />
      </div>

      {/* Services cards */}
      <section style={{ background: '#EEECE0', padding: '100px 6vw' }}>
        <div className="max-w-7xl mx-auto">
          <div className="slide-up text-center mb-16">
            <p className="section-label mb-4">Explore</p>
            <h2 className="section-title" style={{ color: '#2C2416' }}>
              Tailored for <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>every space</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((service, i) => (
              <div
                key={service.title}
                className="slide-up card-3d"
                style={{
                  transitionDelay: `${i * 0.1}s`,
                  background: activeService === i ? '#2C2416' : 'rgba(184,178,170,0.15)',
                  border: `1px solid ${activeService === i ? '#C9A84C' : 'rgba(44,36,22,0.15)'}`,
                  cursor: 'none',
                  transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                  overflow: 'hidden',
                }}
                onClick={() => setActiveService(i)}
              >
                {/* Gold top line on active */}
                {activeService === i && (
                  <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
                )}

                <div className="grid md:grid-cols-2">
                  <div style={{ padding: '40px 32px' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{service.icon}</div>
                    <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '8px' }}>
                      {service.subtitle}
                    </p>
                    <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', fontWeight: 400, color: activeService === i ? '#E7DECF' : '#2C2416', marginBottom: '16px' }}>
                      {service.title}
                    </h3>
                    <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.78rem', color: activeService === i ? '#B8B2AA' : '#5A4A3A', lineHeight: 1.9, fontWeight: 300, marginBottom: '20px' }}>
                      {service.desc}
                    </p>
                    <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', color: '#C9A84C', fontStyle: 'italic', marginBottom: '20px' }}>
                      {service.price}
                    </div>
                    <Link to="/contact">
                      <button className={activeService === i ? 'btn-gold' : 'btn-outline'} style={{ fontSize: '0.62rem', padding: '10px 24px' }}>
                        <span>Get Quote</span>
                      </button>
                    </Link>
                  </div>

                  <div style={{ position: 'relative', minHeight: '280px' }}>
                    <img
                      src={service.img}
                      alt={service.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(44,36,22,0.4), transparent)' }} />
                    {/* Features overlay */}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      padding: '20px',
                      background: 'linear-gradient(to top, rgba(26,20,16,0.95), transparent)',
                    }}>
                      <div className="flex flex-wrap gap-2">
                        {service.features.slice(0, 3).map((f) => (
                          <span key={f} style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.55rem', letterSpacing: '0.15em', color: '#E8C96A', textTransform: 'uppercase', padding: '3px 8px', border: '1px solid rgba(201,168,76,0.4)' }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process section - like Nestopia */}
      <div style={{ background: '#2C2416' }}>
        <TornEdgeTop fillColor="#EEECE0" />
      </div>
      <section style={{ background: '#2C2416', padding: '100px 6vw' }}>
        <GoldLine />
        <div style={{ height: 60 }} />
        <div className="max-w-7xl mx-auto">
          <div className="slide-up text-center mb-16">
            <p className="section-label mb-4">How We Work</p>
            <h2 className="section-title" style={{ color: '#E7DECF' }}>
              Our <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Process</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            {PROCESS.map((step, i) => (
              <div
                key={step.num}
                className="slide-up text-center"
                style={{
                  transitionDelay: `${i * 0.1}s`,
                  padding: '40px 24px',
                  borderRight: i < PROCESS.length - 1 ? '1px solid rgba(201,168,76,0.15)' : 'none',
                  position: 'relative',
                }}
              >
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3.5rem', fontWeight: 200, color: 'rgba(201,168,76,0.2)', lineHeight: 1, marginBottom: '12px' }}>
                  {step.num}
                </div>
                <h4 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontWeight: 400, color: '#E7DECF', marginBottom: '12px' }}>
                  {step.title}
                </h4>
                <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.72rem', color: '#B8B2AA', lineHeight: 1.8, fontWeight: 300 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ height: 60 }} />
          <GoldLine />
          <div className="text-center mt-16 slide-up">
            <Link to="/contact">
              <button className="btn-gold" style={{ padding: '18px 60px', fontSize: '0.75rem' }}>
                <span>Book a Free Consultation</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Completed projects strip */}
      <section style={{ background: '#CCB9B5', padding: '100px 6vw' }}>
        <TornEdgeTop fillColor="#2C2416" />
        <div className="max-w-7xl mx-auto text-center slide-up" style={{ marginTop: '60px' }}>
          <p className="section-label mb-4">OUR COMPLETED PROJECTS</p>
          <h2 className="section-title" style={{ color: '#2C2416', marginBottom: '60px' }}>
            Check out our <em style={{ fontStyle: 'italic' }}>signature projects!</em>
          </h2>
          <Link to="/portfolio">
            <button className="btn-gold"><span>View Portfolio</span></button>
          </Link>
        </div>
      </section>

    </div>
  )
}