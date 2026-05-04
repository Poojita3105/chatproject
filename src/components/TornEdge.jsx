import React from 'react'

export function TornEdgeBottom({ fillColor = '#EEECE0', fromColor = 'transparent' }) {
  return (
    <div style={{ position: 'relative', lineHeight: 0, zIndex: 10 }}>
      <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
        style={{ width: '100%', height: '70px', display: 'block' }}>
        <path
          d="M0,35 C30,15 60,55 90,35 C120,15 150,50 180,30 C210,10 240,55 270,35 C300,15 330,52 360,32 C390,12 420,50 450,28 C480,6 510,54 540,34 C570,14 600,50 630,30 C660,10 690,52 720,32 C750,12 780,50 810,28 C840,6 870,54 900,34 C930,14 960,50 990,30 C1020,10 1050,52 1080,32 C1110,12 1140,50 1170,28 C1200,6 1230,54 1260,34 C1290,14 1320,50 1350,30 C1380,10 1410,48 1440,28 L1440,70 L0,70 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  )
}

export function TornEdgeTop({ fillColor = '#EEECE0' }) {
  return (
    <div style={{ position: 'relative', lineHeight: 0, zIndex: 10 }}>
      <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
        style={{ width: '100%', height: '70px', display: 'block' }}>
        <path
          d="M0,35 C30,55 60,15 90,35 C120,55 150,20 180,40 C210,60 240,15 270,35 C300,55 330,18 360,38 C390,58 420,20 450,42 C480,64 510,16 540,36 C570,56 600,20 630,40 C660,60 690,18 720,38 C750,58 780,20 810,42 C840,64 870,16 900,36 C930,56 960,20 990,40 C1020,60 1050,18 1080,38 C1110,58 1140,20 1170,42 C1200,64 1230,16 1260,36 C1290,56 1320,20 1350,40 C1380,60 1410,22 1440,42 L1440,0 L0,0 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  )
}

export function GoldLine() {
  return (
    <div style={{ position: 'relative', padding: '0 0 2px' }}>
      <div style={{
        height: '2px',
        background: 'linear-gradient(90deg, transparent 0%, #C9A84C 20%, #E8C96A 50%, #C9A84C 80%, transparent 100%)',
        position: 'relative',
      }}>
        <span style={{ position: 'absolute', left: '25%', top: '50%', transform: 'translate(-50%,-50%)', color: '#C9A84C', fontSize: '8px' }}>◆</span>
        <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', color: '#E8C96A', fontSize: '10px' }}>◆</span>
        <span style={{ position: 'absolute', left: '75%', top: '50%', transform: 'translate(-50%,-50%)', color: '#C9A84C', fontSize: '8px' }}>◆</span>
      </div>
    </div>
  )
}

export function SectionDivider({ topColor = '#EEECE0', bottomColor = '#2C2416' }) {
  return (
    <div style={{ position: 'relative' }}>
      <TornEdgeBottom fillColor={bottomColor} />
      <GoldLine />
    </div>
  )
}