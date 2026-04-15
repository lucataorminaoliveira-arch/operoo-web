import { useTranslation } from 'react-i18next';

export default function StaffPage() {
  const { t } = useTranslation();
  return (
    <div data-testid="staff-page">
      <h1 className="text-2xl font-bold mb-4">{t('nav.staff')}</h1>
      <p className="text-muted-foreground">Staff management coming soon.</p>
    </div>
  );
}
