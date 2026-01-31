'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'

export default function RofofHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Hero scroll
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  // Hero animations
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(heroProgress, [0, 0.5], [1, 1.1])
  const heroTextY = useTransform(heroProgress, [0, 0.5], [0, -50])

  return (
    <div dir="rtl" className="bg-[#eef3ff] selection:bg-[#292b94] selection:text-[#eef3ff]">
      
      {/* Custom Cursor Effect */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Outfit:wght@200;300;400;500;600&display=swap');
        
        * {
          cursor: default;
        }
        
        a, button {
          cursor: pointer;
        }
        
        body {
          background: #eef3ff;
        }
        
        .font-serif {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .font-sans {
          font-family: 'Outfit', sans-serif;
        }

        .text-stroke {
          -webkit-text-stroke: 1.5px #292b94;
          color: transparent;
        }

        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
        }

        .shimmer {
          background: linear-gradient(
            110deg,
            transparent 20%,
            rgba(163, 163, 224, 0.15) 50%,
            transparent 80%
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .luxury-border {
          background: linear-gradient(135deg, #635cc7 0%, #a3a3e0 50%, #635cc7 100%);
        }
      `}</style>

      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 grain-overlay" />

      {/* ==================== HERO SECTION ==================== */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        
        {/* Hero Background Image */}
        <motion.div 
          className="absolute inset-0"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=90)',
              filter: 'brightness(0.4) sepia(0.2)'
            }}
          />
          {/* Elegant Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#292b94]/60 via-[#292b94]/40 to-[#292b94]/80" />
        </motion.div>

        {/* Decorative Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#a3a3e0]/30 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isLoaded ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.div 
            className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#a3a3e0]/30 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isLoaded ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
        </div>

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 h-full flex flex-col items-center justify-center px-8"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          {/* Pre-title */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-[#a3a3e0]" />
              <span className="font-sans text-xs tracking-[0.4em] text-[#a3a3e0] uppercase">
                منصة التجارة الراقية
              </span>
              <div className="h-px w-16 bg-[#a3a3e0]" />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-center mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <span className="block font-serif text-8xl md:text-9xl lg:text-[12rem] font-light text-white leading-none tracking-tight">
              رفوف
            </span>
            <span className="block font-sans text-sm md:text-base tracking-[0.5em] text-[#a3a3e0]/80 mt-4 uppercase">
              R O F O F
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="font-serif text-xl md:text-2xl text-white/70 text-center max-w-2xl leading-relaxed mb-12 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            حيث يلتقي البائعون بالمحلات
            <br />
            <span className="text-[#a3a3e0]/80">في رحلة نجاح مشتركة</span>
          </motion.p>

          {/* CTA Button */}
          <motion.button
            className="group relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative px-12 py-5 border border-[#a3a3e0]/50 bg-transparent">
              <span className="relative z-10 font-sans text-sm tracking-[0.3em] text-white uppercase flex items-center gap-4">
                اكتشف المزيد
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
              <motion.div
                className="absolute inset-0 bg-[#635cc7]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-center"
          >
            <ChevronDown className="w-6 h-6 text-[#a3a3e0] mx-auto" strokeWidth={1} />
            <span className="font-sans text-[10px] tracking-[0.3em] text-[#a3a3e0]/60 uppercase mt-2 block">
              Scroll
            </span>
          </motion.div>
        </motion.div>

        {/* Corner Decorations */}
        <div className="absolute top-8 left-8 w-24 h-24 border-l border-t border-[#a3a3e0]/30" />
        <div className="absolute top-8 right-8 w-24 h-24 border-r border-t border-[#a3a3e0]/30" />
        <div className="absolute bottom-8 left-8 w-24 h-24 border-l border-b border-[#a3a3e0]/30" />
        <div className="absolute bottom-8 right-8 w-24 h-24 border-r border-b border-[#a3a3e0]/30" />
      </section>

      {/* ==================== FIXED HEADER ==================== */}
      <motion.header 
        className="fixed top-0 inset-x-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#a3a3e0]/50 flex items-center justify-center">
                <span className="font-serif text-lg text-white">ر</span>
              </div>
              <span className="font-serif text-xl text-white">رفوف</span>
            </div>

            <nav className="hidden md:flex items-center gap-10">
              {['الرئيسية', 'للبائعين', 'للمحلات', 'من نحن'].map((item, i) => (
                <span 
                  key={i}
                  className="font-sans text-sm text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </nav>

            <motion.button
              className="px-6 py-3 border border-[#a3a3e0]/50 hover:bg-[#635cc7] hover:border-[#635cc7] transition-all duration-300 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-sans text-xs tracking-[0.2em] text-white group-hover:text-white uppercase transition-colors">
                ابدأ الآن
              </span>
            </motion.button>
          </div>
        </div>
      </motion.header>
    </div>
  )
}