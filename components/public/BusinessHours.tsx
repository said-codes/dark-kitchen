"use client";
import { useEffect, useState } from "react";
import type { BusinessHour } from "../../types";
import { supabase } from "../../lib/supabase/client";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export default function BusinessHours() {
  const [hours, setHours] = useState<BusinessHour[]>([]);
  useEffect(() => {
    supabase.from("business_hours").select("*").order("day_of_week", { ascending: true }).then(({ data }) => setHours(data || []));
  }, []);
  return (
    <section className="mx-auto max-w-6xl px-4">
      <h2 className="mb-4 text-2xl font-bold">Horarios</h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {hours.map((h) => (
          <div key={h.id} className="rounded-2xl bg-neutral-50 p-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">{days[h.day_of_week]}</span>
              {h.is_closed ? (
                <span className="text-sm text-neutral-600">Cerrado</span>
              ) : (
                <span className="text-sm text-neutral-600">{h.open_time} - {h.close_time}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}