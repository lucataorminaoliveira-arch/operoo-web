import { useTranslation } from 'react-i18next';

export default function ShopPage() {
  const { t } = useTranslation();
  return (
    <div data-testid="shop-page">
      <h1 className="text-2xl font-bold mb-4">{t('nav.shop')}</h1>
      <p className="text-muted-foreground">Shop and orders coming soon.</p>
    </div>
  );
}
