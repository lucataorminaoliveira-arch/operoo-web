import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Check } from 'lucide-react';

export default function ProfilePage() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+39 333 1234567',
    department: 'Reception',
    role: user?.role || 'staff',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('operoo_lang', lang);
  };

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const updatePw = (key, value) => setPasswordForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6 max-w-2xl" data-testid="profile-page">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight" data-testid="profile-title">{t('profile.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('profile.subtitle')}</p>
      </div>

      {/* Personal Info */}
      <Card data-testid="personal-info-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">{t('profile.personalInfo')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-semibold" data-testid="profile-avatar">
              {(form.name || '?')[0].toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{form.name}</p>
              <p className="text-sm text-muted-foreground capitalize">{form.role}</p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t('profile.name')}</Label>
              <Input value={form.name} onChange={(e) => update('name', e.target.value)} data-testid="profile-name" />
            </div>
            <div className="space-y-2">
              <Label>{t('profile.email')}</Label>
              <Input value={form.email} disabled className="opacity-60" data-testid="profile-email" />
            </div>
            <div className="space-y-2">
              <Label>{t('profile.phone')}</Label>
              <Input value={form.phone} onChange={(e) => update('phone', e.target.value)} data-testid="profile-phone" />
            </div>
            <div className="space-y-2">
              <Label>{t('profile.department')}</Label>
              <Input value={form.department} disabled className="opacity-60" data-testid="profile-department" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card data-testid="preferences-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">{t('profile.preferences')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t('profile.language')}</Label>
            <Select value={i18n.language} onValueChange={handleLanguage}>
              <SelectTrigger className="w-full sm:w-60" data-testid="profile-language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card data-testid="password-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">{t('profile.changePassword')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-1 max-w-sm">
            <div className="space-y-2">
              <Label>{t('profile.currentPassword')}</Label>
              <Input type="password" value={passwordForm.currentPassword} onChange={(e) => updatePw('currentPassword', e.target.value)} data-testid="current-password" />
            </div>
            <div className="space-y-2">
              <Label>{t('profile.newPassword')}</Label>
              <Input type="password" value={passwordForm.newPassword} onChange={(e) => updatePw('newPassword', e.target.value)} data-testid="new-password" />
            </div>
            <div className="space-y-2">
              <Label>{t('profile.confirmPassword')}</Label>
              <Input type="password" value={passwordForm.confirmPassword} onChange={(e) => updatePw('confirmPassword', e.target.value)} data-testid="confirm-password" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex items-center gap-3">
        <Button onClick={handleSave} className="gap-2" data-testid="save-profile">
          {t('profile.saveChanges')}
        </Button>
        {saved && (
          <span className="flex items-center gap-1 text-sm text-primary" data-testid="save-confirmation">
            <Check className="h-4 w-4" /> {t('profile.saved')}
          </span>
        )}
      </div>
    </div>
  );
}
