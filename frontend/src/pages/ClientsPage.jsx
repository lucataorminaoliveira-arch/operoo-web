import { useTranslation } from 'react-i18next';

export default function ClientsPage() {
  const { t } = useTranslation();
  return (
    <div data-testid="clients-page">
      <h1 className="text-2xl font-bold mb-4">{t('nav.clients')}</h1>
      <p className="text-muted-foreground">Clients management coming soon.</p>
    </div>
  );
}
