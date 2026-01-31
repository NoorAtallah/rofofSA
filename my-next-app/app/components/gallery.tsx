'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { UserPlus, Handshake, Package, TrendingUp, Store, CheckCircle, Truck, Calculator, ChevronDown } from 'lucide-react'

export default function RofofJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const x = useTransform(smoothProgress, [0, 1], ['0%', '80%'])

  return (
    <div className="bg-[#eef3ff]" style={{ direction: 'rtl' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        body {
          background: #eef3ff;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        
        .font-serif {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .font-arabic {
          font-family: 'Tajawal', sans-serif;
        }

        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
        }

        .luxury-gradient {
          background: linear-gradient(135deg, #635cc7 0%, #292b94 100%);
        }

        .text-gradient {
          background: linear-gradient(135deg, #635cc7 0%, #a3a3e0 50%, #635cc7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 grain-overlay" />

      {/* ==================== INTRO SECTION ==================== */}
      <section className="min-h-screen relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=90)',
              filter: 'brightness(0.3) saturate(0.8)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#292b94]/70 via-[#292b94]/50 to-[#eef3ff]" />
        </div>

        {/* Decorative Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#a3a3e0]/30 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isLoaded ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.div 
            className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#a3a3e0]/30 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isLoaded ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-8 right-8 w-24 h-24 border-r border-t border-[#a3a3e0]/30" />
        <div className="absolute top-8 left-8 w-24 h-24 border-l border-t border-[#a3a3e0]/30" />

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8">
          {/* Pre-title */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-[#a3a3e0]" />
              <span className="font-serif text-sm tracking-[0.4em] text-[#a3a3e0] uppercase italic">
                خطوات العمل
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
            <span className="block font-arabic text-6xl md:text-8xl lg:text-9xl font-light text-white leading-none tracking-tight">
              رحلة النجاح
            </span>
            <span className="block font-serif text-lg md:text-xl tracking-[0.5em] text-[#a3a3e0]/80 mt-4 uppercase italic">
              The Journey
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="font-arabic text-xl md:text-2xl text-white/60 text-center max-w-2xl leading-relaxed mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            عملية بسيطة وفعّالة تسمح للمتاجر الإلكترونية
            <br />
            <span className="text-[#a3a3e0]">والمحلات التجارية بالتعاون بسهولة</span>
          </motion.p>

          {/* Elegant Image Gallery Preview */}
          <motion.div
            className="flex items-center gap-4 md:gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div 
              className="relative w-24 h-32 md:w-32 md:h-44 rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80" 
                alt="" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#635cc7]/20" />
            </motion.div>

            <motion.div 
              className="relative w-28 h-40 md:w-40 md:h-56 rounded-2xl overflow-hidden -mt-8"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80" 
                alt="" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292b94]/60 to-transparent" />
              <div className="absolute bottom-4 right-4 left-4">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-white" />
                  <Store className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="relative w-24 h-32 md:w-32 md:h-44 rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&q=80" 
                alt="" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#635cc7]/20" />
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
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
              <span className="font-serif text-[10px] tracking-[0.3em] text-[#a3a3e0]/60 uppercase mt-2 block italic">
                Scroll
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== HORIZONTAL SCROLL JOURNEY ==================== */}
      <section ref={containerRef} className="relative" style={{ height: '500vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-[#eef3ff]">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `repeating-linear-gradient(45deg, #292b94 0, #292b94 1px, transparent 0, transparent 50%)`,
            backgroundSize: '60px 60px'
          }} />

          {/* Horizontal Track */}
          <motion.div 
            className="absolute top-0 right-0 h-full flex"
            style={{ x, width: '500vw' }}
          >
            
            {/* ========== STEP 1: Registration ========== */}
            <div className="w-screen h-full flex items-center px-8 md:px-16 flex-shrink-0">
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  
                  {/* Text Side */}
                  <div className="text-right order-2 lg:order-1">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="mb-4"
                    >
                      <span className="font-serif text-sm tracking-[0.3em] text-[#635cc7] uppercase italic">
                        Chapter One
                      </span>
                    </motion.div>

                    <div className="flex items-center gap-4 mb-6 justify-end">
                      <div className="w-16 h-16 rounded-2xl luxury-gradient flex items-center justify-center shadow-lg">
                        <UserPlus className="w-8 h-8 text-white" strokeWidth={1.5} />
                      </div>
                      <span className="font-serif text-8xl md:text-9xl font-light text-[#635cc7]/10">
                        01
                      </span>
                    </div>

                    <h2 className="font-arabic text-4xl md:text-6xl font-bold text-[#292b94] mb-6 leading-tight">
                      التسجيل وإعداد
                      <br />
                      <span className="font-serif italic text-[#635cc7] font-light">الحساب</span>
                    </h2>

                    <p className="font-arabic text-lg text-[#292b94]/50 leading-relaxed mb-8 max-w-md mr-auto">
                      يسجّل البائع أو المحل التجاري ويُدخل بياناته الأساسية. عملية سهلة وسريعة لا تتجاوز دقائق معدودة.
                    </p>

                    <div className="flex flex-wrap gap-3 justify-end">
                      {['تسجيل سريع', 'التحقق التلقائي', 'إعداد الملف'].map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-[#635cc7]/10"
                        >
                          <span className="font-arabic text-sm text-[#292b94]">{feature}</span>
                          <CheckCircle className="w-4 h-4 text-[#635cc7]" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className="order-1 lg:order-2 relative">
                    <div className="relative">
                      {/* Main Image */}
                      <motion.div 
                        className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                      >
                        <img 
                          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#292b94]/80 via-transparent to-[#635cc7]/20" />
                        
                        {/* Overlay Card */}
                        <div className="absolute bottom-6 right-6 left-6 bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/50">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl luxury-gradient flex items-center justify-center">
                              <Package className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-right">
                              <div className="font-arabic text-lg font-bold text-[#292b94]">أحمد محمد</div>
                              <div className="font-serif text-sm text-[#635cc7] italic">New Seller</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <motion.div 
                              className="flex-1 h-2 bg-[#eef3ff] rounded-full overflow-hidden"
                            >
                              <motion.div 
                                className="h-full luxury-gradient rounded-full"
                                initial={{ width: '0%' }}
                                whileInView={{ width: '100%' }}
                                transition={{ duration: 2, delay: 0.5 }}
                              />
                            </motion.div>
                            <span className="font-serif text-sm text-[#635cc7] italic">Complete</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Decorative Frame */}
                      <div className="absolute -top-4 -left-4 w-full h-full border border-[#a3a3e0]/30 rounded-3xl -z-10" />
                      
                      {/* Floating Badge */}
                      <motion.div
                        className="absolute -top-6 -right-6 bg-white rounded-2xl px-5 py-3 shadow-xl border border-[#635cc7]/10"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="font-arabic text-sm font-bold text-[#292b94]">تم بنجاح!</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========== STEP 2: Connection ========== */}
            <div className="w-screen h-full flex items-center px-8 md:px-16 flex-shrink-0 bg-[#292b94]">
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  
                  {/* Visual Side */}
                  <div className="relative">
                    <div className="relative flex items-center justify-center">
                      {/* Seller Image */}
                      <motion.div 
                        className="absolute right-0 top-0 w-48 md:w-64 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl z-10"
                        animate={{ x: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <img 
                          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80" 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#635cc7]/80 to-transparent" />
                        <div className="absolute bottom-4 right-4 left-4">
                          <div className="flex items-center gap-2">
                            <Package className="w-5 h-5 text-white" />
                            <span className="font-arabic text-white font-bold">البائع</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Store Image */}
                      <motion.div 
                        className="absolute left-0 bottom-0 w-48 md:w-64 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl z-10"
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <img 
                          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80" 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/80 to-transparent" />
                        <div className="absolute bottom-4 right-4 left-4">
                          <div className="flex items-center gap-2">
                            <Store className="w-5 h-5 text-white" />
                            <span className="font-arabic text-white font-bold">المحل</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Center Connection */}
                      <motion.div
                        className="relative z-20 w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#635cc7] flex items-center justify-center shadow-2xl"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Handshake className="w-12 h-12 md:w-16 md:h-16 text-white" strokeWidth={1.5} />
                        
                        {/* Pulse Ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-[#a3a3e0]"
                          animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>

                      {/* Spacer for layout */}
                      <div className="w-full h-[400px] md:h-[500px]" />
                    </div>
                  </div>

                  {/* Text Side */}
                  <div className="text-right">
                    <motion.div className="mb-4">
                      <span className="font-serif text-sm tracking-[0.3em] text-[#a3a3e0] uppercase italic">
                        Chapter Two
                      </span>
                    </motion.div>

                    <div className="flex items-center gap-4 mb-6 justify-end">
                      <div className="w-16 h-16 rounded-2xl bg-[#635cc7] flex items-center justify-center shadow-lg">
                        <Handshake className="w-8 h-8 text-white" strokeWidth={1.5} />
                      </div>
                      <span className="font-serif text-8xl md:text-9xl font-light text-white/10">
                        02
                      </span>
                    </div>

                    <h2 className="font-arabic text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                      الربط بين البائع
                      <br />
                      <span className="font-serif italic text-[#a3a3e0] font-light">والمحل</span>
                    </h2>

                    <p className="font-arabic text-lg text-white/50 leading-relaxed mb-8 max-w-md mr-auto">
                      يرسل البائع طلب عرض منتجاته داخل المحل، ويقوم المحل بالموافقة أو الرفض. شراكة مبنية على الثقة والاختيار.
                    </p>

                    <div className="flex flex-wrap gap-3 justify-end">
                      {['طلب العرض', 'مراجعة المحل', 'الموافقة'].map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10"
                        >
                          <span className="font-arabic text-sm text-white">{feature}</span>
                          <CheckCircle className="w-4 h-4 text-[#a3a3e0]" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========== STEP 3: Products & Sales ========== */}
            <div className="w-screen h-full flex items-center px-8 md:px-16 flex-shrink-0 bg-gradient-to-br from-[#eef3ff] to-[#d4d9ff]">
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  
                  {/* Text Side */}
                  <div className="text-right order-2 lg:order-1">
                    <motion.div className="mb-4">
                      <span className="font-serif text-sm tracking-[0.3em] text-[#635cc7] uppercase italic">
                        Chapter Three
                      </span>
                    </motion.div>

                    <div className="flex items-center gap-4 mb-6 justify-end">
                      <div className="w-16 h-16 rounded-2xl luxury-gradient flex items-center justify-center shadow-lg">
                        <Truck className="w-8 h-8 text-white" strokeWidth={1.5} />
                      </div>
                      <span className="font-serif text-8xl md:text-9xl font-light text-[#635cc7]/10">
                        03
                      </span>
                    </div>

                    <h2 className="font-arabic text-4xl md:text-6xl font-bold text-[#292b94] mb-6 leading-tight">
                      توريد المنتجات
                      <br />
                      <span className="font-serif italic text-[#635cc7] font-light">والبيع</span>
                    </h2>

                    <p className="font-arabic text-lg text-[#292b94]/50 leading-relaxed mb-8 max-w-md mr-auto">
                      يتم توريد المنتجات للمحل، وتُعرض للبيع مباشرة للعملاء داخل المحل. منتجاتك تصل لكل مكان!
                    </p>

                    {/* Stats */}
                    <div className="flex gap-8 justify-end mb-8">
                      <div className="text-center">
                        <div className="font-serif text-4xl text-[#292b94]">٤٥٪</div>
                        <div className="font-arabic text-xs text-[#292b94]/40">زيادة المبيعات</div>
                      </div>
                      <div className="w-px bg-[#292b94]/10" />
                      <div className="text-center">
                        <div className="font-serif text-4xl text-[#292b94]">٢٤</div>
                        <div className="font-arabic text-xs text-[#292b94]/40">ساعة توصيل</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-end">
                      {['توصيل سريع', 'عرض احترافي', 'مبيعات مباشرة'].map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-[#635cc7]/10"
                        >
                          <span className="font-arabic text-sm text-[#292b94]">{feature}</span>
                          <CheckCircle className="w-4 h-4 text-[#635cc7]" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className="order-1 lg:order-2 relative">
                    {/* Store Display */}
                    <motion.div 
                      className="relative bg-white rounded-3xl p-6 shadow-2xl border border-[#635cc7]/10"
                      whileHover={{ y: -5 }}
                    >
                      {/* Store Header */}
                      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#635cc7]/10">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200&q=80" 
                            alt="" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-right flex-1">
                          <div className="font-arabic text-lg font-bold text-[#292b94]">محل الأناقة</div>
                          <div className="font-serif text-sm text-[#635cc7] italic">Elegance Store</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="font-arabic text-xs text-green-600">مفتوح</span>
                        </div>
                      </div>

                      {/* Products Grid */}
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        {[
                          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80',
                          'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&q=80',
                          'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&q=80',
                          'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&q=80',
                          'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&q=80',
                          'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&q=80',
                        ].map((src, i) => (
                          <motion.div
                            key={i}
                            className="aspect-square rounded-xl overflow-hidden"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * i }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <img src={src} alt="" className="w-full h-full object-cover" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Sales Counter */}
                      <div className="flex items-center justify-between p-4 bg-[#eef3ff] rounded-2xl">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-green-500" />
                          <span className="font-arabic text-[#292b94]">مبيعات اليوم</span>
                        </div>
                        <motion.span 
                          className="font-serif text-2xl text-[#635cc7]"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          +١٢
                        </motion.span>
                      </div>
                    </motion.div>

                    {/* Floating Truck */}
                    <motion.div
                      className="absolute -bottom-8 -right-8 w-20 h-20 luxury-gradient rounded-2xl flex items-center justify-center shadow-xl"
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Truck className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========== STEP 4: Analytics ========== */}
            <div className="w-screen h-full flex items-center px-8 md:px-16 flex-shrink-0 relative overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80)',
                    filter: 'brightness(0.15)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#635cc7]/50 to-[#292b94]/80" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  
                  {/* Visual Side */}
                  <div className="relative">
                    <motion.div 
                      className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20"
                      whileHover={{ y: -5 }}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-8">
                        <span className="font-serif text-sm text-white/50 italic">Dashboard</span>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-400" />
                          <div className="w-3 h-3 rounded-full bg-yellow-400" />
                          <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                      </div>

                      {/* Chart */}
                      <div className="h-40 flex items-end justify-between gap-2 mb-8 px-2">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75].map((height, i) => (
                          <motion.div
                            key={i}
                            className="flex-1 rounded-t-lg"
                            style={{ background: 'linear-gradient(to top, #635cc7, #a3a3e0)' }}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${height}%` }}
                            transition={{ duration: 0.5, delay: 0.05 * i }}
                          />
                        ))}
                      </div>

                      {/* Revenue Split */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 rounded-2xl p-4 text-center">
                          <Package className="w-8 h-8 text-[#a3a3e0] mx-auto mb-2" />
                          <div className="font-serif text-3xl text-white">٦٠٪</div>
                          <div className="font-arabic text-xs text-white/50">نصيب البائع</div>
                        </div>
                        <div className="bg-white/10 rounded-2xl p-4 text-center">
                          <Store className="w-8 h-8 text-[#a3a3e0] mx-auto mb-2" />
                          <div className="font-serif text-3xl text-white">٤٠٪</div>
                          <div className="font-arabic text-xs text-white/50">نصيب المحل</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Success Badge */}
                    <motion.div
                      className="absolute -top-4 -left-4 bg-green-500 text-white rounded-2xl px-5 py-3 shadow-xl"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-arabic text-sm font-bold">تم التحويل!</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Text Side */}
                  <div className="text-right">
                    <motion.div className="mb-4">
                      <span className="font-serif text-sm tracking-[0.3em] text-[#a3a3e0] uppercase italic">
                        Chapter Four
                      </span>
                    </motion.div>

                    <div className="flex items-center gap-4 mb-6 justify-end">
                      <div className="w-16 h-16 rounded-2xl bg-[#635cc7] flex items-center justify-center shadow-lg">
                        <Calculator className="w-8 h-8 text-white" strokeWidth={1.5} />
                      </div>
                      <span className="font-serif text-8xl md:text-9xl font-light text-white/10">
                        04
                      </span>
                    </div>

                    <h2 className="font-arabic text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                      المتابعة
                      <br />
                      <span className="font-serif italic text-[#a3a3e0] font-light">والمحاسبة</span>
                    </h2>

                    <p className="font-arabic text-lg text-white/50 leading-relaxed mb-8 max-w-md mr-auto">
                      متابعة مبيعات المتجر، وتحصيل الإيرادات بشكل آلي. كل طرف يعرف نصيبه بشفافية تامة.
                    </p>

                    <div className="flex flex-wrap gap-3 justify-end">
                      {['تقارير لحظية', 'محاسبة شفافة', 'تحويل تلقائي'].map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10"
                        >
                          <span className="font-arabic text-sm text-white">{feature}</span>
                          <CheckCircle className="w-4 h-4 text-[#a3a3e0]" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========== FINAL CTA ========== */}
            <div className="w-screen h-full flex items-center justify-center px-8 flex-shrink-0 relative overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80)',
                    filter: 'brightness(0.2) sepia(0.3)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#292b94]/90 to-[#635cc7]/70" />
              </div>

              {/* Decorative Lines */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-px bg-gradient-to-r from-transparent via-[#a3a3e0]/30 to-transparent w-full"
                    style={{ top: `${20 + i * 15}%` }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                  />
                ))}
              </div>

              <div className="relative z-10 text-center max-w-3xl">
                {/* Pre-title */}
                <motion.div className="mb-8">
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-12 bg-[#a3a3e0]" />
                    <span className="font-serif text-sm tracking-[0.4em] text-[#a3a3e0] uppercase italic">
                      The Beginning
                    </span>
                    <div className="h-px w-12 bg-[#a3a3e0]" />
                  </div>
                </motion.div>

                <h2 className="font-arabic text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
                  ابدأ رحلتك
                  <br />
                  <span className="font-serif italic font-light text-[#a3a3e0]">معنا</span>
                </h2>

                <p className="font-arabic text-xl text-white/50 max-w-xl mx-auto mb-12 leading-relaxed">
                  انضم إلى مئات البائعين والمحلات الذين يستخدمون رفوف لتنمية أعمالهم
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.button
                    className="group relative overflow-hidden px-10 py-5 bg-white rounded-2xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 font-arabic text-base font-bold text-[#292b94]">
                      سجّل كبائع
                    </span>
                  </motion.button>

                  <motion.button
                    className="px-10 py-5 border-2 border-white/30 rounded-2xl hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-arabic text-base font-medium text-white">
                      سجّل كمحل
                    </span>
                  </motion.button>
                </div>

                {/* Trust Stats */}
                <div className="mt-16 flex flex-wrap items-center justify-center gap-12">
                  {[
                    { value: '٣٠٠+', label: 'بائع نشط' },
                    { value: '١٠٠+', label: 'محل شريك' },
                    { value: '٩٥٪', label: 'نسبة الرضا' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="font-serif text-3xl text-white mb-1">{stat.value}</div>
                      <div className="font-arabic text-xs text-white/40">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Progress Line */}
          <div className="absolute bottom-16 left-8 right-8 md:left-16 md:right-16">
            <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full rounded-full origin-right"
                style={{ 
                  scaleX: smoothProgress,
                  background: 'linear-gradient(to left, #635cc7, #a3a3e0)'
                }}
              />
            </div>
          </div>

          {/* Step Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
            {['01', '02', '03', '04', '✦'].map((step, i) => (
              <motion.div
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-serif"
                style={{
                  backgroundColor: 'rgba(99, 92, 199, 0.1)',
                  color: '#635cc7',
                }}
              >
                {step}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}