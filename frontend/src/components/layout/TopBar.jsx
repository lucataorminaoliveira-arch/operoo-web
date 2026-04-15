import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Menu } from 'lucide-react';

export default function TopBar({ onMobileMenuToggle }) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('operoo_lang', lang);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card/80 backdrop-blur-md px-6" data-testid="topbar">
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
        <h2 className="text-base font-semibold lg:text-lg" data-testid="page-title">
          {t('dashboard.welcome')}{user?.name ? `, ${user.name}` : ''}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2" data-testid="language-switcher">
              <Globe className="h-4 w-4" />
              <span className="uppercase text-xs font-semibold">{i18n.language}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toggleLanguage('en')} data-testid="lang-en">
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleLanguage('it')} data-testid="lang-it">
              Italiano
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Avatar */}
        {user && (
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold"
            data-testid="user-avatar"
          >
            {(user.name || user.email || '?')[0].toUpperCase()}
          </div>
        )}
      </div>
    </header>
  );
}
