import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Services', path: '/services' },
  { label: 'About Us', path: '/about' },
  { label: 'Inspo', path: '/inspiration' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isDark = !scrolled

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 9000,
          height: scrolled ? '68px' : '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 52px',
          background: scrolled
            ? 'rgba(238,236,224,0.97)'
            : 'rgba(26,20,16,0.5)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${scrolled ? 'rgba(201,168,76,0.22)' : 'rgba(201,168,76,0.1)'}`,
          transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* LEFT — Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <svg width="38" height="38" viewBox="0 0 70 70" fill="none">
            <circle cx="35" cy="35" r="33" stroke="#C9A84C" strokeWidth="1.5" />
            <circle cx="35" cy="35" r="26" stroke="#C9A84C" strokeWidth="0.7" opacity="0.5" />
            <path d="M20 20 Q35 8 50 20 Q62 35 50 50 Q35 62 20 50 Q8 35 20 20Z" stroke="#C9A84C" strokeWidth="1" fill="none" opacity="0.6" />
            <circle cx="35" cy="35" r="6" fill="#C9A84C" opacity="0.8" />
            <circle cx="35" cy="35" r="3" fill="#E8C96A" />
          </svg>
          <div>
            <div style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.2rem', fontWeight: 600,
              letterSpacing: '0.06em', lineHeight: 1.1,
              color: scrolled ? '#2C2416' : '#EEECE0',
              transition: 'color 0.4s ease',
            }}>
              MoodyCraft
            </div>
            <div style={{
              fontFamily: '"Josefin Sans", sans-serif',
              fontSize: '0.47rem', letterSpacing: '0.42em',
              textTransform: 'uppercase', color: '#C9A84C',
              fontWeight: 400, lineHeight: 1,
            }}>
              Interior
            </div>
          </div>
        </Link>

        {/* CENTER — Nav links (absolutely centered) */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '38px',
        }} className="nav-center">
          {navLinks.map((link) => {
            const active = pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontFamily: '"Josefin Sans", sans-serif',
                  fontSize: '0.72rem',
                  fontWeight: active ? 500 : 300,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: active ? '#C9A84C' : (scrolled ? '#2C2416' : '#E7DECF'),
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: '5px',
                  transition: 'color 0.3s ease, text-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#C9A84C'
                  e.currentTarget.style.textShadow = '0 0 18px rgba(201,168,76,0.6)'
                  e.currentTarget.querySelector('.nav-ul').style.width = '100%'
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = scrolled ? '#2C2416' : '#E7DECF'
                    e.currentTarget.style.textShadow = 'none'
                  }
                  if (!active) e.currentTarget.querySelector('.nav-ul').style.width = '0%'
                }}
              >
                {link.label}
                <span
                  className="nav-ul"
                  style={{
                    position: 'absolute',
                    bottom: 0, left: 0,
                    width: active ? '100%' : '0%',
                    height: '1.5px',
                    background: 'linear-gradient(90deg, #C9A84C, #E8C96A)',
                    transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1)',
                    borderRadius: '1px',
                    display: 'block',
                  }}
                />
              </Link>
            )
          })}
        </div>

        {/* RIGHT — CTA + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <Link to="/contact" style={{ textDecoration: 'none' }} className="cta-desktop">
            <button
              style={{
                fontFamily: '"Josefin Sans", sans-serif',
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 500,
                padding: '11px 30px',
                background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 100%)',
                color: '#2C2416',
                border: 'none',
                borderRadius: '3px',
                cursor: 'none',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 18px rgba(201,168,76,0.35)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(201,168,76,0.55)'
                e.currentTarget.style.filter = 'brightness(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(201,168,76,0.35)'
                e.currentTarget.style.filter = 'brightness(1)'
              }}
            >
              Contact Us
            </button>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="ham-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none', border: 'none',
              cursor: 'none', padding: '6px',
              display: 'none', flexDirection: 'column', gap: '5px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: 'block', width: '22px', height: '1.5px',
                background: scrolled ? '#2C2416' : '#EEECE0',
                borderRadius: '1px',
                transition: 'all 0.3s ease',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)'
                    : i === 2 ? 'rotate(-45deg) translate(4.5px, -4.5px)'
                    : 'scaleX(0)'
                  : 'none',
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 8999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'rgba(26,20,16,0.97)',
        backdropFilter: 'blur(24px)',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 0.4s ease',
      }}>
        {navLinks.map((link, i) => (
          <Link key={link.path} to={link.path} style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '2.8rem', fontWeight: 300,
            color: pathname === link.path ? '#C9A84C' : '#E7DECF',
            marginBottom: '18px', textDecoration: 'none',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(24px)',
            transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`,
          }}>
            {link.label}
          </Link>
        ))}
        <Link to="/contact" style={{ marginTop: '20px', textDecoration: 'none' }}>
          <button style={{
            fontFamily: '"Josefin Sans", sans-serif',
            fontSize: '0.68rem', letterSpacing: '0.22em',
            textTransform: 'uppercase', padding: '14px 44px',
            background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
            color: '#2C2416', border: 'none', cursor: 'none', fontWeight: 500,
          }}>
            Contact Us
          </button>
        </Link>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .nav-center { display: none !important; }
          .cta-desktop { display: none !important; }
          .ham-btn { display: flex !important; }
        }
        @media (min-width: 901px) {
          .nav-center { display: flex !important; }
          .cta-desktop { display: block !important; }
          .ham-btn { display: none !important; }
        }
      `}</style>
    </>
  )
}