import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useScrollAnimations } from '../hooks/useScrollAnimation'
import { TornEdgeTop, GoldLine } from '../components/TornEdge'
import RoomDesigner3D from '../components/RoomDesigner3D'

const PROCESS = [
  { num: '01', title: 'Consultation', desc: 'We start with your vision — your ideas, your requirements, your lifestyle. This is where your journey begins.' },
  { num: '02', title: 'Concept Design', desc: 'We lay out layouts, 3D renders, pick materials, and refine every detail until it feels just right.' },
  { num: '03', title: 'Execution', desc: 'Our team rolls up their sleeves to execute all ideas, keeping you updated every step of the way.' },
  { num: '04', title: 'Quality Check', desc: 'Before handover, we do a thorough inspection to make sure things meet our exacting standards.' },
  { num: '05', title: 'Handover & Follow-up', desc: 'We schedule a follow-up inspection post-completion to ensure everything is functioning perfectly.' },
]

const HOME_ITEMS = [
  {
    title: 'Living Room',
    img: 'https://i.pinimg.com/736x/39/b8/af/39b8af383a5725206ade1ac0d0d89398.jpg',
    desc: 'Elegant and welcoming spaces designed for comfort, style, and memorable gatherings.'
  },
  {
    title: 'Hall',
    img: 'https://i.pinimg.com/1200x/30/52/5d/30525dad8f1b4da0ed38c44ed999d458.jpg',
    desc: 'Grand entryways and hall designs that create a lasting first impression.'
  },
  {
    title: 'Bedroom',
    img: 'https://i.pinimg.com/736x/71/78/4e/71784e651ed7d8b5e4886e8a5f8d8017.jpg',
    desc: 'Calm, cozy, and personalized bedrooms crafted for relaxation and peace.'
  },
  {
    title: 'Kitchen',
    img: 'https://i.pinimg.com/736x/d6/24/b2/d624b2fc0dbc58dadf9ae43fdafb3831.jpg',
    desc: 'Modern, efficient kitchens with smart storage and aesthetic appeal.'
  },
  {
    title: 'Bathroom',
    img: 'https://i.pinimg.com/736x/1d/04/47/1d04474072edd9be8860d4325c169cdc.jpg',
    desc: 'Luxurious and functional bathrooms designed for comfort and hygiene.'
  },
  {
    title: "God's Room",
    img: 'https://i.pinimg.com/1200x/dc/e5/02/dce502acc895f6fd7b6acfc4723a4183.jpg',
    desc: 'Peaceful spiritual spaces designed with traditional and modern harmony.'
  },
  {
    title: 'Balcony',
    img: 'https://i.pinimg.com/736x/c1/dc/29/c1dc298d6c5eaafe161c2f6473e7f1d0.jpg',
    desc: 'Beautiful balcony designs that bring nature and serenity into your home.'
  },
  {
    title: 'Wardrobe',
    img: 'https://i.pinimg.com/736x/ee/72/b4/ee72b42deef60b447c48a21617c4aecc.jpg',
    desc: 'Smart, sleek, and perfectly organised wardrobes that deserve as much style as the clothes they hold.'
  },
  {
    title: 'Lighting Design',
    img: 'https://i.pinimg.com/736x/c6/08/b8/c608b861ebd381e6a54ab32f4c10ef0f.jpg',
    desc: 'Strategic illumination that shapes mood, enhances comfort, and highlights architectural elements.'
  },
]

