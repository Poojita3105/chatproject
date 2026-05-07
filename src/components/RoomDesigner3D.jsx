import { useState, useRef, useCallback } from "react";

/* ─── Furniture catalogue (top-down SVG icons via emoji/unicode or flaticon top-down pngs) ─── */
const CATEGORIES = [
  {
    id: "seating",
    label: "Seating",
    icon: "🛋️",
    items: [
      { id: "sofa-l",    label: "L-Sofa",     w: 120, h: 80,  color: "#8B7355", shape: "l-sofa" },
      { id: "sofa-2",    label: "2-Seater",   w: 100, h: 55,  color: "#7A6248", shape: "sofa" },
      { id: "armchair",  label: "Armchair",   w: 60,  h: 60,  color: "#9C8B72", shape: "armchair" },
      { id: "ottoman",   label: "Ottoman",    w: 55,  h: 45,  color: "#B8A48A", shape: "ottoman" },
    ],
  },
  {
    id: "tables",
    label: "Tables",
    icon: "🪑",
    items: [
      { id: "coffee",    label: "Coffee Table", w: 90,  h: 50,  color: "#6B5A4E", shape: "rect" },
      { id: "dining",    label: "Dining Table", w: 120, h: 70,  color: "#7A6B5D", shape: "rect-r" },
      { id: "round",     label: "Round Table",  w: 80,  h: 80,  color: "#8C7B6B", shape: "circle" },
      { id: "side",      label: "Side Table",   w: 40,  h: 40,  color: "#9D8C7C", shape: "circle-s" },
      { id: "desk",      label: "Work Desk",    w: 110, h: 55,  color: "#6B5A4E", shape: "rect" },
    ],
  },
  {
    id: "beds",
    label: "Beds",
    icon: "🛏️",
    items: [
      { id: "king",      label: "King Bed",     w: 130, h: 110, color: "#5C4D42", shape: "bed-k" },
      { id: "queen",     label: "Queen Bed",    w: 110, h: 100, color: "#6B5B50", shape: "bed-q" },
      { id: "single",    label: "Single Bed",   w: 70,  h: 100, color: "#7A6A5F", shape: "bed-s" },
    ],
  },
  {
    id: "storage",
    label: "Storage",
    icon: "🗄️",
    items: [
      { id: "wardrobe",  label: "Wardrobe",     w: 110, h: 40,  color: "#4A3D35", shape: "wardrobe" },
      { id: "bookshelf", label: "Bookshelf",    w: 90,  h: 30,  color: "#5C4E46", shape: "shelf" },
      { id: "cabinet",   label: "Cabinet",      w: 70,  h: 35,  color: "#6B5D55", shape: "rect" },
      { id: "drawer",    label: "Drawers",      w: 60,  h: 40,  color: "#7A6C64", shape: "drawer" },
    ],
  },
  {
    id: "decor",
    label: "Decor",
    icon: "🌿",
    items: [
      { id: "plant-l",   label: "Plant (L)",    w: 45,  h: 45,  color: "#4A7A4A", shape: "plant-l" },
      { id: "plant-s",   label: "Plant (S)",    w: 30,  h: 30,  color: "#5A8C5A", shape: "plant-s" },
      { id: "rug-r",     label: "Rug (Rect)",   w: 160, h: 110, color: "#C8A882", shape: "rug-r", isRug: true },
      { id: "rug-c",     label: "Rug (Round)",  w: 120, h: 120, color: "#D4B896", shape: "rug-c", isRug: true },
      { id: "lamp-f",    label: "Floor Lamp",   w: 28,  h: 28,  color: "#D4AF37", shape: "lamp" },
    ],
  },
];

