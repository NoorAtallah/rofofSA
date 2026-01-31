'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function RofofFooter() {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: "-100px" })

  const footerLinks = {
    platform: {
      title: 'المنصة',
      titleEn: 'Platform',
      links: [
        { ar: 'الرئيسية', en: 'Home', href: '#' },
        { ar: 'كيف نعمل', en: 'How it works', href: '#' },
        { ar: 'الأسعار', en: 'Pricing', href: '#' },
        { ar: 'الأسئلة الشائعة', en: 'FAQ', href: '#' },
      ]
    },
    sellers: {
      title: 'للبائعين',
      titleEn: 'For Sellers',
      links: [
        { ar: 'سجّل كبائع', en: 'Register', href: '#' },
        { ar: 'لوحة التحكم', en: 'Dashboard', href: '#' },
        { ar: 'الدعم الفني', en: 'Support', href: '#' },
        { ar: 'الشروط والأحكام', en: 'Terms', href: '#' },
      ]
    },
    stores: {
      title: 'للمحلات',
      titleEn: 'For Stores',
      links: [
        { ar: 'سجّل كمحل', en: 'Register', href: '#' },
        { ar: 'المميزات', en: 'Features', href: '#' },
        { ar: 'قصص النجاح', en: 'Success Stories', href: '#' },
        { ar: 'الشراكات', en: 'Partnerships', href: '#' },
      ]
    },
    company: {
      title: 'الشركة',
      titleEn: 'Company',
      links: [
        { ar: 'من نحن', en: 'About Us', href: '#' },
        { ar: 'تواصل معنا', en: 'Contact', href: '#' },
        { ar: 'الوظائف', en: 'Careers', href: '#' },
        { ar: 'المدونة', en: 'Blog', href: '#' },
      ]
    },
  }

  const socialLinks = [
    { 
      name: 'Twitter', 
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
  ]

  return (
    <footer 
      ref={footerRef}
      dir="rtl" 
      className="relative bg-[#002a42] overflow-hidden"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Tajawal:wght@200;300;400;500;700;800&display=swap');
        
        .font-serif { font-family: 'Cormorant', serif; }
        .font-arabic { font-family: 'Tajawal', sans-serif; }
      `}</style>

      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#635cc7]/5 rounded-full blur-[200px] pointer-events-none" />
      
      {/* Top Decorative Border */}
      <div className="w-full h-px bg-gradient-to-l from-transparent via-[#635cc7]/30 to-transparent" />

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-12">
        
        {/* Top Section - Logo & CTA */}
        <motion.div 
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#635cc7] to-[#a3a3e0] flex items-center justify-center">
                <span className="font-arabic text-2xl font-bold text-white">ر</span>
              </div>
              <div>
                <h3 className="font-arabic text-3xl font-bold text-[#eef3ff]">رفوف</h3>
                <span className="font-serif text-sm text-[#a3a3e0] italic">Rofof Platform</span>
              </div>
            </div>
            <p className="font-arabic text-lg text-[#eef3ff]/50 max-w-md leading-relaxed">
              منصة تجمع البائعين المميزين بالمحلات الراقية في تجربة تجارية استثنائية
            </p>
          </div>

          {/* Newsletter CTA */}
          <div className="w-full lg:w-auto">
            <span className="font-arabic text-base text-[#eef3ff]/70 block mb-4">
              اشترك في النشرة البريدية
            </span>
            <div className="flex gap-3">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني"
                className="flex-1 lg:w-72 bg-[#003a5c] border border-[#eef3ff]/10 rounded-xl px-5 py-4 font-arabic text-base text-[#eef3ff] placeholder:text-[#eef3ff]/30 focus:outline-none focus:border-[#635cc7]/50 transition-colors"
              />
              <button className="bg-gradient-to-r from-[#635cc7] to-[#a3a3e0] px-6 py-4 rounded-xl font-arabic text-base font-semibold text-white hover:shadow-lg hover:shadow-[#635cc7]/30 transition-all">
                اشترك
              </button>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-[#eef3ff]/10 mb-16" />

        {/* Links Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {Object.values(footerLinks).map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <div className="mb-6">
                <h4 className="font-arabic text-lg font-semibold text-[#eef3ff] mb-1">
                  {section.title}
                </h4>
                <span className="font-serif text-sm text-[#a3a3e0]/50 italic">
                  {section.titleEn}
                </span>
              </div>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="group flex items-center gap-2 font-arabic text-base text-[#eef3ff]/50 hover:text-[#eef3ff] transition-colors"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[#a3a3e0] transition-all duration-300" />
                      {link.ar}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 py-10 border-y border-[#eef3ff]/10 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { num: '500', label: 'بائع مسجّل', suffix: '+' },
            { num: '200', label: 'محل شريك', suffix: '+' },
            { num: '50K', label: 'منتج متاح', suffix: '+' },
            { num: '6', label: 'مدن', suffix: '' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="font-serif text-3xl lg:text-4xl text-[#eef3ff] font-light">{stat.num}</span>
                <span className="font-serif text-xl text-[#635cc7]">{stat.suffix}</span>
              </div>
              <span className="font-arabic text-sm text-[#eef3ff]/40">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="flex flex-col lg:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Copyright */}
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            <span className="font-arabic text-base text-[#eef3ff]/40">
              © 2025 رفوف. جميع الحقوق محفوظة
            </span>
            <div className="hidden lg:block w-px h-4 bg-[#eef3ff]/10" />
            <div className="flex items-center gap-4">
              <a href="#" className="font-arabic text-sm text-[#eef3ff]/40 hover:text-[#eef3ff] transition-colors">
                سياسة الخصوصية
              </a>
              <span className="text-[#eef3ff]/20">|</span>
              <a href="#" className="font-arabic text-sm text-[#eef3ff]/40 hover:text-[#eef3ff] transition-colors">
                الشروط والأحكام
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="font-serif text-sm text-[#eef3ff]/30 ml-2">Follow us</span>
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-11 h-11 rounded-xl border border-[#eef3ff]/10 flex items-center justify-center text-[#eef3ff]/40 hover:text-[#eef3ff] hover:border-[#635cc7]/50 hover:bg-[#635cc7]/10 transition-all"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Large Background Watermark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none overflow-hidden">
        <span className="font-serif text-[20vw] font-bold text-[#635cc7]/[0.03] leading-none select-none">
          ROFOF
        </span>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 right-8 w-20 h-20 border-t border-r border-[#635cc7]/20" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-b border-l border-[#a3a3e0]/20" />

    </footer>
  )
}