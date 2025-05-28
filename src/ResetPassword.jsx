import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_APIKEY || ''
);

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');

    if (access_token && refresh_token) {
      setToken(access_token);
      setRefreshToken(refresh_token);
    }
  }, []);

  const handleReset = async () => {
    setStatus('');
    setSuccess(false);

    if (!token) return setStatus('Token no válido.');
    if (password.length < 6) return setStatus('La contraseña debe tener al menos 6 caracteres.');
    if (password !== confirm) return setStatus('Las contraseñas no coinciden.');

    try {
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: token,
        refresh_token: refreshToken
      });

      if (sessionError) throw sessionError;

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      setSuccess(true);
      setStatus('✅ Contraseña actualizada con éxito.');
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h2>Restablecer contraseña</h2>
        <input
          type="password"
          className="reset-password-input"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <input
          type="password"
          className="reset-password-input"
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
        />
        <button className="reset-password-btn" onClick={handleReset}>
          Cambiar contraseña
        </button>
        <div
          className={`reset-password-status${success ? ' success' : ''}`}
          role="alert"
        >
          {status}
        </div>
      </div>
    </div>
  );
}