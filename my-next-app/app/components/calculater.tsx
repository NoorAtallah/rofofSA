'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

export default function MoneyFlowSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [activeFlow, setActiveFlow] = useState<'subscription' | 'commission'>('subscription')
  
  // Calculator states
  const [subscriptionPrice, setSubscriptionPrice] = useState(600)
  const [productPrice, setProductPrice] = useState(100)
  const [storeCommission, setStoreCommission] = useState(15)
  
  // Calculations
  const platformFee = (subscriptionPrice * 20) / 100
  const totalSubscription = subscriptionPrice + platformFee
  const platformCommissionPercent = (storeCommission * 20) / 100
  const storeEarningsPercent = storeCommission - platformCommissionPercent
  const platformEarningsAmount = (productPrice * platformCommissionPercent) / 100
  const storeEarningsAmount = (productPrice * storeEarningsPercent) / 100

  return (
    <div dir="rtl" className="bg-[#003a5c] relative py-32 overflow-hidden min-h-screen">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Tajawal:wght@200;300;400;500;700;800&display=swap');
        
        .font-serif { font-family: 'Cormorant', serif; }
        .font-arabic { font-family: 'Tajawal', sans-serif; }

        .text-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        @keyframes dashFlow {
          0% { stroke-dashoffset: 20; }
          100% { stroke-dashoffset: 0; }
        }

        .flow-line {
          stroke-dasharray: 5, 5;
          animation: dashFlow 1s linear infinite;
        }

        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
          width: 100%;
        }

        input[type="range"]::-webkit-slider-runnable-track {
          height: 2px;
          background: rgba(238, 243, 255, 0.2);
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #a3a3e0;
          margin-top: -7px;
          transition: transform 0.2s;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#635cc7]/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#a3a3e0]/8 rounded-full blur-[180px]" />
      </div>

      {/* Vertical side text */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-[2%] z-20 hidden xl:block"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
      >
        <span className="text-vertical font-serif text-sm tracking-[0.5em] text-[#eef3ff]/20 uppercase">
          Money Flow
        </span>
      </motion.div>

      <div ref={sectionRef} className="relative max-w-6xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-px bg-[#635cc7]" />
            <span className="font-serif text-sm tracking-[0.4em] text-[#a3a3e0] uppercase">How it works</span>
            <div className="w-10 h-px bg-[#635cc7]" />
          </div>
          <h2 className="font-arabic text-5xl lg:text-6xl text-[#eef3ff] font-bold mb-4">
            تدفق الأموال
          </h2>
          <p className="font-serif text-xl lg:text-2xl text-[#eef3ff]/50 italic">
            شفافية كاملة في كل معاملة
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div 
          className="flex justify-center mb-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 bg-[#003a5c] border border-[#eef3ff]/10 rounded-full p-2">
            <button
              onClick={() => setActiveFlow('subscription')}
              className={`px-8 py-3 rounded-full font-arabic text-base transition-all ${
                activeFlow === 'subscription' 
                  ? 'bg-[#635cc7] text-white' 
                  : 'text-[#eef3ff]/50 hover:text-[#eef3ff]'
              }`}
            >
              رسوم الاشتراك
            </button>
            <button
              onClick={() => setActiveFlow('commission')}
              className={`px-8 py-3 rounded-full font-arabic text-base transition-all ${
                activeFlow === 'commission' 
                  ? 'bg-[#635cc7] text-white' 
                  : 'text-[#eef3ff]/50 hover:text-[#eef3ff]'
              }`}
            >
              عمولة المبيعات
            </button>
          </div>
        </motion.div>

        {/* Flow Visualization */}
        <AnimatePresence mode="wait">
          {activeFlow === 'subscription' ? (
            <motion.div
              key="subscription"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Subscription Flow */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8">
                
                {/* Seller Node */}
                <motion.div 
                  className="relative"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="w-44 h-44 lg:w-52 lg:h-52 rounded-full border border-[#eef3ff]/20 bg-[#003a5c] flex flex-col items-center justify-center relative">
                    {/* Pulsing ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border border-[#a3a3e0]/30"
                      animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <svg className="w-10 h-10 text-[#a3a3e0] mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <span className="font-arabic text-lg text-[#eef3ff]">المتجر الإلكتروني</span>
                    <span className="font-serif text-sm text-[#eef3ff]/40 mt-1">Seller</span>
                  </div>
                  
                  {/* Amount badge */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#635cc7] rounded-full px-5 py-2">
                    <span className="font-serif text-lg text-white">{totalSubscription} ريال</span>
                  </div>
                </motion.div>

                {/* Flow Line 1 */}
                <div className="hidden lg:block relative w-40">
                  <svg className="w-full h-16" viewBox="0 0 160 64">
                    <motion.path
                      d="M0 32 L160 32"
                      stroke="#a3a3e0"
                      strokeWidth="1.5"
                      fill="none"
                      className="flow-line"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                    <motion.polygon
                      points="150,26 160,32 150,38"
                      fill="#a3a3e0"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 1 }}
                    />
                  </svg>
                  <motion.div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 }}
                  >
                    <span className="font-arabic text-base text-[#eef3ff]/40">يدفع</span>
                  </motion.div>
                </div>

                {/* Mobile Arrow */}
                <motion.div 
                  className="lg:hidden"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  <svg className="w-8 h-16 text-[#a3a3e0]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 32 64">
                    <path d="M16 0 L16 50 M8 42 L16 50 L24 42" className="flow-line" />
                  </svg>
                </motion.div>

                {/* Platform Node (Center) */}
                <motion.div 
                  className="relative"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="w-52 h-52 lg:w-60 lg:h-60 rounded-full bg-gradient-to-br from-[#635cc7] to-[#a3a3e0] p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#003a5c] flex flex-col items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-3 rounded-full border border-dashed border-[#635cc7]/30"
                      />
                      <span className="font-serif text-4xl text-[#eef3ff] italic">رفوف</span>
                      <span className="font-serif text-base text-[#a3a3e0] mt-2">Platform</span>
                    </div>
                  </div>
                  
                  {/* Platform fee badge */}
                  <motion.div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#003a5c] border border-[#a3a3e0]/30 rounded-full px-5 py-2"
                    initial={{ y: 10, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 1.2 }}
                  >
                    <span className="font-serif text-lg text-[#a3a3e0]">+{platformFee} ريال</span>
                  </motion.div>
                  <motion.div 
                    className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.4 }}
                  >
                    <span className="font-arabic text-base text-[#eef3ff]/40">عمولة 20%</span>
                  </motion.div>
                </motion.div>

                {/* Flow Line 2 */}
                <div className="hidden lg:block relative w-40">
                  <svg className="w-full h-16" viewBox="0 0 160 64">
                    <motion.path
                      d="M0 32 L160 32"
                      stroke="#635cc7"
                      strokeWidth="1.5"
                      fill="none"
                      className="flow-line"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                    <motion.polygon
                      points="150,26 160,32 150,38"
                      fill="#635cc7"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 1.3 }}
                    />
                  </svg>
                  <motion.div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.3 }}
                  >
                    <span className="font-arabic text-base text-[#eef3ff]/40">يستلم</span>
                  </motion.div>
                </div>

                {/* Mobile Arrow */}
                <motion.div 
                  className="lg:hidden"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.9 }}
                >
                  <svg className="w-8 h-16 text-[#635cc7]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 32 64">
                    <path d="M16 0 L16 50 M8 42 L16 50 L24 42" className="flow-line" />
                  </svg>
                </motion.div>

                {/* Store Node */}
                <motion.div 
                  className="relative"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <div className="w-44 h-44 lg:w-52 lg:h-52 rounded-full border border-[#eef3ff]/20 bg-[#003a5c] flex flex-col items-center justify-center relative">
                    <motion.div
                      className="absolute inset-0 rounded-full border border-[#635cc7]/30"
                      animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    <svg className="w-10 h-10 text-[#635cc7] mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                    </svg>
                    <span className="font-arabic text-lg text-[#eef3ff]">المحل التجاري</span>
                    <span className="font-serif text-sm text-[#eef3ff]/40 mt-1">Store</span>
                  </div>
                  
                  {/* Received badge */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#003a5c] border border-[#635cc7]/50 rounded-full px-5 py-2">
                    <span className="font-serif text-lg text-[#635cc7]">{subscriptionPrice} ريال</span>
                  </div>
                </motion.div>
              </div>

              {/* Slider */}
              <motion.div 
                className="max-w-md mx-auto mt-20"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-arabic text-base text-[#eef3ff]/50">قيمة الاشتراك</span>
                  <span className="font-serif text-lg text-[#eef3ff]">{subscriptionPrice} ريال</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={subscriptionPrice}
                  onChange={(e) => setSubscriptionPrice(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between mt-2">
                  <span className="font-serif text-sm text-[#eef3ff]/30">100</span>
                  <span className="font-serif text-sm text-[#eef3ff]/30">5,000</span>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="commission"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Commission Flow */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-6">
                
                {/* Customer Node */}
                <motion.div 
                  className="relative"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="w-36 h-36 lg:w-44 lg:h-44 rounded-full border border-[#eef3ff]/20 bg-[#003a5c] flex flex-col items-center justify-center">
                    <svg className="w-8 h-8 text-[#eef3ff]/50 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span className="font-arabic text-lg text-[#eef3ff]/70">العميل</span>
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#eef3ff] rounded-full px-4 py-2">
                    <span className="font-serif text-base text-[#003a5c]">{productPrice} ريال</span>
                  </div>
                </motion.div>

                {/* Arrow to Store */}
                <motion.div 
                  className="hidden lg:block w-24"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <svg className="w-full h-12" viewBox="0 0 96 48">
                    <path d="M0 24 L86 24 M76 18 L86 24 L76 30" stroke="#eef3ff" strokeWidth="1.5" fill="none" opacity="0.3" className="flow-line" />
                  </svg>
                </motion.div>

                {/* Mobile Arrow */}
                <motion.div className="lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <svg className="w-8 h-12 text-[#eef3ff]/30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 32 48">
                    <path d="M16 0 L16 36 M8 28 L16 36 L24 28" className="flow-line" />
                  </svg>
                </motion.div>

                {/* Store Node */}
                <motion.div 
                  className="relative"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="w-44 h-44 lg:w-52 lg:h-52 rounded-full border border-[#635cc7]/30 bg-[#003a5c] flex flex-col items-center justify-center relative">
                    <motion.div
                      className="absolute inset-0 rounded-full border border-[#635cc7]/20"
                      animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    <svg className="w-8 h-8 text-[#635cc7] mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                    </svg>
                    <span className="font-arabic text-lg text-[#eef3ff]">المحل</span>
                    <span className="font-serif text-3xl text-[#635cc7] mt-1">{storeEarningsAmount.toFixed(1)}</span>
                    <span className="font-serif text-base text-[#eef3ff]/40">({storeEarningsPercent}%)</span>
                  </div>
                </motion.div>

                {/* Split Flow */}
                <div className="hidden lg:flex flex-col items-center gap-6 relative h-52">
                  <svg className="absolute inset-0 w-40 h-full" viewBox="0 0 160 208">
                    {/* To Platform */}
                    <motion.path
                      d="M0 104 Q80 104 80 40 L160 40"
                      stroke="#a3a3e0"
                      strokeWidth="1.5"
                      fill="none"
                      className="flow-line"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                    <motion.polygon
                      points="150,34 160,40 150,46"
                      fill="#a3a3e0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    />
                    {/* To Seller */}
                    <motion.path
                      d="M0 104 Q80 104 80 168 L160 168"
                      stroke="#635cc7"
                      strokeWidth="1.5"
                      fill="none"
                      className="flow-line"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.9 }}
                    />
                    <motion.polygon
                      points="150,162 160,168 150,174"
                      fill="#635cc7"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                    />
                  </svg>
                  <span className="absolute top-4 right-0 font-serif text-base text-[#a3a3e0]">{platformCommissionPercent}%</span>
                  <span className="absolute bottom-4 right-0 font-arabic text-base text-[#635cc7]">باقي السعر</span>
                </div>

                {/* Mobile Split Arrows */}
                <div className="lg:hidden flex items-center gap-12">
                  <div className="flex flex-col items-center">
                    <svg className="w-8 h-12 text-[#a3a3e0]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 32 48">
                      <path d="M16 0 L16 36 M8 28 L16 36 L24 28" className="flow-line" />
                    </svg>
                    <span className="font-serif text-base text-[#a3a3e0] mt-2">{platformCommissionPercent}%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg className="w-8 h-12 text-[#635cc7]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 32 48">
                      <path d="M16 0 L16 36 M8 28 L16 36 L24 28" className="flow-line" />
                    </svg>
                    <span className="font-arabic text-base text-[#635cc7] mt-2">باقي</span>
                  </div>
                </div>

                {/* Right Side Nodes */}
                <div className="flex lg:flex-col gap-8 lg:gap-10">
                  {/* Platform Node */}
                  <motion.div 
                    className="relative"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <div className="w-36 h-36 lg:w-44 lg:h-44 rounded-full bg-gradient-to-br from-[#635cc7] to-[#a3a3e0] p-[2px]">
                      <div className="w-full h-full rounded-full bg-[#003a5c] flex flex-col items-center justify-center">
                        <span className="font-serif text-2xl text-[#a3a3e0] italic">رفوف</span>
                        <span className="font-serif text-2xl text-[#eef3ff] mt-1">{platformEarningsAmount.toFixed(1)}</span>
                        <span className="font-serif text-sm text-[#eef3ff]/40">ريال</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Seller Node */}
                  <motion.div 
                    className="relative"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    <div className="w-36 h-36 lg:w-44 lg:h-44 rounded-full border border-[#eef3ff]/20 bg-[#003a5c] flex flex-col items-center justify-center">
                      <svg className="w-6 h-6 text-[#eef3ff]/50 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <span className="font-arabic text-base text-[#eef3ff]/70">المتجر</span>
                      <span className="font-serif text-2xl text-[#eef3ff] mt-1">{(productPrice - (productPrice * storeCommission / 100)).toFixed(0)}</span>
                      <span className="font-serif text-sm text-[#eef3ff]/40">ريال</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Sliders */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-10 max-w-2xl mx-auto mt-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-arabic text-base text-[#eef3ff]/50">سعر المنتج</span>
                    <span className="font-serif text-lg text-[#eef3ff]">{productPrice} ريال</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={productPrice}
                    onChange={(e) => setProductPrice(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="font-serif text-sm text-[#eef3ff]/30">10</span>
                    <span className="font-serif text-sm text-[#eef3ff]/30">1,000</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-arabic text-base text-[#eef3ff]/50">عمولة المتجر</span>
                    <span className="font-serif text-lg text-[#eef3ff]">{storeCommission}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="1"
                    value={storeCommission}
                    onChange={(e) => setStoreCommission(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="font-serif text-sm text-[#eef3ff]/30">5%</span>
                    <span className="font-serif text-sm text-[#eef3ff]/30">50%</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Note */}
        <motion.div 
          className="text-center mt-24"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
        >
          <p className="font-arabic text-lg text-[#eef3ff]/40">
            عمولة المنصة <span className="text-[#a3a3e0]">20%</span> فقط — شفافية كاملة في كل معاملة
          </p>
        </motion.div>

      </div>
    </div>
  )
}