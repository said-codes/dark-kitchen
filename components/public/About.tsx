"use client";

import { motion } from "framer-motion";

const steps = [
  { title: "Inicio", text: "Recetas caseras y pasión por la comida." },
  { title: "Calidad", text: "Ingredientes frescos y locales." },
  { title: "Entrega", text: "Pedidos por WhatsApp con atención rápida." }
];

export default function About() {
  return (
    <section id="sobre" className="mx-auto max-w-6xl px-4">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">Sobre Nosotros</h2>
          <p className="mt-2 text-neutral-700">Dark Kitchen en Curumaní con enfoque en comida deliciosa y honesta.</p>
        </div>
        <div className="space-y-4">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-2xl bg-neutral-50 p-4">
              <div className="font-semibold">{s.title}</div>
              <div className="text-sm text-neutral-600">{s.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}