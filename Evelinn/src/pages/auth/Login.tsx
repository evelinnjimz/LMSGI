import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos useNavigate
import { supabase } from '../../lib/supabaseClient';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar el botón de carga
  const [errorMsg, setErrorMsg] = useState(''); // Estado para mostrar errores visuales

  const navigate = useNavigate(); // 2. Inicializamos el navegador

  // INICIAR SESIÓN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Por favor, rellena todos los campos.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else if (data?.user) {
        // 3. ¡ÉXITO! Redirigimos directo al panel de administración
        navigate('/admin');
      }
    } catch (err: any) {
      setErrorMsg('Ocurrió un error inesperado al intentar iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 px-4">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <h2 className="text-white text-2xl font-bold text-center mb-2">Iniciar Sesión</h2>
        
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          disabled={loading}
          className="p-3 rounded-xl bg-[#1a1b2d] text-white border border-white/10 disabled:opacity-50"
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          disabled={loading}
          className="p-3 rounded-xl bg-[#1a1b2d] text-white border border-white/10 disabled:opacity-50"
        />

        {/* Mensaje de error visual si las credenciales fallan */}
        {errorMsg && (
          <p className="text-red-400 text-sm bg-red-500/10 p-2 rounded-lg border border-red-500/20 text-center">
            ✗ {errorMsg}
          </p>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="p-3 bg-[#e879a0] text-white font-bold rounded-xl transition-all hover:bg-[#d6668d] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? 'Verificando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}