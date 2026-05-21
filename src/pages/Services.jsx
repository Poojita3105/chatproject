import React, { useState, useRef } from 'react'
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
  { title: 'Living Room', img: 'https://i.pinimg.com/736x/39/b8/af/39b8af383a5725206ade1ac0d0d89398.jpg', desc: 'Elegant and welcoming spaces designed for comfort, style, and memorable gatherings.' },
  { title: 'Hall', img: 'https://i.pinimg.com/1200x/30/52/5d/30525dad8f1b4da0ed38c44ed999d458.jpg', desc: 'Grand entryways and hall designs that create a lasting first impression.' },
  { title: 'Bedroom', img: 'https://i.pinimg.com/736x/71/78/4e/71784e651ed7d8b5e4886e8a5f8d8017.jpg', desc: 'Calm, cozy, and personalized bedrooms crafted for relaxation and peace.' },
  { title: 'Kitchen', img: 'https://i.pinimg.com/736x/d6/24/b2/d624b2fc0dbc58dadf9ae43fdafb3831.jpg', desc: 'Modern, efficient kitchens with smart storage and aesthetic appeal.' },
  { title: 'Bathroom', img: 'https://i.pinimg.com/736x/1d/04/47/1d04474072edd9be8860d4325c169cdc.jpg', desc: 'Luxurious and functional bathrooms designed for comfort and hygiene.' },
  { title: "God's Room", img: 'https://i.pinimg.com/1200x/dc/e5/02/dce502acc895f6fd7b6acfc4723a4183.jpg', desc: 'Peaceful spiritual spaces designed with traditional and modern harmony.' },
  { title: 'Balcony', img: 'https://i.pinimg.com/736x/c1/dc/29/c1dc298d6c5eaafe161c2f6473e7f1d0.jpg', desc: 'Beautiful balcony designs that bring nature and serenity into your home.' },
  { title: 'Wardrobe', img: 'https://i.pinimg.com/736x/ee/72/b4/ee72b42deef60b447c48a21617c4aecc.jpg', desc: 'Smart, sleek, and perfectly organised wardrobes that deserve as much style as the clothes they hold.' },
  { title: 'Lighting Design', img: 'https://i.pinimg.com/736x/c6/08/b8/c608b861ebd381e6a54ab32f4c10ef0f.jpg', desc: 'Strategic illumination that shapes mood, enhances comfort, and highlights architectural elements.' },
]

const OFFICE_ITEMS = [
  { title: 'Reception & Lobby', img: 'https://i.pinimg.com/736x/ab/6c/5d/ab6c5dd8b94f9fd2db76a6e9c33cd1fd.jpg', desc: "Make a commanding first impression with sophisticated lobbies that speak your brand's language." },
  { title: 'Workstation Layout', img: 'https://i.pinimg.com/1200x/9b/1c/ab/9b1cabdb313037ab55905f305c7f7d3e.jpg', desc: 'Ergonomic, productivity-first workstation arrangements that balance openness and focus zones.' },
  { title: 'Conference Rooms', img: 'https://i.pinimg.com/736x/48/4c/49/484c497ca82325972b2a5f1f01589eb7.jpg', desc: 'Boardrooms and meeting spaces designed for collaboration, clarity, and confidence.' },
  { title: "Cabin & Director's Office", img: 'https://i.pinimg.com/736x/69/ac/ae/69acae22625fc8f10644c9b7f2e5ddeb.jpg', desc: 'Executive cabins that radiate authority — crafted with premium materials and refined detailing.' },
  { title: 'Breakout & Lounge', img: 'https://i.pinimg.com/1200x/55/63/e4/5563e4fe01b517f19b1c9914fd8cbf0e.jpg', desc: 'Relaxed informal spaces that foster creativity, team bonding, and mental recharge.' },
  { title: 'Office Pantry', img: 'https://i.pinimg.com/736x/1f/22/33/1f2233457b88e5803f8d5d8421ba6d15.jpg', desc: 'Cheerful, well-equipped pantry spaces that keep your team fuelled and refreshed.' },
  { title: 'Brand Wall & Signage', img: 'https://i.pinimg.com/736x/07/ac/c5/07acc5f88f70df364b219d30d1f58c0f.jpg', desc: 'Iconic brand walls, feature graphics, and signage that reinforce your identity at every turn.' },
  { title: 'Office Lighting', img: 'https://i.pinimg.com/1200x/fd/49/17/fd4917f292c0f879f6fda696e1f2dbc1.jpg', desc: 'Layered lighting strategies that reduce eye strain, boost focus, and elevate the workspace feel.' },
  { title: 'Storage & Utility', img: 'https://i.pinimg.com/736x/30/e3/b1/30e3b1409acd1726bd5a71f665b5d9cc.jpg', desc: 'Smart, built-in storage solutions that keep clutter at bay without sacrificing aesthetics.' },
]

