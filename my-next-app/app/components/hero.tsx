'use client';

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import {
  Layers, Eye, Cloud, LayoutDashboard, CreditCard, Percent,
  ChevronLeft, ArrowDown, MapPin, X,
} from "lucide-react";

const c = {
  bg: "#f8f7ff",
  surface: "#ffffff",
  primary: "#635cc7",
  primaryLight: "#a3a3e0",
  primaryGhost: "rgba(99,92,199,0.05)",
  primaryBorder: "rgba(99,92,199,0.12)",
  text: "#0f0e2a",
  textMid: "#6b6990",
  textLight: "#a09dbd",
  textFaint: "#d4d2e3",
  border: "rgba(15,14,42,0.06)",
};

const SA_PATH = "M 540.059 1645.65 L 562.821 1575.47 L 453.713 1312.58 L 342.478 1256.02 L 312.294 1173.08 L 327.386 1131.6 L 61.545 631.96 L 6.867 631.96 L 61.545 430.235 L 212.39 460.395 L 312.294 360.472 L 421.649 334.07 L 436.741 283.169 L 485.753 266.185 L 374.517 105.943 L 672.423 6.02 L 1040.073 171.924 L 1406.931 486.402 L 1785.69 510.381 C 1799.149 533.52 1826.587 581.578 1828.616 588.648 C 1830.62 595.718 1905.214 598.339 1942.251 598.759 L 2077.336 804.563 L 2172.02 872.744 L 2206.113 937.118 L 2183.401 987.623 L 2328.58 1236.342 L 2412.65 1273.4 L 2567.899 1478.61 L 2951.557 1494.678 L 3006.877 1594.601 L 2924.787 1919.363 L 2500.084 2115.649 L 2161.06 2167.39 L 1889.825 2288.821 L 1817.111 2440.287 L 1751.919 2464.217 L 1698.701 2416.357 L 1497.359 2404.788 L 1459.085 2391.117 L 1369.325 2397.124 L 1353.862 2391.117 L 1263.261 2406.988 L 1195.842 2366.198 L 1168.8 2381.228 L 1171.348 2406.988 L 1156.331 2420.733 C 1157.617 2427.309 1160.19 2441.004 1160.19 2443.081 C 1160.19 2445.133 1155.638 2461.102 1153.386 2468.84 L 1168.8 2489.631 L 1124.514 2541.965 L 1094.973 2537.96 L 1087.204 2494.179 L 1029.83 2416.382 L 1022.062 2375.543 L 927.18 2288.821 L 762.9 1969.028 L 657.653 1910.216 L 562.821 1767.971 L 562.821 1680.73 Z";

const CITIES = [
  { id: "riyadh",  ar: "الرياض",       cx: 1700, cy: 1300, count: 60, desc: "المنطقة الوسطى" },
  { id: "jeddah",  ar: "جدة",          cx: 800,  cy: 1400, count: 45, desc: "المنطقة الغربية" },
  { id: "makkah",  ar: "مكة المكرمة", cx: 680,  cy: 1570, count: 20, desc: "المنطقة المقدسة" },
  { id: "madinah", ar: "المدينة",      cx: 860,  cy: 1020, count: 15, desc: "المنطقة الغربية" },
  { id: "dammam",  ar: "الدمام",       cx: 2380, cy: 1190, count: 25, desc: "المنطقة الشرقية" },
  { id: "abha",    ar: "أبها",         cx: 1020, cy: 1920, count: 10, desc: "المنطقة الجنوبية" },
];

/* ── Reveal helpers ── */
const FadeUp = ({ children, delay = 0, y = 40 }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  );
};

