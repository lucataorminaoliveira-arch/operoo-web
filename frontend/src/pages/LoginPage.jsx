import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Shield, UserCog, User, ArrowRight } from 'lucide-react';

const roles = [
  { key: 'admin', label: 'Admin', desc: 'Full access', icon: Shield, color: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/15' },
  { key: 'manager', label: 'Manager', desc: 'Operations', icon: UserCog, color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
  { key: 'staff', label: 'Staff', desc: 'Tasks & shifts', icon: User, color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
];

export default function LoginPage() {
  const { t } = useTranslation();
  const { login, loginWithGoogle, mockLogin, formatApiError } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(formatApiError(err.response?.data?.detail) || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMockLogin = (role) => {
    mockLogin(role);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-[hsl(89,30%,96%)] to-[hsl(89,20%,92%)]">
      <div className="w-full max-w-md space-y-5">
        {/* Brand */}
        <div className="text-center">
          <Logo size="lg" />
          <p className="mt-2 text-sm text-muted-foreground">{t('auth.loginSubtitle')}</p>
        </div>

        {/* ─── Role Selector ─── */}
        <Card className="shadow-lg border-primary/20 bg-gradient-to-b from-primary/[0.03] to-transparent" data-testid="role-selector">
          <CardContent className="p-5">
            <p className="text-sm font-semibold text-center mb-1">Select a role to preview</p>
            <p className="text-[11px] text-center text-muted-foreground mb-4">Testing only — no login required</p>
            <div className="grid grid-cols-3 gap-3">
              {roles.map(({ key, label, desc, icon: Icon, color }) => (
                <button
                  key={key}
                  onClick={() => handleMockLogin(key)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-3.5 transition-all ${color}`}
                  data-testid={`mock-${key}`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="text-[10px] opacity-70">{desc}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Divider */}
        <div className="relative">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[hsl(89,25%,94%)] px-3 text-xs text-muted-foreground">
            or sign in with credentials
          </span>
        </div>

        {/* ─── Login Card ─── */}
        <Card className="shadow-lg border-0" data-testid="login-card">
          <CardContent className="p-5">
            {/* Google Login */}
            <Button
              variant="outline"
              className="w-full gap-2 h-11"
              onClick={loginWithGoogle}
              data-testid="google-login-button"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {t('auth.signInGoogle')}
            </Button>

            <div className="relative my-5">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                {t('auth.orContinueWith')}
              </span>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="login-form">
              {error && (
                <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive" data-testid="login-error">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  data-testid="login-email-input"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t('auth.password')}</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline" data-testid="forgot-password-link">
                    {t('auth.forgotPassword')}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-testid="login-password-input"
                />
              </div>
              <Button type="submit" className="w-full h-11" disabled={loading} data-testid="login-submit-button">
                {loading ? t('common.loading') : t('auth.login')}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center pb-5">
            <p className="text-sm text-muted-foreground">
              {t('auth.noAccount')}{' '}
              <Link to="/register" className="font-medium text-primary hover:underline" data-testid="register-link">
                {t('auth.register')}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
