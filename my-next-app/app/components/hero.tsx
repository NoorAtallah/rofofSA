'use client';

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import {
  Layers, Eye, Cloud, LayoutDashboard, CreditCard, Percent,
  ChevronLeft, ArrowDown, MapPin, X,
} from "lucide-react";

/* ── Load GSAP via CDN in head ── */
const GSAPLoader = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.gsap) return;

    const script1 = document.createElement("script");
    script1.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    script1.onload = () => {
      const script2 = document.createElement("script");
      script2.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
      script2.onload = () => {
        window.gsap.registerPlugin(window.ScrollTrigger);
        window.dispatchEvent(new Event("gsap-ready"));
      };
      document.head.appendChild(script2);
    };
    document.head.appendChild(script1);
  }, []);
  return null;
};

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

/* ── GSAP Scroll Hooks ── */
function useGSAPReveal(opts = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const applyGSAP = () => {
      if (!window.gsap || !window.ScrollTrigger) return;
      const { y = 60, duration = 1.1, delay = 0, stagger = 0, from = "bottom" } = opts;
      const targets = stagger > 0 ? el.children : el;
      window.gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: from === "bottom" ? y : -y,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration,
          delay,
          stagger,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    };

    if (window.gsap && window.ScrollTrigger) {
      applyGSAP();
    } else {
      window.addEventListener("gsap-ready", applyGSAP, { once: true });
    }
    return () => window.removeEventListener("gsap-ready", applyGSAP);
  }, []);
  return ref;
}

function useGSAPClipReveal(direction = "right", delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const applyGSAP = () => {
      if (!window.gsap || !window.ScrollTrigger) return;
      const fromClip = direction === "right" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
      window.gsap.fromTo(
        el,
        { clipPath: fromClip, opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0%)",
          opacity: 1,
          duration: 1.5,
          delay,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    };
    if (window.gsap && window.ScrollTrigger) applyGSAP();
    else window.addEventListener("gsap-ready", applyGSAP, { once: true });
    return () => window.removeEventListener("gsap-ready", applyGSAP);
  }, []);
  return ref;
}

function useGSAPBlurReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const applyGSAP = () => {
      if (!window.gsap || !window.ScrollTrigger) return;
      window.gsap.fromTo(
        el,
        { scale: 0.85, opacity: 0, filter: "blur(24px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    };
    if (window.gsap && window.ScrollTrigger) applyGSAP();
    else window.addEventListener("gsap-ready", applyGSAP, { once: true });
    return () => window.removeEventListener("gsap-ready", applyGSAP);
  }, []);
  return ref;
}

function useGSAPCounter(target, delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const applyGSAP = () => {
      if (!window.gsap || !window.ScrollTrigger) return;
      const obj = { val: 0 };
      window.gsap.to(obj, {
        val: target,
        duration: 2.2,
        delay,
        ease: "power3.out",
        onUpdate: () => {
          if (el) el.textContent = "+" + Math.round(obj.val);
        },
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    };
    if (window.gsap && window.ScrollTrigger) applyGSAP();
    else window.addEventListener("gsap-ready", applyGSAP, { once: true });
    return () => window.removeEventListener("gsap-ready", applyGSAP);
  }, [target]);
  return ref;
}

