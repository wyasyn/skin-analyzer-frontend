"use client";
import { motion } from "framer-motion";
export default function HeroMotion({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.25, rotate: 16 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 5 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
