import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthCallback() {
  const hasProcessed = useRef(false);
  const navigate = useNavigate();
  const { processGoogleCallback } = useAuth();

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const hash = window.location.hash;
    const sessionId = new URLSearchParams(hash.substring(1)).get('session_id');

    if (!sessionId) {
      navigate('/login', { replace: true });
      return;
    }

    processGoogleCallback(sessionId)
      .then((user) => {
        navigate('/dashboard', { replace: true, state: { user } });
      })
      .catch(() => {
        navigate('/login', { replace: true });
      });
  }, [navigate, processGoogleCallback]);

  return (
    <div className="min-h-screen flex items-center justify-center" data-testid="auth-callback">
      <div className="animate-pulse text-muted-foreground">Signing you in...</div>
    </div>
  );
}
