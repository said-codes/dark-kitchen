"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase/client";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useToast } from "../ui/Toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { notify } = useToast();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) notify({ message: "Error de login", type: "error" });
    else notify({ message: "Bienvenido", type: "success" });
    setLoading(false);
  };
  return (
    <div className="mx-auto max-w-sm py-16">
      <h1 className="mb-4 text-2xl font-bold">Acceso Admin</h1>
      <form className="space-y-4" onSubmit={onSubmit}>
        <Input id="email" type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input id="password" type="password" label="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</Button>
      </form>
    </div>
  );
}