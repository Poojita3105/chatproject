import React, { useState } from 'react'
import { useScrollAnimations } from '../hooks/useScrollAnimation'
import { TornEdgeTop, GoldLine } from '../components/TornEdge'

const SERVICES_LIST = ['Residential Design', 'Commercial Spaces', 'Turnkey Solution', '3D Visualization', 'Consultation Only']
const BUDGETS = ['Under ₹5 Lakhs', '₹5–15 Lakhs', '₹15–30 Lakhs', '₹30–60 Lakhs', '₹60 Lakhs+']
const TIMELINES = ['ASAP', '1–3 Months', '3–6 Months', '6+ Months']

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '',
    service: '', budget: '', timeline: '',
    message: '', area: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState('')
  useScrollAnimations()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputStyle = (name) => ({
    width: '100%',
    padding: '14px 18px',
    background: focused === name ? 'rgba(201,168,76,0.05)' : 'rgba(238,236,224,0.5)',
    border: `1px solid ${focused === name ? '#C9A84C' : 'rgba(44,36,22,0.2)'}`,
    color: '#2C2416',
    fontFamily: '"Josefin Sans", sans-serif',
    fontSize: '0.8rem',
    fontWeight: 300,
    letterSpacing: '0.05em',
    outline: 'none',
    transition: 'all 0.3s ease',
    borderRadius: '2px',
  })

  const labelStyle = {
    fontFamily: '"Josefin Sans", sans-serif',
    fontSize: '0.6rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: '#C9A84C',
    fontWeight: 400,
    display: 'block',
    marginBottom: '8px',
  }

  return (
    <div style={{ background: 'linear-gradient(180deg, #B8B2AA 0%, #CCB9B5 20%, #E7DECF 50%, #EEECE0 100%)' }}>

      {/* Hero */}
      <section
        style={{
          height: '75vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1600&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,20,16,0.88) 0%, rgba(26,20,16,0.5) 60%, rgba(26,20,16,0.2) 100%)' }} />

        {/* Video overlay */}
        <video autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2, mixBlendMode: 'luminosity' }}>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full" style={{ animation: 'revealUp 1s cubic-bezier(0.16,1,0.3,1) 0.3s both' }}>
          <p className="section-label mb-4" style={{ color: '#E8C96A' }}>Begin Your Journey</p>
          <h1
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 300,
              color: '#EEECE0',
              lineHeight: 1.0,
              maxWidth: 600,
            }}
          >
            Let's create<br />
            <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>something</em><br />
            extraordinary.
          </h1>
          <div style={{ width: 80, height: 1, background: '#C9A84C', margin: '28px 0' }} />
          <p style={{
            fontFamily: '"Josefin Sans", sans-serif',
            fontSize: '0.85rem',
            color: 'rgba(238,236,224,0.72)',
            maxWidth: 440,
            lineHeight: 1.9,
            fontWeight: 300,
            letterSpacing: '0.04em',
          }}>
            Book a free consultation and let our experts understand your vision. Your perfect space awaits.
          </p>
        </div>
      </section>

      {/* Torn edge */}
      <div style={{ background: '#EEECE0' }}>
        <TornEdgeTop fillColor="rgba(26,20,16,0.85)" />
      </div>

      {/* Main content */}
      <section style={{ background: '#EEECE0', padding: '100px 6vw' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-16">

            {/* Left info */}
            <div className="lg:col-span-2 slide-left">
              <p className="section-label mb-4">Contact Us</p>
              <h2 className="section-title" style={{ color: '#2C2416', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '28px' }}>
                Get in <em style={{ fontStyle: 'italic', color: '#5A4A3A' }}>touch</em>
              </h2>
              <div style={{ width: 60, height: 1, background: '#C9A84C', marginBottom: '32px' }} />

              {/* Contact details */}
              <div className="space-y-8">
                {[
                  {
                    icon: '📍',
                    label: 'Studio Address',
                    val: '42, Design Quarter\nBandra West, Mumbai — 400050',
                  },
                  {
                    icon: '📞',
                    label: 'Phone',
                    val: '+91 98765 43210\n+91 98765 43211',
                  },
                  {
                    icon: '✉️',
                    label: 'Email',
                    val: 'hello@moodycraft.in\nprojects@moodycraft.in',
                  },
                  {
                    icon: '🕐',
                    label: 'Studio Hours',
                    val: 'Mon – Sat: 10:00 AM – 7:00 PM\nSun: By appointment only',
                  },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', gap: '16px' }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      border: '1px solid rgba(201,168,76,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      flexShrink: 0,
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.58rem', letterSpacing: '0.25em', color: '#C9A84C', textTransform: 'uppercase', fontWeight: 400, marginBottom: '6px' }}>
                        {item.label}
                      </p>
                      {item.val.split('\n').map((line, i) => (
                        <p key={i} style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.8rem', color: '#5A4A3A', fontWeight: 300, lineHeight: 1.8 }}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div style={{ marginTop: '48px' }}>
                <p style={labelStyle}>Follow Our Journey</p>
                <div className="flex gap-4 mt-4">
                  {[
                    { name: 'Instagram', url: 'https://www.instagram.com', icon: '📸' },
                    { name: 'Pinterest', url: 'https://www.pinterest.com', icon: '📌' },
                    { name: 'Facebook', url: 'https://www.facebook.com', icon: '👍' },
                    { name: 'Twitter', url: 'https://www.twitter.com', icon: '🐦' },
                  ].map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.name}
                      style={{
                        width: 44, height: 44,
                        border: '1px solid rgba(44,36,22,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.1rem',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#C9A84C'
                        e.currentTarget.style.background = 'rgba(201,168,76,0.08)'
                        e.currentTarget.style.transform = 'translateY(-3px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(44,36,22,0.2)'
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="lg:col-span-3 slide-right">
              {submitted ? (
                <div
                  style={{
                    border: '1px solid rgba(201,168,76,0.4)',
                    padding: '80px 60px',
                    textAlign: 'center',
                    animation: 'revealUp 0.8s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✨</div>
                  <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.5rem', fontWeight: 300, color: '#2C2416', marginBottom: '16px' }}>
                    Thank you, {form.name.split(' ')[0]}!
                  </h3>
                  <div style={{ width: 60, height: 1, background: '#C9A84C', margin: '0 auto 24px' }} />
                  <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.82rem', color: '#5A4A3A', lineHeight: 1.9, fontWeight: 300, maxWidth: 380, margin: '0 auto' }}>
                    Your consultation request has been received. Our design team will reach out within 24 hours to schedule your session.
                  </p>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', fontStyle: 'italic', color: '#C9A84C', marginTop: '28px' }}>
                    Designing moods, not just spaces.
                  </p>
                  <button
                    className="btn-outline"
                    style={{ marginTop: '32px' }}
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', city: '', service: '', budget: '', timeline: '', message: '', area: '' }) }}
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <div style={{ border: '1px solid rgba(201,168,76,0.2)', padding: '60px 50px' }}>
                  {/* Gold top accent */}
                  <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', marginBottom: '40px' }} />

                  <p className="section-label mb-3">Book Consultation</p>
                  <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 300, color: '#2C2416', marginBottom: '40px' }}>
                    Tell us about your <em style={{ fontStyle: 'italic', color: '#5A4A3A' }}>project</em>
                  </h3>

                  <form onSubmit={handleSubmit}>
                    {/* Name + Email */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label style={labelStyle}>Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          onFocus={() => setFocused('name')}
                          onBlur={() => setFocused('')}
                          placeholder="Aryan Mehta"
                          required
                          style={inputStyle('name')}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          onFocus={() => setFocused('email')}
                          onBlur={() => setFocused('')}
                          placeholder="aryan@example.com"
                          required
                          style={inputStyle('email')}
                        />
                      </div>
                    </div>

                    {/* Phone + City */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label style={labelStyle}>Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          onFocus={() => setFocused('phone')}
                          onBlur={() => setFocused('')}
                          placeholder="+91 98765 43210"
                          required
                          style={inputStyle('phone')}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>City</label>
                        <input
                          type="text"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          onFocus={() => setFocused('city')}
                          onBlur={() => setFocused('')}
                          placeholder="Mumbai"
                          style={inputStyle('city')}
                        />
                      </div>
                    </div>

                    {/* Service */}
                    <div className="mb-6">
                      <label style={labelStyle}>Service Required *</label>
                      <div className="flex flex-wrap gap-3">
                        {SERVICES_LIST.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setForm({ ...form, service: s })}
                            style={{
                              fontFamily: '"Josefin Sans", sans-serif',
                              fontSize: '0.62rem',
                              letterSpacing: '0.15em',
                              padding: '8px 18px',
                              background: form.service === s ? 'linear-gradient(135deg, #C9A84C, #E8C96A)' : 'transparent',
                              border: `1px solid ${form.service === s ? '#C9A84C' : 'rgba(44,36,22,0.2)'}`,
                              color: form.service === s ? '#2C2416' : '#5A4A3A',
                              cursor: 'none',
                              transition: 'all 0.3s ease',
                              textTransform: 'uppercase',
                              fontWeight: form.service === s ? 500 : 300,
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Budget + Timeline */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label style={labelStyle}>Budget Range</label>
                        <select
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          onFocus={() => setFocused('budget')}
                          onBlur={() => setFocused('')}
                          style={{ ...inputStyle('budget'), cursor: 'none' }}
                        >
                          <option value="">Select budget</option>
                          {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Timeline</label>
                        <select
                          name="timeline"
                          value={form.timeline}
                          onChange={handleChange}
                          onFocus={() => setFocused('timeline')}
                          onBlur={() => setFocused('')}
                          style={{ ...inputStyle('timeline'), cursor: 'none' }}
                        >
                          <option value="">Select timeline</option>
                          {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Area */}
                    <div className="mb-6">
                      <label style={labelStyle}>Space Area (approx.)</label>
                      <input
                        type="text"
                        name="area"
                        value={form.area}
                        onChange={handleChange}
                        onFocus={() => setFocused('area')}
                        onBlur={() => setFocused('')}
                        placeholder="e.g., 1500 sq ft"
                        style={inputStyle('area')}
                      />
                    </div>

                    {/* Message */}
                    <div className="mb-8">
                      <label style={labelStyle}>Your Vision</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused('')}
                        placeholder="Tell us about your dream space, preferred style, inspiration, or any specific requirements..."
                        rows={5}
                        style={{ ...inputStyle('message'), resize: 'none', lineHeight: 1.8 }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-gold"
                      style={{ width: '100%', padding: '18px', fontSize: '0.72rem', letterSpacing: '0.3em' }}
                    >
                      <span>Book Free Consultation</span>
                    </button>

                    <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.65rem', color: '#B8B2AA', textAlign: 'center', marginTop: '16px', fontWeight: 300 }}>
                      We'll respond within 24 hours. No spam, ever.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map / Location section */}
      <section style={{ background: '#2C2416', padding: '0' }}>
        <TornEdgeTop fillColor="#EEECE0" />
        <div style={{ padding: '80px 6vw' }}>
          <div className="max-w-7xl mx-auto">
            <div className="slide-up text-center mb-12">
              <p className="section-label mb-4" style={{ color: '#C9A84C' }}>Visit Our Studio</p>
              <h2 className="section-title" style={{ color: '#E7DECF', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                Come see us <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>in person</em>
              </h2>
            </div>

            {/* Studio highlights */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { icon: '☕', title: 'Design Café', desc: 'Explore material libraries over a cup of specialty coffee in our relaxed studio lounge.' },
                { icon: '🎨', title: 'Material Room', desc: '2000+ curated materials, fabrics, and finishes to touch, feel, and decide in person.' },
                { icon: '🥽', title: 'VR Experience', desc: 'Step inside your future space with our immersive virtual reality walk-through station.' },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="slide-up"
                  style={{
                    transitionDelay: `${i * 0.1}s`,
                    padding: '36px 28px',
                    border: '1px solid rgba(201,168,76,0.2)',
                    textAlign: 'center',
                    transition: 'border-color 0.3s ease, background 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#C9A84C'
                    e.currentTarget.style.background = 'rgba(201,168,76,0.04)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{item.icon}</div>
                  <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', fontWeight: 400, color: '#E7DECF', marginBottom: '12px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.75rem', color: '#B8B2AA', lineHeight: 1.8, fontWeight: 300 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Embedded map placeholder with styling */}
            <div
              className="slide-up"
              style={{
                width: '100%',
                height: '400px',
                border: '1px solid rgba(201,168,76,0.3)',
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(44,36,22,0.5)',
              }}
            >
              <iframe
                title="MoodyCraft Studio Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.822!2d72.8296!3d19.0596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBandra+West%2C+Mumbai!5e0!3m2!1sen!2sin!4v1620000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) invert(0.85) sepia(0.3)' }}
                allowFullScreen=""
                loading="lazy"
              />
              {/* Overlay pin */}
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -60%)',
                textAlign: 'center',
                pointerEvents: 'none',
              }}>
                <div style={{ fontSize: '2rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}>📍</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ background: '#CCB9B5', padding: '100px 6vw' }}>
        <TornEdgeTop fillColor="#2C2416" />
        <div className="max-w-3xl mx-auto" style={{ marginTop: '60px' }}>
          <div className="slide-up text-center mb-16">
            <p className="section-label mb-4">Have Questions?</p>
            <h2 className="section-title" style={{ color: '#2C2416', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Common <em style={{ fontStyle: 'italic' }}>Queries</em>
            </h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

    </div>
  )
}

const FAQS = [
  { q: 'How long does a typical interior design project take?', a: 'Project timelines vary based on scope. A single room takes 4–8 weeks, a full apartment 3–6 months, and a villa or commercial space 6–12 months. We provide a detailed timeline during our initial consultation.' },
  { q: 'Do you work outside Mumbai?', a: 'Absolutely! We\'ve completed projects across Mumbai, Delhi, Bangalore, Pune, Hyderabad, and several tier-2 cities. We also offer virtual consultations for clients outside our primary service areas.' },
  { q: 'What is included in a turnkey package?', a: 'Our turnkey service covers everything: civil work, electrical & plumbing, false ceilings, flooring, custom furniture, built-ins, decor, art curation, and final styling — with a 1-year post-handover warranty.' },
  { q: 'Can I see the design before execution begins?', a: 'Yes! We present full 3D renders, material boards, furniture layouts, and lighting plans before any physical work begins. You approve everything at every stage.' },
  { q: 'Is the first consultation really free?', a: 'Yes — completely. Our 60-minute initial consultation is free, with no obligation. We\'ll understand your needs, discuss possibilities, and give you a rough estimate.' },
]

function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <div className="space-y-3">
      {FAQS.map((faq, i) => (
        <div
          key={i}
          className="slide-up"
          style={{
            transitionDelay: `${i * 0.08}s`,
            border: `1px solid ${openIdx === i ? '#C9A84C' : 'rgba(44,36,22,0.2)'}`,
            transition: 'border-color 0.3s ease',
            background: openIdx === i ? 'rgba(201,168,76,0.04)' : 'rgba(238,236,224,0.4)',
          }}
        >
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            style={{
              width: '100%',
              padding: '20px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              cursor: 'none',
              textAlign: 'left',
              gap: '16px',
            }}
          >
            <span style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.05rem',
              fontWeight: 400,
              color: openIdx === i ? '#C9A84C' : '#2C2416',
              transition: 'color 0.3s ease',
              lineHeight: 1.4,
            }}>
              {faq.q}
            </span>
            <span style={{
              color: '#C9A84C',
              fontSize: '1rem',
              transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
              flexShrink: 0,
              fontWeight: 300,
            }}>
              +
            </span>
          </button>
          <div style={{
            maxHeight: openIdx === i ? '400px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
          }}>
            <p style={{
              fontFamily: '"Josefin Sans", sans-serif',
              fontSize: '0.8rem',
              color: '#5A4A3A',
              lineHeight: 1.9,
              fontWeight: 300,
              padding: '0 24px 24px',
            }}>
              {faq.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}