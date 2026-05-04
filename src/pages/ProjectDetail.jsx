import React, { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useScrollAnimations } from '../hooks/useScrollAnimation'
import { GoldLine, TornEdgeTop } from '../components/TornEdge'

const PROJECTS = {
  '1': {
    title: 'The Ivory Suite',
    client: 'Aryan & Priya Mehta',
    location: 'Worli, Mumbai',
    category: 'Residential Villa',
    area: '4200 sq ft',
    duration: '8 months',
    desc: "A masterpiece in restrained luxury. The Ivory Suite reimagines a sprawling Worli penthouse through layers of pale stone, warm brass, and hand-stitched linen. Each room flows organically into the next, blurring the line between art and architecture.",
    before: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80',
    after: 'https://i.pinimg.com/1200x/ca/10/f3/ca10f386a9f85d0c37e2a5d10e209371.jpg',
    rooms: {
      'Living Room': 'https://i.pinimg.com/1200x/ca/10/f3/ca10f386a9f85d0c37e2a5d10e209371.jpg',
      'Master Bedroom': 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80',
      'Kitchen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      'Bathroom': 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
    },
  },
  '2': {
    title: 'Velvet Commerce',
    client: 'NexGen Corporation',
    location: 'Indiranagar, Bangalore',
    category: 'Commercial Office',
    area: '8000 sq ft',
    duration: '5 months',
    desc: "An office that communicates authority without coldness. Velvet Commerce marries dark oak with champagne-toned upholstery and dramatic pendant lighting to create a workspace that energizes while remaining deeply professional.",
    before: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&q=80',
    after: 'https://i.pinimg.com/736x/b5/e4/fc/b5e4fcfae3bb2c0a198c8900b4432037.jpg',
    rooms: {
      'Reception': 'https://i.pinimg.com/736x/b5/e4/fc/b5e4fcfae3bb2c0a198c8900b4432037.jpg',
      'Conference': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'Workstations': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
      'Lounge': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    },
  },
  '3': {
    title: 'The Bronze Loft',
    client: 'Rohan & Sneha Kulkarni',
    location: 'Koregaon Park, Pune',
    category: 'Turnkey Project',
    area: '2800 sq ft',
    duration: '6 months',
    desc: "Industrial warmth defined by burnished bronze, exposed brick, and cascading greenery. The Bronze Loft proves that a turnkey project can still feel deeply personal and utterly unique.",
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    after: 'https://i.pinimg.com/1200x/b0/0d/8b/b00d8bef45550c2ac16a11ca7915da92.jpg',
    rooms: {
      'Living': 'https://i.pinimg.com/1200x/b0/0d/8b/b00d8bef45550c2ac16a11ca7915da92.jpg',
      'Dining': 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80',
      'Bedroom': 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80',
      'Terrace': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    },
  },
  '4': {
    title: 'Silk Penthouse',
    client: 'Amit Kapoor',
    location: 'New Delhi',
    category: 'Luxury Penthouse',
    area: '5500 sq ft',
    duration: '10 months',
    desc: "Delhi's skyline serves as the canvas for this extraordinary penthouse. Silk textures in muted champagne and dusty rose are juxtaposed against graphite concrete ceilings, producing an interior of rare sophistication.",
    before: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    after: 'https://i.pinimg.com/736x/6c/3b/59/6c3b59b330088059538df39e9187d339.jpg',
    rooms: {
      'Master Bedroom': 'https://i.pinimg.com/736x/6c/3b/59/6c3b59b330088059538df39e9187d339.jpg',
      'Walk-in Closet': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
      'Lounge': 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
      'Terrace': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    },
  },
  '5': {
    title: 'Onyx Living',
    client: 'Sharma Family',
    location: 'Hyderabad',
    category: 'Residential Villa',
    area: '3800 sq ft',
    duration: '7 months',
    desc: "The Onyx Living project channels the drama of deep black stone against cream-washed walls and amber-lit alcoves. A family home that commands presence while remaining effortlessly warm.",
    before: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    after: 'https://i.pinimg.com/1200x/55/43/8d/55438d23309d8e910e533c977c941f49.jpg',
    rooms: {
      'Living Room': 'https://i.pinimg.com/1200x/55/43/8d/55438d23309d8e910e533c977c941f49.jpg',
      'Dining': 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80',
      'Study': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
      'Garden': 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80',
    },
  },
  '6': {
    title: 'Pearl Bedroom',
    client: 'Vikram & Ananya Nair',
    location: 'Chennai',
    category: 'Bedroom Suite',
    area: '900 sq ft',
    duration: '3 months',
    desc: "A sanctuary of luminescent calm. The Pearl Bedroom layers ivory silk drapery, mother-of-pearl inlaid furniture, and soft recessed lighting to craft a retreat that feels perpetually at golden hour.",
    before: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    after: 'https://i.pinimg.com/736x/69/85/1f/69851f1eefe8a7ace29395295b1ec82f.jpg',
    rooms: {
      'Bedroom': 'https://i.pinimg.com/736x/69/85/1f/69851f1eefe8a7ace29395295b1ec82f.jpg',
      'En-suite Bath': 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
      'Dressing Area': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
      'Reading Nook': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
    },
  },
  '7': {
    title: 'Ember Kitchen',
    client: 'Gupta Residence',
    location: 'Jaipur',
    category: 'Kitchen Renovation',
    area: '600 sq ft',
    duration: '2 months',
    desc: "Jaipur's rich artisan heritage informed every surface of the Ember Kitchen. Hand-fired terracotta tiles, smoked brass fixtures, and a custom island in aged walnut make this a kitchen as beautiful as it is functional.",
    before: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    after: 'https://i.pinimg.com/736x/fa/70/e1/fa70e15777f42c61dad8d7453dcd8299.jpg',
    rooms: {
      'Main Kitchen': 'https://i.pinimg.com/736x/fa/70/e1/fa70e15777f42c61dad8d7453dcd8299.jpg',
      'Pantry': 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80',
      'Breakfast Bar': 'https://images.unsplash.com/photo-1556909172-8c2f041fca1e?w=800&q=80',
      'Utility': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    },
  },
  '8': {
    title: 'Marble Office',
    client: 'FinPulse Ltd',
    location: 'Gurgaon',
    category: 'Corporate Office',
    area: '12000 sq ft',
    duration: '6 months',
    desc: "Commanding and precise, the FinPulse headquarters uses Carrara marble, smoked glass partitions, and a monochromatic palette to project the confidence of a market leader. Every detail speaks the language of trust.",
    before: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&q=80',
    after: 'https://i.pinimg.com/1200x/9b/1c/ab/9b1cabdb313037ab55905f305c7f7d3e.jpg',
    rooms: {
      'Executive Floor': 'https://i.pinimg.com/1200x/9b/1c/ab/9b1cabdb313037ab55905f305c7f7d3e.jpg',
      'Boardroom': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'Open Plan': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
      'Reception': 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80',
    },
  },
  '9': {
    title: 'Sage Suite',
    client: 'Mehra & Co.',
    location: 'Kolkata',
    category: 'Boutique Suite',
    area: '1200 sq ft',
    duration: '4 months',
    desc: "Kolkata's literary spirit is woven into the Sage Suite through botanical prints, muted sage upholstery, and curated antiques. A bedroom that feels like a well-worn novel — layered, warm, and utterly transportive.",
    before: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    after: 'https://i.pinimg.com/1200x/dc/49/a1/dc49a159ef8d5f1040ebe5a6ae523052.jpg',
    rooms: {
      'Bedroom': 'https://i.pinimg.com/1200x/dc/49/a1/dc49a159ef8d5f1040ebe5a6ae523052.jpg',
      'Sitting Area': 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
      'Bathroom': 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
      'Study Corner': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
    },
  },
  '10': {
    title: 'Olive Lounge',
    client: 'Patel Family',
    location: 'Ahmedabad',
    category: 'Residential Living',
    area: '2200 sq ft',
    duration: '5 months',
    desc: "Sun-drenched Ahmedabad inspired a palette of warm olive, burnt sienna, and raw linen. The Olive Lounge celebrates the unhurried pleasures of family living through furniture that invites long evenings of conversation.",
    before: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    after: 'https://i.pinimg.com/1200x/31/a0/50/31a0504ba84c86e391342cb3121c9de4.jpg',
    rooms: {
      'Living Room': 'https://i.pinimg.com/1200x/31/a0/50/31a0504ba84c86e391342cb3121c9de4.jpg',
      'Dining': 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80',
      'Patio': 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80',
      'Foyer': 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80',
    },
  },
  '11': {
    title: 'Modern Workspace',
    client: 'TechHive',
    location: 'Pune',
    category: 'Tech Office',
    area: '6500 sq ft',
    duration: '4 months',
    desc: "Agile, energetic, and uncompromisingly modern. The TechHive office blends biophilic design with open collaboration zones, acoustic booths, and a rooftop lounge that doubles as the city's best brainstorming space.",
    before: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&q=80',
    after: 'https://i.pinimg.com/1200x/f2/d5/21/f2d5211000b33d46d344af200c065c97.jpg',
    rooms: {
      'Main Floor': 'https://i.pinimg.com/1200x/f2/d5/21/f2d5211000b33d46d344af200c065c97.jpg',
      'Collaboration Zone': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
      'Pods': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'Rooftop Lounge': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    },
  },
  '12': {
    title: 'Minimal Kitchen',
    client: 'Shah Residence',
    location: 'Surat',
    category: 'Kitchen Design',
    area: '450 sq ft',
    duration: '2 months',
    desc: "A study in conscious restraint. The Shah kitchen strips away everything unnecessary to reveal a space of quiet perfection — handleless cabinetry in bone white, a waterfall island in honed Calacatta, and a single statement pendant.",
    before: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    after: 'https://i.pinimg.com/1200x/37/6c/6c/376c6c90352c7af346aa47e9bdca404c.jpg',
    rooms: {
      'Main Kitchen': 'https://i.pinimg.com/1200x/37/6c/6c/376c6c90352c7af346aa47e9bdca404c.jpg',
      'Island': 'https://images.unsplash.com/photo-1556909172-8c2f041fca1e?w=800&q=80',
      'Pantry': 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80',
      'Dining Nook': 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80',
    },
  },
  '13': {
    title: 'Luxury Bedroom',
    client: 'Kapoor Family',
    location: 'Delhi',
    category: 'Master Suite',
    area: '1100 sq ft',
    duration: '4 months',
    desc: "Royalty reimagined for contemporary Delhi. The Kapoor suite fuses hand-embroidered headboard panels, a gilded ceiling rose, and custom furniture upholstered in velvet to conjure an atmosphere of effortless grandeur.",
    before: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
    rooms: {
      'Bedroom': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
      'Dressing Room': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
      'En-suite': 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
      'Balcony': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    },
  },
  '14': {
    title: 'Classic Living',
    client: 'Verma Family',
    location: 'Lucknow',
    category: 'Heritage Home',
    area: '3200 sq ft',
    duration: '9 months',
    desc: "Lucknow's legendary Nawabi culture finds a contemporary expression in the Verma home. Chikankari-inspired wall panels, jaali screens, and heirloom furniture pieces create an interior steeped in history yet designed for modern life.",
    before: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    after: 'https://i.pinimg.com/736x/04/18/4d/04184deaef29edc99d28b44ac35dea31.jpg',
    rooms: {
      'Drawing Room': 'https://i.pinimg.com/736x/04/18/4d/04184deaef29edc99d28b44ac35dea31.jpg',
      'Dining Hall': 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80',
      'Library': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
      'Courtyard': 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80',
    },
  },
  '15': {
    title: 'Executive Office',
    client: 'BizCore',
    location: 'Mumbai',
    category: 'Corporate Office',
    area: '9000 sq ft',
    duration: '5 months',
    desc: "Mumbai's financial district demanded an office that radiates gravitas. BizCore's headquarters uses floor-to-ceiling glazing, custom leather wall panels, and curated art installations to position the brand as a market leader.",
    before: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&q=80',
    after: 'https://i.pinimg.com/736x/f2/e3/e5/f2e3e5413e211a088c19f83267fc779b.jpg',
    rooms: {
      'CEO Suite': 'https://i.pinimg.com/736x/f2/e3/e5/f2e3e5413e211a088c19f83267fc779b.jpg',
      'Boardroom': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'Trading Floor': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
      'Client Lounge': 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80',
    },
  },
  '16': {
    title: 'Elegant Kitchen',
    client: 'Reddy Family',
    location: 'Hyderabad',
    category: 'Kitchen Design',
    area: '700 sq ft',
    duration: '3 months',
    desc: "A kitchen that is also a showpiece. For the Reddys, we designed a space anchored by deep navy cabinetry, unlacquered brass hardware, and a sweeping arched window that floods the cook's workspace with Hyderabad's warm afternoon light.",
    before: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    after: 'https://i.pinimg.com/1200x/e7/d8/dc/e7d8dcc4ecacb060976990245ed9cd46.jpg',
    rooms: {
      'Main Kitchen': 'https://i.pinimg.com/1200x/e7/d8/dc/e7d8dcc4ecacb060976990245ed9cd46.jpg',
      'Scullery': 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80',
      'Breakfast Room': 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80',
      'Larder': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    },
  },
  '17': {
    title: 'Cozy Bedroom',
    client: 'Singh Family',
    location: 'Chandigarh',
    category: 'Bedroom Retreat',
    area: '800 sq ft',
    duration: '3 months',
    desc: "Chandigarh's clean modernist grid inspired a bedroom that finds warmth through texture rather than ornamentation. Chunky knit throws, a curved oak bedframe, and plaster walls in a soft umber create a cocoon of unrivalled comfort.",
    before: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    after: 'https://i.pinimg.com/736x/2a/cb/0d/2acb0d3ef5e89f4fac7f3b5ae5257dab.jpg',
    rooms: {
      'Bedroom': 'https://i.pinimg.com/736x/2a/cb/0d/2acb0d3ef5e89f4fac7f3b5ae5257dab.jpg',
      'En-suite': 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
      'Reading Corner': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
      'Wardrobe': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
    },
  },
  '18': {
    title: 'Urban Living',
    client: 'Mehta Family',
    location: 'Bangalore',
    category: 'Urban Apartment',
    area: '1800 sq ft',
    duration: '4 months',
    desc: 'A Bangalore apartment that punches well above its square footage. Clever spatial planning, mirrored alcoves, and a restrained palette of charcoal, cream, and warm timber make the Urban Loft feel expansive, curated, and effortlessly cool.',
    before: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
    rooms: {
      'Living Room': 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
      'Kitchen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      'Bedroom': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
      'Balcony': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    },
  },
}