const OFFICE_ITEMS = [
  {
    title: 'Reception & Lobby',
    img: 'https://i.pinimg.com/736x/ab/6c/5d/ab6c5dd8b94f9fd2db76a6e9c33cd1fd.jpg',
    desc: "Make a commanding first impression with sophisticated lobbies that speak your brand's language."
  },
  {
    title: 'Workstation Layout',
    img: 'https://i.pinimg.com/1200x/9b/1c/ab/9b1cabdb313037ab55905f305c7f7d3e.jpg',
    desc: 'Ergonomic, productivity-first workstation arrangements that balance openness and focus zones.'
  },
  {
    title: 'Conference Rooms',
    img: 'https://i.pinimg.com/736x/48/4c/49/484c497ca82325972b2a5f1f01589eb7.jpg',
    desc: 'Boardrooms and meeting spaces designed for collaboration, clarity, and confidence.'
  },
  {
    title: "Cabin & Director's Office",
    img: 'https://i.pinimg.com/736x/69/ac/ae/69acae22625fc8f10644c9b7f2e5ddeb.jpg',
    desc: 'Executive cabins that radiate authority — crafted with premium materials and refined detailing.'
  },
  {
    title: 'Breakout & Lounge',
    img: 'https://i.pinimg.com/1200x/55/63/e4/5563e4fe01b517f19b1c9914fd8cbf0e.jpg',
    desc: 'Relaxed informal spaces that foster creativity, team bonding, and mental recharge.'
  },
  {
    title: 'Office Pantry',
    img: 'https://i.pinimg.com/736x/1f/22/33/1f2233457b88e5803f8d5d8421ba6d15.jpg',
    desc: 'Cheerful, well-equipped pantry spaces that keep your team fuelled and refreshed.'
  },
  {
    title: 'Brand Wall & Signage',
    img: 'https://i.pinimg.com/736x/07/ac/c5/07acc5f88f70df364b219d30d1f58c0f.jpg',
    desc: 'Iconic brand walls, feature graphics, and signage that reinforce your identity at every turn.'
  },
  {
    title: 'Office Lighting',
    img: 'https://i.pinimg.com/1200x/fd/49/17/fd4917f292c0f879f6fda696e1f2dbc1.jpg',
    desc: 'Layered lighting strategies that reduce eye strain, boost focus, and elevate the workspace feel.'
  },
  {
    title: 'Storage & Utility',
    img: 'https://i.pinimg.com/736x/30/e3/b1/30e3b1409acd1726bd5a71f665b5d9cc.jpg',
    desc: 'Smart, built-in storage solutions that keep clutter at bay without sacrificing aesthetics.'
  },
]

const RESTAURANT_ITEMS = [
  {
    title: 'Dining Area',
    img: 'https://i.pinimg.com/736x/b6/40/9c/b6409c50cf4253cefce4f7d095dc7a35.jpg',
    desc: 'Immersive dining floors designed to match your cuisine concept and keep guests coming back.'
  },
  {
    title: 'Bar & Counter',
    img: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Stunning bar counters and beverage stations that become the social heart of your restaurant.'
  },
  {
    title: 'Private Dining',
    img: 'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Intimate private dining rooms for special occasions — luxurious, cozy, and utterly memorable.'
  },
  {
    title: 'Restaurant Entrance',
    img: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Entryways and facades that set the mood before guests even step inside.'
  },
  {
    title: 'Open Kitchen',
    img: 'https://images.pexels.com/photos/3887985/pexels-photo-3887985.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Theatre-style open kitchens that let guests watch the magic — designed for safety and spectacle.'
  },
  {
    title: 'Outdoor & Al Fresco',
    img: 'https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Breezy outdoor seating and terrace designs that bring the joy of open-air dining to your guests.'
  },
  {
    title: 'Café & Lounge',
    img: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Laid-back café corners and lounge zones with warmth, texture, and irresistible character.'
  },
  {
    title: 'Ambience & Lighting',
    img: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Mood lighting, pendant clusters, and accent illumination that make every meal feel like an event.'
  },
  {
    title: 'Branding & Interiors',
    img: 'https://i.pinimg.com/736x/33/40/dc/3340dcba2f28b4ebca54d94dccf32f02.jpg',
    desc: 'Colour palettes, typography, murals, and signage that weave your brand story into every surface.'
  },
]

const ALL_TABS = {
  home: HOME_ITEMS,
  office: OFFICE_ITEMS,
  restaurant: RESTAURANT_ITEMS,
}

