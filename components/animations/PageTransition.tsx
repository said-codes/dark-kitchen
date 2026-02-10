"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const variants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    enter: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.98 }
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={reduce ? false : "initial"}
        animate={reduce ? undefined : "enter"}
        exit={reduce ? undefined : "exit"}
        transition={{ duration: 0.35, ease: "easeOut" }}
        variants={variants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}