function BeforeAfterSlider({ before, after }) {
  const [sliderX, setSliderX] = useState(50)
  const containerRef = useRef(null)
  const isDragging = useRef(false)

  const handleMove = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    setSliderX(x)
  }

  return (
    <div
      ref={containerRef}
      className="before-after-container"
      style={{ width: '100%', height: '500px', position: 'relative', userSelect: 'none' }}
      onMouseMove={(e) => isDragging.current && handleMove(e.clientX)}
      onMouseDown={(e) => { isDragging.current = true; handleMove(e.clientX) }}
      onMouseUp={() => isDragging.current = false}
      onMouseLeave={() => isDragging.current = false}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* After image (full) */}
      <img src={after} alt="After" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />

      {/* Before image (clipped) */}
      <div style={{ position: 'absolute', inset: 0, width: `${sliderX}%`, overflow: 'hidden' }}>
        <img src={before} alt="Before" style={{ position: 'absolute', inset: 0, width: `${10000 / sliderX}%`, maxWidth: 'none', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(44,36,22,0.8)', padding: '6px 14px', borderLeft: '2px solid #CCB9B5' }}>
          <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#E7DECF', textTransform: 'uppercase' }}>Before</p>
        </div>
      </div>

      {/* After label */}
      <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(44,36,22,0.8)', padding: '6px 14px', borderRight: '2px solid #C9A84C' }}>
        <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#E7DECF', textTransform: 'uppercase' }}>After</p>
      </div>

      {/* Slider line */}
      <div
        className="before-after-slider"
        style={{ left: `${sliderX}%` }}
      >
        <div className="before-after-handle" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <span style={{ fontSize: '14px', color: '#2C2416' }}>⟷</span>
        </div>
      </div>
    </div>
  )
}

