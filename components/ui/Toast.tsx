"use client";
import { createContext, useContext, useState, useCallback } from "react";

type Toast = { id: number; message: string; type?: "success" | "error" | "info" };

const ToastContext = createContext<{ notify: (t: Omit<Toast, "id">) => void } | null>(null);

export function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);
  const remove = (id: number) => setItems((x) => x.filter((i) => i.id !== id));
  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2 space-y-2">
      {items.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto rounded-2xl px-4 py-2 text-sm shadow-soft ${
            t.type === "success" ? "bg-green-600 text-white" : t.type === "error" ? "bg-red-600 text-white" : "bg-black text-white"
          }`}
          onClick={() => remove(t.id)}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  const notify = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now();
    setItems((x) => [...x, { id, ...t }]);
    setTimeout(() => setItems((x) => x.filter((i) => i.id !== id)), 4000);
  }, []);
  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2 space-y-2">
        {items.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto rounded-2xl px-4 py-2 text-sm shadow-soft ${
              t.type === "success"
                ? "bg-green-600 text-white"
                : t.type === "error"
                ? "bg-red-600 text-white"
                : "bg-black text-white"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("ToastProvider missing");
  return ctx;
}