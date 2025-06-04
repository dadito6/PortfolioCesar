"use client"
import { useState, useEffect } from "react";
import Portal from "./Portal";

export default function LoginModal({ onClose, onLogin }: { onClose: () => void, onLogin: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");
    setEnviando(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje("¡Inicio de sesión exitoso!");
        onLogin(email);
        setTimeout(onClose, 1000);
      } else {
        setMensaje(data.error || "Error al iniciar sesión");
      }
    } catch (err) {
      setMensaje("Error de conexión");
    } finally {
      setEnviando(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <Portal>
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm space-y-6 relative max-h-[90vh] overflow-y-auto"
        >
          <button type="button" onClick={onClose} className="absolute top-2 right-4 text-white text-2xl">&times;</button>
          <h2 className="text-2xl font-bold text-white text-center">Iniciar sesión</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-gray-700 text-white"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 rounded bg-gray-700 text-white"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold"
            disabled={enviando}
          >
            {enviando ? "Enviando..." : "Ingresar"}
          </button>
          {mensaje && <div className="text-center text-white">{mensaje}</div>}
        </form>
      </div>
    </Portal>
  );
}