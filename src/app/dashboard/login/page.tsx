"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("floreria_auth") === "1") {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Contraseña incorrecta");
        return;
      }
      sessionStorage.setItem("floreria_auth", "1");
      router.replace("/dashboard");
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ── Panel izquierdo: imagen ───────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1738951171612-b1d02b4bbaed?q=80&w=1080&fit=crop"
          alt="Floría"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay oscuro */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(26,22,20,0.65) 0%, rgba(124,45,60,0.45) 100%)",
          }}
        />

        {/* Contenido sobre la imagen */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <span
            className="font-display font-light text-white"
            style={{ fontSize: "1.75rem", letterSpacing: "-0.03em" }}
          >
            Floría
          </span>

          {/* Quote */}
          <div>
            <div className="w-10 h-px mb-6" style={{ background: "rgba(255,255,255,0.4)" }} />
            <p
              className="font-display font-light text-white leading-snug mb-3"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", letterSpacing: "-0.02em" }}
            >
              Cada flor cuenta<br />
              <em style={{ fontStyle: "italic" }}>una historia.</em>
            </p>
            <p
              className="text-xs uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif", letterSpacing: "0.18em" }}
            >
              Panel de administración
            </p>
          </div>
        </div>
      </div>

      {/* ── Panel derecho: formulario ─────────────────────────── */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-8 py-12"
        style={{ background: "#FAF9F7" }}
      >
        <div className="w-full max-w-sm">

          {/* Logo mobile (solo visible en pantallas pequeñas) */}
          <div className="lg:hidden text-center mb-10">
            <span
              className="font-display font-medium text-stone-900"
              style={{ fontSize: "1.875rem", letterSpacing: "-0.03em" }}
            >
              Flo<span style={{ color: "#7C2D3C" }}>ría</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1
              className="font-display font-light text-stone-900 mb-1"
              style={{ fontSize: "1.875rem", letterSpacing: "-0.02em" }}
            >
              Bienvenido
            </h1>
            <p
              className="text-sm"
              style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif" }}
            >
              Ingresa tu contraseña para continuar
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div
                className="px-4 py-3 text-sm"
                style={{
                  background: "#FFF5F5",
                  border: "1px solid #FECACA",
                  color: "#991B1B",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {error}
              </div>
            )}

            <div>
              <label
                className="block text-xs font-medium uppercase tracking-wider mb-2"
                style={{ color: "#57534E", fontFamily: "'Inter', sans-serif", letterSpacing: "0.08em" }}
              >
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                placeholder="••••••••"
                className="w-full border border-stone-200 px-4 py-3 text-sm bg-white focus:outline-none"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "#1C1917",
                  transition: "border-color 150ms var(--ease-out)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#7C2D3C")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#E7E5E4")}
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="btn-press w-full py-3.5 text-sm font-medium flex items-center justify-center gap-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: loading || !password ? "#E7E5E4" : "#7C2D3C",
                color: loading || !password ? "#A8A29E" : "white",
                cursor: loading || !password ? "not-allowed" : "pointer",
                transition: "background 200ms var(--ease-out), color 200ms var(--ease-out)",
              }}
            >
              {loading ? <><Spinner /> Verificando...</> : "Ingresar"}
            </button>
          </form>

          <p
            className="text-xs mt-8"
            style={{ color: "#D6D3D1", fontFamily: "'Inter', sans-serif" }}
          >
            Acceso privado · Solo uso interno
          </p>
        </div>
      </div>

    </div>
  );
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