export default function ProjectDetail() {
  const { id } = useParams()
  const project = PROJECTS[id] || PROJECTS['1']
  const [activeRoom, setActiveRoom] = useState(Object.keys(project.rooms)[0])
  const [slideDir, setSlideDir] = useState('right')
  const [imgVisible, setImgVisible] = useState(true)
  useScrollAnimations()

  // Reset room tab when project changes
  useEffect(() => {
    setActiveRoom(Object.keys(project.rooms)[0])
    setImgVisible(true)
  }, [id])

  const changeRoom = (room) => {
    setImgVisible(false)
    setSlideDir('right')
    setTimeout(() => {
      setActiveRoom(room)
      setImgVisible(true)
    }, 250)
  }

  const roomKeys = Object.keys(project.rooms)

  return (
    <div style={{ background: 'linear-gradient(180deg, #A7B2AA 0%, #E7DECF 30%, #EEECE0 60%)' }}>

      {/* Hero */}
      <section style={{ height: '80vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${project.after})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,20,16,0.95) 0%, rgba(26,20,16,0.4) 60%, transparent 100%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full" style={{ animation: 'revealUp 1s cubic-bezier(0.16,1,0.3,1) 0.3s both' }}>
          <Link to="/portfolio" style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', transition: 'gap 0.3s ease' }}>
            ← Back to Portfolio
          </Link>
          <p className="section-label mb-3" style={{ color: '#E8C96A' }}>{project.category}</p>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 300, color: '#EEECE0', lineHeight: 1, marginBottom: '20px' }}>
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-8">
            {[
              { label: 'Client', val: project.client },
              { label: 'Location', val: project.location },
              { label: 'Area', val: project.area },
              { label: 'Duration', val: project.duration },
            ].map((d) => (
              <div key={d.label}>
                <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.55rem', letterSpacing: '0.25em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '4px' }}>{d.label}</p>
                <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.8rem', color: '#E7DECF', fontWeight: 300 }}>{d.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After section */}
      <section style={{ background: '#2C2416', padding: '80px 6vw' }}>
        <div className="max-w-7xl mx-auto">
          <div className="slide-up text-center mb-12">
            <p className="section-label mb-3">The Transformation</p>
            <h2 className="section-title" style={{ color: '#E7DECF' }}>
              Before & <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>After</em>
            </h2>
            <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.72rem', color: '#B8B2AA', marginTop: '12px', letterSpacing: '0.15em' }}>
              Drag the slider to compare
            </p>
          </div>
          <div className="slide-up">
            <BeforeAfterSlider key={id} before={project.before} after={project.after} />
          </div>
        </div>
      </section>

      {/* Room tabs */}
      <section style={{ background: '#EEECE0', padding: '80px 6vw' }}>
        <div className="max-w-7xl mx-auto">
          <div className="slide-up mb-10">
            <p className="section-label mb-4">Room Tour</p>
            <h2 className="section-title" style={{ color: '#2C2416', marginBottom: '40px' }}>
              Explore Every <em style={{ fontStyle: 'italic', color: '#5A4A3A' }}>Space</em>
            </h2>

            {/* Tab buttons */}
            <div className="flex gap-3 flex-wrap mb-8">
              {roomKeys.map((room) => (
                <button
                  key={room}
                  onClick={() => changeRoom(room)}
                  style={{
                    fontFamily: '"Josefin Sans", sans-serif',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    padding: '10px 22px',
                    background: activeRoom === room ? 'linear-gradient(135deg, #C9A84C, #E8C96A)' : 'transparent',
                    border: `1px solid ${activeRoom === room ? '#C9A84C' : 'rgba(44,36,22,0.25)'}`,
                    color: activeRoom === room ? '#2C2416' : '#5A4A3A',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: activeRoom === room ? 500 : 300,
                  }}
                >
                  {room}
                </button>
              ))}
            </div>

            {/* Room image */}
            <div style={{
              overflow: 'hidden',
              border: '1px solid rgba(201,168,76,0.3)',
              position: 'relative',
            }}>
              <img
                src={project.rooms[activeRoom]}
                alt={activeRoom}
                style={{
                  width: '100%',
                  height: 'clamp(300px, 50vw, 560px)',
                  objectFit: 'cover',
                  opacity: imgVisible ? 1 : 0,
                  transform: imgVisible ? 'translateX(0)' : `translateX(${slideDir === 'right' ? '40px' : '-40px'})`,
                  transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                }}
              />
              <div style={{ position: 'absolute', bottom: 20, left: 20, background: 'rgba(44,36,22,0.8)', backdropFilter: 'blur(10px)', padding: '10px 20px', borderLeft: '2px solid #C9A84C' }}>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', color: '#E7DECF', fontStyle: 'italic' }}>{activeRoom}</p>
              </div>
            </div>
          </div>

          {/* Project description */}
          <div className="grid md:grid-cols-2 gap-16 mt-20">
            <div className="slide-left">
              <p className="section-label mb-4">About This Project</p>
              <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 300, color: '#2C2416', marginBottom: '20px' }}>
                The Design Story
              </h3>
              <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.85rem', color: '#5A4A3A', lineHeight: 2, fontWeight: 300 }}>
                {project.desc}
              </p>
            </div>
            <div className="slide-right">
              <p className="section-label mb-4">Project Details</p>
              {[
                { label: 'Client', val: project.client },
                { label: 'Location', val: project.location },
                { label: 'Category', val: project.category },
                { label: 'Total Area', val: project.area },
                { label: 'Duration', val: project.duration },
              ].map((d) => (
                <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(44,36,22,0.1)' }}>
                  <span style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 400 }}>{d.label}</span>
                  <span style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.8rem', color: '#2C2416', fontWeight: 300 }}>{d.val}</span>
                </div>
              ))}
              <div className="mt-10">
                <Link to="/contact">
                  <button className="btn-gold" style={{ width: '100%' }}><span>Start Similar Project</span></button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next project */}
      <div style={{ background: '#2C2416' }}>
        <TornEdgeTop fillColor="#EEECE0" />
      </div>
      <section style={{ background: '#2C2416', padding: '80px 6vw', textAlign: 'center' }}>
        <div className="slide-up">
          <p className="section-label mb-3" style={{ color: '#C9A84C' }}>Continue Exploring</p>
          <Link to="/portfolio">
            <button className="btn-outline" style={{ marginTop: '12px' }}>View All Projects</button>
          </Link>
        </div>
      </section>
    </div>
  )
}