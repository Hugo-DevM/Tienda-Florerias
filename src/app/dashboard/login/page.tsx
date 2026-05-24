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
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "#FAF9F7" }}
    >
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <span
            className="font-display font-medium text-stone-900 block mb-2"
            style={{ fontSize: "2rem", letterSpacing: "-0.03em" }}
          >
            Flo<span style={{ color: "#7C2D3C" }}>ría</span>
          </span>
          <div className="w-8 h-px mx-auto mb-3" style={{ background: "#D6D3D1" }} />
          <p
            className="text-xs uppercase tracking-widest"
            style={{ color: "#A8A29E", fontFamily: "'Inter', sans-serif", letterSpacing: "0.15em" }}
          >
            Panel de administración
          </p>
        </div>

        {/* Form card */}
        <div
          className="bg-white p-8"
          style={{ boxShadow: "0 2px 20px -4px rgba(0,0,0,0.08)" }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div
                className="px-4 py-3 text-sm flex items-center gap-2"
                style={{
                  background: "#FFF5F5",
                  border: "1px solid #FECACA",
                  color: "#991B1B",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <span style={{ fontSize: "0.75rem" }}>—</span>
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
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="btn-press w-full py-3 text-sm font-medium flex items-center justify-center gap-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: loading || !password ? "#E7E5E4" : "#7C2D3C",
                color: loading || !password ? "#A8A29E" : "white",
                cursor: loading || !password ? "not-allowed" : "pointer",
                transition: "background 200ms var(--ease-out), color 200ms var(--ease-out)",
              }}
            >
              {loading ? (
                <>
                  <Spinner />
                  Verificando...
                </>
              ) : (
                "Ingresar"
              )}
            </button>
          </form>
        </div>

        <p
          className="text-center text-xs mt-6"
          style={{ color: "#D6D3D1", fontFamily: "'Inter', sans-serif" }}
        >
          Acceso privado · Solo uso interno
        </p>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="w-4 h-4 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
