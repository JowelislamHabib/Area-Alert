"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className, delay = 0 }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideUp({ children, className, delay = 0 }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className, delay = 0 }: MotionWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ staggerChildren: 0.1, delayChildren: delay }}
      variants={{
        hidden: {},
        visible: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Float({ children, className, delay = 0 }: MotionWrapperProps) {
  return (
    <motion.div
      animate={{ y: [-8, 8, -8] }}
      transition={{ 
        repeat: Infinity, 
        duration: 4, 
        ease: "easeInOut",
        delay: delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
