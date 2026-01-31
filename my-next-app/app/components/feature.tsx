'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const sellerFeatures = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: 'تغطية واسعة',
    description: 'وصول لشبكة من المحلات التجارية المنتشرة في مختلف المناطق لتوسيع نطاق عملك',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'تجربة موثوقة',
    description: 'منصة آمنة وموثوقة تضمن انسيابية تجربة البيع والشراء لجميع الأطراف',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'استلام سريع',
    description: 'قدم لعملائك خيار استلام سريع من أقرب محل تجاري بدلاً من انتظار الشحن',
  },
]

const storeFeatures = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: 'إيرادات إضافية',
    description: 'احصل على عمولة من كل عملية بيع تتم داخل محلك دون تكاليف إضافية',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: 'عملاء جدد',
    description: 'استقطب عملاء جدد لمحلك من خلال شبكة المتاجر الإلكترونية الشريكة',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'لوحة تحكم متكاملة',
    description: 'تابع المبيعات والمخزون والإيرادات من خلال لوحة تحكم سهلة الاستخدام',
  },
]

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState<'sellers' | 'stores'>('sellers')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const features = activeTab === 'sellers' ? sellerFeatures : storeFeatures

  return (
    <div dir="rtl" className="bg-[#003a5c] relative py-32 overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Tajawal:wght@200;300;400;500;700;800&display=swap');
        
        .font-serif { font-family: 'Cormorant', serif; }
        .font-arabic { font-family: 'Tajawal', sans-serif; }
      `}</style>

      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#635cc7]/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#a3a3e0]/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(#eef3ff 1px, transparent 1px), linear-gradient(90deg, #eef3ff 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div ref={sectionRef} className="relative max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#635cc7]" />
            <span className="font-serif text-sm tracking-[0.4em] text-[#a3a3e0] uppercase">
              منصة رفوف
            </span>
            <div className="w-12 h-px bg-[#635cc7]" />
          </div>

          {/* Title */}
          <h2 className="font-arabic text-5xl lg:text-6xl text-[#eef3ff] font-bold mb-6">
            مميزات المنصة
          </h2>

          {/* Description */}
          <p className="font-arabic text-xl lg:text-2xl text-[#eef3ff]/60 leading-relaxed max-w-3xl mx-auto">
            رفوف توفر حلاً مبتكراً للربط بين المتاجر الإلكترونية والمحلات التجارية، مما يساهم في تطوير تجربة التسوق للمستهلكين وزيادة الإيرادات للأطراف المشاركة.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative bg-[#003a5c]/80 backdrop-blur-sm border border-[#eef3ff]/10 rounded-2xl p-2">
            {/* Active indicator */}
            <motion.div
              className="absolute top-2 bottom-2 bg-gradient-to-r from-[#635cc7] to-[#a3a3e0] rounded-xl"
              initial={false}
              animate={{
                right: activeTab === 'sellers' ? '8px' : '50%',
                left: activeTab === 'sellers' ? '50%' : '8px',
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
            
            <div className="relative flex gap-2">
              <button
                onClick={() => setActiveTab('sellers')}
                className={`relative z-10 px-10 py-4 rounded-xl font-arabic text-lg font-medium transition-colors duration-300 ${
                  activeTab === 'sellers' ? 'text-white' : 'text-[#eef3ff]/60 hover:text-[#eef3ff]'
                }`}
              >
                للمتاجر الإلكترونية
              </button>
              <button
                onClick={() => setActiveTab('stores')}
                className={`relative z-10 px-10 py-4 rounded-xl font-arabic text-lg font-medium transition-colors duration-300 ${
                  activeTab === 'stores' ? 'text-white' : 'text-[#eef3ff]/60 hover:text-[#eef3ff]'
                }`}
              >
                للمحلات التجارية
              </button>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={`${activeTab}-${index}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full bg-gradient-to-b from-[#eef3ff]/[0.03] to-transparent border border-[#eef3ff]/10 rounded-3xl p-8 lg:p-10 hover:border-[#635cc7]/40 transition-all duration-500 hover:bg-[#eef3ff]/[0.02]">
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#635cc7]/0 to-[#635cc7]/0 group-hover:from-[#635cc7]/5 group-hover:to-transparent transition-all duration-500" />
                
                {/* Number */}
                <div className="absolute top-6 left-6">
                  <span className="font-serif text-6xl font-bold text-[#635cc7]/10 group-hover:text-[#635cc7]/20 transition-colors duration-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#635cc7]/20 to-[#a3a3e0]/10 border border-[#635cc7]/20 flex items-center justify-center text-[#a3a3e0] mb-8 group-hover:scale-110 group-hover:border-[#635cc7]/40 transition-all duration-500">
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-arabic text-2xl lg:text-3xl text-[#eef3ff] font-bold mb-4">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="font-arabic text-lg text-[#eef3ff]/50 leading-relaxed group-hover:text-[#eef3ff]/70 transition-colors duration-500">
                    {feature.description}
                  </p>

                  {/* Arrow link */}
                  <div className="mt-8 flex items-center gap-2 text-[#a3a3e0] opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <span className="font-arabic text-base">اعرف المزيد</span>
                    <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-[#635cc7]/0 group-hover:border-[#635cc7]/30 rounded-bl-xl transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-6 bg-[#eef3ff]/[0.03] border border-[#eef3ff]/10 rounded-2xl px-8 py-6">
            <div className="text-right">
              <span className="font-arabic text-lg text-[#eef3ff]/60 block">جاهز للبدء؟</span>
              <span className="font-arabic text-xl text-[#eef3ff] font-semibold">انضم إلى منصة رفوف اليوم</span>
            </div>
            <div className="w-px h-12 bg-[#eef3ff]/10" />
            <a
              href="#"
              className="group flex items-center gap-3 bg-gradient-to-r from-[#635cc7] to-[#a3a3e0] px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-[#635cc7]/30 transition-all duration-300"
            >
              <span className="font-arabic text-lg font-semibold text-white">سجّل الآن</span>
              <svg className="w-5 h-5 text-white rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Decorative side elements */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 hidden 2xl:block">
          <div className="flex flex-col gap-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 rounded-full bg-[#635cc7]"
                style={{
                  height: `${20 + i * 10}px`,
                  opacity: 0.1 + i * 0.1
                }}
              />
            ))}
          </div>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-0 hidden 2xl:block">
          <div className="flex flex-col gap-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 rounded-full bg-[#a3a3e0]"
                style={{
                  height: `${60 - i * 10}px`,
                  opacity: 0.3 - i * 0.05
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}