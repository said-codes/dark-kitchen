"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("../3d/Scene"), { ssr: false });

export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [bgImage, setBgImage] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("site_settings").select("value").eq("key", "hero_bg").single().then(({ data }) => {
      if (data?.value) setBgImage(data.value);
    });
  }, []);

  return (
    <section className="relative isolate flex min-h-[85vh] items-center justify-center overflow-hidden">
      {bgImage ? (
        <motion.div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})`, ...(reduce ? {} : { y, opacity }) }}
        >
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
        </motion.div>
      ) : (
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-orange-50 via-white to-white"
          style={reduce ? undefined : { y, opacity }}
        />
      )}
      
      {/* Abstract Background Elements */}
      <Scene />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-[var(--color-primary)] blur-[100px] opacity-20" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, 100, 0],
          opacity: [0.1, 0.15, 0.1] 
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-[var(--color-secondary)] blur-[120px] opacity-10" 
      />

      <div className="mx-auto max-w-4xl text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700">
            📍 Curumaní, Cesar
          </span>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl text-[var(--color-primary)] pb-2">
            Dark Kitchen Curumaní
          </h1>
        </motion.div>
        
        <motion.p
          className="mt-6 text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Disfruta del mejor <strong>arroz chino</strong>, almuerzos ejecutivos, desayunos y productos caseros sin salir de casa.
        </motion.p>
        
        <motion.div 
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.a
            href="https://wa.me/573136467910?text=Hola%20quiero%20hacer%20un%20pedido"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--color-primary)] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-orange-600 hover:scale-105 hover:shadow-orange-500/30"
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Hacer Pedido</span>
          </motion.a>
          <motion.a 
            href="/#menu" 
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-bold text-neutral-900 shadow-soft transition-all hover:bg-neutral-50 hover:scale-105"
            whileTap={{ scale: 0.95 }}
          >
            Ver Menú
          </motion.a>
        </motion.div>
      </div>

      <motion.a
        href="https://wa.me/573136467910?text=Hola%20quiero%20hacer%20un%20pedido"
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-green-500/40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ rotate: 10 }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.005.575 1.913.923 3.205.923 3.183 0 5.768-2.586 5.768-5.766.001-3.181-2.585-5.766-5.767-5.766zm6.126 3.714c.143 1 .466 1.493.57 1.565.055.038.034.018.15.118.062.053.116.142.13.25.021.166.004.382-.02.593-.162 1.423-1.444 2.455-2.227 2.684-.185.054-.447.112-.767.126-.525.023-1.096-.065-1.747-.324-1.282-.511-2.545-1.583-3.415-2.738-.031-.041-.021-.03-.12-.178-.716-1.066-.751-1.78-.696-2.278.026-.239.116-.48.24-.658.077-.11.231-.296.341-.355.071-.038.156-.046.216-.017.039.019.231.115.346.174.455.233.918.471 1.05.545.066.037.114.1.13.18.021.107-.015.222-.054.321-.06.155-.189.366-.271.503-.042.071-.05.106-.021.161.077.145.342.56.636.852.368.366.793.619.98.683.053.018.107.013.151-.027.085-.078.299-.344.402-.51.049-.079.114-.114.18-.095.074.02.482.227.697.337.214.11.354.181.405.27.051.089.051.265.051.265z" />
        </svg>
      </motion.a>
    </section>
  );
}
