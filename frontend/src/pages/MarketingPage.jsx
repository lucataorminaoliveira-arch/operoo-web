import { useTranslation } from 'react-i18next';

export default function MarketingPage() {
  const { t } = useTranslation();
  return (
    <div data-testid="marketing-page">
      <h1 className="text-2xl font-bold mb-4">{t('nav.marketing')}</h1>
      <p className="text-muted-foreground">Marketing tools coming soon.</p>
    </div>
  );
}