/* ── Framed Image — corner brackets + consistent frame ── */
const FramedImage = ({ src, alt, accent = c.primary }) => {
  const blurRef = useGSAPBlurReveal(0.1);
  return (
    <div ref={blurRef} style={{ position: "relative", display: "inline-block" }}>
      {/* Corner brackets */}
      {[
        { top: -4,    right: -4, borderTop: `2.5px solid ${accent}`, borderRight: `2.5px solid ${accent}`, borderRadius: "0 14px 0 0" },
        { top: -4,    left: -4,  borderTop: `2.5px solid ${accent}`, borderLeft:  `2.5px solid ${accent}`, borderRadius: "14px 0 0 0" },
        { bottom: -4, right: -4, borderBottom: `2.5px solid ${accent}`, borderRight: `2.5px solid ${accent}`, borderRadius: "0 0 14px 0" },
        { bottom: -4, left: -4,  borderBottom: `2.5px solid ${accent}`, borderLeft:  `2.5px solid ${accent}`, borderRadius: "0 0 0 14px" },
      ].map((s, i) => (
        <div key={i} style={{ position: "absolute", width: 36, height: 36, zIndex: 4, ...s }} />
      ))}

      {/* Glow halo */}
      <div style={{
        position: "absolute", inset: -40,
        background: `radial-gradient(ellipse at center, ${accent}18 0%, transparent 65%)`,
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Thin accent border around image */}
      <div style={{
        position: "absolute", inset: 0,
        borderRadius: 16,
        border: `1px solid ${accent}30`,
        zIndex: 3, pointerEvents: "none",
      }} />

      <img src={src} alt={alt} style={{
        width: 460, maxWidth: "100%", height: "auto",
        display: "block", borderRadius: 16,
        position: "relative", zIndex: 2,
      }} />

      {/* Bottom accent bar */}
      <div style={{
        position: "absolute", bottom: -1, left: "20%", right: "20%",
        height: 2, borderRadius: 2,
        background: `linear-gradient(90deg, transparent, ${accent}60, transparent)`,
        zIndex: 4,
      }} />
    </div>
  );
};

/* ── Section divider ── */
const SectionDivider = ({ num, label, accent = c.primary }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  return (
    <div ref={ref} style={{
      padding: "0 48px", maxWidth: 1100, margin: "0 auto",
      position: "relative", zIndex: 2,
      display: "flex", alignItems: "center", gap: 0,
    }}>
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

/* ── WordReveal ── */
const WordReveal = ({ children, delay = 0, style = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const words = (children).split(" ");
  return (
    <div ref={ref} style={style}>
      {words.map((word, i) => (
        <motion.span key={i}
          initial={{ y: "110%", opacity: 0 }}
          animate={inView ? { y: "0%", opacity: 1 } : {}}
          transition={{ duration: 0.85, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", marginLeft: "0.28em", overflow: "hidden" }}
        >
          <motion.span style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.85, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >{word}</motion.span>
        </motion.span>
      ))}
    </div>
  );
};

/* ── OrbRider: glowing orb that rides the journey path via CSS offset-path ── */
const OrbRider = ({ scrollProgress }) => {
  const orbRef = useRef(null);

  useEffect(() => {
    if (!orbRef.current) return;
    const jp = "M 500 0 C 500 100,200 200,200 350 C 200 500,800 550,800 700 C 800 850,150 900,150 1050 C 150 1200,850 1250,850 1400 C 850 1500,500 1550,500 1650";
    // Set CSS offset-path — needs % coordinates matching the SVG viewBox 0 0 1000 1750
    orbRef.current.style.offsetPath = `path('${jp}')`;
  }, []);

  useEffect(() => {
    if (!orbRef.current) return;
    const unsubscribe = scrollProgress.on("change", (v) => {
      if (orbRef.current) {
        orbRef.current.style.offsetDistance = `${Math.min(v * 100, 100)}%`;
        // Hide orb before it starts or at destination
        orbRef.current.style.opacity = v < 0.01 || v > 0.91 ? "0" : "1";
      }
    });
    return unsubscribe;
  }, [scrollProgress]);

  return (
    <div
      ref={orbRef}
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: 0, height: 0,
        offsetDistance: "0%",
        offsetRotate: "0deg",
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      }}
    >
      {/* Outer halo */}
      <div style={{
        position: "absolute",
        width: 52, height: 52,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${c.primary}30 0%, transparent 70%)`,
        transform: "translate(-26px, -26px)",
        filter: "blur(8px)",
      }} />
      {/* Mid ring */}
      <div style={{
        position: "absolute",
        width: 28, height: 28,
        borderRadius: "50%",
        border: `1.5px solid ${c.primaryLight}`,
        opacity: 0.5,
        transform: "translate(-14px, -14px)",
      }} />
      {/* Core orb */}
      <div style={{
        position: "absolute",
        width: 14, height: 14,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 30%, #fff 0%, ${c.primaryLight} 45%, ${c.primary} 100%)`,
        boxShadow: `0 0 12px 4px ${c.primary}60, 0 0 4px 1px #fff`,
        transform: "translate(-7px, -7px)",
      }} />
      {/* Trailing comet tail */}
      <div style={{
        position: "absolute",
        width: 32, height: 4,
        borderRadius: 2,
        background: `linear-gradient(90deg, transparent, ${c.primary}40)`,
        transform: "translate(-36px, -2px)",
        filter: "blur(2px)",
      }} />
    </div>
  );
};

/* ── Cinematic Journey Line ── */
const JourneyLine = ({ scrollProgress }) => {
  const pathLen = useTransform(scrollProgress, [0.04, 0.94], [0, 1]);

  // Traveling orb: moves along path via scroll
  const orbPathLen = useTransform(scrollProgress, [0.04, 0.93], [0, 1]);

  // Destination badge
  const destOpacity = useTransform(scrollProgress, [0.82, 0.95], [0, 1]);
  const destScale   = useTransform(scrollProgress, [0.82, 0.96], [0.4, 1]);
  const destBlur    = useTransform(scrollProgress, [0.82, 0.95], [16, 0]);
  const outerRingScale   = useTransform(scrollProgress, [0.88, 1.0], [1, 2.8]);
  const outerRingOpacity = useTransform(scrollProgress, [0.88, 0.96], [0.6, 0]);

  // Station label opacities — each fades in as scroll reaches that section
  const s1Op = useTransform(scrollProgress, [0.06, 0.14], [0, 1]);
  const s2Op = useTransform(scrollProgress, [0.24, 0.34], [0, 1]);
  const s3Op = useTransform(scrollProgress, [0.46, 0.56], [0, 1]);
  const s4Op = useTransform(scrollProgress, [0.66, 0.76], [0, 1]);

  // Hero origin connector — fades out as user scrolls away from hero
  const heroConnOpacity = useTransform(scrollProgress, [0, 0.06], [1, 0]);

  const jp = "M 500 0 C 500 100,200 200,200 350 C 200 500,800 550,800 700 C 800 850,150 900,150 1050 C 150 1200,850 1250,850 1400 C 850 1500,500 1550,500 1650";
  const DEST = { cx: 500, cy: 1650 };

  // Station definitions — cx/cy match points ON the path
  const STATIONS = [
    { cx: 200, cy: 350,  num: "٠١", label: "المشكلة",  accent: "#e07a9a", branchDir: -1, branchLen: 160 },
    { cx: 800, cy: 700,  num: "٠٢", label: "الحل",     accent: c.primary, branchDir: 1,  branchLen: 140 },
    { cx: 150, cy: 1050, num: "٠٣", label: "كيف تبدأ", accent: "#22c55e", branchDir: -1, branchLen: 180 },
    { cx: 850, cy: 1400, num: "٠٤", label: "التسعير",  accent: c.primary, branchDir: 1,  branchLen: 140 },
  ];
  const stationOpacities = [s1Op, s2Op, s3Op, s4Op];

  return (
    <svg viewBox="0 0 1000 1750" preserveAspectRatio="none"
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    >
      <defs>
        <linearGradient id="jlg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.primary} stopOpacity="0.9" />
          <stop offset="45%" stopColor={c.primaryLight} stopOpacity="0.55" />
          <stop offset="100%" stopColor={c.primary} stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="destGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.primary} />
          <stop offset="100%" stopColor={c.primaryLight} />
        </linearGradient>
        <radialGradient id="orbGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="60%" stopColor={c.primaryLight} stopOpacity="0.9" />
          <stop offset="100%" stopColor={c.primary} stopOpacity="0.7" />
        </radialGradient>
        <filter id="lineGlow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
        <filter id="orbGlow">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="orbHalo">
          <feGaussianBlur stdDeviation="20" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="destGlow">
          <feGaussianBlur stdDeviation="12" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
        <filter id="destHalo">
          <feGaussianBlur stdDeviation="28" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
        <filter id="stationGlow">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
        {/* Hidden path for orb to travel along */}
        <path id="orbPath" d={jp} />
      </defs>

      {/* ── 4. HERO ORIGIN CONNECTOR — fades out as you scroll away ── */}
      {/* Vertical stem dropping from top edge (connects to hero map) */}
      <motion.line x1="500" y1="-80" x2="500" y2="0"
        stroke={c.primary} strokeWidth="2" strokeDasharray="4 6"
        strokeLinecap="round"
        style={{ opacity: heroConnOpacity }}
      />
      {/* Origin dot at top */}
      <motion.circle cx={500} cy={0} r={5}
        fill={c.primary}
        style={{ opacity: heroConnOpacity, filter: "url(#stationGlow)" }}
      />
      {/* "رحلتك تبدأ هنا" — path typography near the top */}
      <motion.foreignObject x={520} y={-15} width={200} height={40}
        style={{ opacity: heroConnOpacity }}
      >
        <div xmlns="http://www.w3.org/1999/xhtml" style={{
          fontFamily: "'Tajawal', sans-serif",
          fontSize: "13px", fontWeight: 700,
          color: c.primary, opacity: 0.45,
          letterSpacing: "0.18em",
          whiteSpace: "nowrap",
        }}>رحلتك تبدأ هنا ←</div>
      </motion.foreignObject>

      {/* ── Ghost dashed path underneath ── */}
      <path d={jp} fill="none" stroke={c.textFaint} strokeWidth="1.5"
        strokeDasharray="5 12" opacity="0.2" />

      {/* ── Glow haze layer ── */}
      <motion.path d={jp} fill="none"
        stroke={c.primary} strokeWidth="10"
        strokeLinecap="round"
        style={{ pathLength: pathLen, filter: "url(#lineGlow)" }}
        opacity={0.12}
      />

      {/* ── Main scroll-drawn line ── */}
      <motion.path d={jp} fill="none"
        stroke="url(#jlg)" strokeWidth="2.5"
        strokeLinecap="round"
        style={{ pathLength: pathLen }}
      />

      {/* ── White shimmer riding the line ── */}
      <motion.path d={jp} fill="none"
        stroke="#fff" strokeWidth="1.2"
        strokeLinecap="round" strokeDasharray="2 90"
        style={{ pathLength: pathLen }}
        opacity={0.5}
      />

      {/* ══════════════════════════════════
          1. SECTION STATIONS with branches
          ══════════════════════════════════ */}
      {STATIONS.map((st, i) => {
        const sOp = stationOpacities[i];
        const bx2 = st.cx + st.branchDir * st.branchLen; // branch endpoint x
        const labelX = st.branchDir === 1 ? bx2 + 12 : bx2 - 12;
        const labelAlign = st.branchDir === 1 ? "left" : "right";
        const labelWidth = 130;
        const foX = st.branchDir === 1 ? bx2 + 10 : bx2 - labelWidth - 10;

        return (
          <motion.g key={i} style={{ opacity: sOp }}>

            {/* Station dot ON the line */}
            <circle cx={st.cx} cy={st.cy} r={5}
              fill={st.accent} opacity={0.9}
              style={{ filter: "url(#stationGlow)" }}
            />
            <circle cx={st.cx} cy={st.cy} r={9}
              fill="none" stroke={st.accent} strokeWidth="1.5" opacity={0.3}
            />

            {/* Horizontal branch line */}
            <line
              x1={st.cx} y1={st.cy}
              x2={bx2} y2={st.cy}
              stroke={st.accent} strokeWidth="1"
              strokeDasharray="4 5" opacity={0.4}
            />

            {/* Terminus dot at branch end */}
            <circle cx={bx2} cy={st.cy} r={3}
              fill={st.accent} opacity={0.6}
            />

            {/* Section number + label at branch end */}
            <foreignObject x={foX} y={st.cy - 22} width={labelWidth} height={48}>
              <div xmlns="http://www.w3.org/1999/xhtml" style={{
                fontFamily: "'Tajawal', sans-serif",
                textAlign: labelAlign,
                direction: "rtl",
              }}>
                <div style={{
                  fontSize: "11px", fontWeight: 800,
                  color: st.accent, letterSpacing: "0.25em",
                  opacity: 0.7, lineHeight: 1,
                }}>{st.num}</div>
                <div style={{
                  fontSize: "14px", fontWeight: 700,
                  color: c.text,
                  textShadow: "0 1px 6px rgba(248,247,255,1)",
                  lineHeight: 1.2, marginTop: 2,
                }}>{st.label}</div>
              </div>
            </foreignObject>
          </motion.g>
        );
      })}

      {/* ══════════════════════════════════
          2. TRAVELING ORB — rides the line
          ══════════════════════════════════ */}
      {/* Rendered via CSS offset-path in a foreignObject overlay */}
      <foreignObject x={0} y={0} width={1000} height={1750}
        style={{ pointerEvents: "none", overflow: "visible" }}
      >
        <div xmlns="http://www.w3.org/1999/xhtml"
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          <OrbRider scrollProgress={orbPathLen} />
        </div>
      </foreignObject>

      {/* ══════════════════════════════════
          DESTINATION: رفوف
          ══════════════════════════════════ */}
      <motion.circle cx={DEST.cx} cy={DEST.cy} r={90}
        fill={`${c.primary}08`}
        style={{ opacity: destOpacity, scale: outerRingScale, transformOrigin: `${DEST.cx}px ${DEST.cy}px` }}
      />
      <motion.circle cx={DEST.cx} cy={DEST.cy} r={58}
        fill="none" stroke={c.primary} strokeWidth="1"
        style={{ opacity: outerRingOpacity, scale: outerRingScale, transformOrigin: `${DEST.cx}px ${DEST.cy}px`, filter: "url(#destHalo)" }}
      />
      <motion.circle cx={DEST.cx} cy={DEST.cy} r={52}
        fill={`${c.primary}22`}
        style={{ opacity: destOpacity, filter: "url(#destHalo)" }}
      />

      <motion.g style={{ opacity: destOpacity, scale: destScale, transformOrigin: `${DEST.cx}px ${DEST.cy}px`, filter: `blur(${destBlur}px)` }}>
        <circle cx={DEST.cx} cy={DEST.cy} r={64}
          fill="none" stroke={c.primary} strokeWidth="1"
          strokeDasharray="6 8" opacity={0.25}
        />
        <circle cx={DEST.cx} cy={DEST.cy} r={44} fill="url(#destGrad)" style={{ filter: "url(#destGlow)" }} />
        <circle cx={DEST.cx} cy={DEST.cy} r={44} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
        <path d={`M ${DEST.cx-18} ${DEST.cy+10} L ${DEST.cx} ${DEST.cy+19} L ${DEST.cx+18} ${DEST.cy+10} L ${DEST.cx} ${DEST.cy+1} Z`} fill="rgba(255,255,255,0.45)" />
        <path d={`M ${DEST.cx-18} ${DEST.cy+2} L ${DEST.cx} ${DEST.cy+11} L ${DEST.cx+18} ${DEST.cy+2} L ${DEST.cx} ${DEST.cy-7} Z`} fill="rgba(255,255,255,0.70)" />
        <path d={`M ${DEST.cx-18} ${DEST.cy-6} L ${DEST.cx} ${DEST.cy+3} L ${DEST.cx+18} ${DEST.cy-6} L ${DEST.cx} ${DEST.cy-15} Z`} fill="rgba(255,255,255,1)" />
        <foreignObject x={DEST.cx - 80} y={DEST.cy + 54} width="160" height="52">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ textAlign: "center", fontFamily: "'Tajawal', sans-serif" }}>
            <div style={{ fontSize: "28px", fontWeight: 900, color: c.primary, textShadow: `0 0 20px ${c.primary}40, 0 2px 8px rgba(248,247,255,1)` }}>رفوف</div>
            <div style={{ fontSize: "11px", fontWeight: 600, color: c.textMid, letterSpacing: "0.15em", marginTop: -2, textShadow: "0 1px 4px rgba(248,247,255,1)" }}>وجهتك</div>
          </div>
        </foreignObject>
        <circle cx={DEST.cx + 32} cy={DEST.cy - 32} r={12} fill="#22c55e" />
        <path d={`M ${DEST.cx+27} ${DEST.cy-32} L ${DEST.cx+31} ${DEST.cy-28} L ${DEST.cx+38} ${DEST.cy-36}`}
          fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>

      <motion.circle cx={DEST.cx} cy={DEST.cy} r={44}
        fill="none" stroke={c.primary} strokeWidth="2"
        style={{ opacity: destOpacity }}
        animate={{ scale: [1, 1.8, 2.4], opacity: [0.5, 0.15, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
      />
    </svg>
  );
};

/* ── Interactive Map ── */
const InteractiveMap = () => {
  const [activeCity, setActiveCity] = useState(null);
  const active = CITIES.find(ct => ct.id === activeCity);

  return (
    <div style={{ position: "relative", width: "clamp(500px, 58vw, 760px)" }}>
      <svg viewBox="-300 -250 3600 3200"
        style={{ width: "100%", height: "auto", overflow: "visible", display: "block" }}
      >
        <defs>
          <filter id="halo">
            <feGaussianBlur stdDeviation="18" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
          <filter id="thickglow">
            <feGaussianBlur stdDeviation="22" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
          <filter id="dotglow">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
          <radialGradient id="mapfill" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor={c.primary} stopOpacity="0.10" />
            <stop offset="100%" stopColor={c.primary} stopOpacity="0.01" />
          </radialGradient>
        </defs>

        <path d={SA_PATH} fill="url(#mapfill)" />

        {/* Extra wide glow behind border */}
        <path d={SA_PATH} fill="none"
          stroke={c.primaryLight} strokeWidth="40"
          strokeLinecap="round" strokeLinejoin="round"
          opacity="0.10"
          style={{ filter: "url(#thickglow)" }}
        />

        {/* Secondary glow halo */}
        <path d={SA_PATH} fill="none"
          stroke={c.primary} strokeWidth="18"
          strokeLinecap="round" strokeLinejoin="round"
          opacity="0.08"
          style={{ filter: "url(#halo)" }}
        />

        {/* Main border — thick animated */}
        <motion.path d={SA_PATH} fill="none"
          stroke={c.primary} strokeWidth="10"
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.65 }}
          transition={{ delay: 0.5, duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Bright shimmer on top of border */}
        <motion.path d={SA_PATH} fill="none"
          stroke="#fff" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.18 }}
          transition={{ delay: 2.2, duration: 3, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Cities */}
        {CITIES.map((city, i) => {
          const isActive = activeCity === city.id;
          return (
            <g key={city.id}
              onClick={() => setActiveCity(isActive ? null : city.id)}
              style={{ cursor: "pointer" }}
            >
              {/* Outer pulse ring */}
              <motion.circle cx={city.cx} cy={city.cy} r="35" fill="none"
                stroke={c.primary} strokeWidth="1.5"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, isActive ? 0.5 : 0.22, 0],
                  scale: [0.8, isActive ? 2.2 : 2.8, 3.5],
                }}
                transition={{ delay: 2.6 + i * 0.18, duration: isActive ? 1.5 : 3.2, repeat: Infinity }}
              />
              {/* Ring */}
              <motion.circle cx={city.cx} cy={city.cy} r={isActive ? 30 : 20}
                fill={isActive ? c.primary : `${c.primary}14`}
                stroke={c.primary} strokeWidth={isActive ? 0 : 2}
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0.6 }}
                style={{ transition: "all 0.35s ease", filter: isActive ? "url(#dotglow)" : "none" }}
              />
              {/* Dot */}
              <motion.circle cx={city.cx} cy={city.cy} r={isActive ? 11 : 8}
                fill={isActive ? "#fff" : c.primary}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + i * 0.15 }}
              />

              {/* City name — bigger, bolder, with background pill */}
              <foreignObject x={city.cx - 130} y={city.cy - 95} width="260" height="75">
                <div xmlns="http://www.w3.org/1999/xhtml"
                  style={{ textAlign: "center", fontFamily: "'Tajawal',sans-serif" }}
                >
                  <div style={{
                    display: "inline-block",
                    background: isActive
                      ? `rgba(99,92,199,0.92)`
                      : "rgba(248,247,255,0.88)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 32,
                    padding: isActive ? "4px 18px 4px 18px" : "3px 14px",
                    border: isActive ? `1.5px solid ${c.primary}` : `1px solid rgba(99,92,199,0.18)`,
                    boxShadow: isActive ? `0 4px 20px rgba(99,92,199,0.35)` : "0 2px 8px rgba(0,0,0,0.06)",
                    transition: "all 0.3s ease",
                  }}>
                    <div style={{
                      fontSize: isActive ? "30px" : "26px",
                      fontWeight: 800,
                      color: isActive ? "#fff" : c.text,
                      letterSpacing: "0.01em",
                      lineHeight: 1.2,
                      whiteSpace: "nowrap",
                      textShadow: isActive ? "none" : "0 1px 6px rgba(248,247,255,0.9)",
                    }}>{city.ar}</div>
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                      style={{
                        fontSize: "15px", fontWeight: 700,
                        color: c.primary, marginTop: 4,
                        textShadow: "0 1px 6px rgba(248,247,255,1)",
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
            initial={{ opacity: 0, y: 14, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.92 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)",
              background: "#fff", border: `1px solid ${c.primaryBorder}`,
              borderRadius: 18, padding: "18px 22px",
              boxShadow: `0 8px 40px rgba(99,92,199,0.18)`,
              minWidth: 240, zIndex: 10,
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
        transition={{ delay: 4, duration: 1 }}
        style={{
          textAlign: "center", fontSize: 12, color: c.textLight,
          marginTop: 10, letterSpacing: "0.1em",
          fontFamily: "'Tajawal',sans-serif",
        }}
      >اضغط على المدن للاستكشاف</motion.p>
    </div>
  );
};

/* ── GSAP Section wrappers ── */
const GSAPFadeSection = ({ children, delay = 0 }) => {
  const ref = useGSAPReveal({ y: 50, duration: 1.1, delay });
  return <div ref={ref} style={{ opacity: 0 }}>{children}</div>;
};

const GSAPStaggerSection = ({ children, delay = 0 }) => {
  const ref = useGSAPReveal({ y: 35, duration: 0.9, delay, stagger: 0.12 });
  return <div ref={ref}>{children}</div>;
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
      <GSAPLoader />
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
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }}
            />
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
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown size={15} color={c.textLight} />
          </motion.div>
          <span style={{ fontSize: 11, color: c.textLight, letterSpacing: "0.2em" }}>اكتشف الرحلة</span>
        </motion.div>

        {/* ── Hero → Journey line origin anchor ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", bottom: -1, left: "50%", transform: "translateX(-50%)",
            zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center",
          }}
        >
          {/* Pulse rings */}
          {[1, 2].map(k => (
            <motion.div key={k}
              animate={{ scale: [1, 2.4 + k * 0.4], opacity: [0.4, 0] }}
              transition={{ duration: 2.5, delay: k * 0.5, repeat: Infinity, ease: "easeOut" }}
              style={{
                position: "absolute",
                width: 14, height: 14, borderRadius: "50%",
                border: `1.5px solid ${c.primary}`,
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
          {/* Core dot */}
          <div style={{
            width: 10, height: 10, borderRadius: "50%",
            background: `radial-gradient(circle at 35% 30%, #fff, ${c.primary})`,
            boxShadow: `0 0 14px 4px ${c.primary}55`,
          }} />
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
              <GSAPFadeSection delay={0.1}>
                <p style={{ fontSize: 16, lineHeight: 2.1, color: c.textMid, maxWidth: 420, marginBottom: 36 }}>
                  إدارة تشغيل، إيجار، موظفين، وتراخيص — كل هذا عشان تبيع في مكان واحد. علامتك تستحق طريقة أذكى.
                </p>
              </GSAPFadeSection>
              <GSAPStaggerSection delay={0.15}>
                {["إيجار مرتفع", "تراخيص معقّدة", "إدارة موظفين", "وقت ضائع"].map((t, i) => (
                  <span key={i} style={{
                    display: "inline-block",
                    margin: "0 0 10px 10px",
                    padding: "8px 18px", borderRadius: 8,
                    border: "1px solid rgba(224,122,154,0.2)",
                    background: "rgba(224,122,154,0.05)",
                    color: "#d4658b", fontSize: 13, fontWeight: 600,
                    opacity: 0,
                  }}>{t}</span>
                ))}
              </GSAPStaggerSection>
            </div>
            <FramedImage
              src="https://static.vecteezy.com/system/resources/thumbnails/034/800/934/small/3d-stair-infographic-elements-design-with-5-options-steps-or-processes-and-marketing-can-be-used-for-presentation-png.png"
              alt="المشكلة" accent="#e07a9a"
            />
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
              <GSAPFadeSection delay={0.1}>
                <p style={{ fontSize: 16, lineHeight: 2.1, color: c.textMid, maxWidth: 420, marginBottom: 32 }}>
                  تحط منتجاتك في مساحات بيع فعلية، وتبقى هويتك هي الظاهرة للعميل في كل مساحة وكل نقطة بيع.
                </p>
              </GSAPFadeSection>
              <GSAPStaggerSection delay={0.15}>
                {[
                  { Icon: Eye,             text: "هويتك ظاهرة ١٠٠٪ في كل نقطة بيع" },
                  { Icon: LayoutDashboard, text: "تدير كل شيء من لوحة تحكّم واحدة" },
                  { Icon: Cloud,           text: "مشغّل سحابي بالكامل — بدون وسيط" },
                ].map((f, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "16px 0", opacity: 0,
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
              </GSAPStaggerSection>
            </div>
            <FramedImage src="./solution.png" alt="الحل" accent={c.primary} />
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
              <GSAPStaggerSection delay={0.1}>
                {[
                  { num: "١", title: "سجّل في رفوف",   desc: "أنشئ حساب علامتك التجارية في دقائق",      accent: "#22c55e" },
                  { num: "٢", title: "اختر المساحات",  desc: "اختر المساحات الفعلية المناسبة لعلامتك",  accent: c.primary },
                  { num: "٣", title: "تابع مبيعاتك",   desc: "تابع حركة مبيعاتك من لوحة تحكّم واحدة",  accent: "#f59e0b" },
                ].map((s, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 22,
                    padding: "22px 0", opacity: 0,
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
                ))}
              </GSAPStaggerSection>
            </div>
            <FramedImage src="./steps.png" alt="الخطوات" accent="#22c55e" />
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
              <GSAPFadeSection delay={0.1}>
                <p style={{ fontSize: 16, lineHeight: 2.1, color: c.textMid, maxWidth: 400, marginBottom: 48 }}>
                  اختر ما يلائم نموذج عملك، ورفوف تتكفّل بالباقي.
                </p>
              </GSAPFadeSection>

              <div style={{ display: "flex", gap: 48 }}>
                <GSAPStaggerSection delay={0.2}>
                  {[
                    { Icon: CreditCard, title: "رسوم خدمة",    desc: "رسوم متفق عليها مسبقاً" },
                    { Icon: Percent,    title: "عمولة مبيعات", desc: "ادفع فقط عند البيع" },
                  ].map((o, i) => (
                    <div key={i} style={{
                      paddingLeft: i === 1 ? 48 : 0, opacity: 0,
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
                  ))}
                </GSAPStaggerSection>
              </div>
            </div>
            <FramedImage src="./pricing.png" alt="التسعير" accent={c.primaryLight} />
          </div>
        </section>

        {/* ══════ CTA ══════ */}
        <section style={{ padding: "40px 48px 130px", position: "relative", zIndex: 2 }}>
          <div style={{
            width: "100%", height: 1, maxWidth: 900, margin: "0 auto 100px",
            background: `linear-gradient(90deg, transparent, ${c.primary}22, transparent)`,
          }} />
          <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
            <GSAPFadeSection>
              <span style={{
                fontSize: 10.5, fontWeight: 700, color: c.primary,
                letterSpacing: "0.3em", opacity: 0.4, display: "block", marginBottom: 32,
              }}>ابدأ الآن</span>
            </GSAPFadeSection>

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

            <GSAPFadeSection delay={0.1}>
              <p style={{ fontSize: 17, lineHeight: 2, color: c.textMid, marginBottom: 48, opacity: 0 }}>
                هدف رفوف أن تُحل مشكلة الحضور الفعلي للعلامات التجارية بنسبة ١٠٠٪، بأقل جهد وأعلى أثر.
              </p>
            </GSAPFadeSection>

            <GSAPFadeSection delay={0.15}>
              <motion.button
                whileHover={{ y: -3, boxShadow: `0 12px 40px rgba(99,92,199,0.35)` }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 12,
                  padding: "18px 52px", border: "none", borderRadius: 14,
                  background: c.primary, color: "#fff", fontSize: 17, fontWeight: 700,
                  fontFamily: "inherit", cursor: "pointer",
                  boxShadow: `0 6px 28px rgba(99,92,199,0.3)`,
                  opacity: 0,
                }}
              >ابدأ مع رفوف الآن <ChevronLeft size={19} /></motion.button>
            </GSAPFadeSection>

            {/* Stats */}
            <div style={{
              display: "flex", justifyContent: "center", gap: 60, marginTop: 72,
              borderTop: `1px solid ${c.border}`, paddingTop: 48,
            }}>
              {[
                { val: 150, display: "+١٥٠", label: "مساحة بيع" },
                { val: 80,  display: "+٨٠",  label: "علامة تجارية" },
                { val: null, display: "٦",   label: "مدن" },
                { val: null, display: "١٠٠٪", label: "سحابي" },
              ].map((s, i) => (
                <GSAPFadeSection key={i} delay={0.08 * i}>
                  <div style={{ textAlign: "center", opacity: 0 }}>
                    <div style={{
                      fontSize: 28, fontWeight: 900,
                      background: `linear-gradient(135deg, ${c.primary}, ${c.primaryLight})`,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>{s.display}</div>
                    <div style={{ fontSize: 12, color: c.textLight, marginTop: 6, letterSpacing: "0.08em" }}>{s.label}</div>
                  </div>
                </GSAPFadeSection>
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