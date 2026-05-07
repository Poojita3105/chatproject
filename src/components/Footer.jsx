import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Our Services', path: '/services' },
  { label: 'About Us', path: '/about' },
  { label: 'Inspiration', path: '/inspiration' },
  { label: 'Contact Us', path: '/contact' },
]

const SERVICE_LINKS = [
  { label: 'Residential Design', path: '/services' },
  { label: 'Commercial Spaces', path: '/services' },
  { label: 'Turnkey Solutions', path: '/services' },
  { label: '3D Visualization', path: '/services' },
  { label: 'Consultation', path: '/contact' },
  { label: 'Project Gallery', path: '/portfolio' },
]

const SOCIAL = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    url: 'https://www.twitter.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Pinterest',
    url: 'https://www.pinterest.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
]

function FooterLink({ to, children }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      to={to}
      style={{
        display: 'block',
        fontFamily: '"Josefin Sans", sans-serif',
        fontSize: '0.8rem',
        fontWeight: 500,
        letterSpacing: '0.04em',
        color: hov ? '#E7DECF' : '#A09890',
        textDecoration: 'none',
        paddingLeft: hov ? '8px' : '0px',
        transition: 'all 0.28s ease',
        marginBottom: '18px',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </Link>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subDone, setSubDone] = useState(false)

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1a1410 0%, #2C2416 50%, #1a1410 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── Torn top edge ── */}
      <div style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '70px', display: 'block' }}>
          <path
            d="M0,35 C30,55 60,15 90,35 C120,55 150,20 180,40 C210,60 240,15 270,35 C300,55 330,18 360,38 C390,58 420,20 450,42 C480,64 510,16 540,36 C570,56 600,20 630,40 C660,60 690,18 720,38 C750,58 780,20 810,42 C840,64 870,16 900,36 C930,56 960,20 990,40 C1020,60 1050,18 1080,38 C1110,58 1140,20 1170,42 C1200,64 1230,16 1260,36 C1290,56 1320,20 1350,40 C1380,60 1410,22 1440,42 L1440,0 L0,0 Z"
            fill="#fcfbf7"
          />
        </svg>
      </div>

      {/* ── Gold line ── */}
      <div style={{
        height: '8px',
        background: 'linear-gradient(90deg, transparent 0%, #C9A84C 20%, #E8C96A 50%, #C9A84C 80%, transparent 100%)',
        position: 'relative',
      }}>
        <span style={{ position: 'absolute', left: '25%', top: '50%', transform: 'translate(-50%,-50%)', color: '#C9A84C', fontSize: '8px' }}>◆</span>
        <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', color: '#E8C96A', fontSize: '10px' }}>◆</span>
        <span style={{ position: 'absolute', left: '75%', top: '50%', transform: 'translate(-50%,-50%)', color: '#C9A84C', fontSize: '8px' }}>◆</span>
      </div>

      {/* Ambient orbs */}
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: '#C9A84C', filter: 'blur(120px)', opacity: 0.06, top: '-15%', right: '-5%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: '#A7B2AA', filter: 'blur(100px)', opacity: 0.06, bottom: '-10%', left: '-3%', pointerEvents: 'none' }} />

      {/* ── Main footer content — horizontal grid ── */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '64px 52px 48px',
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr 1fr 1.4fr',
        gap: '48px',
        alignItems: 'start',
      }} className="footer-grid">

        {/* COL 1 — Brand */}
        <div>
          {/* Logo */}
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '20px' }}>
            <svg width="42" height="42" viewBox="0 0 70 70" fill="none">
              <circle cx="35" cy="35" r="33" stroke="#C9A84C" strokeWidth="1.5" />
              <circle cx="35" cy="35" r="26" stroke="#C9A84C" strokeWidth="0.7" opacity="0.5" />
              <path d="M20 20 Q35 8 50 20 Q62 35 50 50 Q35 62 20 50 Q8 35 20 20Z" stroke="#C9A84C" strokeWidth="1" fill="none" opacity="0.5" />
              <circle cx="35" cy="35" r="6" fill="#C9A84C" opacity="0.8" />
              <circle cx="35" cy="35" r="3" fill="#E8C96A" />
            </svg>
            <div>
              <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.25rem', fontWeight: 600, color: '#E7DECF', letterSpacing: '0.07em', lineHeight: 1.1 }}>
                MoodyCraft
              </div>
              <div style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.47rem', letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase', fontWeight: 400 }}>
                Interior
              </div>
            </div>
          </Link>

          <p style={{
            fontFamily: '"Josefin Sans", sans-serif',
            fontSize: '0.8rem', color: '#8A8078',
            lineHeight: 1.85, fontWeight: 300,
            letterSpacing: '0.03em', maxWidth: '260px',
            marginBottom: '28px',
          }}>
            Designing moods, not just spaces. Where modern design meets artistic expression — creating interiors that feel personal, elegant, and timeless.
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {SOCIAL.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
                style={{
                  width: '38px', height: '38px',
                  border: '1px solid rgba(201,168,76,0.25)',
                  borderRadius: '4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#8A8078',
                  textDecoration: 'none',
                  transition: 'all 0.28s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C9A84C'
                  e.currentTarget.style.color = '#C9A84C'
                  e.currentTarget.style.background = 'rgba(201,168,76,0.1)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'
                  e.currentTarget.style.color = '#8A8078'
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* COL 2 — Navigation */}
        <div>
          <h4 style={{
            fontFamily: '"Josefin Sans", sans-serif',
            fontSize: '0.7rem', letterSpacing: '0.35em',
            textTransform: 'uppercase', color: '#C9A84C',
            fontWeight: 500, marginBottom: '22px',
          }}>
            Navigation
          </h4>
          {NAV_LINKS.map((l) => (
            <FooterLink key={l.label} to={l.path}>{l.label}</FooterLink>
          ))}
        </div>

        {/* COL 3 — Services */}
        <div>
          <h4 style={{
            fontFamily: '"Josefin Sans", sans-serif',
            fontSize: '0.7rem', letterSpacing: '0.35em',
            textTransform: 'uppercase', color: '#C9A84C',
            fontWeight: 500, marginBottom: '22px',
          }}>
            Services
          </h4>
          {SERVICE_LINKS.map((l) => (
            <FooterLink key={l.label} to={l.path}>{l.label}</FooterLink>
          ))}
        </div>

        {/* COL 4 — Contact box + Newsletter */}
        <div>
          {/* Contact highlight box — like RoyalDrive's "24/7 Support" teal box */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.08) 100%)',
            border: '1px solid rgba(201,168,76,0.35)',
            borderRadius: '6px',
            padding: '24px 22px',
            marginBottom: '28px',
          }}>
            <p style={{
              fontFamily: '"Josefin Sans", sans-serif',
              fontSize: '0.58rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: '#C9A84C',
              fontWeight: 500, marginBottom: '8px',
            }}>
              Free Consultation
            </p>
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.35rem', fontWeight: 500,
              color: '#E7DECF', lineHeight: 1.2,
              marginBottom: '6px', letterSpacing: '0.02em',
            }}>
              +91 98765 43210
            </p>
            <p style={{
              fontFamily: '"Josefin Sans", sans-serif',
              fontSize: '0.7rem', color: '#8A8078',
              fontWeight: 300, marginBottom: '16px',
            }}>
              Mon – Sat · 10AM – 7PM
            </p>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  width: '100%',
                  fontFamily: '"Josefin Sans", sans-serif',
                  fontSize: '0.62rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase', fontWeight: 500,
                  padding: '11px 0',
                  background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
                  color: '#2C2416', border: 'none',
                  borderRadius: '3px', cursor: 'none',
                  transition: 'filter 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.1)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'brightness(1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Book Now
              </button>
            </Link>
          </div>

          {/* Newsletter */}
          <h4 style={{
            fontFamily: '"Josefin Sans", sans-serif',
            fontSize: '0.6rem', letterSpacing: '0.35em',
            textTransform: 'uppercase', color: '#C9A84C',
            fontWeight: 500, marginBottom: '10px',
          }}>
            Stay Inspired
          </h4>
          <p style={{
            fontFamily: '"Josefin Sans", sans-serif',
            fontSize: '0.73rem', color: '#8A8078',
            fontWeight: 300, lineHeight: 1.7,
            marginBottom: '14px',
          }}>
            Design trends & project reveals in your inbox.
          </p>
          {subDone ? (
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1rem', fontStyle: 'italic',
              color: '#C9A84C',
            }}>
              ✦ You're on the list!
            </p>
          ) : (
            <div style={{ display: 'flex', gap: 0 }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  background: 'rgba(238,236,224,0.06)',
                  border: '1px solid rgba(201,168,76,0.25)',
                  borderRight: 'none',
                  color: '#E7DECF',
                  fontFamily: '"Josefin Sans", sans-serif',
                  fontSize: '0.72rem',
                  outline: 'none',
                  letterSpacing: '0.04em',
                  fontWeight: 300,
                  borderRadius: '3px 0 0 3px',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(201,168,76,0.6)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(201,168,76,0.25)'}
              />
              <button
                onClick={() => { if (email) setSubDone(true) }}
                style={{
                  padding: '10px 18px',
                  background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
                  color: '#2C2416',
                  border: 'none',
                  fontFamily: '"Josefin Sans", sans-serif',
                  fontSize: '0.6rem', letterSpacing: '0.15em',
                  fontWeight: 500, textTransform: 'uppercase',
                  cursor: 'none',
                  borderRadius: '0 3px 3px 0',
                  transition: 'filter 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
              >
                Go
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{
        borderTop: '1px solid rgba(201,168,76,0.12)',
        maxWidth: '1280px', margin: '0 auto',
        padding: '20px 52px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap',
      }}>
        <p style={{
          fontFamily: '"Josefin Sans", sans-serif',
          fontSize: '0.65rem', color: '#5A5048',
          letterSpacing: '0.1em', fontWeight: 300,
        }}>
          © 2025 MoodyCraft Interior. All rights reserved.
        </p>

        {/* Bottom center links */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item) => (
            <span
              key={item}
              style={{
                fontFamily: '"Josefin Sans", sans-serif',
                fontSize: '0.62rem', color: '#5A5048',
                letterSpacing: '0.08em', fontWeight: 300,
                cursor: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#5A5048'}
            >
              {item}
            </span>
          ))}
        </div>

        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '0.9rem', fontStyle: 'italic',
          color: '#C9A84C', letterSpacing: '0.04em',
        }}>
          Designing moods, not just spaces.
        </p>
      </div>

      {/* Responsive footer grid */}
      <style>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}