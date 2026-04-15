import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Menu } from 'lucide-react';

const pageTitles = {
  '/dashboard': 'dashboard',
  '/staff': null,
  '/appointments': null,
  '/clients': null,
  '/marketing': null,
  '/shop': null,
};

export default function TopBar({ onMobileMenuToggle }) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('operoo_lang', lang);
  };

  const pageKey = pageTitles[location.pathname];
  const title = pageKey === 'dashboard'
    ? `${t('dashboard.welcome')}${user?.name ? `, ${user.name}` : ''}`
    : null;

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-card/80 backdrop-blur-md px-4 lg:px-6" data-testid="topbar">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMobileMenuToggle}
          data-testid="mobile-menu-toggle"
        >
          <Menu className="h-5 w-5" />
        </Button>
        {title && (
          <h2 className="text-base font-semibold" data-testid="page-title">{title}</h2>
        )}
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1.5 h-8 px-2" data-testid="language-switcher">
              <Globe className="h-4 w-4" />
              <span className="uppercase text-xs font-semibold">{i18n.language}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toggleLanguage('en')} data-testid="lang-en">English</DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleLanguage('it')} data-testid="lang-it">Italiano</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {user && (
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold"
            data-testid="user-avatar"
          >
            {(user.name || user.email || '?')[0].toUpperCase()}
          </div>
        )}
      </div>
    </header>
  );
}
