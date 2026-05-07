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
    before: 'https://i.pinimg.com/1200x/03/65/97/036597b695e28c44700aad2d3f934749.jpg?w=500&q=10',
    after: 'https://i.pinimg.com/1200x/ca/10/f3/ca10f386a9f85d0c37e2a5d10e209371.jpg',
    rooms: {
      'Living Room': 'https://i.pinimg.com/1200x/ca/10/f3/ca10f386a9f85d0c37e2a5d10e209371.jpg',
      'Master Bedroom': 'https://i.pinimg.com/736x/88/5d/5d/885d5dc1817d96738d860b9b6849d8cf.jpg?w=800&q=80',
      'Kitchen': 'https://i.pinimg.com/originals/dd/0f/34/dd0f3417434e2314b45c3ef1c404d364.jpg?w=800&q=80',
      'Bathroom': 'https://i.pinimg.com/1200x/4a/18/83/4a1883e4f3a5ab8403ffbec656eace8d.jpg?w=800&q=80',
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
    after: 'https://i.pinimg.com/736x/f9/bf/f8/f9bff85afbd0c96cf28129f092aa31ed.jpg',
    rooms: {
      'Reception': 'https://i.pinimg.com/1200x/f3/eb/fb/f3ebfba4e95988ef98d1fa0834c763a9.jpg',
      'Conference': 'https://i.pinimg.com/736x/d5/1a/77/d51a775b8e577760cd48bb1ea25e7907.jpg?w=800&q=80',
      'Workstations': 'https://i.pinimg.com/1200x/f3/1a/3f/f31a3f8e70ceec8895c1cd108aa0855b.jpg?w=800&q=80',
      'Lounge': 'https://i.pinimg.com/736x/d7/ff/c5/d7ffc54390957b21f8eec5836c0de12a.jpg?w=800&q=80',
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
    before: 'https://i.pinimg.com/736x/f9/d8/8e/f9d88e9f184aaeafdabf07d3c5b1fafc.jpg?w=800&q=80',
    after: 'https://i.pinimg.com/1200x/b0/0d/8b/b00d8bef45550c2ac16a11ca7915da92.jpg',
    rooms: {
      'Living': 'https://i.pinimg.com/1200x/b0/0d/8b/b00d8bef45550c2ac16a11ca7915da92.jpg',
      'Dining': 'https://i.pinimg.com/736x/ce/1d/9f/ce1d9fb0be0b351f82982ab814c9b89d.jpg?w=800&q=80',
      'Bedroom': 'https://i.pinimg.com/736x/f2/39/30/f239305499daab75290fa056900aa424.jpg?w=800&q=80',
      'Terrace': 'https://i.pinimg.com/736x/22/af/50/22af50fc5d817f41e3c6a69c1c5b46ae.jpg?w=800&q=80',
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
      'Kitchen': 'https://i.pinimg.com/736x/6c/3b/59/6c3b59b330088059538df39e9187d339.jpg',
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
    after: 'https://i.pinimg.com/736x/0d/46/2b/0d462b1be4536aeab9fa55bab426726a.jpg',
    rooms: {
      'Living Room': 'https://i.pinimg.com/736x/0d/46/2b/0d462b1be4536aeab9fa55bab426726a.jpg',
      'Dining': 'https://i.pinimg.com/1200x/b1/25/3d/b1253d29df2f2f3cbd78bff7e97a1a9f.jpg?w=800&q=80',
      'Study': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
      'Garden': 'https://i.pinimg.com/736x/9f/8e/6f/9f8e6f62cda4f5ff77f3c286a9d83212.jpg?w=800&q=80',
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
      'Reading Nook': 'https://i.pinimg.com/1200x/f6/82/f6/f682f67bc14ac719c045d16c363207aa.jpg?w=800&q=80',
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

// ─────────────────────────────────────────────
// Before / After Slider
// ─────────────────────────────────────────────
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
      onMouseUp={() => { isDragging.current = false }}
      onMouseLeave={() => { isDragging.current = false }}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* After image (full) */}
      <img
        src={after}
        alt="After"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* Before image (clipped) */}
      <div style={{ position: 'absolute', inset: 0, width: `${sliderX}%`, overflow: 'hidden' }}>
        <img
          src={before}
          alt="Before"
          style={{
            position: 'absolute', inset: 0,
            width: `${10000 / sliderX}%`,
            maxWidth: 'none',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'rgba(44,36,22,0.8)',
          padding: '6px 14px',
          borderLeft: '2px solid #CCB9B5',
        }}>
          <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#E7DECF', textTransform: 'uppercase' }}>Before</p>
        </div>
      </div>

      {/* After label */}
      <div style={{
        position: 'absolute', top: 12, right: 12,
        background: 'rgba(44,36,22,0.8)',
        padding: '6px 14px',
        borderRight: '2px solid #C9A84C',
      }}>
        <p style={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#E7DECF', textTransform: 'uppercase' }}>After</p>
      </div>

      {/* Slider line */}
      <div className="before-after-slider" style={{ left: `${sliderX}%` }}>
        <div className="before-after-handle" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <span style={{ fontSize: '14px', color: '#2C2416' }}>⟷</span>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Room Carousel
// ─────────────────────────────────────────────
function RoomCarousel({ rooms }) {
  const roomEntries = Object.entries(rooms)
  const total = roomEntries.length
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const autoRef = useRef(null)

  const goTo = (index) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent((index + total) % total)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const prev = () => goTo(current - 1)
  const next = () => goTo(current + 1)

  const startAuto = () => {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total)
    }, 3500)
  }

  useEffect(() => {
    startAuto()
    return () => clearInterval(autoRef.current)
  }, [total])

  const pauseAuto = () => clearInterval(autoRef.current)
  const resumeAuto = () => startAuto()

  // Show prev, active, next
  const getVisibleSlides = () => {
    const slides = []
    for (let i = -1; i <= 1; i++) {
      slides.push((current + i + total) % total)
    }
    return slides
  }

  // Touch / swipe support
  const touchStartX = useRef(null)
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  return (
    <div
      style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '20px 0 40px' }}
      onMouseEnter={pauseAuto}
      onMouseLeave={resumeAuto}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        padding: '0 70px',
      }}>
        {getVisibleSlides().map((slideIndex, pos) => {
          const [roomName, roomImg] = roomEntries[slideIndex]
          const isCenter = pos === 1

          return (
            <div
              key={`${slideIndex}-${pos}`}
              onClick={() => !isCenter && goTo(slideIndex)}
              style={{
                flex: isCenter ? '0 0 58%' : '0 0 19%',
                maxWidth: isCenter ? '58%' : '19%',
                height: isCenter ? '480px' : '300px',
                position: 'relative',
                overflow: 'hidden',
                border: isCenter ? '2px solid #C9A84C' : '1px solid rgba(201,168,76,0.25)',
                transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
                opacity: isCenter ? 1 : 0.5,
                cursor: isCenter ? 'default' : 'pointer',
                filter: isCenter ? 'brightness(1)' : 'brightness(0.6)',
                flexShrink: 0,
                borderRadius: '2px',
              }}
            >
              <img
                src={roomImg}
                alt={roomName}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                  transform: isCenter ? 'scale(1.04)' : 'scale(1)',
                  pointerEvents: 'none',
                }}
              />

              {/* Dark overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: isCenter
                  ? 'linear-gradient(to top, rgba(26,20,16,0.8) 0%, transparent 55%)'
                  : 'rgba(26,20,16,0.25)',
                transition: 'all 0.4s ease',
              }} />

              {/* Center label */}
              {isCenter && (
                <div style={{
                  position: 'absolute', bottom: 24, left: 24, right: 24,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                }}>
                  <div style={{
                    background: 'rgba(44,36,22,0.85)',
                    backdropFilter: 'blur(12px)',
                    padding: '10px 20px',
                    borderLeft: '2px solid #C9A84C',
                  }}>
                    <p style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '1.25rem',
                      color: '#E7DECF',
                      fontStyle: 'italic',
                      margin: 0,
                    }}>
                      {roomName}
                    </p>
                  </div>
                  <p style={{
                    fontFamily: '"Josefin Sans", sans-serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    color: 'rgba(231,222,207,0.55)',
                    textTransform: 'uppercase',
                  }}>
                    {current + 1} / {total}
                  </p>
                </div>
              )}

              {/* Side label */}
              {!isCenter && (
                <div style={{
                  position: 'absolute', bottom: 14, left: 0, right: 0, textAlign: 'center',
                }}>
                  <p style={{
                    fontFamily: '"Josefin Sans", sans-serif',
                    fontSize: '0.55rem',
                    letterSpacing: '0.2em',
                    color: 'rgba(231,222,207,0.65)',
                    textTransform: 'uppercase',
                  }}>
                    {roomName}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Prev / Next arrows */}
      {[
        { dir: 'prev', fn: prev, symbol: '←', side: 'left'  },
        { dir: 'next', fn: next, symbol: '→', side: 'right' },
      ].map(({ dir, fn, symbol, side }) => (
        <button
          key={dir}
          onClick={fn}
          style={{
            position: 'absolute',
            top: '44%',
            [side]: '14px',
            transform: 'translateY(-50%)',
            width: '48px',
            height: '48px',
            background: 'rgba(44,36,22,0.85)',
            border: '1px solid rgba(201,168,76,0.5)',
            color: '#C9A84C',
            fontSize: '1.1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#C9A84C'
            e.currentTarget.style.color = '#2C2416'
            e.currentTarget.style.borderColor = '#C9A84C'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(44,36,22,0.85)'
            e.currentTarget.style.color = '#C9A84C'
            e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'
          }}
        >
          {symbol}
        </button>
      ))}

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '28px' }}>
        {roomEntries.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? '28px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === current ? '#C9A84C' : 'rgba(201,168,76,0.3)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Project Detail Page
// ─────────────────────────────────────────────
export default function ProjectDetail() {
  const { id } = useParams()
  const project = PROJECTS[id] || PROJECTS['1']
  useScrollAnimations()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  return (
    <div style={{ background: 'linear-gradient(180deg, #A7B2AA 0%, #E7DECF 30%, #EEECE0 60%)' }}>

     {/* ── Hero ── */}
<section style={{
  height: '100vh',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'flex-end',
}}>
  {/* Animated background */}
  <div style={{
    position: 'absolute', inset: 0,
    backgroundImage: `url(${project.after})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    animation: 'heroZoom 8s ease-out forwards',
  }} />

  {/* Gradient layers */}
  <div style={{
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to top, rgba(26,20,16,1) 0%, rgba(26,20,16,0.5) 50%, rgba(26,20,16,0.15) 100%)',
  }} />
  <div style={{
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to right, rgba(26,20,16,0.6) 0%, transparent 60%)',
  }} />

  {/* Gold top line */}
  <div style={{
    position: 'absolute', top: 0, left: 0, right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, transparent, #C9A84C, #E8C96A, #C9A84C, transparent)',
    animation: 'fadeIn 1.5s ease 0.5s both',
  }} />

  {/* Content */}
  <div className="relative z-10 w-full" style={{ padding: '0 6vw 60px' }}>

    {/* Back link */}
    <div style={{ animation: 'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
      <Link
        to="/portfolio"
        style={{
          fontFamily: '"Josefin Sans", sans-serif',
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          color: 'rgba(201,168,76,0.7)',
          textTransform: 'uppercase',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '40px',
          transition: 'all 0.3s ease',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#C9A84C'
          e.currentTarget.style.gap = '16px'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'rgba(201,168,76,0.7)'
          e.currentTarget.style.gap = '10px'
        }}
      >
        <span style={{ fontSize: '1rem' }}>←</span> Back to Portfolio
      </Link>
    </div>

    {/* Category pill */}
    <div style={{ animation: 'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s both' }}>
      <span style={{
        fontFamily: '"Josefin Sans", sans-serif',
        fontSize: '0.58rem',
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color: '#2C2416',
        background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
        padding: '6px 18px',
        display: 'inline-block',
        marginBottom: '20px',
        fontWeight: 500,
      }}>
        {project.category}
      </span>
    </div>

    {/* Title */}
    <div style={{ animation: 'revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s both' }}>
      <h1 style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 'clamp(3rem, 8vw, 7.5rem)',
        fontWeight: 300,
        color: '#EEECE0',
        lineHeight: 0.95,
        letterSpacing: '-0.02em',
        marginBottom: '8px',
      }}>
        {project.title.split(' ').slice(0, -1).join(' ')}
      </h1>
      <h1 style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 'clamp(3rem, 8vw, 7.5rem)',
        fontWeight: 300,
        color: '#C9A84C',
        fontStyle: 'italic',
        lineHeight: 0.95,
        letterSpacing: '-0.02em',
        marginBottom: '32px',
      }}>
        {project.title.split(' ').slice(-1)[0]}
      </h1>
    </div>

    {/* Divider */}
    <div style={{
      animation: 'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both',
      width: '80px',
      height: '1px',
      background: 'linear-gradient(90deg, #C9A84C, transparent)',
      marginBottom: '32px',
    }} />

    {/* Stats row */}
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0',
        animation: 'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.65s both',
      }}
    >
      {[
        { label: 'Client',   val: project.client   },
        { label: 'Location', val: project.location },
        { label: 'Area',     val: project.area     },
        { label: 'Duration', val: project.duration },
      ].map((d, i) => (
        <div
          key={d.label}
          style={{
            padding: '16px 32px',
            borderLeft: i === 0 ? '1px solid rgba(201,168,76,0.4)' : 'none',
            borderRight: '1px solid rgba(201,168,76,0.4)',
          }}
        >
          <p style={{
            fontFamily: '"Josefin Sans", sans-serif',
            fontSize: '0.52rem',
            letterSpacing: '0.3em',
            color: '#C9A84C',
            textTransform: 'uppercase',
            marginBottom: '6px',
            fontWeight: 500,
          }}>
            {d.label}
          </p>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1.1rem',
            color: '#E7DECF',
            fontWeight: 300,
            letterSpacing: '0.02em',
          }}>
            {d.val}
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* keyframes injected inline */}
  <style>{`
    @keyframes heroZoom {
      0%   { transform: scale(1.12); }
      100% { transform: scale(1); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
  `}</style>
</section>

      {/* ── Room Carousel ── */}
      <section style={{ background: '#eee0e3', padding: '20px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="slide-up mb-10">
            <p className="section-label mb-4">Room Tour</p>
            <h2 className="section-title" style={{ color: '#2C2416', marginBottom: '16px' }}>
              Explore Every <em style={{ fontStyle: 'italic', color: '#5A4A3A' }}>Space</em>
            </h2>
            <p style={{
              fontFamily: '"Josefin Sans", sans-serif',
              fontSize: '0.7rem',
              color: '#8a7a6a',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              Click side panels or use arrows to navigate · Auto-scrolls every 3.5s
            </p>
          </div>
        </div>

        {/* Full-width carousel */}
        <RoomCarousel rooms={project.rooms} key={id} />

        {/* Project description */}
       {/* ── Project Description ── */}
<div className="max-w-7xl mx-auto px-6">
  <div style={{ marginTop: '100px', marginBottom: '60px', background: '#2c2416', padding: '30px' }}>

    {/* Top label */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '60px' }}>
      <div style={{ width: '40px', height: '1px', background: '#C9A84C' }} />
      <p className="section-label"><div style={{color:'white'}}>The Story Behind The Space</div></p>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(227, 171, 15, 0.97), transparent)' }} />
    </div>

    <div className="grid md:grid-cols-2 gap-20">

      {/* Left — description */}
      <div className="slide-left">
        <h3 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 500,
          color: '#e49a18',
          lineHeight: 0.1,
          marginBottom: '28px',
          letterSpacing: '-0.01em',
        }}>
          Design <em style={{ fontStyle: 'italic',fontWeight: '500', color: '#cab595' }}>Story</em>
        </h3>
        <p style={{
          fontFamily: '"Josefin Sans", sans-serif',
          fontSize: '0.88rem',
          color: '#f6efe9a1',
          lineHeight: 2.1,
          fontWeight: 600,
        }}>
          {project.desc}
        </p>

       
      </div>

      {/* Right — details */}
      <div className="slide-right">
        <h3 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 500,
          color: '#ed9d11',
          padding: '30px',
          lineHeight: 0.1,
          marginBottom: '28px',
          letterSpacing: '-0.01em',
        }}>
          Project <em style={{ fontStyle: 'italic', color: '#dccbb2ad' }}>Details</em>
        </h3>

        <div style={{
          border: '1px solid rgba(207, 193, 154, 0.71)',
          overflow: 'hidden',
        }}>
          {[
            { label: 'Client',     val: project.client   },
            { label: 'Location',   val: project.location },
            { label: 'Category',   val: project.category },
            { label: 'Total Area', val: project.area     },
            { label: 'Duration',   val: project.duration },
          ].map((d, i) => (
            <div
              key={d.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 24px',
                background: i % 2 === 0 ? 'rgba(201,168,76,0.04)' : 'transparent',
                borderBottom: i < 4 ? '1px solid rgba(201,168,76,0.12)' : 'none',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(201,168,76,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = i % 2 === 0 ? 'rgba(201,168,76,0.04)' : 'transparent'}
            >
              <span style={{
                fontFamily: '"Josefin Sans", sans-serif',
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#C9A84C',
                fontWeight: 500,
              }}>
                {d.label}
              </span>
              <span style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '1.05rem',
                color: '#d2c0a2b3',
                fontWeight: 400,
                letterSpacing: '0.02em',
              }}>
                {d.val}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '32px' }}>
          <Link to="/contact">
            <button className="btn-gold" style={{ width: '100%', padding: '18px' }}>
              <span>Start a Similar Project</span>
            </button>
          </Link>
        </div>
      </div>

    </div>
  </div>
</div>
      </section>

       <div style={{ background: '#2C2416' }}>
        <TornEdgeTop fillColor="#EEECE0" />
      </div>

      {/* ── Before / After ── */}
      <section style={{ background: '#2C2416', padding: '30px 6vw' }}>
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

    
      <section style={{ background: '#2C2416', padding: '50px 6vw', textAlign: 'center' }}>
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