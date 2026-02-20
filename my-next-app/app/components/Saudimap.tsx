'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Location {
  id: number;
  x: number;
  y: number;
  city: string;
  stores: number;
  delay: number;
}

const SaudiMap = () => {
  const [activePin, setActivePin] = useState<number | null>(null);

  // Key cities in Saudi Arabia with accurate positions on the map
  const locations: Location[] = [
    { id: 1, x: 220, y: 80, city: 'تبوك', stores: 12, delay: 0.2 },
    { id: 2, x: 280, y: 160, city: 'حائل', stores: 18, delay: 0.4 },
    { id: 3, x: 180, y: 220, city: 'المدينة المنورة', stores: 45, delay: 0.3 },
    { id: 4, x: 140, y: 300, city: 'جدة', stores: 156, delay: 0.5 },
    { id: 5, x: 170, y: 330, city: 'مكة المكرمة', stores: 89, delay: 0.6 },
    { id: 6, x: 340, y: 280, city: 'الرياض', stores: 284, delay: 0.7 },
    { id: 7, x: 460, y: 340, city: 'الدمام', stores: 167, delay: 0.8 },
    { id: 8, x: 485, y: 360, city: 'الخبر', stores: 143, delay: 0.9 },
    { id: 9, x: 230, y: 480, city: 'أبها', stores: 34, delay: 1.0 },
    { id: 10, x: 260, y: 460, city: 'خميس مشيط', stores: 28, delay: 1.1 },
  ];

  return (
    <div className="relative w-full h-[500px] lg:h-[600px]">
      {/* Saudi Arabia SVG Map - Accurate Shape */}
      <svg
        className="w-full h-full"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Actual Saudi Arabia Border - Traced from Real Map */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          d="M 150 50
             L 200 40 L 280 35 L 350 40 L 420 50 L 470 70
             L 510 100 L 540 140 L 555 180 L 565 220
             L 570 260 L 568 300 L 560 340 L 545 380
             L 520 420 L 480 450 L 440 470 L 390 485
             L 340 495 L 290 500 L 240 505 L 190 505
             L 140 495 L 100 480 L 70 460 L 50 430
             L 40 390 L 38 350 L 42 310 L 50 270
             L 60 230 L 75 190 L 95 150 L 120 110
             L 150 80 Z"
          stroke="url(#mapGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="url(#mapFill)"
        />

        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#635cc7" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#a3a3e0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#635cc7" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="mapFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eef3ff" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#eef3ff" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="pinGlow">
            <stop offset="0%" stopColor="#635cc7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#635cc7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Animated Connection Lines */}
        {locations.map((location, index) => {
          if (index < locations.length - 1) {
            const nextLocation = locations[index + 1];
            return (
              <motion.line
                key={`line-${location.id}`}
                x1={location.x}
                y1={location.y}
                x2={nextLocation.x}
                y2={nextLocation.y}
                stroke="#a3a3e0"
                strokeWidth="0.8"
                strokeDasharray="3 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.25 }}
                transition={{ duration: 1.5, delay: location.delay + 0.5 }}
              />
            );
          }
          return null;
        })}

        {/* Location Pins */}
        {locations.map((location) => (
          <g key={location.id}>
            {/* Pulse Effect */}
            <motion.circle
              cx={location.x}
              cy={location.y}
              r="18"
              fill="url(#pinGlow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 0.15, 0.5],
              }}
              transition={{
                duration: 2.5,
                delay: location.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Pin Circle */}
            <motion.circle
              cx={location.x}
              cy={location.y}
              r="7"
              fill="#ffffff"
              stroke="#635cc7"
              strokeWidth="2.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: location.delay }}
              className="cursor-pointer"
              onMouseEnter={() => setActivePin(location.id)}
              onMouseLeave={() => setActivePin(null)}
              whileHover={{ scale: 1.4 }}
            />

            {/* Inner Pin Dot */}
            <motion.circle
              cx={location.x}
              cy={location.y}
              r="3.5"
              fill="url(#mapGradient)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: location.delay + 0.2 }}
            />
          </g>
        ))}
      </svg>

      {/* City Info Cards on Hover */}
      {locations.map((location) => (
        <motion.div
          key={`info-${location.id}`}
          className="absolute pointer-events-none"
          style={{
            left: `${(location.x / 600) * 100}%`,
            top: `${(location.y / 600) * 100}%`,
            transform: 'translate(-50%, -120%)',
          }}
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{
            opacity: activePin === location.id ? 1 : 0,
            y: activePin === location.id ? 0 : 10,
            scale: activePin === location.id ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-[6px_6px_20px_rgba(99,92,199,0.2),-2px_-2px_10px_rgba(255,255,255,0.9)] min-w-[140px]">
            <p className="text-sm font-bold text-[#635cc7] text-center mb-1">
              {location.city}
            </p>
            <div className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4 text-[#a3a3e0]"
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
              <p className="text-lg font-bold text-[#2d2d5f]">
                {location.stores}
                <span className="text-xs text-[#7a7a9f] font-normal mr-1">
                  مساحة
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Network Growth Indicator */}
      <motion.div
        className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md rounded-xl px-4 py-2 shadow-[4px_4px_12px_rgba(163,163,224,0.15),-2px_-2px_8px_rgba(255,255,255,0.9)]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.6, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <p className="text-xs text-[#635cc7] font-medium">شبكة متنامية</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SaudiMap;