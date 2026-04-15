import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, UserCircle, Info } from 'lucide-react';

export default function GuestPage() {
  const { t } = useTranslation();
  const { token } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(89,30%,96%)] to-[hsl(89,20%,92%)]" data-testid="guest-page">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-primary">Operoo</span>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold" data-testid="guest-welcome">{t('guest.welcome')}</h1>
          <p className="mt-2 text-muted-foreground">{t('guest.subtitle')}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" data-testid="guest-services">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <UserCircle className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base">{t('guest.services')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Browse available services and amenities</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" data-testid="guest-appointments">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-base">{t('guest.appointments')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">View and manage your appointments</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" data-testid="guest-info">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="rounded-lg bg-amber-50 p-2">
                <Info className="h-5 w-5 text-amber-600" />
              </div>
              <CardTitle className="text-base">{t('guest.info')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Property information and guidelines</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" data-testid="guest-profile">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="rounded-lg bg-emerald-50 p-2">
                <UserCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <CardTitle className="text-base">{t('guest.profile')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Your profile and preferences</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
