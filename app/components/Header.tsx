"use client"
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import Link from "next/link";
import { LogIn, UserPlus, LogOut, Download } from "lucide-react";

import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export function Header() {
  const { user, login, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cierra el menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    if (showMenu) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-[#0a051c]/80 backdrop-blur border-b border-white/10">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          Cesar Rea
        </Link>
        <div className="relative" ref={menuRef}>
          {!user ? (
            <>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                onClick={() => setShowMenu((v) => !v)}
              >
                <LogIn size={20} />
                <span>Acceder</span>
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-gray-800 rounded-lg shadow-lg py-2 z-50 animate-fade-in">
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-700 text-white transition"
                    onClick={() => { setShowLogin(true); setShowMenu(false); }}
                  >
                    <LogIn size={18} /> Iniciar sesión
                  </button>
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-700 text-white transition"
                    onClick={() => { setShowRegister(true); setShowMenu(false); }}
                  >
                    <UserPlus size={18} /> Registrarse
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                onClick={() => setShowMenu((v) => !v)}
              >
                <span className="font-semibold">{user.split("@")[0]}</span>
                <span className="text-2xl">👤</span>
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-gray-800 rounded-lg shadow-lg py-2 z-50 animate-fade-in">
                  <a
                    href="/cesar.rea.pdf"
                    download
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-700 text-white transition"
                  >
                    <Download size={18} /> Descargar CV
                  </a>
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-700 text-white transition"
                    onClick={() => { logout(); setShowMenu(false); }}
                  >
                    <LogOut size={18} /> Cerrar sesión
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* Modales */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={login}
        />
      )}
      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
        />
      )}
    </header>
  );
}