'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'التسجيل وإعداد الحساب',
    description: 'يسجّل البائع أو المحل التجاري ويُدخل بياناته الأساسية',
    image: './1.png',
    accent: 'Registration'
  },
  {
    number: '02',
    title: 'الربط بين البائع والمحل',
    description: 'يرسل البائع طلب عرض منتجاته داخل المحل، ويقوم المحل بالموافقة أو الرفض',
    image: './2.png',
    accent: 'Connection'
  },
  {
    number: '03',
    title: 'توريد المنتجات والبيع',
    description: 'يتم توريد المنتجات للمحل، وتُعرض للبيع مباشرة للعملاء داخل المحل',
    image: './3.png',
    accent: 'Supply'
  },
  {
    number: '04',
    title: 'المتابعة والمحاسبة',
    description: 'متابعة مبيعات المتجر، وتحصيل الإيرادات',
    image: './4.png',
    accent: 'Analytics'
  },
]

export default function WorkflowSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Update active index based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const newIndex = Math.min(Math.floor(value * steps.length), steps.length - 1)
      setActiveIndex(newIndex)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  const currentStep = steps[activeIndex]

  // Parallax transforms
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const numberX = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <div dir="rtl" className="bg-[#003a5c] relative mt-30">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Tajawal:wght@200;300;400;500;700;800&display=swap');
        
        .font-serif { font-family: 'Cormorant', serif; }
        .font-arabic { font-family: 'Tajawal', sans-serif; }

        .text-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>

      {/* Scrollable container - each step gets viewport height */}
      <div ref={containerRef} style={{ height: `${steps.length * 100}vh` }}>
        
        {/* Sticky content that stays in view while scrolling */}
        <div className="sticky top-0 h-screen overflow-hidden">
          
          {/* Background ambient glow */}
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#635cc7]/15 rounded-full blur-[200px] pointer-events-none" />
          
          {/* Giant background number */}
          <motion.div
            className="absolute -right-20 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
            style={{ x: numberX }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                animate={{ opacity: 0.05, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-[40rem] font-bold text-[#eef3ff] leading-none"
              >
                {currentStep.number}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Main layout */}
          <div className="relative h-full flex items-center px-8 lg:px-20">
            
            {/* Left side - Vertical text & progress */}
            <div className="hidden lg:flex flex-col items-center h-[60%] border-l border-[#eef3ff]/10 pl-8">
              <motion.span
                className="text-vertical font-serif text-sm tracking-[0.4em] text-[#eef3ff]/40 uppercase mb-8"
              >
                خطوات العمل
              </motion.span>

              {/* Vertical progress */}
              <div className="flex-1 w-px bg-[#eef3ff]/10 relative">
                <motion.div
                  className="absolute top-0 left-0 w-full bg-[#a3a3e0]"
                  style={{
                    height: `${((activeIndex + 1) / steps.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Step indicators */}
              <div className="flex flex-col gap-3 mt-8">
                {steps.map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                      i === activeIndex ? 'bg-[#a3a3e0] scale-125' : 
                      i < activeIndex ? 'bg-[#635cc7]' : 'bg-[#eef3ff]/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Center - Main content */}
            <div className="flex-1 flex items-center justify-between gap-12 lg:gap-20 pr-0 lg:pr-16">
              
              {/* Text content */}
              <div className="flex-1 max-w-xl">
                
                {/* Section header */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-px bg-[#a3a3e0]" />
                    <span className="font-serif text-sm tracking-[0.3em] text-[#a3a3e0] uppercase">
                      كيف نعمل
                    </span>
                  </div>
                  <h2 className="font-arabic text-2xl lg:text-3xl text-[#eef3ff]/70 font-light leading-relaxed">
                    عملية بسيطة وفعالة تسمح للمتاجر الإلكترونية والمحلات التجارية بالتعاون بسهولة
                  </h2>
                </motion.div>

                {/* Active step content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Step number & accent */}
                    <div className="flex items-center gap-4 mb-6">
                      <span className="font-serif text-7xl lg:text-8xl text-[#eef3ff] font-light">
                        {currentStep.number}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-serif text-xs tracking-[0.3em] text-[#a3a3e0] uppercase">
                          {currentStep.accent}
                        </span>
                        <div className="w-16 h-px bg-[#eef3ff]/20 mt-2" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-arabic text-4xl lg:text-5xl text-[#eef3ff] font-bold mb-4 leading-tight">
                      {currentStep.title}
                    </h3>

                    {/* Description */}
                    <p className="font-arabic text-xl text-[#eef3ff]/60 leading-relaxed max-w-md">
                      {currentStep.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Scroll hint */}
                <motion.div 
                  className="flex items-center gap-3 mt-12"
                  animate={{ opacity: activeIndex < steps.length - 1 ? 1 : 0 }}
                >
                  <motion.div
                    className="w-6 h-10 border border-[#eef3ff]/20 rounded-full flex justify-center pt-2"
                  >
                    <motion.div
                      className="w-1.5 h-2.5 bg-[#a3a3e0] rounded-full"
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                  <span className="font-serif text-xs tracking-[0.2em] text-[#eef3ff]/40 uppercase">
                    Scroll for next
                  </span>
                </motion.div>
              </div>

              {/* Image */}
              <motion.div 
                className="hidden md:block relative w-[45%] max-w-lg"
                style={{ y: imageY }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.9, clipPath: 'inset(10% 10% 10% 10%)' }}
                    animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                    exit={{ opacity: 0, scale: 1.05, clipPath: 'inset(5% 5% 5% 5%)' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative aspect-[3/4]"
                  >
                    {/* Main image */}
                    <img
                      src={currentStep.image}
                      alt={currentStep.title}
                      className="w-full h-full object-contain"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#003a5c]/80 via-transparent to-[#003a5c]/30" />
                    
                    {/* Frame decoration */}
                    <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-[#a3a3e0]/30" />
                    <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-[#a3a3e0]/30" />

                    {/* Step label on image */}
                    <div className="absolute bottom-8 right-8">
                      <span className="font-serif text-xs tracking-[0.4em] text-[#eef3ff]/60 uppercase">
                        Step {currentStep.number}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Floating accent shape */}
                <motion.div
                  className="absolute -bottom-6 -left-6 w-24 h-24 border border-[#635cc7]/40"
                  animate={{ rotate: [0, 90, 0] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </div>

          {/* Bottom progress bar */}
          <div className="absolute bottom-8 left-20 right-20">
            <div className="flex items-center gap-4">
              <span className="font-serif text-base text-[#eef3ff]/40">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 h-px bg-[#eef3ff]/10 relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#a3a3e0]"
                  style={{
                    width: `${((activeIndex + 1) / steps.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="font-serif text-base text-[#eef3ff]/40">
                {String(steps.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Side step titles (navigation hint) */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4">
            {steps.map((step, i) => (
              <motion.span
                key={i}
                className={`font-arabic text-sm transition-all duration-500 cursor-pointer ${
                  i === activeIndex 
                    ? 'text-[#eef3ff] translate-x-2' 
                    : 'text-[#eef3ff]/30 hover:text-[#eef3ff]/50'
                }`}
              >
                {step.title.split(' ').slice(0, 2).join(' ')}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}