export default function Services() {
  const [activeTab, setActiveTab] = useState('home')
  const navigate = useNavigate()
  useScrollAnimations()

  const currentItems = ALL_TABS[activeTab]

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

      {/* SERVICES AVAILABLE SECTION */}
      <section style={{ background: '#EEECE0', padding: '50px 7vw' }}>
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">
            <p className="section-label mb-4">Services Available</p>
            <h2 className="section-title" style={{ color: '#2C2416' }}>
              Designed for <em style={{ color: '#C9A84C' }}>every space</em> you inhabit
            </h2>
          </div>

          {/* Tab Switcher */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px',padding: '7px', marginBottom: '48px', flexWrap: 'wrap' }}>
            {[
              { key: 'home', label: '🏠 Home Interiors' },
              { key: 'office', label: '🏢 Office Spaces' },
              { key: 'restaurant', label: '🍽️ Restaurants & Cafés' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '10px 28px',
                  borderRadius: '999px',
                  border: activeTab === tab.key ? '2px solid #C9A84C' : '1.5px solid #B8B2AA',
                  background: activeTab === tab.key ? '#C9A84C' : 'transparent',
                  color: activeTab === tab.key ? '#2C2416' : '#6B5B4B',
                  fontFamily: '"Josefin Sans", sans-serif',
                  fontSize: '0.78rem',
                  fontWeight: activeTab === tab.key ? 600 : 400,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* CSS */}
          <style>{`
            .arch-cards-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 28px;
              width: 100%;
            }
            @media (max-width: 768px) {
              .arch-cards-grid { grid-template-columns: repeat(2, 1fr); gap: 18px; }
            }
            @media (max-width: 480px) {
              .arch-cards-grid { grid-template-columns: repeat(1, 1fr); gap: 24px; }
            }
            .arch-card {
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
              opacity: 1 !important;
              transform: none !important;
              animation: cardFadeIn 0.4s ease forwards;
            }
            @keyframes cardFadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            .arch-card-img-wrap {
              width: 100%;
              position: relative;
              border: 3px solid #C9A84C;
              border-bottom: none;
              border-top-left-radius: 999px;
              border-top-right-radius: 999px;
              overflow: hidden;
              aspect-ratio: 3 / 4;
              background: #D8D0C0;
              transition: box-shadow 0.3s ease;
            }
            .arch-inner-border {
              position: absolute;
              inset: 10px;
              border-radius: 190px 190px 0 0;
              border: 1.5px solid rgba(236,195,72,0.5);
              z-index: 2;
              pointer-events: none;
            }
            .arch-card:hover .arch-card-img-wrap {
              box-shadow: 0 12px 40px rgba(201,168,76,0.25);
            }
            .arch-card-img-wrap img {
              position: relative;
              z-index: 1;
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
              transition: transform 0.5s ease;
            }
            .arch-card:hover .arch-card-img-wrap img {
              transform: scale(1.06);
            }
            .arch-card-label {
              background: #5E6E6E;
              color: #fff;
              text-align: center;
              padding: 10px 20px;
              width: 80%;
              margin-top: -2px;
              font-family: 'Cormorant Garamond', serif;
              font-size: 1.05rem;
              font-weight: 500;
              letter-spacing: 0.04em;
              border-bottom-left-radius: 6px;
              border-bottom-right-radius: 6px;
            }
            .arch-card-desc {
              margin-top: 14px;
              font-family: 'Josefin Sans', sans-serif;
              font-size: 0.82rem;
              color: #6B5B4B;
              line-height: 1.85;
              font-weight: 500;
              text-align: center;
              padding: 0 4px;
            }
          `}</style>

          {/* Cards Grid */}
          <div className="arch-cards-grid" key={activeTab}>
            {currentItems.map((item, i) => (
              <div
                key={i}
                className="arch-card"
                style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'both' }}
              >
                <div className="arch-card-img-wrap">
                  <div className="arch-inner-border" />
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = `https://placehold.co/400x530/D8D0C0/6B5B4B?text=${encodeURIComponent(item.title)}`
                    }}
                  />
                </div>
                <div className="arch-card-label">{item.title}</div>
                <p className="arch-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Torn edge */}
      <div style={{ background: '#ccb9b5' }}>
        <TornEdgeTop fillColor="#eeece0" />
      </div>

      {/* 3D ROOM PLANNER SECTION */}
      <section style={{ padding: '1rem 2rem 2rem', background: '#ccb9b5' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(218,171,18,0.95)',
            border: '1px solid rgba(212,175,55,0.25)',
            color: 'black',
            fontSize: 11,
            letterSpacing: '0.12em',
            padding: '5px 16px',
            borderRadius: 20,
            marginBottom: 16,
            textTransform: 'uppercase',
          }}>
            ◆ Interactive Tool ◆
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: '#2a1e05',
            margin: '0 0 12px',
            lineHeight: 1.2,
            fontWeight: 300,
          }}>
            Design Your Dream Room
          </h2>
          <p style={{
            color: '#532d05',
            fontSize: 15,
            maxWidth: 500,
            margin: '0 auto',
            lineHeight: 1.7,
            fontFamily: "'Josefin Sans', sans-serif",
            fontWeight: 300,
          }}>
            Try our 2D floor plan planner — drag, place and visualize your space
            before you commit. Snap furniture to grid, rotate pieces, layer rugs
            and decor exactly how you want.
          </p>
        </div>

        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <RoomDesigner3D />
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <p style={{ color: '#7A6A5A', fontSize: 13, marginBottom: 16, fontFamily: "'Josefin Sans', sans-serif" }}>
            Like what you've designed? Our experts will bring it to life.
          </p>
          <button
            onClick={() => navigate('/contact')}
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #B8960C)',
              border: 'none',
              color: '#1a0a00',
              padding: '12px 32px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              letterSpacing: '0.05em',
              boxShadow: '0 8px 30px rgba(212,175,55,0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              fontFamily: "'Josefin Sans', sans-serif",
            }}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,175,55,0.4)' }}
            onMouseOut={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 30px rgba(212,175,55,0.3)' }}
          >
            Book a Free Consultation →
          </button>
        </div>
      </section>

      {/* Process section */}
      <div style={{ background: '#2C2416' }}>
        <TornEdgeTop fillColor="#ccb9b5" />
      </div>
      <section style={{ background: '#2C2416', padding: '10px 6vw' }}>
        
        <div style={{ height: 10 }} />
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
                  borderRight: i < PROCESS.length - 1 ? '1px solid rgba(238, 178, 13, 0.91)' : 'none',
                  position: 'relative',
                }}
              >
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '4.5rem', fontWeight: 200, color: 'rgba(234, 184, 20, 0.93)', lineHeight: 1, marginBottom: '1px' }}>
                  {step.num}
                </div>
                <h4 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.2rem', fontWeight: 400, color: '#E7DECF', marginBottom: '12px' }}>
                  {step.title}
                </h4>
                <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '1.02rem', color: '#B8B2AA', lineHeight: 0.8, fontWeight: 300 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ height: 50 }} />
          
          <div className="text-center mt-13 slide-up" style={{marginTop: '-60px', padding: '15px 20px' }}>
            <Link to="/contact">
              <button className="btn-gold" style={{ padding: '18px 90px', fontSize: '0.75rem' }}>
                <span>Book a Free Consultation</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
 {/* Process section */}
      <div style={{ background: '#CCB9B5' }}>
        <TornEdgeTop fillColor="#2C2416" />
      </div>
      {/* Completed projects strip */}
      <section style={{ background: '#CCB9B5', paddingTop: '1px', padding: '30px 2vw' }}>
        
        <div className="max-w-7xl mx-auto text-center slide-up" style={{ marginTop: '30px' }}>
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