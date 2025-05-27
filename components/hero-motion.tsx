"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroMotion({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoother values
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Transform to small tilt angles
  const rotateX = useTransform(smoothY, [-50, 50], [5, -5]);
  const rotateY = useTransform(smoothX, [-50, 50], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;

    const offsetX = e.clientX - (bounds.left + bounds.width / 2);
    const offsetY = e.clientY - (bounds.top + bounds.height / 2);

    // Clamp values within -50 to 50 for smoother control
    mouseX.set(Math.max(-50, Math.min(50, offsetX)));
    mouseY.set(Math.max(-50, Math.min(50, offsetY)));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      initial={{ opacity: 0, scale: 1.05, rotate: 0 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}
