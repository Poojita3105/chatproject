import React, { useEffect, useState } from 'react'

export default function Loader() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 1200)
    const t3 = setTimeout(() => setPhase(3), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div
      className="loader-curtain"
      style={{
        transition: phase === 3 ? 'transform 0.9s cubic-bezier(0.77,0,0.18,1), opacity 0.9s ease' : 'none',
        transform: phase === 3 ? 'translateY(-100%)' : 'translateY(0)',
        opacity: phase === 3 ? 0 : 1,
      }}
    >
      {/* Ambient orbs */}
      <div className="orb" style={{ width: 300, height: 300, background: '#C9A84C', top: '10%', left: '10%', animationDelay: '0s' }} />
      <div className="orb" style={{ width: 200, height: 200, background: '#A7B2AA', bottom: '20%', right: '15%', animationDelay: '2s' }} />

      {/* Logo container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Icon */}
        <div
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)',
            transition: 'all 1s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="33" stroke="#C9A84C" strokeWidth="1.5" />
            <circle cx="35" cy="35" r="26" stroke="#C9A84C" strokeWidth="0.7" opacity="0.5" />
            <path d="M35 12 L35 58 M12 35 L58 35" stroke="#C9A84C" strokeWidth="0.7" opacity="0.3" />
            <path d="M20 20 Q35 8 50 20 Q62 35 50 50 Q35 62 20 50 Q8 35 20 20Z" stroke="#C9A84C" strokeWidth="1" fill="none" opacity="0.6" />
            <circle cx="35" cy="35" r="6" fill="#C9A84C" opacity="0.8" />
            <circle cx="35" cy="35" r="3" fill="#E8C96A" />
          </svg>
        </div>

        {/* Brand name */}
        <div
          className="mt-6 text-center"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}
        >
          <h1
            className="gold-shimmer"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 300,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            MoodyCraft
          </h1>
          <p
            style={{
              fontFamily: '"Josefin Sans", sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: '#A7B2AA',
              marginTop: '6px',
              fontWeight: 300,
            }}
          >
            Interior Design Studio
          </p>
        </div>

        {/* Loading bar */}
        <div
          className="mt-10"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          <div style={{ width: 200, height: 1, background: 'rgba(201,168,76,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div
              style={{
                position: 'absolute',
                height: '100%',
                background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                width: phase >= 2 ? '100%' : '30%',
                transition: 'width 1.5s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          </div>
          <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.3em', color: '#B8B2AA', textAlign: 'center', marginTop: '10px', textTransform: 'uppercase' }}>
            Crafting your experience
          </p>
        </div>
      </div>
    </div>
  )
}