"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  return (
    <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-orange-100 via-white to-white"
        style={reduce ? undefined : { y }}
      />
      <div className="absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--color-primary)] blur-3xl opacity-20" />
      <div className="mx-auto max-w-3xl text-center">
        <motion.h1
          className="text-4xl font-extrabold tracking-tight sm:text-5xl"
          initial={reduce ? false : { opacity: 0, scale: 0.95 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Cocina Oculta en Curumaní
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-neutral-700"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Arroz chino, almuerzos, desayunos, yogurt casero y suero
        </motion.p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="https://wa.me/573136467910?text=Hola%20quiero%20hacer%20un%20pedido"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-[var(--color-secondary)] px-5 py-3 text-white shadow-soft"
          >
            Hacer Pedido
          </a>
          <a href="/#menu" className="rounded-2xl bg-neutral-900 px-5 py-3 text-white shadow-soft">Ver Menú</a>
        </div>
      </div>
      <a
        href="https://wa.me/573136467910?text=Hola%20quiero%20hacer%20un%20pedido"
        className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-secondary)] text-white shadow-lg"
      >
        ☎
      </a>
    </section>
  );
}