import { useTranslation } from 'react-i18next';

export default function AppointmentsPage() {
  const { t } = useTranslation();
  return (
    <div data-testid="appointments-page">
      <h1 className="text-2xl font-bold mb-4">{t('nav.appointments')}</h1>
      <p className="text-muted-foreground">Appointments management coming soon.</p>
    </div>
  );
}
