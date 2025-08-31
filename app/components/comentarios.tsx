import { useState } from 'react';

export function Comentarios() {
  const [nombre, setNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [email, setEmail] = useState('');
  const [mensajeEnvio, setMensajeEnvio] = useState('');
  const [enviando, setEnviando] = useState(false); // NUEVO

  const submitComentario = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comentario.trim()) {
      setMensajeEnvio('Por favor escribe un comentario');
      return;
    }
    if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setMensajeEnvio('Por favor ingresa un email válido');
      return;
    }

    try {
      setEnviando(true); // NUEVO
      setMensajeEnvio('Enviando...');
      const response = await fetch('/api/enviar-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, comentario })
      });

      if (response.ok) {
        setNombre('');
        setEmail('');
        setComentario('');
        setMensajeEnvio('¡Gracias por tu comentario! Te responderé pronto.');
        setTimeout(() => setMensajeEnvio(''), 3000);
      } else {
        const errorData = await response.json();
        setMensajeEnvio(`Error: ${errorData.error || 'Intenta nuevamente'}`);
      }
    } catch (error) {
      setMensajeEnvio('Error de conexión. Por favor intenta más tarde.');
    } finally {
      setEnviando(false); // NUEVO
    }
  };

  return (
    <section className="py-12 px-2 animate-fade-in relative">
      {/* Barra de progreso */}
      {enviando && (
        <div className="absolute top-0 left-0 w-full h-1 z-20">
          <div className="h-full bg-blue-500 animate-progress-bar rounded-t"></div>
        </div>
      )}
      <h2 className="font-bold mb-6 text-gray-50 text-2xl text-center">Contactate conmigo</h2>
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg p-6">
        <form onSubmit={submitComentario} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-1" htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Tu email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1" htmlFor="comentario">Comentario</label>
            <textarea
              id="comentario"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Tu mensaje..."
              className="w-full p-3 rounded-lg bg-gray-700 h-32 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold text-lg transition"
            disabled={enviando}
          >
            {enviando ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
        {mensajeEnvio && (
          <div className={`mt-4 p-3 rounded-lg text-center ${
            mensajeEnvio.includes('Gracias') ? 'bg-green-500' : 
            mensajeEnvio.includes('Error') ? 'bg-red-500' : 'bg-blue-500'
          } text-white transition duration-300`}>
            {mensajeEnvio}
          </div>
        )}
      </div>
      <div className="text-center text-gray-400 mt-4 text-sm">
        <p>Te respondere a la brevedad, Gracias!  </p>
      </div>
    </section>
  );
}