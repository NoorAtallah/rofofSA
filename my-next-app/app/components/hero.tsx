'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function RofofHero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div dir="rtl" className="h-screen bg-[#003a5c] overflow-hidden relative">
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Tajawal:wght@200;300;400;500;700;800&display=swap');
        
        body { background: #003a5c; }
        
        .font-serif { font-family: 'Cormorant', serif; }
        .font-arabic { font-family: 'Tajawal', sans-serif; }

        .text-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        .text-vertical-lr {
          writing-mode: vertical-lr;
          text-orientation: mixed;
        }

        .link-hover {
          position: relative;
        }
        .link-hover::after {
          content: '';
          position: absolute;
          bottom: -2px;
          right: 0;
          width: 0;
          height: 1px;
          background: #a3a3e0;
          transition: width 0.4s ease;
        }
        .link-hover:hover::after {
          width: 100%;
        }
      `}</style>

      {/* Very subtle ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-[#635cc7]/15 rounded-full blur-[200px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative h-full">
        
        {/* The Shaped Image */}
        <motion.div
          className="absolute inset-0 p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.1 }}
        >
          <section
            className="relative w-full h-full"
            style={{
              maskImage: `url("data:image/svg+xml,%3Csvg width='221' height='122' viewBox='0 0 221 122' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M183 4C183 1.79086 184.791 0 187 0H217C219.209 0 221 1.79086 221 4V14V28V99C221 101.209 219.209 103 217 103H182C179.791 103 178 104.791 178 107V118C178 120.209 176.209 122 174 122H28C25.7909 122 24 120.209 24 118V103V94V46C24 43.7909 22.2091 42 20 42H4C1.79086 42 0 40.2091 0 38V18C0 15.7909 1.79086 14 4 14H24H43H179C181.209 14 183 12.2091 183 10V4Z' fill='%23D9D9D9'/%3E%3C/svg%3E")`,
              WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='221' height='122' viewBox='0 0 221 122' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M183 4C183 1.79086 184.791 0 187 0H217C219.209 0 221 1.79086 221 4V14V28V99C221 101.209 219.209 103 217 103H182C179.791 103 178 104.791 178 107V118C178 120.209 176.209 122 174 122H28C25.7909 122 24 120.209 24 118V103V94V46C24 43.7909 22.2091 42 20 42H4C1.79086 42 0 40.2091 0 38V18C0 15.7909 1.79086 14 4 14H24H43H179C181.209 14 183 12.2091 183 10V4Z' fill='%23D9D9D9'/%3E%3C/svg%3E")`,
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskSize: '100% 100%',
              WebkitMaskSize: '100% 100%',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
              alt="Luxury store"
              className="w-full h-full object-cover"
            />
            
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#003a5c]/95 via-[#003a5c]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003a5c]/60 via-transparent to-[#003a5c]/30" />
          </section>
        </motion.div>

        {/* Navigation Container - Positioned near top curve */}
        <motion.div
          className="absolute z-30"
          style={{
            top: '3.5%',
            left: '3%',
            right: '18%',
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -10 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-[#003a5c]/95 backdrop-blur-sm rounded-2xl px-8 py-4">
            <nav className="flex items-center justify-between">
              {/* Logo - Right side */}
              <div className="flex items-center gap-3">
                <span className="font-serif text-3xl text-[#eef3ff] italic tracking-wide">رفوف</span>
                <div className="w-px h-5 bg-[#eef3ff]/20" />
                <span className="font-serif text-xs tracking-[0.3em] text-[#a3a3e0] uppercase">Rofof</span>
              </div>

              {/* Nav Links - Left side */}
              <div className="flex items-center gap-8">
                {['الرئيسية', 'للبائعين', 'للمحلات', 'من نحن'].map((item, i) => (
                  <span 
                    key={i}
                    className="font-arabic text-base text-[#eef3ff]/80 hover:text-[#eef3ff] transition-colors cursor-pointer link-hover"
                  >
                    {item}
                  </span>
                ))}
                <span className="text-[#eef3ff]/20">|</span>
                <span className="font-arabic text-base text-[#eef3ff]/80 hover:text-[#eef3ff] transition-colors cursor-pointer link-hover">
                  تواصل معنا
                </span>
              </div>
            </nav>
          </div>
        </motion.div>

        {/* Main Title Section - In the space after the curve at top */}
        <motion.section
          className="absolute z-20 text-center"
          style={{
            top: '16%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '1000px',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-px bg-[#635cc7]" />
            <span className="font-serif text-sm tracking-[0.4em] text-[#a3a3e0] uppercase">Luxury Platform</span>
            <div className="w-10 h-px bg-[#635cc7]" />
          </div>

          {/* Main Title */}
          <h1 className="font-arabic text-7xl lg:text-8xl text-[#eef3ff] font-bold leading-[1.1] mb-4 tracking-wide">
            رفـــوف
          </h1>
          
          {/* Tagline */}
          <p className="font-serif text-3xl lg:text-4xl text-[#eef3ff]/90 italic mb-4">
            حيث يلتقي الطموح بالفرصة
          </p>

          {/* Description */}
          <p className="font-arabic text-lg text-[#eef3ff]/70 leading-relaxed mb-10 max-w-2xl mx-auto">
            منصة تجمع البائعين المميزين بالمحلات الراقية في تجربة تجارية استثنائية
          </p>

          {/* Elegant CTAs */}
          <div className="flex items-center justify-center gap-10">
            <a href="#" className="group flex items-center gap-3 text-[#eef3ff] hover:text-[#a3a3e0] transition-colors">
              <span className="font-arabic text-lg">سجّل كبائع</span>
              <svg className="w-5 h-5 rotate-180 group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
            
            <span className="text-[#eef3ff]/20">|</span>
            
            <a href="#" className="group flex items-center gap-3 text-[#eef3ff]/70 hover:text-[#eef3ff] transition-colors">
              <span className="font-arabic text-lg">سجّل كمحل</span>
              <svg className="w-5 h-5 rotate-180 opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-[#eef3ff]/10 max-w-md mx-auto">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-4xl text-[#eef3ff] font-light">500</span>
              <span className="font-serif text-xl text-[#635cc7]">+</span>
              <span className="font-arabic text-sm text-[#eef3ff]/60 mr-1">بائع</span>
            </div>
            <div className="w-px h-6 bg-[#eef3ff]/10" />
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-4xl text-[#eef3ff] font-light">200</span>
              <span className="font-serif text-xl text-[#635cc7]">+</span>
              <span className="font-arabic text-sm text-[#eef3ff]/60 mr-1">محل</span>
            </div>
          </div>
        </motion.section>

        {/* Vertical Text - Left Side (in the bottom-left empty space) */}
        <motion.div
          className="absolute bottom-[15%] left-[2%] z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <span className="text-vertical font-serif text-sm tracking-[0.5em] text-[#a3a3e0]/40 uppercase">
            Luxury Commerce Platform
          </span>
        </motion.div>

        {/* Vertical ROFOF watermark */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 z-10"
          style={{ right: 'calc(17% + 20px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 0.08 : 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          <span className="text-vertical-lr font-serif text-[180px] font-bold text-[#635cc7] tracking-wider leading-none">
            ROFOF
          </span>
        </motion.div>

        {/* Bottom Right Space - Creative CTA area */}
        <motion.div
          className="absolute z-30"
          style={{
            bottom: '3%',
            right: '1.5%',
            width: '16%',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="text-center">
            <span className="font-serif text-xs tracking-[0.4em] text-[#a3a3e0]/50 uppercase block mb-4">ابدأ الآن</span>
            
            <a href="#" className="group inline-flex flex-col items-center gap-2 text-[#eef3ff]/70 hover:text-[#eef3ff] transition-colors">
              <div className="w-14 h-14 rounded-full border border-[#eef3ff]/20 flex items-center justify-center group-hover:border-[#635cc7] group-hover:bg-[#635cc7]/10 transition-all">
                <svg className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Top Right Notch - Stats */}
        <motion.div
          className="absolute z-30 flex items-center justify-center"
          style={{
            top: '1%',
            right: '1%',
            width: '14%',
            height: '9%',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="text-center">
            <span className="font-serif text-2xl text-[#eef3ff]/80">50K+</span>
            <span className="font-arabic text-xs text-[#a3a3e0]/50 block">منتج</span>
          </div>
        </motion.div>

        {/* Scroll Indicator - Center Bottom */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <motion.div
            className="w-[1px] h-8 bg-gradient-to-b from-[#a3a3e0]/60 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: 'top' }}
          />
          <span className="font-serif text-[10px] tracking-[0.3em] text-[#a3a3e0]/50 uppercase">Scroll</span>
        </motion.div>

        {/* Decorative corner accents */}
        <motion.div
          className="absolute top-[20%] right-[17%] w-20 h-px bg-gradient-to-l from-[#635cc7]/50 to-transparent z-20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          style={{ transformOrigin: 'right' }}
        />
        
        <motion.div
          className="absolute top-[20%] right-[17%] w-px h-20 bg-gradient-to-b from-[#635cc7]/50 to-transparent z-20"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          style={{ transformOrigin: 'top' }}
        />
      </div>
    </div>
  )
}