const RESTAURANT_ITEMS = [
  { title: 'Dining Area', img: 'https://i.pinimg.com/736x/b6/40/9c/b6409c50cf4253cefce4f7d095dc7a35.jpg', desc: 'Immersive dining floors designed to match your cuisine concept and keep guests coming back.' },
  { title: 'Bar & Counter', img: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Stunning bar counters and beverage stations that become the social heart of your restaurant.' },
  { title: 'Private Dining', img: 'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Intimate private dining rooms for special occasions — luxurious, cozy, and utterly memorable.' },
  { title: 'Restaurant Entrance', img: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Entryways and facades that set the mood before guests even step inside.' },
  { title: 'Open Kitchen', img: 'https://images.pexels.com/photos/3887985/pexels-photo-3887985.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Theatre-style open kitchens that let guests watch the magic — designed for safety and spectacle.' },
  { title: 'Outdoor & Al Fresco', img: 'https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Breezy outdoor seating and terrace designs that bring the joy of open-air dining to your guests.' },
  { title: 'Café & Lounge', img: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Laid-back café corners and lounge zones with warmth, texture, and irresistible character.' },
  { title: 'Ambience & Lighting', img: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Mood lighting, pendant clusters, and accent illumination that make every meal feel like an event.' },
  { title: 'Branding & Interiors', img: 'https://i.jpgpinimg.com/736x/33/40/dc/3340dcba2f28b4ebca54d94dccf32f02.jpg', desc: 'Colour palettes, typography, murals, and signage that weave your brand story into every surface.' },
]

const ALL_TABS = { home: HOME_ITEMS, office: OFFICE_ITEMS, restaurant: RESTAURANT_ITEMS }

// ─── Room database ─────────────────────────────────────────────────
// Each entry: icon, label, CSS filter for uploaded image, colour overlay, tag line, 4 inspiration images
const ROOM_DATABASE = {
  bedroom: {
    label: 'Bedroom', icon: '🛏️', tag: 'Cosy & Restful',
    filter: 'contrast(1.05) saturate(0.85) brightness(1.08) sepia(0.12)',
    overlay: 'linear-gradient(160deg,rgba(90,55,30,0.30) 0%,rgba(130,85,50,0.14) 100%)',
    inspirations: [
      { img: 'https://i.pinimg.com/736x/71/78/4e/71784e651ed7d8b5e4886e8a5f8d8017.jpg', caption: 'Minimalist Bedroom' },
      { img: 'https://i1-c.pinimg.com/webp85/1200x/70/ef/d8/70efd8f509cd2bf8e8ca3720218d35f4.webp', caption: 'Luxury Master Suite' },
      { img: 'https://i.pinimg.com/736x/78/af/86/78af86ad383530f0b42b6d35c677f5ab.jpg', caption: 'Warm Retreat' },
      { img: 'https://i.pinimg.com/736x/a2/dd/75/a2dd75107763dca4d94d41c7ba1782d8.jpg', caption: 'Ambient Lighting' },
    ],
  },
  'living room': {
    label: 'Living Room', icon: '🛋️', tag: 'Open & Elegant',
    filter: 'contrast(1.12) saturate(1.1) brightness(1.04)',
    overlay: 'linear-gradient(160deg,rgba(40,55,85,0.25) 0%,rgba(60,75,110,0.12) 100%)',
    inspirations: [
      { img: 'https://i.pinimg.com/736x/39/b8/af/39b8af383a5725206ade1ac0d0d89398.jpg', caption: 'Modern Living Room' },
      { img: 'https://i.pinimg.com/736x/5b/c3/c1/5bc3c1dc3f9d14c6f5ee1153c395ee3e.jpg', caption: 'Elegant Lounge' },
      { img: 'https://i.pinimg.com/1200x/30/52/5d/30525dad8f1b4da0ed38c44ed999d458.jpg', caption: 'Contemporary Space' },
      { img: 'https://i.pinimg.com/736x/0a/a8/ca/0aa8caa89736c87be429e88866766457.jpg', caption: 'Open-Plan Living' },
    ],
  },
  kitchen: {
    label: 'Kitchen', icon: '🍳', tag: 'Smart & Modern',
    filter: 'contrast(1.2) saturate(0.85) brightness(1.12) grayscale(0.06)',
    overlay: 'linear-gradient(160deg,rgba(190,190,190,0.18) 0%,rgba(160,160,160,0.08) 100%)',
    inspirations: [
      { img: 'https://i.pinimg.com/736x/d6/24/b2/d624b2fc0dbc58dadf9ae43fdafb3831.jpg', caption: 'Modular Kitchen' },
      { img: 'https://i.pinimg.com/736x/ff/c2/c9/ffc2c95b230820f66e4b7ae1ebf7d71b.jpg', caption: 'Island Kitchen' },
      { img: 'https://i.pinimg.com/736x/cd/30/5c/cd305c62137c10fc9cdd2aee72713ffc.jpg', caption: 'Open Kitchen' },
      { img: 'https://i1-c.pinimg.com/webp85/1200x/02/01/90/020190da97e601e9ca250311da7ecd71.webp', caption: 'Sleek Finish' },
    ],
  },
  bathroom: {
    label: 'Bathroom', icon: '🚿', tag: 'Spa & Luxury',
    filter: 'contrast(1.15) saturate(0.7) brightness(1.18) hue-rotate(185deg)',
    overlay: 'linear-gradient(160deg,rgba(175,215,228,0.28) 0%,rgba(155,198,215,0.13) 100%)',
    inspirations: [
      { img: 'https://i.pinimg.com/736x/1d/04/47/1d04474072edd9be8860d4325c169cdc.jpg', caption: 'Luxury Bathroom' },
      { img: 'https://i1-c.pinimg.com/webp85/1200x/30/f2/68/30f2684985ec896061aca5796f1b7574.webp', caption: 'Spa Retreat' },
      { img: 'https://i1-c.pinimg.com/webp85/736x/1b/5b/4a/1b5b4aa9a9a6a3375a644e7b23531955.webp', caption: 'Modern Washroom' },
      { img: 'https://i1-c.pinimg.com/webp85/736x/2f/86/90/2f869072d275983f3c1b8b3a66d075db.webp', caption: 'Minimalist Bath' },
    ],
  },
  office: {
    label: 'Office Room', icon: '💼', tag: 'Professional & Focused',
    filter: 'contrast(1.22) saturate(0.65) brightness(1.0) grayscale(0.12)',
    overlay: 'linear-gradient(160deg,rgba(28,38,62,0.32) 0%,rgba(48,58,82,0.16) 100%)',
    inspirations: [
      { img: 'https://i.pinimg.com/736x/69/ac/ae/69acae22625fc8f10644c9b7f2e5ddeb.jpg', caption: "Director's Cabin" },
      { img: 'https://i.pinimg.com/1200x/9b/1c/ab/9b1cabdb313037ab55905f305c7f7d3e.jpg', caption: 'Workstation Layout' },
      { img: 'https://i.pinimg.com/736x/48/4c/49/484c497ca82325972b2a5f1f01589eb7.jpg', caption: 'Conference Room' },
      { img: 'https://i.pinimg.com/736x/ab/6c/5d/ab6c5dd8b94f9fd2db76a6e9c33cd1fd.jpg', caption: 'Reception Lobby' },
    ],
  },
  balcony: {
    label: 'Balcony', icon: '🌿', tag: 'Green & Serene',
    filter: 'contrast(1.06) saturate(1.35) brightness(1.12) hue-rotate(75deg)',
    overlay: 'linear-gradient(160deg,rgba(70,125,75,0.28) 0%,rgba(50,105,55,0.13) 100%)',
    inspirations: [
      { img: 'https://i.pinimg.com/736x/c1/dc/29/c1dc298d6c5eaafe161c2f6473e7f1d0.jpg', caption: 'Garden Balcony' },
      { img: 'https://i.pinimg.com/736x/96/4b/37/964b37d05ae75ed0af94e1cd45881665.jpg', caption: 'Al Fresco Terrace' },
      { img: 'https://i.pinimg.com/736x/fe/2d/b8/fe2db871dd8f86802f44b6d10c69229f.jpg', caption: 'Café Balcony' },
      { img: 'https://i1-c.pinimg.com/736x/f5/5c/85/f55c8595cbc126e6d7b36d41dc751197.jpg', caption: 'Open-Air Lounge' },
    ],
  },
  hall: {
    label: 'Hall / Foyer', icon: '🚪', tag: 'Grand Entrance',
    filter: 'contrast(1.1) saturate(1.12) brightness(1.07) sepia(0.06)',
    overlay: 'linear-gradient(160deg,rgba(105,82,38,0.28) 0%,rgba(145,112,55,0.13) 100%)',
    inspirations: [
      { img: 'https://i.pinimg.com/736x/33/ff/27/33ff277984b4c46bc5a1298dc8b42abb.jpg', caption: 'Grand Hall' },
      { img: 'https://i1-c.pinimg.com/webp85/1200x/e4/f2/2f/e4f22f5a4cb161874048bee0fe6a5825.webp', caption: 'Elegant Foyer' },
      { img: 'https://i.pinimg.com/736x/c8/93/31/c89331d9c2b45aa099000a5a75007246.jpg', caption: 'Welcoming Entrance' },
      { img: 'https://i1-c.pinimg.com/webp85/1200x/9f/29/62/9f2962358b635219ab4b908f01db59ff.webp', caption: 'Brand-Forward Entry' },
    ],
  },
  dining: {
    label: 'Dining Room', icon: '🍽️', tag: 'Warm & Inviting',
    filter: 'contrast(1.1) saturate(1.22) brightness(1.0) sepia(0.18)',
    overlay: 'linear-gradient(160deg,rgba(100,58,18,0.32) 0%,rgba(150,90,28,0.16) 100%)',
    inspirations: [
      { img: 'https://i.pinimg.com/736x/eb/6c/6f/eb6c6f5bf78883af9802198e830e206a.jpg', caption: 'Dining Area' },
      { img: 'https://i1-c.pinimg.com/webp85/736x/c8/86/58/c8865819ae146e6b7a7db692ef9a288d.webp', caption: 'Private Dining' },
      { img: 'https://i1-c.pinimg.com/webp85/736x/40/32/f8/4032f8df15b9d265af67d3621cd6c7f6.webp', caption: 'Bar & Counter' },
      { img: 'https://i1-c.pinimg.com/webp85/1200x/3a/5c/93/3a5c931c75cd29f6f7c8dc8fa4988be9.webp', caption: 'Ambience Lighting' },
    ],
  },
  wardrobe: {
    label: 'Wardrobe', icon: '👔', tag: 'Sleek & Organised',
    filter: 'contrast(1.16) saturate(0.75) brightness(1.05) grayscale(0.08)',
    overlay: 'linear-gradient(160deg,rgba(58,48,36,0.28) 0%,rgba(80,68,50,0.13) 100%)',
    inspirations: [
      { img: 'https://i.pinimg.com/736x/ee/72/b4/ee72b42deef60b447c48a21617c4aecc.jpg', caption: 'Walk-in Wardrobe' },
      { img: 'https://i1-c.pinimg.com/webp85/736x/6d/34/21/6d342185e6dd624a4d651ec53affe02d.webp', caption: 'Built-in Storage' },
      { img: 'https://i.pinimg.com/736x/a0/21/38/a021382889adb93339f3186e333949c6.jpg', caption: 'Lit Wardrobe' },
      { img: 'https://i.pinimg.com/736x/f4/84/b6/f484b64de18ee6ba39424d899a5f89da.jpg', caption: 'Premium Finish' },
    ],
  },
  restaurant: {
    label: 'Restaurant', icon: '🏮', tag: 'Atmosphere & Brand',
    filter: 'contrast(1.12) saturate(1.42) brightness(0.94) sepia(0.22)',
    overlay: 'linear-gradient(160deg,rgba(82,28,8,0.32) 0%,rgba(125,48,14,0.16) 100%)',
    inspirations: [
      { img: 'https://i.pinimg.com/736x/b6/40/9c/b6409c50cf4253cefce4f7d095dc7a35.jpg', caption: 'Dining Floor' },
      { img: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Bar Counter' },
      { img: 'https://i.pinimg.com/736x/db/31/cf/db31cf5dee755e45dab7f39c4c5a063e.jpg', caption: 'Café Lounge' },
      { img: 'https://i.pinimg.com/736x/33/40/dc/3340dcba2f28b4ebca54d94dccf32f02.jpg', caption: 'Branding & Interiors' },
    ],
  },
}

const QUICK_CHIPS = ['Bedroom','Living Room','Kitchen','Bathroom','Office','Balcony','Hall','Dining','Wardrobe','Restaurant']

function matchRoom(query) {
  if (!query.trim()) return null
  const q = query.toLowerCase().trim()
  const keys = Object.keys(ROOM_DATABASE)
  for (const k of keys) if (q === k) return k
  for (const k of keys) if (q.includes(k) || k.includes(q)) return k
  const aliases = {
    living:'living room', lounge:'living room', sofa:'living room',
    bed:'bedroom', sleep:'bedroom', master:'bedroom',
    cook:'kitchen', modular:'kitchen',
    bath:'bathroom', toilet:'bathroom', washroom:'bathroom',
    work:'office', cabin:'office', conference:'office', desk:'office', study:'office',
    terrace:'balcony', garden:'balcony', outdoor:'balcony',
    eat:'dining', food:'dining', dine:'dining',
    closet:'wardrobe', dressing:'wardrobe', storage:'wardrobe',
    cafe:'restaurant', café:'restaurant', bar:'restaurant', bistro:'restaurant',
    foyer:'hall', entry:'hall', entrance:'hall',
  }
  for (const [alias, key] of Object.entries(aliases)) if (q.includes(alias)) return key
  return null
}

const LOADING_STEPS = ['Scanning room type…','Matching design database…','Applying style transformation…','Curating inspirations…','Finalising results…']

// ─── AI Room Visualizer — Standalone Section ──────────────────────
function AIRoomVisualizer() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [previewSrc, setPreviewSrc] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [loadingStep, setLoadingStep] = useState('')
  const [matchedRoom, setMatchedRoom] = useState(null)
  const [visibleInspo, setVisibleInspo] = useState(0)
  const [uploadShake, setUploadShake] = useState(false)
  const [searchShake, setSearchShake] = useState(false)

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => { setPreviewSrc(ev.target.result); setStatus('idle'); setMatchedRoom(null); setVisibleInspo(0) }
    reader.readAsDataURL(file)
  }

  const runSearch = (q) => {
    const query = q || searchQuery
    setShowDropdown(false)
    if (!previewSrc) { setUploadShake(true); setTimeout(() => setUploadShake(false), 600); return }
    if (!query.trim()) { setSearchShake(true); setTimeout(() => setSearchShake(false), 600); return }
    const key = matchRoom(query)
    if (!key) { setSearchShake(true); setTimeout(() => setSearchShake(false), 600); setStatus('error'); return }
    setStatus('loading'); setMatchedRoom(null); setVisibleInspo(0)
    let step = 0; setLoadingStep(LOADING_STEPS[0])
    const iv = setInterval(() => {
      step++
      if (step < LOADING_STEPS.length) { setLoadingStep(LOADING_STEPS[step]) }
      else {
        clearInterval(iv); setMatchedRoom(key); setStatus('done')
        let c = 0
        const rv = setInterval(() => { c++; setVisibleInspo(c); if (c >= 4) clearInterval(rv) }, 160)
      }
    }, 460)
  }

  const handleReset = () => { setStatus('idle'); setPreviewSrc(null); setMatchedRoom(null); setSearchQuery(''); setVisibleInspo(0); if (fileInputRef.current) fileInputRef.current.value = '' }

  const room = matchedRoom ? ROOM_DATABASE[matchedRoom] : null
  const filteredChips = QUICK_CHIPS.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
      <style>{`
        @keyframes rvShake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-7px)} 40%,80%{transform:translateX(7px)} }
        @keyframes rvSpin { to{transform:rotate(360deg)} }
        @keyframes rvFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes rvCardIn { from{opacity:0;transform:translateY(22px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes rvSlideLeft { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
        @keyframes rvSlideRight { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }

        .rv-upload:hover { border-color:rgba(201,168,76,0.7) !important; background:rgba(201,168,76,0.04) !important; }
        .rv-upload-preview { position:relative; width:100%; }
        .rv-change-hint { position:absolute; inset:0; border-radius:12px; background:rgba(26,18,8,0.55); display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity .25s; cursor:pointer; }
        .rv-upload-preview:hover .rv-change-hint { opacity:1; }
        .rv-input:focus { outline:none; border-color:#C9A84C !important; box-shadow:0 0 0 3px rgba(201,168,76,0.15) !important; }
        .rv-chip { transition:all .18s; cursor:pointer; }
        .rv-chip:hover { background:rgba(201,168,76,0.16) !important; border-color:#C9A84C !important; color:#C9A84C !important; }
        .rv-chip.active { background:rgba(201,168,76,0.22) !important; border-color:#C9A84C !important; color:#C9A84C !important; }
        .rv-search-btn:hover:not(:disabled) { opacity:0.88; transform:translateY(-1px); }

        /* Left result — transformed image */
        .rv-transformed { position:relative; border-radius:16px; overflow:hidden; line-height:0; }
        .rv-transformed img { width:100%; height:100%; object-fit:cover; display:block; }
        .rv-toverlay { position:absolute; inset:0; pointer-events:none; }
        .rv-tlabel {
          position:absolute; bottom:0; left:0; right:0;
          padding:32px 20px 18px;
          background:linear-gradient(0deg,rgba(12,8,2,0.85) 0%,transparent 100%);
          font-family:'Josefin Sans',sans-serif;
        }

        /* Right result — inspiration cards */
        .rv-inspo-card { opacity:0; pointer-events:none; border-radius:12px; overflow:hidden; border:1.5px solid rgba(201,168,76,0.15); background:rgba(255,255,255,0.02); transition:transform .3s,box-shadow .3s,border-color .3s; }
        .rv-inspo-card.vis { animation:rvCardIn .4s cubic-bezier(0.16,1,0.3,1) forwards; pointer-events:auto; }
        .rv-inspo-card.vis:hover { transform:translateY(-5px) scale(1.02); border-color:#C9A84C; box-shadow:0 18px 45px rgba(0,0,0,0.38); }
        .rv-inspo-img { position:relative; overflow:hidden; line-height:0; }
        .rv-inspo-img img { width:100%; aspect-ratio:4/3; object-fit:cover; display:block; transition:transform .5s; }
        .rv-inspo-card.vis:hover .rv-inspo-img img { transform:scale(1.07); }
        .rv-inspo-num { position:absolute; top:8px; left:8px; background:rgba(201,168,76,0.92); color:#1a0a00; font-size:0.56rem; font-weight:700; letter-spacing:.09em; padding:3px 9px; border-radius:20px; font-family:'Josefin Sans',sans-serif; text-transform:uppercase; }

        /* Dropdown */
        .rv-dropdown { position:absolute; top:calc(100% + 5px); left:0; right:0; z-index:200; background:#261a0c; border:1px solid rgba(201,168,76,0.3); border-radius:10px; overflow:hidden; box-shadow:0 18px 45px rgba(0,0,0,0.55); animation:rvFadeUp .18s ease; }
        .rv-dd-item { padding:10px 16px; cursor:pointer; font-family:'Josefin Sans',sans-serif; font-size:0.71rem; color:#B8B2AA; letter-spacing:.05em; transition:background .14s,color .14s; border-bottom:1px solid rgba(201,168,76,0.07); }
        .rv-dd-item:last-child { border-bottom:none; }
        .rv-dd-item:hover { background:rgba(201,168,76,0.1); color:#C9A84C; }
      `}</style>

      {/* Torn edge top of section */}
      <div style={{ background: '#1a1208' }}>
        <TornEdgeTop fillColor="#ccb9b5" />
      </div>

      <section style={{ background:'linear-gradient(170deg,#120d05 0%,#1e1509 35%,#2c1e0e 65%,#3a2a14 100%)', padding:'90px 6vw 100px', position:'relative', overflow:'hidden' }}>

        {/* Ambient background glow */}
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 65%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'30%', left:'-10%', width:'40%', height:'60%', background:'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'20%', right:'-8%', width:'35%', height:'55%', background:'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)', pointerEvents:'none' }} />

        <div style={{ maxWidth:1200, margin:'0 auto', position:'relative' }}>

          {/* ── Section header ── */}
          <div style={{ textAlign:'center', marginBottom:60 }}>
            <span style={{ display:'inline-block', background:'rgba(201,168,76,0.12)', border:'1px solid rgba(201,168,76,0.38)', color:'#C9A84C', fontSize:10, letterSpacing:'.15em', padding:'5px 18px', borderRadius:20, marginBottom:20, textTransform:'uppercase' }}>
              ✦ AI-Powered ✦ New Feature
            </span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.4rem,5vw,4.2rem)', fontWeight:300, color:'#EEECE0', lineHeight:1.08, marginBottom:16 }}>
              Visualise Your Space with <em style={{ color:'#C9A84C', fontStyle:'italic' }}>AI Design</em>
            </h2>
            <div style={{ width:64, height:1, background:'linear-gradient(90deg,transparent,#C9A84C,transparent)', margin:'0 auto 22px' }} />
            <p style={{ color:'#A8A098', fontSize:'0.83rem', maxWidth:580, lineHeight:2, fontWeight:300, margin:'0 auto', fontFamily:"'Josefin Sans',sans-serif" }}>
              Upload a photo of your blank space, search for a room type — and instantly see your space styled on the left, alongside 4 hand-curated design inspirations on the right.
            </p>
          </div>

          {/* ── Upload + Search controls ── */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:32, marginBottom:48 }}>

            {/* Upload card */}
            <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(201,168,76,0.14)', borderRadius:16, padding:24 }}>
              <p style={{ fontSize:'0.63rem', letterSpacing:'.13em', color:'#6B5B4B', textTransform:'uppercase', marginBottom:12, fontFamily:"'Josefin Sans',sans-serif" }}>
                Step 1 — Upload your room photo
              </p>
              <div
                className="rv-upload"
                onClick={() => status !== 'loading' && fileInputRef.current?.click()}
                style={{
                  background:'rgba(255,255,255,0.04)',
                  border:`1.5px dashed ${uploadShake ? 'rgba(220,80,80,0.8)' : 'rgba(201,168,76,0.32)'}`,
                  borderRadius:12, padding: previewSrc ? 0 : '30px 20px',
                  textAlign:'center', cursor: status === 'loading' ? 'default' : 'pointer',
                  overflow:'hidden', animation: uploadShake ? 'rvShake .5s ease' : 'none',
                  minHeight:150, display:'flex', alignItems:'center', justifyContent:'center',
                  transition:'border-color .3s,background .3s',
                }}
              >
                {previewSrc ? (
                  <div className="rv-upload-preview">
                    <img src={previewSrc} alt="Uploaded room" style={{ width:'100%', aspectRatio:'4/3', objectFit:'cover', display:'block', borderRadius:10 }} />
                    <div className="rv-change-hint">
                      <span style={{ color:'#C9A84C', fontSize:'0.68rem', letterSpacing:'.1em', fontFamily:"'Josefin Sans',sans-serif" }}>↑ CHANGE PHOTO</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ width:54, height:54, borderRadius:'50%', background:'rgba(201,168,76,0.09)', border:'1.5px solid rgba(201,168,76,0.22)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px', fontSize:20 }}>📷</div>
                    <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', color:'#EEECE0', marginBottom:5, fontWeight:400 }}>Click to Upload</p>
                    <p style={{ color:'#5B4E3C', fontSize:'0.68rem', lineHeight:1.6 }}>JPG, PNG, WEBP · Never stored</p>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handleFile} />
            </div>

            {/* Search card */}
            <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(201,168,76,0.14)', borderRadius:16, padding:24 }}>
              <p style={{ fontSize:'0.63rem', letterSpacing:'.13em', color:'#6B5B4B', textTransform:'uppercase', marginBottom:12, fontFamily:"'Josefin Sans',sans-serif" }}>
                Step 2 — Search a room type
              </p>

              {/* Search bar */}
              <div style={{ position:'relative', marginBottom:16 }}>
                <div style={{ display:'flex' }}>
                  <span style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', fontSize:15, zIndex:2, pointerEvents:'none' }}>🔍</span>
                  <input
                    className="rv-input"
                    type="text"
                    placeholder="e.g. bedroom, living room, kitchen…"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(e.target.value.length > 0) }}
                    onKeyDown={(e) => { if (e.key === 'Enter') runSearch() }}
                    onFocus={() => setShowDropdown(searchQuery.length > 0)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 160)}
                    style={{
                      flex:1, background:'rgba(255,255,255,0.06)',
                      border:`1.5px solid ${searchShake ? 'rgba(220,80,80,0.8)' : 'rgba(201,168,76,0.28)'}`,
                      borderRight:'none', borderRadius:'9px 0 0 9px',
                      padding:'11px 12px 11px 40px', color:'#EEECE0',
                      fontFamily:"'Josefin Sans',sans-serif", fontSize:'0.73rem', letterSpacing:'.04em',
                      animation: searchShake ? 'rvShake .5s ease' : 'none',
                    }}
                  />
                  <button
                    className="rv-search-btn"
                    onClick={() => runSearch()}
                    disabled={status === 'loading'}
                    style={{ background:'linear-gradient(135deg,#D4AF37,#B8960C)', border:'none', borderRadius:'0 9px 9px 0', padding:'0 18px', color:'#1a0a00', fontFamily:"'Josefin Sans',sans-serif", fontSize:'0.7rem', fontWeight:700, letterSpacing:'.08em', cursor: status === 'loading' ? 'not-allowed' : 'pointer', whiteSpace:'nowrap', transition:'all .2s' }}>
                    ✦ Visualise
                  </button>
                </div>

                {/* Dropdown */}
                {showDropdown && filteredChips.length > 0 && (
                  <div className="rv-dropdown">
                    {filteredChips.map(c => (
                      <div key={c} className="rv-dd-item" onMouseDown={() => { setSearchQuery(c); runSearch(c) }}>
                        {ROOM_DATABASE[c.toLowerCase()]?.icon} {c}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Status hint */}
              {status === 'error' && (
                <p style={{ fontSize:'0.67rem', color:'rgba(220,100,80,0.85)', marginBottom:12, fontFamily:"'Josefin Sans',sans-serif" }}>
                  ⚠ Room type not recognised. Try: bedroom, office, kitchen…
                </p>
              )}

              {/* Quick chips */}
              <p style={{ fontSize:'0.6rem', letterSpacing:'.1em', color:'#6B5B4B', textTransform:'uppercase', marginBottom:10, fontFamily:"'Josefin Sans',sans-serif" }}>Quick select</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {QUICK_CHIPS.map(chip => (
                  <button
                    key={chip}
                    className={`rv-chip${matchedRoom === chip.toLowerCase() ? ' active' : ''}`}
                    onClick={() => { setSearchQuery(chip); runSearch(chip) }}
                    style={{ padding:'5px 13px', borderRadius:999, border:'1px solid rgba(201,168,76,0.2)', background: matchedRoom === chip.toLowerCase() ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.03)', color: matchedRoom === chip.toLowerCase() ? '#C9A84C' : '#7B6B5B', fontFamily:"'Josefin Sans',sans-serif", fontSize:'0.64rem', letterSpacing:'.05em' }}>
                    {ROOM_DATABASE[chip.toLowerCase()]?.icon} {chip}
                  </button>
                ))}
              </div>

              {/* Features row */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginTop:20 }}>
                {[['⚡','Instant'],['🔍','10 Types'],['🔒','Private'],['🎨','AI Style']].map(([ic, lb]) => (
                  <div key={lb} style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(201,168,76,0.09)', borderRadius:8, padding:'10px 6px', textAlign:'center' }}>
                    <div style={{ fontSize:14, marginBottom:4 }}>{ic}</div>
                    <div style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:'0.6rem', color:'#6B5B4B' }}>{lb}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════
              RESULTS AREA — Full width, side-by-side
              LEFT = uploaded image transformed
              RIGHT = 4 inspiration images
          ═══════════════════════════════════════════ */}

          {/* Loading state */}
          {status === 'loading' && (
            <div style={{ textAlign:'center', padding:'60px 20px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(201,168,76,0.12)', borderRadius:20, animation:'rvFadeUp .3s ease' }}>
              <div style={{ width:46, height:46, border:'2px solid rgba(201,168,76,0.18)', borderTopColor:'#C9A84C', borderRadius:'50%', animation:'rvSpin 1s linear infinite', margin:'0 auto 18px' }} />
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.15rem', color:'#C9A84C', marginBottom:8 }}>Generating your visualisation…</p>
              <p style={{ fontSize:'0.7rem', color:'#7B6B5B', letterSpacing:'.08em' }}>{loadingStep}</p>
            </div>
          )}

          {/* Idle prompt */}
          {status === 'idle' && (
            <div style={{ textAlign:'center', padding:'56px 20px', background:'rgba(255,255,255,0.02)', border:'1px dashed rgba(201,168,76,0.14)', borderRadius:20 }}>
              <div style={{ fontSize:52, opacity:0.15, marginBottom:16 }}>🏠</div>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.2rem', color:'#EEECE0', opacity:0.35, marginBottom:8 }}>Your visualisation will appear here</p>
              <p style={{ fontSize:'0.7rem', color:'#4A3C2C' }}>Upload a photo → Search a room type → See the transformation</p>
            </div>
          )}

          {/* ── DONE: Side-by-side results ── */}
          {status === 'done' && room && (
            <div style={{ animation:'rvFadeUp .5s ease' }}>

              {/* Results header */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
                <div>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.5rem', color:'#EEECE0', fontWeight:300 }}>
                    {room.icon} {room.label} <em style={{ color:'#C9A84C', fontStyle:'italic', fontSize:'1.1rem' }}>· {room.tag}</em>
                  </p>
                  <p style={{ fontSize:'0.66rem', color:'#7B6B5B', letterSpacing:'.07em', fontFamily:"'Josefin Sans',sans-serif", textTransform:'uppercase' }}>
                    Your space transformed · 4 inspirations curated
                  </p>
                </div>
                <button onClick={handleReset} style={{ background:'rgba(201,168,76,0.08)', border:'1px solid rgba(201,168,76,0.25)', color:'#C9A84C', padding:'7px 16px', borderRadius:20, fontSize:'0.66rem', cursor:'pointer', fontFamily:"'Josefin Sans',sans-serif", letterSpacing:'.05em', transition:'all .2s' }}>
                  ↩ Reset
                </button>
              </div>

              {/* Two-column result layout */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:28, alignItems:'start' }}>

                {/* ════ LEFT — YOUR SPACE TRANSFORMED ════ */}
                <div style={{ animation:'rvSlideLeft .5s cubic-bezier(0.16,1,0.3,1) both' }}>
                  <p style={{ fontSize:'0.6rem', letterSpacing:'.12em', color:'#C9A84C', marginBottom:12, fontFamily:"'Josefin Sans',sans-serif", textTransform:'uppercase' }}>
                    ✦ Your Space — AI Styled
                  </p>

                  <div className="rv-transformed" style={{ aspectRatio:'4/3' }}>
                    {/* User's uploaded image with unique CSS filter for this room type */}
                    <img
                      src={previewSrc}
                      alt={`${room.label} transformation`}
                      style={{ filter: room.filter, transition:'filter .6s ease' }}
                    />
                    {/* Colour wash overlay */}
                    <div className="rv-toverlay" style={{ background: room.overlay }} />
                    {/* Bottom label */}
                    <div className="rv-tlabel">
                      <p style={{ color:'#C9A84C', fontSize:'0.6rem', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:4 }}>
                        {room.icon} {room.label}
                      </p>
                      <p style={{ color:'#EEECE0', fontFamily:"'Cormorant Garamond',serif", fontSize:'1.05rem', fontWeight:300 }}>
                        {room.tag}
                      </p>
                    </div>
                    {/* AI badge */}
                    <div style={{ position:'absolute', top:12, right:12, background:'rgba(201,168,76,0.92)', color:'#1a0a00', fontSize:'0.56rem', fontWeight:700, letterSpacing:'.09em', padding:'3px 10px', borderRadius:20, fontFamily:"'Josefin Sans',sans-serif", textTransform:'uppercase' }}>
                      ✦ AI Styled
                    </div>
                  </div>

                  {/* Description */}
                  <div style={{ marginTop:16, padding:'14px 16px', background:'rgba(201,168,76,0.05)', border:'1px solid rgba(201,168,76,0.12)', borderRadius:12 }}>
                    <p style={{ fontSize:'0.68rem', color:'#C9A84C', marginBottom:5, letterSpacing:'.08em', fontFamily:"'Josefin Sans',sans-serif" }}>WHAT THIS STYLE BRINGS</p>
                    <p style={{ fontSize:'0.73rem', color:'#A8A098', lineHeight:1.7 }}>
                      Your uploaded space has been reimagined with a <strong style={{ color:'#EEECE0' }}>{room.label}</strong> aesthetic — applying the colour warmth, contrast, and tonal qualities characteristic of a <strong style={{ color:'#EEECE0' }}>{room.tag}</strong> interior. Use this as a mood reference in your consultation.
                    </p>
                    <button onClick={() => navigate('/contact')} style={{ marginTop:12, background:'linear-gradient(135deg,#D4AF37,#B8960C)', border:'none', padding:'8px 20px', borderRadius:6, fontSize:'0.67rem', fontWeight:700, color:'#1a0a00', cursor:'pointer', letterSpacing:'.06em', fontFamily:"'Josefin Sans',sans-serif" }}>
                      Book Free Consultation →
                    </button>
                  </div>
                </div>

                {/* ════ RIGHT — 4 INSPIRATION IMAGES ════ */}
                <div style={{ animation:'rvSlideRight .5s cubic-bezier(0.16,1,0.3,1) both' }}>
                  <p style={{ fontSize:'0.6rem', letterSpacing:'.12em', color:'#8B7D6B', marginBottom:12, fontFamily:"'Josefin Sans',sans-serif", textTransform:'uppercase' }}>
                    ✦ Design Inspirations for {room.label}
                  </p>

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                    {room.inspirations.map((insp, i) => (
                      <div
                        key={i}
                        className={`rv-inspo-card${i < visibleInspo ? ' vis' : ''}`}
                        style={{ animationDelay: `${i * 0.08}s` }}
                      >
                        <div className="rv-inspo-img">
                          <img
                            src={insp.img}
                            alt={insp.caption}
                            onError={(e) => { e.currentTarget.src = `https://placehold.co/400x300/2C2416/C9A84C?text=${encodeURIComponent(insp.caption)}` }}
                          />
                          <div className="rv-inspo-num">Inspo {i + 1}</div>
                        </div>
                        <div style={{ padding:'9px 11px 11px' }}>
                          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'0.9rem', color:'#EEECE0', marginBottom:2 }}>{insp.caption}</p>
                          <p style={{ fontSize:'0.62rem', color:'#6B5B4B', letterSpacing:'.04em', fontFamily:"'Josefin Sans',sans-serif" }}>{room.label} · {room.tag}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Share prompt */}
                  <div style={{ marginTop:14, padding:'13px 15px', background:'rgba(201,168,76,0.05)', border:'1px solid rgba(201,168,76,0.12)', borderRadius:12 }}>
                    <p style={{ fontSize:'0.66rem', color:'#C9A84C', marginBottom:4, letterSpacing:'.08em', fontFamily:"'Josefin Sans',sans-serif" }}>✦ LOVE AN INSPIRATION?</p>
                    <p style={{ fontSize:'0.7rem', color:'#A8A098', lineHeight:1.6 }}>
                      Screenshot and share with our designers — we'll recreate your favourite look in your actual space.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </section>
    </>
  )
}

// ─── Main Services Page ────────────────────────────────────────────
export default function Services() {
  const [activeTab, setActiveTab] = useState('home')
  const navigate = useNavigate()
  useScrollAnimations()
  const currentItems = ALL_TABS[activeTab]

  return (
    <div style={{ background: 'linear-gradient(180deg, #B8B2AA 0%, #CCB9B5 30%, #E7DECF 60%, #EEECE0 100%)' }}>

      {/* ── Hero ── */}
      <section style={{ height:'75vh', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80)', backgroundSize:'cover', backgroundPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(26,20,16,0.75), rgba(44,36,22,0.5))' }} />
        <video autoPlay muted loop playsInline style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.35 }}>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center px-6" style={{ animation:'revealUp 1s cubic-bezier(0.16,1,0.3,1) 0.3s both' }}>
          <p className="section-label mb-4" style={{ color:'#E8C96A' }}>What We Offer</p>
          <h1 style={{ fontFamily:'"Cormorant Garamond", serif', fontSize:'clamp(3rem, 8vw, 7rem)', fontWeight:300, color:'#EEECE0', lineHeight:1 }}>Our Services</h1>
          <div style={{ width:100, height:1, background:'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin:'24px auto' }} />
          <p style={{ fontFamily:'"Josefin Sans", sans-serif', fontSize:'0.8rem', color:'rgba(238,236,224,0.7)', maxWidth:480, lineHeight:1.9, fontWeight:300, margin:'0 auto' }}>
            From concept to completion, every service is designed with precision, artistry, and your vision at heart.
          </p>
        </div>
      </section>

      <div style={{ background:'#EEECE0' }}><TornEdgeTop fillColor="rgba(26,20,16,0.8)" /></div>

      {/* ── Services Available ── */}
      <section style={{ background:'#EEECE0', padding:'50px 7vw' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-4">Services Available</p>
            <h2 className="section-title" style={{ color:'#2C2416' }}>Designed for <em style={{ color:'#C9A84C' }}>every space</em> you inhabit</h2>
          </div>
          <div style={{ display:'flex', justifyContent:'center', gap:'12px', padding:'7px', marginBottom:'48px', flexWrap:'wrap' }}>
            {[{ key:'home', label:'🏠 Home Interiors' },{ key:'office', label:'🏢 Office Spaces' },{ key:'restaurant', label:'🍽️ Restaurants & Cafés' }].map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ padding:'10px 28px', borderRadius:'999px', border: activeTab === tab.key ? '2px solid #C9A84C' : '1.5px solid #B8B2AA', background: activeTab === tab.key ? '#C9A84C' : 'transparent', color: activeTab === tab.key ? '#2C2416' : '#6B5B4B', fontFamily:'"Josefin Sans", sans-serif', fontSize:'0.78rem', fontWeight: activeTab === tab.key ? 600 : 400, letterSpacing:'0.06em', cursor:'pointer', transition:'all 0.25s ease' }}>
                {tab.label}
              </button>
            ))}
          </div>

          <style>{`
            .arch-cards-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;width:100%}
            @media(max-width:768px){.arch-cards-grid{grid-template-columns:repeat(2,1fr);gap:18px}}
            @media(max-width:480px){.arch-cards-grid{grid-template-columns:repeat(1,1fr);gap:24px}}
            .arch-card{display:flex;flex-direction:column;align-items:center;cursor:pointer;opacity:1 !important;transform:none !important;animation:cardFadeIn 0.4s ease forwards}
            @keyframes cardFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
            .arch-card-img-wrap{width:100%;position:relative;border:3px solid #C9A84C;border-bottom:none;border-top-left-radius:999px;border-top-right-radius:999px;overflow:hidden;aspect-ratio:3/4;background:#D8D0C0;transition:box-shadow 0.3s ease}
            .arch-inner-border{position:absolute;inset:10px;border-radius:190px 190px 0 0;border:1.5px solid rgba(236,195,72,0.5);z-index:2;pointer-events:none}
            .arch-card:hover .arch-card-img-wrap{box-shadow:0 12px 40px rgba(201,168,76,0.25)}
            .arch-card-img-wrap img{position:relative;z-index:1;width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.5s ease}
            .arch-card:hover .arch-card-img-wrap img{transform:scale(1.06)}
            .arch-card-label{background:#5E6E6E;color:#fff;text-align:center;padding:10px 20px;width:80%;margin-top:-2px;font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-weight:500;letter-spacing:0.04em;border-bottom-left-radius:6px;border-bottom-right-radius:6px}
            .arch-card-desc{margin-top:14px;font-family:'Josefin Sans',sans-serif;font-size:0.82rem;color:#6B5B4B;line-height:1.85;font-weight:500;text-align:center;padding:0 4px}
          `}</style>

          <div className="arch-cards-grid" key={activeTab}>
            {currentItems.map((item, i) => (
              <div key={i} className="arch-card" style={{ animationDelay:`${i*0.05}s`, animationFillMode:'both' }}>
                <div className="arch-card-img-wrap">
                  <div className="arch-inner-border" />
                  <img src={item.img} alt={item.title} loading="lazy"
                    onError={(e) => { e.currentTarget.onerror=null; e.currentTarget.src=`https://placehold.co/400x530/D8D0C0/6B5B4B?text=${encodeURIComponent(item.title)}` }} />
                </div>
                <div className="arch-card-label">{item.title}</div>
                <p className="arch-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background:'#ccb9b5' }}><TornEdgeTop fillColor="#eeece0" /></div>

      {/* ── 3D Room Planner ── */}
      <section style={{ padding:'1rem 2rem 2rem', background:'#ccb9b5' }}>
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <div style={{ display:'inline-block', background:'rgba(218,171,18,0.95)', border:'1px solid rgba(212,175,55,0.25)', color:'black', fontSize:11, letterSpacing:'0.12em', padding:'5px 16px', borderRadius:20, marginBottom:16, textTransform:'uppercase' }}>◆ Interactive Tool ◆</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1.8rem,4vw,3rem)', color:'#2a1e05', margin:'0 0 12px', lineHeight:1.2, fontWeight:300 }}>Design Your Dream Room</h2>
          <p style={{ color:'#532d05', fontSize:15, maxWidth:500, margin:'0 auto', lineHeight:1.7, fontFamily:"'Josefin Sans',sans-serif", fontWeight:300 }}>
            Try our 2D floor plan planner — drag, place and visualize your space before you commit.
          </p>
        </div>
        <div style={{ maxWidth:960, margin:'0 auto' }}><RoomDesigner3D /></div>
        <div style={{ textAlign:'center', marginTop:'2.5rem' }}>
          <p style={{ color:'#7A6A5A', fontSize:13, marginBottom:16, fontFamily:"'Josefin Sans',sans-serif" }}>Like what you've designed? Our experts will bring it to life.</p>
          <button onClick={() => navigate('/contact')} style={{ background:'linear-gradient(135deg,#D4AF37,#B8960C)', border:'none', color:'#1a0a00', padding:'12px 32px', borderRadius:8, fontWeight:700, fontSize:14, cursor:'pointer', letterSpacing:'0.05em', boxShadow:'0 8px 30px rgba(212,175,55,0.3)', transition:'transform 0.2s,box-shadow 0.2s', fontFamily:"'Josefin Sans',sans-serif" }}
            onMouseOver={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(212,175,55,0.4)' }}
            onMouseOut={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 8px 30px rgba(212,175,55,0.3)' }}>
            Book a Free Consultation →
          </button>
        </div>
      </section>

      {/* ── AI Room Visualizer — SEPARATE SECTION ── */}
      <AIRoomVisualizer />

      <div style={{ background:'#2C2416' }}><TornEdgeTop fillColor="#1a1208" /></div>

      {/* ── Process ── */}
      <section style={{ background:'#2C2416', padding:'10px 6vw' }}>
        <div style={{ height:10 }} />
        <div className="max-w-7xl mx-auto">
          <div className="slide-up text-center mb-16">
            <p className="section-label mb-4">How We Work</p>
            <h2 className="section-title" style={{ color:'#E7DECF' }}>Our <em style={{ color:'#C9A84C', fontStyle:'italic' }}>Process</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            {PROCESS.map((step, i) => (
              <div key={step.num} className="slide-up text-center" style={{ transitionDelay:`${i*0.1}s`, padding:'40px 24px', borderRight: i < PROCESS.length-1 ? '1px solid rgba(238,178,13,0.91)' : 'none' }}>
                <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'4.5rem', fontWeight:200, color:'rgba(234,184,20,0.93)', lineHeight:1, marginBottom:'1px' }}>{step.num}</div>
                <h4 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'2.2rem', fontWeight:400, color:'#E7DECF', marginBottom:'12px' }}>{step.title}</h4>
                <p style={{ fontFamily:'"Josefin Sans",sans-serif', fontSize:'1.02rem', color:'#B8B2AA', lineHeight:0.8, fontWeight:300 }}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ height:50 }} />
          <div className="text-center mt-13 slide-up" style={{ marginTop:'-60px', padding:'15px 20px' }}>
            <Link to="/contact">
              <button className="btn-gold" style={{ padding:'18px 90px', fontSize:'0.75rem' }}><span>Book a Free Consultation</span></button>
            </Link>
          </div>
        </div>
      </section>

      <div style={{ background:'#CCB9B5' }}><TornEdgeTop fillColor="#2C2416" /></div>

      {/* ── Completed Projects ── */}
      <section style={{ background:'#CCB9B5', paddingTop:'1px', padding:'30px 2vw' }}>
        <div className="max-w-7xl mx-auto text-center slide-up" style={{ marginTop:'30px' }}>
          <p className="section-label mb-4">OUR COMPLETED PROJECTS</p>
          <h2 className="section-title" style={{ color:'#2C2416', marginBottom:'60px' }}>Check out our <em style={{ fontStyle:'italic' }}>signature projects!</em></h2>
          <Link to="/portfolio"><button className="btn-gold"><span>View Portfolio</span></button></Link>
        </div>
      </section>

    </div>
  )
}