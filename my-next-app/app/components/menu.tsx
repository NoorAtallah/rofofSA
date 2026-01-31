'use client'

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface MenuItem {
  num: string
  nameAr: string
  nameEn: string
  clipId: string
  image: string
  description: string
}

const menuItems: MenuItem[] = [
  {
    num: "01",
    nameAr: "للمتاجر الإلكترونية",
    nameEn: "For Sellers",
    clipId: "clip-sellers",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "وسّع انتشارك عبر شبكة المحلات التجارية"
  },
  {
    num: "02",
    nameAr: "للمحلات التجارية",
    nameEn: "For Stores",
    clipId: "clip-stores",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "احصل على إيرادات إضافية من منتجات جديدة"
  },
  {
    num: "03",
    nameAr: "للعملاء",
    nameEn: "For Customers",
    clipId: "clip-customers",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "استلم طلباتك من أقرب محل بسرعة وسهولة"
  }
]

export default function RofofMenuSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<SVGImageElement>(null)
  const mainGroupRef = useRef<SVGGElement>(null)
  const currentAnimation = useRef<gsap.core.Timeline | null>(null)

  const animateToItem = (index: number) => {
    const item = menuItems[index]
    const selector = `#${item.clipId} .path`

    if (currentAnimation.current) {
      currentAnimation.current.kill()
    }

    // Update image and clip path
    if (mainGroupRef.current) {
      mainGroupRef.current.setAttribute("clip-path", `url(#${item.clipId})`)
    }

    // Animate image change
    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        if (imageRef.current) {
          imageRef.current.setAttribute("href", item.image)
        }
        gsap.to(imageRef.current, { opacity: 1, duration: 0.5 })
      }
    })

    // Reset and animate paths
    gsap.set(selector, { scale: 0, transformOrigin: "50% 50%" })

    const tl = gsap.timeline()
    
    tl.to(selector, {
      scale: 1,
      duration: 0.8,
      stagger: { amount: 0.4, from: "random" },
      ease: "expo.out",
    })

    currentAnimation.current = tl
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      const firstSelector = `#${menuItems[0].clipId} .path`
      gsap.set(firstSelector, { scale: 0, transformOrigin: "50% 50%" })
      
      gsap.to(firstSelector, {
        scale: 1,
        duration: 0.8,
        stagger: { amount: 0.4, from: "random" },
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      })

      // Create scroll triggers for each section
      menuItems.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: () => `top+=${index * (100 / menuItems.length)}% top`,
          end: () => `top+=${(index + 1) * (100 / menuItems.length)}% top`,
          onEnter: () => {
            setActiveIndex(index)
            animateToItem(index)
          },
          onEnterBack: () => {
            setActiveIndex(index)
            animateToItem(index)
          },
        })
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={containerRef} 
      dir="rtl"
      className="relative bg-[#003a5c]"
      style={{ height: `${menuItems.length * 100}vh` }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Tajawal:wght@200;300;400;500;700;800&display=swap');
        
        .font-serif { font-family: 'Cormorant', serif; }
        .font-arabic { font-family: 'Tajawal', sans-serif; }

        .text-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>

      {/* Sticky Container */}
      <div 
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-20 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#635cc7]/10 rounded-full blur-[200px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#a3a3e0]/8 rounded-full blur-[150px]" />
        </div>

        {/* Vertical Side Text */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 hidden xl:block">
          <span className="text-vertical font-serif text-sm tracking-[0.5em] text-[#eef3ff]/15 uppercase">
            Rofof Platform
          </span>
        </div>

        {/* Section Header - Top */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-8 h-px bg-[#635cc7]" />
            <span className="font-serif text-sm tracking-[0.4em] text-[#a3a3e0] uppercase">Explore</span>
            <div className="w-8 h-px bg-[#635cc7]" />
          </div>
          <h2 className="font-arabic text-2xl lg:text-3xl text-[#eef3ff] font-bold">
            اكتشف رفوف
          </h2>
        </div>
        
        {/* LEFT SIDE: MENU */}
        <div className="z-20 w-full lg:w-1/2 mt-20 lg:mt-0">
          <nav>
            <ul className="flex flex-col gap-10 lg:gap-14">
              {menuItems.map((item, index) => (
                <li
                  key={item.num}
                  className="group"
                >
                  <div className="flex items-start gap-6">
                    {/* Numbers */}
                    <span className={`
                      font-serif text-2xl lg:text-3xl font-light transition-all duration-500 mt-2
                      ${activeIndex === index 
                        ? "text-[#a3a3e0] scale-110" 
                        : "text-[#eef3ff]/20"
                      }
                    `}>
                      {item.num}
                    </span>
                    
                    {/* Text Content */}
                    <div className={`
                      transition-all duration-700
                      ${activeIndex === index 
                        ? "translate-x-4 lg:translate-x-6" 
                        : "translate-x-0"
                      }
                    `}>
                      {/* Arabic Title */}
                      <h3 className={`
                        font-arabic text-3xl lg:text-5xl font-bold tracking-wide leading-tight transition-all duration-500
                        ${activeIndex === index 
                          ? "text-[#eef3ff]" 
                          : "text-[#eef3ff]/25"
                        }
                      `}>
                        {item.nameAr}
                      </h3>
                      
                      {/* English Subtitle */}
                      <span className={`
                        font-serif text-base lg:text-lg italic transition-all duration-500 block mt-1
                        ${activeIndex === index 
                          ? "text-[#a3a3e0]" 
                          : "text-[#a3a3e0]/30"
                        }
                      `}>
                        {item.nameEn}
                      </span>

                      {/* Description - Only visible when active */}
                      <p className={`
                        font-arabic text-base lg:text-lg text-[#eef3ff]/50 mt-3 max-w-sm transition-all duration-500
                        ${activeIndex === index 
                          ? "opacity-100 translate-y-0" 
                          : "opacity-0 -translate-y-2 h-0 overflow-hidden"
                        }
                      `}>
                        {item.description}
                      </p>

                      {/* CTA Arrow - Only visible when active */}
                      <div className={`
                        flex items-center gap-3 mt-4 transition-all duration-500
                        ${activeIndex === index 
                          ? "opacity-100 translate-y-0" 
                          : "opacity-0 -translate-y-2 h-0 overflow-hidden"
                        }
                      `}>
                        <span className="font-arabic text-base text-[#a3a3e0]">اعرف المزيد</span>
                        <svg className="w-5 h-5 text-[#a3a3e0] rotate-180" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Line */}
                  <div className={`
                    h-px mt-6 transition-all duration-700
                    ${activeIndex === index 
                      ? "bg-gradient-to-l from-[#635cc7] via-[#a3a3e0]/30 to-transparent w-full" 
                      : "bg-[#eef3ff]/10 w-1/2"
                    }
                  `} />
                </li>
              ))}
            </ul>
          </nav>

          {/* Scroll Progress Indicator */}
          <div className="flex items-center gap-3 mt-12">
            {menuItems.map((_, index) => (
              <div
                key={index}
                className={`
                  h-1 rounded-full transition-all duration-500
                  ${activeIndex === index 
                    ? "w-12 bg-[#a3a3e0]" 
                    : activeIndex > index 
                      ? "w-6 bg-[#635cc7]" 
                      : "w-6 bg-[#eef3ff]/20"
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: ANIMATED SVG IMAGE */}
        <div className="relative w-full lg:w-1/2 flex justify-center items-center mt-12 lg:mt-0">
          {/* Glow Effect */}
          <div className="absolute w-[120%] h-[120%] bg-[#635cc7]/10 blur-[120px] rounded-full transition-opacity duration-1000" />
          
          {/* Corner Decorations */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#635cc7]/30" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#a3a3e0]/30" />
          
          <svg viewBox="0 0 500 500" className="w-full max-w-[400px] lg:max-w-[480px] h-auto z-10">
            <defs>
              {/* Clip Path 1: Rounded Rectangles */}
              <clipPath id="clip-sellers">
                <rect className="path" x="20" y="20" width="220" height="280" rx="16" />
                <rect className="path" x="20" y="320" width="220" height="160" rx="16" />
                <rect className="path" x="260" y="20" width="220" height="140" rx="16" />
                <rect className="path" x="260" y="180" width="100" height="180" rx="16" />
                <rect className="path" x="380" y="180" width="100" height="180" rx="16" />
                <rect className="path" x="260" y="380" width="220" height="100" rx="16" />
              </clipPath>

              {/* Clip Path 2: Grid Squares */}
              <clipPath id="clip-stores">
                {Array.from({ length: 9 }).map((_, i) => (
                  <rect
                    key={i}
                    className="path"
                    x={(i % 3) * 160 + 20}
                    y={Math.floor(i / 3) * 160 + 20}
                    width="140"
                    height="140"
                    rx="8"
                  />
                ))}
              </clipPath>

              {/* Clip Path 3: Organic Shapes */}
              <clipPath id="clip-customers">
                <path className="path" d="M480.6,235H19.4c-6,0-10.8-4.9-10.8-10.8v-9.5c0-6,4.9-10.8,10.8-10.8h461.1c6,0,10.8,4.9,10.8,10.8v9.5C491.4,230.2,486.6,235,480.6,235z" />
                <path className="path" d="M483.1,362.4H16.9c-4.6,0-8.3-3.7-8.3-8.3v-1.8c0-4.6,3.7-8.3,8.3-8.3h466.1c4.6,0,8.3,3.7,8.3,8.3v1.8C491.4,358.7,487.7,362.4,483.1,362.4z" />
                <path className="path" d="M460.3,336.3H39.7c-17.2,0-31.1-13.9-31.1-31.1v-31.5c0-17.2,13.9-31.1,31.1-31.1h420.7c17.2,0,31.1,13.9,31.1,31.1v31.5C491.4,322.4,477.5,336.3,460.3,336.3z" />
                <path className="path" d="M459.2,196.2H40.8v-35c0-47.5,38.5-86,86-86h246.5c47.5,0,86,38.5,86,86V196.2z" />
                <path className="path" d="M441.9,424.9H58.1c-9.6,0-17.3-7.8-17.3-17.3v-37.4h418.5v37.4C459.2,417.1,451.5,424.9,441.9,424.9z" />
              </clipPath>
            </defs>

            {/* Main Image Group */}
            <g ref={mainGroupRef} clipPath={`url(#${menuItems[0].clipId})`}>
              <image
                ref={imageRef}
                href={menuItems[0].image}
                width="500"
                height="500"
                preserveAspectRatio="xMidYMid slice"
              />
              {/* Overlay for brand color tint */}
              <rect width="500" height="500" fill="#003a5c" opacity="0.2" />
            </g>

            {/* Decorative Border */}
            <rect 
              x="10" 
              y="10" 
              width="480" 
              height="480" 
              rx="20" 
              fill="none" 
              stroke="#635cc7" 
              strokeWidth="1" 
              opacity="0.2"
            />
          </svg>

          {/* Active Item Label */}
          <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 bg-[#003a5c]/90 backdrop-blur-sm border border-[#635cc7]/30 rounded-xl px-5 py-3">
            <span className="font-serif text-base text-[#a3a3e0]">{menuItems[activeIndex].nameEn}</span>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl text-[#eef3ff] font-light">500+</span>
            <span className="font-arabic text-base text-[#eef3ff]/40">بائع</span>
          </div>
          <div className="w-px h-6 bg-[#eef3ff]/10" />
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl text-[#eef3ff] font-light">200+</span>
            <span className="font-arabic text-base text-[#eef3ff]/40">محل</span>
          </div>
          <div className="w-px h-6 bg-[#eef3ff]/10" />
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl text-[#eef3ff] font-light">50K+</span>
            <span className="font-arabic text-base text-[#eef3ff]/40">منتج</span>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2">
          <div className="w-6 h-10 border border-[#eef3ff]/20 rounded-full flex items-start justify-center pt-2">
            <div 
              className="w-1 h-2 bg-[#a3a3e0] rounded-full animate-bounce"
            />
          </div>
          <span className="font-serif text-xs text-[#eef3ff]/30 uppercase tracking-widest">Scroll</span>
        </div>

      </div>
    </div>
  )
}