/* ─── Top-down SVG shape renderer ─── */
function FurnitureSvg({ item, width, height, selected, rotation }) {
  const { shape, color, label } = item;
  const w = width, h = height;
  const cx = w / 2, cy = h / 2;
  const stroke = selected ? "#D4AF37" : "rgba(0,0,0,0.35)";
  const sw = selected ? 2 : 1;
  const shade = (col, amt) => col; // simplified

  const common = { stroke, strokeWidth: sw };

  const shapes = {
    "rect": (
      <g>
        <rect x={1} y={1} width={w-2} height={h-2} rx={4} fill={color} {...common}/>
        <rect x={4} y={4} width={w-8} height={h-8} rx={2} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={1}/>
      </g>
    ),
    "rect-r": (
      <g>
        <rect x={1} y={1} width={w-2} height={h-2} rx={6} fill={color} {...common}/>
        {/* chairs around dining table */}
        {[0.2, 0.5, 0.8].map((p, i) => (
          <rect key={i} x={p*w-8} y={-8} width={16} height={10} rx={3} fill={color} stroke={stroke} strokeWidth={sw}/>
        ))}
        {[0.2, 0.5, 0.8].map((p, i) => (
          <rect key={i+3} x={p*w-8} y={h-2} width={16} height={10} rx={3} fill={color} stroke={stroke} strokeWidth={sw}/>
        ))}
      </g>
    ),
    "circle": (
      <g>
        <circle cx={cx} cy={cy} r={cx-1} fill={color} {...common}/>
        <circle cx={cx} cy={cy} r={cx-5} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={1}/>
      </g>
    ),
    "circle-s": (
      <g>
        <circle cx={cx} cy={cy} r={cx-1} fill={color} {...common}/>
      </g>
    ),
    "sofa": (
      <g>
        <rect x={1} y={h*0.35} width={w-2} height={h*0.6} rx={5} fill={color} {...common}/>
        <rect x={1} y={1} width={w-2} height={h*0.38} rx={4} fill={`${color}CC`} {...common}/>
        <rect x={1} y={h*0.35} width={12} height={h*0.6} rx={3} fill={`${color}88`} {...common}/>
        <rect x={w-13} y={h*0.35} width={12} height={h*0.6} rx={3} fill={`${color}88`} {...common}/>
        <line x1={w/2} y1={h*0.35} x2={w/2} y2={h-1} stroke="rgba(0,0,0,0.2)" strokeWidth={1}/>
      </g>
    ),
    "l-sofa": (
      <g>
        <rect x={1} y={1} width={w*0.6} height={h-2} rx={5} fill={color} {...common}/>
        <rect x={w*0.6-1} y={h*0.45} width={w*0.4} height={h*0.55} rx={4} fill={`${color}DD`} {...common}/>
        <rect x={1} y={1} width={w*0.6} height={h*0.32} rx={3} fill={`${color}99`} {...common}/>
      </g>
    ),
    "armchair": (
      <g>
        <rect x={5} y={h*0.35} width={w-10} height={h*0.6} rx={5} fill={color} {...common}/>
        <rect x={5} y={1} width={w-10} height={h*0.38} rx={4} fill={`${color}CC`} {...common}/>
        <rect x={1} y={h*0.35} width={8} height={h*0.55} rx={3} fill={`${color}88`} {...common}/>
        <rect x={w-9} y={h*0.35} width={8} height={h*0.55} rx={3} fill={`${color}88`} {...common}/>
      </g>
    ),
    "ottoman": (
      <g>
        <rect x={1} y={1} width={w-2} height={h-2} rx={8} fill={color} {...common}/>
        <line x1={cx} y1={4} x2={cx} y2={h-4} stroke="rgba(255,255,255,0.2)" strokeWidth={1}/>
        <line x1={4} y1={cy} x2={w-4} y2={cy} stroke="rgba(255,255,255,0.2)" strokeWidth={1}/>
      </g>
    ),
    "bed-k": (
      <g>
        <rect x={1} y={1} width={w-2} height={h-2} rx={4} fill={color} {...common}/>
        <rect x={1} y={1} width={w-2} height={h*0.28} rx={4} fill={`${color}AA`} {...common}/>
        <rect x={8} y={h*0.32} width={w/2-12} height={h*0.62} rx={4} fill="rgba(255,255,255,0.12)" stroke="none"/>
        <rect x={w/2+4} y={h*0.32} width={w/2-12} height={h*0.62} rx={4} fill="rgba(255,255,255,0.12)" stroke="none"/>
        <rect x={w*0.3} y={4} width={w*0.4} height={h*0.2} rx={6} fill="rgba(255,255,255,0.18)" stroke="none"/>
      </g>
    ),
    "bed-q": (
      <g>
        <rect x={1} y={1} width={w-2} height={h-2} rx={4} fill={color} {...common}/>
        <rect x={1} y={1} width={w-2} height={h*0.28} rx={4} fill={`${color}AA`} {...common}/>
        <rect x={8} y={h*0.32} width={w-16} height={h*0.62} rx={4} fill="rgba(255,255,255,0.12)" stroke="none"/>
        <rect x={w*0.25} y={4} width={w*0.5} height={h*0.2} rx={6} fill="rgba(255,255,255,0.18)" stroke="none"/>
      </g>
    ),
    "bed-s": (
      <g>
        <rect x={1} y={1} width={w-2} height={h-2} rx={4} fill={color} {...common}/>
        <rect x={1} y={1} width={w-2} height={h*0.28} rx={4} fill={`${color}AA`} {...common}/>
        <rect x={6} y={h*0.32} width={w-12} height={h*0.62} rx={4} fill="rgba(255,255,255,0.1)" stroke="none"/>
      </g>
    ),
    "wardrobe": (
      <g>
        <rect x={1} y={1} width={w-2} height={h-2} rx={2} fill={color} {...common}/>
        <line x1={w/2} y1={1} x2={w/2} y2={h-1} stroke="rgba(0,0,0,0.25)" strokeWidth={1}/>
        <circle cx={w*0.25} cy={cy} r={2} fill="rgba(255,255,255,0.4)"/>
        <circle cx={w*0.75} cy={cy} r={2} fill="rgba(255,255,255,0.4)"/>
      </g>
    ),
    "shelf": (
      <g>
        <rect x={1} y={1} width={w-2} height={h-2} rx={2} fill={color} {...common}/>
        {[0.25, 0.5, 0.75].map((p,i)=>(
          <line key={i} x1={p*w} y1={1} x2={p*w} y2={h-1} stroke="rgba(0,0,0,0.2)" strokeWidth={1}/>
        ))}
      </g>
    ),
    "drawer": (
      <g>
        <rect x={1} y={1} width={w-2} height={h-2} rx={2} fill={color} {...common}/>
        <line x1={1} y1={h/3} x2={w-1} y2={h/3} stroke="rgba(0,0,0,0.2)" strokeWidth={1}/>
        <line x1={1} y1={2*h/3} x2={w-1} y2={2*h/3} stroke="rgba(0,0,0,0.2)" strokeWidth={1}/>
        {[h/6, h/2, 5*h/6].map((y,i)=>(
          <circle key={i} cx={cx} cy={y} r={2} fill="rgba(255,255,255,0.4)"/>
        ))}
      </g>
    ),
    "plant-l": (
      <g>
        <circle cx={cx} cy={cy} r={cx-2} fill={color} opacity={0.85} {...common}/>
        <circle cx={cx-7} cy={cy-6} r={8} fill="#3A6B3A" stroke="none"/>
        <circle cx={cx+7} cy={cy-6} r={7} fill="#5A8C5A" stroke="none"/>
        <circle cx={cx} cy={cy+5} r={8} fill="#4A7A4A" stroke="none"/>
        <circle cx={cx} cy={cy} r={4} fill="#3A6B3A" stroke="none"/>
      </g>
    ),
    "plant-s": (
      <g>
        <circle cx={cx} cy={cy} r={cx-1} fill={color} opacity={0.85} {...common}/>
        <circle cx={cx-4} cy={cy-3} r={5} fill="#3A6B3A" stroke="none"/>
        <circle cx={cx+4} cy={cy-3} r={4} fill="#5A8C5A" stroke="none"/>
        <circle cx={cx} cy={cy+3} r={5} fill="#4A7A4A" stroke="none"/>
      </g>
    ),
    "lamp": (
      <g>
        <circle cx={cx} cy={cy} r={cx-1} fill="#2A2000" {...common}/>
        <circle cx={cx} cy={cy} r={cx*0.55} fill={color} opacity={0.9} stroke="none"/>
        <circle cx={cx} cy={cy} r={cx*0.3} fill="#FFFDE7" opacity={0.95} stroke="none"/>
      </g>
    ),
    "rug-r": (
      <g>
        <rect x={1} y={1} width={w-2} height={h-2} rx={6} fill={color} opacity={0.6} {...common}/>
        <rect x={8} y={8} width={w-16} height={h-16} rx={4} fill="none" stroke={`${color}`} strokeWidth={1.5} opacity={0.7}/>
        <rect x={16} y={16} width={w-32} height={h-32} rx={2} fill="none" stroke={`${color}`} strokeWidth={1} opacity={0.5}/>
      </g>
    ),
    "rug-c": (
      <g>
        <circle cx={cx} cy={cy} r={cx-1} fill={color} opacity={0.55} {...common}/>
        <circle cx={cx} cy={cy} r={cx*0.7} fill="none" stroke={color} strokeWidth={1.5} opacity={0.7}/>
        <circle cx={cx} cy={cy} r={cx*0.4} fill="none" stroke={color} strokeWidth={1} opacity={0.5}/>
      </g>
    ),
  };

  return (
    <svg
      width={w} height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{ display:"block", overflow:"visible" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {shapes[shape] || shapes["rect"]}
      {selected && (
        <>
          <rect x={-4} y={-4} width={w+8} height={h+8} rx={3}
            fill="none" stroke="#D4AF37" strokeWidth={1.5} strokeDasharray="5,3"/>
          {/* corner handles */}
          {[[0,0],[w,0],[0,h],[w,h]].map(([hx,hy],i)=>(
            <rect key={i} x={hx-4} y={hy-4} width={8} height={8} rx={2}
              fill="#D4AF37" stroke="#fff" strokeWidth={1}/>
          ))}
        </>
      )}
    </svg>
  );
}

/* ─── Room grid canvas ─── */
const GRID = 20; // px per grid cell
const ROOM_W = 700;
const ROOM_H = 500;

function snap(v) { return Math.round(v / GRID) * GRID; }

export default function RoomDesigner3D() {
  const canvasRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [placed, setPlaced] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [dragging, setDragging] = useState(null); // { uid, offX, offY }
  const [zoom, setZoom] = useState(1);

  const cat = CATEGORIES.find(c => c.id === activeCategory);
  const selItem = placed.find(p => p.uid === selectedId);

  /* ─── Place item ─── */
  const placeItem = useCallback((item) => {
    setPlaced(prev => [...prev, {
      ...item,
      uid: Date.now() + Math.random(),
      x: snap(ROOM_W / 2 - item.w / 2),
      y: snap(ROOM_H / 2 - item.h / 2),
      rotation: 0,
    }]);
  }, []);

  /* ─── Mouse handlers ─── */
  const onMouseDown = useCallback((e, uid) => {
    e.stopPropagation();
    setSelectedId(uid);
    const rect = canvasRef.current.getBoundingClientRect();
    const item = placed.find(p => p.uid === uid);
    setDragging({
      uid,
      offX: (e.clientX - rect.left) / zoom - item.x,
      offY: (e.clientY - rect.top) / zoom - item.y,
    });
  }, [placed, zoom]);

  const onMouseMove = useCallback((e) => {
    if (!dragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const rawX = (e.clientX - rect.left) / zoom - dragging.offX;
    const rawY = (e.clientY - rect.top) / zoom - dragging.offY;
    setPlaced(prev => prev.map(p => {
      if (p.uid !== dragging.uid) return p;
      return {
        ...p,
        x: Math.max(0, Math.min(ROOM_W - p.w, snap(rawX))),
        y: Math.max(0, Math.min(ROOM_H - p.h, snap(rawY))),
      };
    }));
  }, [dragging, zoom]);

  const onMouseUp = useCallback(() => setDragging(null), []);

  /* ─── Rotate ─── */
  const rotateSelected = () => {
    if (!selectedId) return;
    setPlaced(prev => prev.map(p =>
      p.uid === selectedId
        ? { ...p, rotation: (p.rotation + 90) % 360, w: p.h, h: p.w }
        : p
    ));
  };

  /* ─── Delete ─── */
  const deleteSelected = () => {
    setPlaced(prev => prev.filter(p => p.uid !== selectedId));
    setSelectedId(null);
  };

  /* ─── Separate rugs (drawn first) from furniture ─── */
  const rugs = placed.filter(p => p.isRug);
  const furniture = placed.filter(p => !p.isRug);

  return (
    <div style={{
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: "linear-gradient(135deg,#1a0a00,#2b1405)",
      borderRadius: "20px",
      overflow: "hidden",
      border: "1px solid rgba(212,175,55,0.2)",
      boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
    }}>

      {/* ── Top Bar ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 20px",
        background: "rgba(0,0,0,0.4)",
        borderBottom: "1px solid rgba(212,175,55,0.15)",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:18, color:"#D4AF37" }}>⬛</span>
          <span style={{ color:"#F5E6C8", fontWeight:600, fontSize:15, letterSpacing:"0.04em" }}>
            Room Planner
          </span>
          <span style={{
            background:"rgba(212,175,55,0.15)", color:"#D4AF37",
            fontSize:11, padding:"2px 8px", borderRadius:20, letterSpacing:"0.06em"
          }}>FLOOR PLAN</span>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {[
            { label:"−", title:"Zoom out", action:()=>setZoom(z=>Math.max(0.5,+(z-0.1).toFixed(1))) },
            { label:`${Math.round(zoom*100)}%`, title:"Reset zoom", action:()=>setZoom(1) },
            { label:"+", title:"Zoom in",  action:()=>setZoom(z=>Math.min(1.8,+(z+0.1).toFixed(1))) },
          ].map((btn,i)=>(
            <button key={i} onClick={btn.action} title={btn.title} style={{
              background:"rgba(255,255,255,0.07)", border:"1px solid rgba(212,175,55,0.2)",
              color:"#D4AF37", padding:"4px 10px", borderRadius:6, cursor:"pointer",
              fontSize:13, minWidth:36,
            }}>{btn.label}</button>
          ))}
          {selectedId && (
            <>
              <button onClick={rotateSelected} style={actionBtnStyle}>⟳ Rotate</button>
              <button onClick={deleteSelected} style={{ ...actionBtnStyle, color:"#e87070", borderColor:"rgba(232,112,112,0.4)" }}>
                🗑 Delete
              </button>
            </>
          )}
          {placed.length > 0 && (
            <button onClick={() => { setPlaced([]); setSelectedId(null); }}
              style={{ ...actionBtnStyle, color:"#aaa", borderColor:"rgba(255,255,255,0.1)" }}>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div style={{ display:"flex", height: 560 }}>

        {/* ── Sidebar ── */}
        <div style={{
          width: 220, flexShrink:0,
          background:"rgba(0,0,0,0.3)",
          borderRight:"1px solid rgba(212,175,55,0.1)",
          display:"flex", flexDirection:"column",
          overflow:"hidden",
        }}>
          {/* Category tabs */}
          <div style={{ display:"flex", flexDirection:"column", padding:"10px 8px", gap:4 }}>
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => setActiveCategory(c.id)} style={{
                background: activeCategory === c.id ? "rgba(212,175,55,0.18)" : "transparent",
                border: activeCategory === c.id ? "1px solid rgba(212,175,55,0.4)" : "1px solid transparent",
                color: activeCategory === c.id ? "#D4AF37" : "#9B8C7C",
                padding:"7px 12px", borderRadius:8, cursor:"pointer",
                fontSize:13, textAlign:"left", display:"flex", alignItems:"center", gap:8,
                transition:"all 0.15s",
              }}>
                <span style={{ fontSize:15 }}>{c.icon}</span>
                {c.label}
              </button>
            ))}
          </div>

          {/* Furniture items */}
          <div style={{
            flex:1, overflowY:"auto", padding:"0 8px 12px",
            scrollbarWidth:"thin",
          }}>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {cat?.items.map(item => (
                <button key={item.id} onClick={() => placeItem(item)} style={{
                  background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.08)",
                  borderRadius:10, padding:"10px 12px",
                  cursor:"pointer", textAlign:"left",
                  display:"flex", alignItems:"center", gap:10,
                  transition:"all 0.15s",
                  color:"#E8D5BC",
                }}
                  onMouseOver={e => { e.currentTarget.style.background="rgba(212,175,55,0.1)"; e.currentTarget.style.borderColor="rgba(212,175,55,0.3)"; }}
                  onMouseOut={e => { e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; }}
                >
                  {/* Mini preview */}
                  <div style={{
                    width:32, height:32, borderRadius:6,
                    background:`${item.color}55`, border:`1px solid ${item.color}88`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    flexShrink:0,
                  }}>
                    <div style={{ width:16, height:16, background:item.color, borderRadius: item.shape?.includes("circle") ? "50%" : 3 }}/>
                  </div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:500 }}>{item.label}</div>
                    <div style={{ fontSize:10, color:"#7A6A5A" }}>{item.w}×{item.h} cm</div>
                  </div>
                  <span style={{ marginLeft:"auto", color:"#D4AF37", fontSize:16, opacity:0.7 }}>+</span>
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div style={{
            padding:"10px 12px",
            borderTop:"1px solid rgba(255,255,255,0.06)",
            fontSize:10, color:"#7A6A5A", lineHeight:1.6,
          }}>
            <div>💡 Click item to place</div>
            <div>🖱 Drag to move • Snap to grid</div>
            <div>⟳ Select then Rotate</div>
          </div>
        </div>

        {/* ── Canvas ── */}
        <div style={{
          flex:1, overflow:"hidden",
          background:"#1C1208",
          display:"flex", alignItems:"center", justifyContent:"center",
          position:"relative",
          cursor: dragging ? "grabbing" : "default",
        }}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {/* Outer room shadow */}
          <div style={{
            boxShadow:"0 0 60px rgba(0,0,0,0.8) inset",
            position:"absolute", inset:0, pointerEvents:"none", zIndex:10,
          }}/>

          {/* Zoom wrapper */}
          <div style={{
            transform:`scale(${zoom})`, transformOrigin:"center center",
            transition: dragging ? "none" : "transform 0.1s",
          }}>
            {/* Room */}
            <div
              ref={canvasRef}
              onClick={() => setSelectedId(null)}
              style={{
                width: ROOM_W, height: ROOM_H,
                position:"relative",
                background:"#F5F0E8",
                boxShadow:"0 0 0 10px #7A6050, 0 0 0 14px #4A3020, 0 30px 80px rgba(0,0,0,0.7)",
                overflow:"visible",
              }}
            >
              {/* Floor texture grid */}
              <svg width={ROOM_W} height={ROOM_H} style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
                <defs>
                  <pattern id="floorGrid" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                    <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="rgba(150,120,80,0.12)" strokeWidth={0.5}/>
                  </pattern>
                  <pattern id="floorTile" width={GRID*4} height={GRID*4} patternUnits="userSpaceOnUse">
                    <rect width={GRID*4} height={GRID*4} fill="none" stroke="rgba(150,120,80,0.07)" strokeWidth={1}/>
                  </pattern>
                </defs>
                <rect width={ROOM_W} height={ROOM_H} fill="url(#floorGrid)"/>
                <rect width={ROOM_W} height={ROOM_H} fill="url(#floorTile)"/>
                {/* Room walls (thick border inside) */}
                <rect x={0} y={0} width={ROOM_W} height={ROOM_H}
                  fill="none" stroke="#C8A878" strokeWidth={10}/>
                {/* Door indicator */}
                <path d={`M 60 ${ROOM_H} A 60 60 0 0 0 ${60+60} ${ROOM_H}`}
                  fill="rgba(200,168,120,0.15)" stroke="#C8A878" strokeWidth={1.5} strokeDasharray="4,3"/>
                <line x1={60} y1={ROOM_H} x2={60} y2={ROOM_H-3} stroke="#C8A878" strokeWidth={2}/>
                <line x1={120} y1={ROOM_H} x2={120} y2={ROOM_H-3} stroke="#C8A878" strokeWidth={2}/>
                {/* Window indicators */}
                {[[200,0,120],[450,0,100]].map(([x,y,len],i)=>(
                  <g key={i}>
                    <line x1={x} y1={y} x2={x+len} y2={y} stroke="#A0C8E0" strokeWidth={6} opacity={0.6}/>
                    <line x1={x} y1={y} x2={x+len} y2={y} stroke="#D0E8F5" strokeWidth={2}/>
                  </g>
                ))}
                {/* Ruler marks top */}
                {Array.from({length: Math.floor(ROOM_W/GRID)+1}, (_,i) => (
                  i % 5 === 0 && <g key={i}>
                    <line x1={i*GRID} y1={0} x2={i*GRID} y2={6} stroke="#C8A878" strokeWidth={1}/>
                    <text x={i*GRID} y={14} fill="#B09070" fontSize={8} textAnchor="middle">{i*GRID/10}m</text>
                  </g>
                ))}
                {Array.from({length: Math.floor(ROOM_H/GRID)+1}, (_,i) => (
                  i % 5 === 0 && i > 0 && <g key={i}>
                    <line x1={0} y1={i*GRID} x2={6} y2={i*GRID} stroke="#C8A878" strokeWidth={1}/>
                    <text x={14} y={i*GRID+3} fill="#B09070" fontSize={8} textAnchor="middle">{i*GRID/10}m</text>
                  </g>
                ))}
              </svg>

              {/* Rugs (bottom layer) */}
              {rugs.map(item => (
                <div key={item.uid}
                  onMouseDown={e => onMouseDown(e, item.uid)}
                  style={{
                    position:"absolute",
                    left: item.x, top: item.y,
                    width: item.w, height: item.h,
                    cursor: dragging?.uid === item.uid ? "grabbing" : "grab",
                    userSelect:"none",
                    transform: `rotate(${item.rotation}deg)`,
                    zIndex: selectedId === item.uid ? 5 : 1,
                  }}
                >
                  <FurnitureSvg item={item} width={item.w} height={item.h} selected={selectedId===item.uid} rotation={item.rotation}/>
                </div>
              ))}

              {/* Furniture (top layer) */}
              {furniture.map(item => (
                <div key={item.uid}
                  onMouseDown={e => onMouseDown(e, item.uid)}
                  style={{
                    position:"absolute",
                    left: item.x, top: item.y,
                    width: item.w, height: item.h,
                    cursor: dragging?.uid === item.uid ? "grabbing" : "grab",
                    userSelect:"none",
                    transform: `rotate(${item.rotation}deg)`,
                    zIndex: selectedId === item.uid ? 20 : 10,
                    filter: dragging?.uid === item.uid
                      ? "drop-shadow(0 6px 20px rgba(0,0,0,0.5))"
                      : "drop-shadow(0 2px 6px rgba(0,0,0,0.3))",
                    transition: dragging?.uid === item.uid ? "none" : "filter 0.15s",
                  }}
                >
                  <FurnitureSvg item={item} width={item.w} height={item.h} selected={selectedId===item.uid} rotation={item.rotation}/>
                </div>
              ))}

              {/* Empty state */}
              {placed.length === 0 && (
                <div style={{
                  position:"absolute", inset:0,
                  display:"flex", flexDirection:"column",
                  alignItems:"center", justifyContent:"center",
                  pointerEvents:"none",
                }}>
                  <div style={{ fontSize:40, opacity:0.18 }}>🏠</div>
                  <div style={{ color:"rgba(150,120,80,0.4)", fontSize:13, marginTop:8 }}>
                    Click items on the left to place furniture
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Selected item info bar */}
          {selItem && (
            <div style={{
              position:"absolute", bottom:0, left:0, right:0,
              background:"rgba(0,0,0,0.75)",
              backdropFilter:"blur(10px)",
              borderTop:"1px solid rgba(212,175,55,0.2)",
              padding:"8px 16px",
              display:"flex", alignItems:"center", gap:12, zIndex:20,
            }}>
              <span style={{ color:"#D4AF37", fontSize:13, fontWeight:600 }}>{selItem.label}</span>
              <span style={{ color:"#7A6A5A", fontSize:11 }}>
                {selItem.w}×{selItem.h} · x:{selItem.x} y:{selItem.y}
              </span>
              <span style={{ color:"#7A6A5A", fontSize:11 }}>Rotation: {selItem.rotation}°</span>
              <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
                <button onClick={rotateSelected} style={actionBtnStyle}>⟳ Rotate 90°</button>
                <button onClick={deleteSelected} style={{ ...actionBtnStyle, color:"#e87070", borderColor:"rgba(232,112,112,0.4)" }}>
                  🗑 Remove
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const actionBtnStyle = {
  background:"rgba(212,175,55,0.1)",
  border:"1px solid rgba(212,175,55,0.3)",
  color:"#D4AF37",
  padding:"4px 12px",
  borderRadius:6,
  cursor:"pointer",
  fontSize:12,
  whiteSpace:"nowrap",
};