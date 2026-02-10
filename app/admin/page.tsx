"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";
import Login from "../../components/admin/Login";
import Dashboard from "../../components/admin/Dashboard";

export default function AdminPage() {
  const [session, setSession] = useState<any | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);
  if (!session) return <Login />;
  return <Dashboard />;
}