const WordReveal = ({ children, delay = 0, style = {} }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const words = (children as string).split(" ");
  return (
    <div ref={ref} style={{ ...style }}>
      {words.map((word: string, i: number) => (
        <motion.span key={i}
          initial={{ y: "110%", opacity: 0 }}
          animate={inView ? { y: "0%", opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", marginLeft: "0.28em", overflow: "hidden" }}
        >
          <motion.span style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.8, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >{word}</motion.span>
        </motion.span>
      ))}
    </div>
  );
};

const ClipRevealX = ({ children, from = "right", delay = 0 }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  return (
    <motion.div ref={ref}
      initial={{ clipPath: from === "right" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" }}
      animate={inView ? { clipPath: "inset(0 0% 0 0%)" } : {}}
      transition={{ duration: 1.3, delay, ease: [0.76, 0, 0.24, 1] }}
    >{children}</motion.div>
  );
};

const BlurReveal = ({ children, delay = 0 }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  return (
    <motion.div ref={ref}
      initial={{ scale: 0.88, opacity: 0, filter: "blur(18px)" }}
      animate={inView ? { scale: 1, opacity: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  );
};

const DiagonalReveal = ({ children, delay = 0 }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  return (
    <motion.div ref={ref}
      initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
      animate={inView ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" } : {}}
      transition={{ duration: 1.4, delay, ease: [0.76, 0, 0.24, 1] }}
    >{children}</motion.div>
  );
};

const StaggerSlide = ({ children, delay = 0 }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.1, once: true });
  const items = Array.isArray(children) ? children : [children];
  return (
    <div ref={ref}>
      {items.map((child: any, i: number) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: 28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: delay + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
        >{child}</motion.div>
      ))}
    </div>
  );
};

/* ── Framed image — corner brackets, no box ── */
const FramedImage = ({ src, alt, accent = c.primary }: any) => (
  <div style={{ position: "relative", display: "inline-block" }}>
    {[
      { top: -2,    right: -2, borderTop: `2.5px solid ${accent}`, borderRight: `2.5px solid ${accent}`, borderRadius: "0 12px 0 0" },
      { top: -2,    left: -2,  borderTop: `2.5px solid ${accent}`, borderLeft:  `2.5px solid ${accent}`, borderRadius: "12px 0 0 0" },
      { bottom: -2, right: -2, borderBottom: `2.5px solid ${accent}`, borderRight: `2.5px solid ${accent}`, borderRadius: "0 0 12px 0" },
      { bottom: -2, left: -2,  borderBottom: `2.5px solid ${accent}`, borderLeft:  `2.5px solid ${accent}`, borderRadius: "0 0 0 12px" },
    ].map((s, i) => (
      <div key={i} style={{ position: "absolute", width: 32, height: 32, zIndex: 4, ...s }} />
    ))}
    <div style={{
      position: "absolute", inset: -30,
      background: `radial-gradient(ellipse at center, ${accent}16 0%, transparent 68%)`,
      pointerEvents: "none", zIndex: 0,
    }} />
    <img src={src} alt={alt} style={{
      width: 460, maxWidth: "100%", height: "auto",
      display: "block", borderRadius: 16,
      position: "relative", zIndex: 2,
    }} />
  </div>
);

/* ── Section rule / divider with big ghost number ── */
const SectionDivider = ({ num, label, accent = c.primary }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  return (
    <div ref={ref} style={{
      padding: "0 48px", maxWidth: 1100, margin: "0 auto",
      position: "relative", zIndex: 2,
      display: "flex", alignItems: "center", gap: 0,
    }}>
      {/* Ghost watermark number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          fontSize: "clamp(5rem, 10vw, 8rem)",
          fontWeight: 900, color: accent,
          opacity: 0.055, lineHeight: 1,
          fontFamily: "monospace", letterSpacing: "-0.04em",
          userSelect: "none", flexShrink: 0,
          marginLeft: "0.15em",
        }}
      >{num}</motion.div>

      {/* Animated rule */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
        style={{
          flex: 1, height: 1, margin: "0 24px",
          background: `linear-gradient(90deg, ${accent}30, transparent)`,
          transformOrigin: "right",
        }}
      />

      {/* Label tag */}
      <motion.span
        initial={{ opacity: 0, x: 10 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.35 }}
        style={{
          fontSize: 10.5, fontWeight: 700, color: accent,
          letterSpacing: "0.28em", flexShrink: 0,
          opacity: 0.45,
        }}
      >{label}</motion.span>
    </div>
  );
};

/* ── Scroll progress line ── */
const JourneyLine = ({ scrollProgress }: any) => {
  const pathLen = useTransform(scrollProgress, [0.05, 0.93], [0, 1]);
  const jp = "M 500 0 C 500 100,200 200,200 350 C 200 500,800 550,800 700 C 800 850,150 900,150 1050 C 150 1200,850 1250,850 1400 C 850 1500,500 1550,500 1650";
  return (
    <svg viewBox="0 0 1000 1650" preserveAspectRatio="none"
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    >
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.primary} stopOpacity="0.55" />
          <stop offset="100%" stopColor={c.primaryLight} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path d={jp} fill="none" stroke={c.textFaint} strokeWidth="1" strokeDasharray="5 9" opacity="0.35" />
      <motion.path d={jp} fill="none" stroke="url(#lg)" strokeWidth="2.5"
        strokeLinecap="round" style={{ pathLength: pathLen }} />
      {[350, 700, 1050, 1400].map((cy, i) => (
        <motion.circle key={i} cx={[200, 800, 150, 850][i]} cy={cy} r="4.5"
          fill={c.bg} stroke={c.primary} strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.1 }}
        />
      ))}
    </svg>
  );
};

/* ── Interactive Map ── */
const InteractiveMap = () => {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const active = CITIES.find(ct => ct.id === activeCity);

  return (
    <div style={{ position: "relative", width: "clamp(500px, 56vw, 740px)" }}>
      <svg viewBox="-300 -250 3600 3200"
        style={{ width: "100%", height: "auto", overflow: "visible", display: "block" }}
      >
        <defs>
          <filter id="halo">
            <feGaussianBlur stdDeviation="12" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
          <filter id="dotglow">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
          <radialGradient id="mapfill" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor={c.primary} stopOpacity="0.08" />
            <stop offset="100%" stopColor={c.primary} stopOpacity="0.01" />
          </radialGradient>
        </defs>

        <path d={SA_PATH} fill="url(#mapfill)" />

        {/* Halo glow behind border */}
        <path d={SA_PATH} fill="none"
          stroke={c.primaryLight} strokeWidth="20"
          strokeLinecap="round" strokeLinejoin="round"
          opacity="0.09"
          style={{ filter: "url(#halo)" }}
        />

        {/* Main border — thick & animated */}
        <motion.path d={SA_PATH} fill="none"
          stroke={c.primary} strokeWidth="6.5"
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ delay: 0.5, duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Inner shimmer */}
        <motion.path d={SA_PATH} fill="none"
          stroke="#fff" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.07 }}
          transition={{ delay: 2, duration: 3, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Cities */}
        {CITIES.map((city, i) => {
          const isActive = activeCity === city.id;
          return (
            <g key={city.id}
              onClick={() => setActiveCity(isActive ? null : city.id)}
              style={{ cursor: "pointer" }}
            >
              {/* Pulse */}
              <motion.circle cx={city.cx} cy={city.cy} r="28" fill="none"
                stroke={c.primary} strokeWidth="1.2"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, isActive ? 0.45 : 0.18, 0],
                  scale: [0.8, 2.4, 3.2],
                }}
                transition={{ delay: 2.6 + i * 0.18, duration: isActive ? 1.6 : 3.2, repeat: Infinity }}
              />
              {/* Ring */}
              <motion.circle cx={city.cx} cy={city.cy} r={isActive ? 24 : 17}
                fill={isActive ? c.primary : `${c.primary}12`}
                stroke={c.primary} strokeWidth={isActive ? 0 : 1.5}
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0.5 }}
                style={{ transition: "all 0.35s ease", filter: isActive ? "url(#dotglow)" : "none" }}
              />
              {/* Dot */}
              <motion.circle cx={city.cx} cy={city.cy} r={isActive ? 9 : 7}
                fill={isActive ? "#fff" : c.primary}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + i * 0.15 }}
              />
              {/* Label */}
              <foreignObject x={city.cx - 95} y={city.cy - 80} width="190" height="58">
                <div style={{ textAlign: "center", fontFamily: "'Tajawal',sans-serif" }}>
                  <div style={{
                    fontSize: isActive ? "25px" : "21px",
                    fontWeight: isActive ? 800 : 700,
                    color: isActive ? c.primary : c.text,
                    textShadow: "0 1px 4px rgba(248,247,255,1), 0 0 24px rgba(248,247,255,1)",
                    transition: "all 0.3s",
                    whiteSpace: "nowrap",
                  }}>{city.ar}</div>
                  {isActive && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                      style={{
                        fontSize: "13px", fontWeight: 600, color: c.primary, opacity: 0.8,
                        textShadow: "0 1px 4px rgba(248,247,255,1)",
                      }}
                    >{city.count}+ مساحة</motion.div>
                  )}
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>

      {/* Popup */}
      <AnimatePresence>
        {active && (
          <motion.div key={active.id}
            initial={{ opacity: 0, y: 14, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.93 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)",
              background: "#fff", border: `1px solid ${c.primaryBorder}`,
              borderRadius: 18, padding: "18px 22px",
              boxShadow: `0 8px 40px rgba(99,92,199,0.16)`,
              minWidth: 230, zIndex: 10,
              fontFamily: "'Tajawal',sans-serif", direction: "rtl",
            }}
          >
            <button onClick={() => setActiveCity(null)}
              style={{ position: "absolute", top: 10, left: 10, background: "none", border: "none", cursor: "pointer", color: c.textLight }}
            ><X size={13} /></button>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9,
                background: c.primaryGhost, border: `1px solid ${c.primaryBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}><MapPin size={15} color={c.primary} /></div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800 }}>{active.ar}</div>
                <div style={{ fontSize: 11.5, color: c.textLight }}>{active.desc}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{
                flex: 1, textAlign: "center", padding: "10px 6px", borderRadius: 10,
                background: c.primaryGhost, border: `1px solid ${c.primaryBorder}`,
              }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: c.primary }}>+{active.count}</div>
                <div style={{ fontSize: 11, color: c.textMid, marginTop: 2 }}>مساحة بيع</div>
              </div>
              <div style={{
                flex: 1, textAlign: "center", padding: "10px 6px", borderRadius: 10,
                background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.14)",
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#22c55e" }}>متاحة</div>
                <div style={{ fontSize: 11, color: c.textMid, marginTop: 2 }}>للانضمام</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 1 }}
        style={{
          textAlign: "center", fontSize: 11.5, color: c.textLight,
          marginTop: 8, letterSpacing: "0.1em", fontFamily: "'Tajawal',sans-serif",
        }}
      >اضغط على المدن للاستكشاف</motion.p>
    </div>
  );
};

/* ═══ MAIN ═══ */
export default function RofofLanding() {
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pageRef });

  return (
    <div ref={pageRef} dir="rtl" style={{
      fontFamily: "'Tajawal', sans-serif",
      color: c.text, background: c.bg, overflowX: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet" />

      {/* ─── NAV ─── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          padding: "16px 48px", display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(248,247,255,0.93)",
          backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)",
          borderBottom: `1px solid ${c.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: `linear-gradient(135deg, ${c.primary}, ${c.primaryLight})`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Layers size={18} color="#fff" strokeWidth={2} />
          </div>
          <span style={{ fontSize: 21, fontWeight: 800 }}>رفوف</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {["كيف يعمل", "التسعير", "الأسئلة"].map(l => (
            <a key={l} href="#" style={{ textDecoration: "none", color: c.textMid, fontSize: 14, fontWeight: 600 }}>{l}</a>
          ))}
          <div style={{
            padding: "10px 22px", borderRadius: 10, border: `1px solid ${c.border}`,
            color: c.primary, fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}>انضم كشريك</div>
          <div style={{
            padding: "10px 24px", borderRadius: 10, background: c.primary, color: "#fff",
            fontSize: 13, fontWeight: 700, cursor: "pointer",
            boxShadow: `0 4px 18px rgba(99,92,199,0.25)`,
          }}>ابدأ مع رفوف</div>
        </div>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "130px 40px 60px", position: "relative", overflow: "visible",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -48%)",
          pointerEvents: "auto", zIndex: 1,
        }}>
          <InteractiveMap />
        </div>

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 720 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "8px 22px", borderRadius: 100,
              border: `1px solid ${c.primaryBorder}`, marginBottom: 36,
              background: "rgba(99,92,199,0.04)",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: c.primary, letterSpacing: "0.08em" }}>
              المنصّة الأولى في السعودية
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)", fontWeight: 300,
              lineHeight: 1.2, marginBottom: 8,
              textShadow: "0 2px 24px rgba(248,247,255,0.95)",
            }}
          >علامتك ما تحتاج فرع</motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)", fontWeight: 800,
              lineHeight: 1.2, marginBottom: 32,
              background: `linear-gradient(135deg, ${c.primary}, ${c.primaryLight})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}
          >علامتك تحتاج رفوف</motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            style={{
              fontSize: 17, lineHeight: 2, color: c.textMid, fontWeight: 400,
              maxWidth: 500, margin: "0 auto 44px",
              padding: "12px 20px", borderRadius: 12,
              background: "rgba(248,247,255,0.78)",
              backdropFilter: "blur(8px)",
            }}
          >
            مشغّل سحابي يفتح لعلامتك مساحات بيع فعلية جاهزة، بلا فروع جديدة ولا إدارة تشغيل معقّدة
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            style={{ display: "flex", gap: 16, justifyContent: "center" }}
          >
            <motion.button
              whileHover={{ y: -2, boxShadow: `0 8px 32px rgba(99,92,199,0.35)` }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "16px 38px", border: "none", borderRadius: 12,
                background: c.primary, color: "#fff", fontSize: 16, fontWeight: 700,
                fontFamily: "inherit", cursor: "pointer",
                boxShadow: `0 4px 20px rgba(99,92,199,0.25)`,
              }}
            >ابدأ مع رفوف الآن <ChevronLeft size={17} /></motion.button>
            <motion.button
              whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
              style={{
                padding: "16px 32px", borderRadius: 12,
                border: `1px solid ${c.border}`, background: "rgba(255,255,255,0.8)",
                color: c.textMid, fontSize: 16, fontWeight: 600,
                fontFamily: "inherit", cursor: "pointer",
              }}
            >انضم كشريك مساحة</motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
          style={{
            position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 3,
          }}
        >
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
            <ArrowDown size={15} color={c.textLight} />
          </motion.div>
          <span style={{ fontSize: 11, color: c.textLight, letterSpacing: "0.2em" }}>اكتشف الرحلة</span>
        </motion.div>
      </section>

      {/* ─── CONTENT ─── */}
      <div style={{ position: "relative" }}>
        <JourneyLine scrollProgress={scrollYProgress} />

        {/* ══════ 01 المشكلة ══════ */}
        <SectionDivider num="01" label="المشكلة" accent="#e07a9a" />
        <section style={{ padding: "80px 48px 120px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 88 }}>
            <div style={{ flex: 1 }}>
              <div style={{ overflow: "hidden", marginBottom: 4 }}>
                <WordReveal delay={0.05} style={{
                  fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", fontWeight: 800, lineHeight: 1.3,
                }}>فتح فرع جديد</WordReveal>
              </div>
              <div style={{ overflow: "hidden", marginBottom: 32 }}>
                <WordReveal delay={0.2} style={{
                  fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", fontWeight: 300,
                  lineHeight: 1.3, color: c.textMid,
                }}>= تكلفة، وقت، وتعقيد</WordReveal>
              </div>
              <FadeUp delay={0.35}>
                <p style={{ fontSize: 16, lineHeight: 2.1, color: c.textMid, maxWidth: 420, marginBottom: 36 }}>
                  إدارة تشغيل، إيجار، موظفين، وتراخيص — كل هذا عشان تبيع في مكان واحد. علامتك تستحق طريقة أذكى.
                </p>
              </FadeUp>
              <FadeUp delay={0.45}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {["إيجار مرتفع", "تراخيص معقّدة", "إدارة موظفين", "وقت ضائع"].map((t, i) => (
                    <motion.span key={i}
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.07, type: "spring", stiffness: 220, damping: 14 }}
                      style={{
                        padding: "8px 18px", borderRadius: 8,
                        border: "1px solid rgba(224,122,154,0.2)",
                        background: "rgba(224,122,154,0.05)",
                        color: "#d4658b", fontSize: 13, fontWeight: 600,
                      }}
                    >{t}</motion.span>
                  ))}
                </div>
              </FadeUp>
            </div>
            <ClipRevealX from="right" delay={0.15}>
              <FramedImage
                src="https://static.vecteezy.com/system/resources/thumbnails/034/800/934/small/3d-stair-infographic-elements-design-with-5-options-steps-or-processes-and-marketing-can-be-used-for-presentation-png.png"
                alt="المشكلة" accent="#e07a9a"
              />
            </ClipRevealX>
          </div>
        </section>

        {/* ══════ 02 الحل ══════ */}
        <SectionDivider num="02" label="الحل" accent={c.primary} />
        <section style={{ padding: "80px 48px 120px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 88, flexDirection: "row-reverse" }}>
            <div style={{ flex: 1 }}>
              <div style={{ overflow: "hidden", marginBottom: 4 }}>
                <WordReveal delay={0.05} style={{
                  fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", fontWeight: 800, lineHeight: 1.3,
                }}>رفوف يحل لك</WordReveal>
              </div>
              <div style={{ overflow: "hidden", marginBottom: 32 }}>
                <WordReveal delay={0.2} style={{
                  fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", fontWeight: 300,
                  lineHeight: 1.3, color: c.textMid,
                }}>كل هذا</WordReveal>
              </div>
              <FadeUp delay={0.35}>
                <p style={{ fontSize: 16, lineHeight: 2.1, color: c.textMid, maxWidth: 420, marginBottom: 32 }}>
                  تحط منتجاتك في مساحات بيع فعلية، وتبقى هويتك هي الظاهرة للعميل في كل مساحة وكل نقطة بيع.
                </p>
              </FadeUp>
              <StaggerSlide delay={0.4}>
                {[
                  { Icon: Eye,             text: "هويتك ظاهرة ١٠٠٪ في كل نقطة بيع" },
                  { Icon: LayoutDashboard, text: "تدير كل شيء من لوحة تحكّم واحدة" },
                  { Icon: Cloud,           text: "مشغّل سحابي بالكامل — بدون وسيط" },
                ].map((f, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "16px 0",
                    borderBottom: i < 2 ? `1px solid ${c.border}` : "none",
                  }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                      background: c.primaryGhost, border: `1px solid ${c.primaryBorder}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <f.Icon size={17} color={c.primary} strokeWidth={1.8} />
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{f.text}</span>
                  </div>
                ))}
              </StaggerSlide>
            </div>
            <BlurReveal delay={0.15}>
              <FramedImage src="./solution.png" alt="الحل" accent={c.primary} />
            </BlurReveal>
          </div>
        </section>

        {/* ══════ 03 كيف تبدأ ══════ */}
        <SectionDivider num="03" label="كيف تبدأ" accent="#22c55e" />
        <section style={{ padding: "80px 48px 120px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 88 }}>
            <div style={{ flex: 1 }}>
              <div style={{ overflow: "hidden", marginBottom: 4 }}>
                <WordReveal delay={0.05} style={{
                  fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", fontWeight: 800, lineHeight: 1.3,
                }}>ثلاث خطوات</WordReveal>
              </div>
              <div style={{ overflow: "hidden", marginBottom: 40 }}>
                <WordReveal delay={0.2} style={{
                  fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", fontWeight: 300,
                  lineHeight: 1.3, color: c.textMid,
                }}>وتبدأ البيع</WordReveal>
              </div>
              {[
                { num: "١", title: "سجّل في رفوف",   desc: "أنشئ حساب علامتك التجارية في دقائق",      accent: "#22c55e" },
                { num: "٢", title: "اختر المساحات",  desc: "اختر المساحات الفعلية المناسبة لعلامتك",  accent: c.primary },
                { num: "٣", title: "تابع مبيعاتك",   desc: "تابع حركة مبيعاتك من لوحة تحكّم واحدة",  accent: "#f59e0b" },
              ].map((s, i) => (
                <FadeUp key={i} delay={0.3 + i * 0.18} y={40}>
                  <div style={{
                    display: "flex", alignItems: "flex-start", gap: 22,
                    padding: "22px 0",
                    borderBottom: i < 2 ? `1px solid ${c.border}` : "none",
                  }}>
                    <span style={{
                      fontSize: "clamp(2.5rem, 4vw, 3.2rem)",
                      fontWeight: 900, color: s.accent, opacity: 0.22,
                      lineHeight: 1, flexShrink: 0, fontFamily: "monospace",
                      minWidth: 52,
                    }}>{s.num}</span>
                    <div style={{ paddingTop: 4 }}>
                      <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 6 }}>{s.title}</div>
                      <div style={{ fontSize: 14, color: c.textMid, lineHeight: 1.75 }}>{s.desc}</div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
            <DiagonalReveal delay={0.2}>
              <FramedImage src="./steps.png" alt="الخطوات" accent="#22c55e" />
            </DiagonalReveal>
          </div>
        </section>

        {/* ══════ 04 التسعير ══════ */}
        <SectionDivider num="04" label="التسعير" accent={c.primary} />
        <section style={{ padding: "80px 48px 120px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 88, flexDirection: "row-reverse" }}>
            <div style={{ flex: 1 }}>
              <div style={{ overflow: "hidden", marginBottom: 4 }}>
                <WordReveal delay={0.05} style={{
                  fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", fontWeight: 800, lineHeight: 1.3,
                }}>نموذج تسعير</WordReveal>
              </div>
              <div style={{ overflow: "hidden", marginBottom: 28 }}>
                <WordReveal delay={0.2} style={{
                  fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", fontWeight: 300,
                  lineHeight: 1.3, color: c.textMid,
                }}>بسيط وواضح</WordReveal>
              </div>
              <FadeUp delay={0.35}>
                <p style={{ fontSize: 16, lineHeight: 2.1, color: c.textMid, maxWidth: 400, marginBottom: 48 }}>
                  اختر ما يلائم نموذج عملك، ورفوف تتكفّل بالباقي.
                </p>
              </FadeUp>

              {/* Two pricing options — open columns, no boxes */}
              <div style={{ display: "flex", gap: 48 }}>
                {[
                  { Icon: CreditCard, title: "رسوم خدمة",    desc: "رسوم متفق عليها مسبقاً" },
                  { Icon: Percent,    title: "عمولة مبيعات", desc: "ادفع فقط عند البيع" },
                ].map((o, i) => (
                  <FadeUp key={i} delay={0.45 + i * 0.18} y={30}>
                    <div style={{
                      paddingLeft: i === 1 ? 48 : 0,
                      borderRight: i === 0 ? `1px solid ${c.border}` : "none",
                    }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 12,
                        background: c.primaryGhost, border: `1px solid ${c.primaryBorder}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginBottom: 18,
                      }}>
                        <o.Icon size={20} color={c.primary} strokeWidth={1.5} />
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{o.title}</div>
                      <div style={{ fontSize: 14, color: c.textMid, lineHeight: 1.75 }}>{o.desc}</div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
            <BlurReveal delay={0.15}>
              <FramedImage src="./pricing.png" alt="التسعير" accent={c.primaryLight} />
            </BlurReveal>
          </div>
        </section>

        {/* ══════ CTA ══════ */}
        <section style={{ padding: "40px 48px 130px", position: "relative", zIndex: 2 }}>
          <div style={{
            width: "100%", height: 1, maxWidth: 900, margin: "0 auto 100px",
            background: `linear-gradient(90deg, transparent, ${c.primary}22, transparent)`,
          }} />
          <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
            <FadeUp>
              <span style={{
                fontSize: 10.5, fontWeight: 700, color: c.primary,
                letterSpacing: "0.3em", opacity: 0.4, display: "block", marginBottom: 32,
              }}>ابدأ الآن</span>
            </FadeUp>

            <div style={{ marginBottom: 8 }}>
              <WordReveal delay={0.1} style={{
                fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 300, lineHeight: 1.25,
              }}>وصّل علامتك لكل مكان</WordReveal>
            </div>
            <div style={{ marginBottom: 40 }}>
              <WordReveal delay={0.3} style={{
                fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 800, lineHeight: 1.25,
                background: `linear-gradient(135deg, ${c.primary}, ${c.primaryLight})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>بدون فرع واحد</WordReveal>
            </div>

            <FadeUp delay={0.5}>
              <p style={{ fontSize: 17, lineHeight: 2, color: c.textMid, marginBottom: 48 }}>
                هدف رفوف أن تُحل مشكلة الحضور الفعلي للعلامات التجارية بنسبة ١٠٠٪، بأقل جهد وأعلى أثر.
              </p>
            </FadeUp>

            <FadeUp delay={0.6}>
              <motion.button
                whileHover={{ y: -3, boxShadow: `0 12px 40px rgba(99,92,199,0.35)` }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 12,
                  padding: "18px 52px", border: "none", borderRadius: 14,
                  background: c.primary, color: "#fff", fontSize: 17, fontWeight: 700,
                  fontFamily: "inherit", cursor: "pointer",
                  boxShadow: `0 6px 28px rgba(99,92,199,0.3)`,
                }}
              >ابدأ مع رفوف الآن <ChevronLeft size={19} /></motion.button>
            </FadeUp>

            <div style={{
              display: "flex", justifyContent: "center", gap: 60, marginTop: 72,
              borderTop: `1px solid ${c.border}`, paddingTop: 48,
            }}>
              {[
                { val: "+١٥٠", label: "مساحة بيع" },
                { val: "+٨٠",  label: "علامة تجارية" },
                { val: "٦",    label: "مدن" },
                { val: "١٠٠٪", label: "سحابي" },
              ].map((s, i) => (
                <FadeUp key={i} delay={0.7 + i * 0.08}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{
                      fontSize: 28, fontWeight: 900,
                      background: `linear-gradient(135deg, ${c.primary}, ${c.primaryLight})`,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>{s.val}</div>
                    <div style={{ fontSize: 12, color: c.textLight, marginTop: 6, letterSpacing: "0.08em" }}>{s.label}</div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ─── FOOTER ─── */}
      <footer style={{
        padding: "40px 48px", borderTop: `1px solid ${c.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        maxWidth: 1100, margin: "0 auto",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: `linear-gradient(135deg, ${c.primary}, ${c.primaryLight})`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Layers size={14} color="#fff" />
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: c.textMid }}>رفوف</span>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {["عن رفوف", "كيف يعمل", "الأسئلة الشائعة", "الدعم الفني"].map(l => (
            <a key={l} href="#" style={{ textDecoration: "none", color: c.textLight, fontSize: 13, fontWeight: 500 }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}