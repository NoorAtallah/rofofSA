'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

interface StatProps {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
  icon: React.ReactNode;
}

const AnimatedCounter = ({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });

    return () => unsubscribe();
  }, [springValue]);

  return <span ref={ref}>{displayValue.toLocaleString('ar-SA')}</span>;
};

const StatCard = ({ value, label, suffix = '', duration, icon }: StatProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className="group relative bg-white/50 backdrop-blur-sm rounded-2xl p-5 shadow-[6px_6px_16px_rgba(163,163,224,0.12),-4px_-4px_12px_rgba(255,255,255,0.8)] hover:shadow-[8px_8px_20px_rgba(163,163,224,0.18),-6px_-6px_16px_rgba(255,255,255,0.9)] transition-all duration-300"
    >
      {/* Gradient Overlay on Hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#635cc7]/5 to-[#a3a3e0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        layoutId="stat-hover"
      />

      <div className="relative flex items-center gap-4">
        {/* Icon Container */}
        <motion.div
          className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#635cc7] to-[#a3a3e0] flex items-center justify-center shadow-[4px_4px_12px_rgba(99,92,199,0.25)]"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {icon}
        </motion.div>

        {/* Stats Content */}
        <div className="flex-1 text-right">
          <div className="flex items-baseline justify-end gap-1">
            <motion.span
              className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#635cc7] to-[#7b75d3] bg-clip-text text-transparent"
              initial={{ scale: 0.5 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <AnimatedCounter value={value} duration={duration} />
            </motion.span>
            {suffix && (
              <span className="text-xl font-semibold text-[#a3a3e0]">
                {suffix}
              </span>
            )}
          </div>
          <p className="text-sm text-[#7a7a9f] font-medium mt-1">{label}</p>
        </div>
      </div>

      {/* Growth Indicator */}
      <motion.div
        className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-green-500/10 rounded-lg"
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.5 }}
      >
        <svg
          className="w-3 h-3 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
        <span className="text-xs font-bold text-green-600">+24%</span>
      </motion.div>
    </motion.div>
  );
};

const AnimatedStats = () => {
  const stats: StatProps[] = [
    {
      value: 1450,
      suffix: '+',
      label: 'مساحة بيع فعلية',
      duration: 2.5,
      icon: (
        <svg
          className="w-7 h-7 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      value: 247,
      suffix: '+',
      label: 'علامة تجارية نشطة',
      duration: 2,
      icon: (
        <svg
          className="w-7 h-7 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      value: 13,
      label: 'مدينة رئيسية',
      duration: 1.5,
      icon: (
        <svg
          className="w-7 h-7 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default AnimatedStats;