import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollBackground() {
  const { scrollYProgress } = useScroll();
  
  // Create interpolated color values based on scroll position
  const bgGradient = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [
      "radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.15) 0%, rgba(10, 10, 10, 1) 100%)",
      "radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.1) 0%, rgba(10, 10, 10, 1) 100%)",
      "radial-gradient(circle at 80% 20%, rgba(217, 70, 239, 0.1) 0%, rgba(10, 10, 10, 1) 100%)",
      "radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.05) 0%, rgba(0, 0, 0, 1) 100%)" // Darker for game section
    ]
  );

  // Parallax elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [360, 0]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base Gradient Layer */}
      <motion.div 
        className="absolute inset-0 w-full h-full transition-colors duration-700"
        style={{ background: bgGradient }}
      />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Geometric Floating Shapes */}
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-1/4 left-1/4 w-64 h-64 border border-primary/10 rounded-full blur-3xl"
      />
      <motion.div 
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-3/4 right-1/4 w-96 h-96 border border-secondary/10 rounded-full blur-3xl"
      />
      
      {/* Floating abstract geometry */}
      <motion.div
        style={{ y: y1, rotate: rotate2 }}
        className="absolute top-[15%] right-[10%] w-20 h-20 border border-white/5 rotate-45"
      />
      <motion.div
        style={{ y: y2, rotate: rotate1 }}
        className="absolute bottom-[20%] left-[5%] w-32 h-32 border border-white/5 rounded-full"
      />
    </div>
  );
}
