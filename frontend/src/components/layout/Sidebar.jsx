import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/Logo';
import {
  LayoutDashboard, Users, Calendar, UserCircle, Megaphone,
  ShoppingBag, LogOut, ChevronLeft, ChevronRight,
  ListChecks, CalendarDays, User, UsersRound, MessageSquare, QrCode, ScanLine,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const adminNav = [
  { key: 'dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { key: 'frontDesk', icon: MessageSquare, path: '/front-desk' },
  { key: 'qrCodes', icon: QrCode, path: '/qr-codes' },
  { key: 'staffClockIn', icon: ScanLine, path: '/staff-clockin-qr' },
  { key: 'team', icon: UsersRound, path: '/team' },
  { key: 'staff', icon: Users, path: '/staff' },
  { key: 'appointments', icon: Calendar, path: '/appointments' },
  { key: 'clients', icon: UserCircle, path: '/clients' },
  { key: 'marketing', icon: Megaphone, path: '/marketing' },
  { key: 'shop', icon: ShoppingBag, path: '/shop' },
];

const staffNav = [
  { key: 'dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { key: 'tasks', icon: ListChecks, path: '/tasks' },
  { key: 'calendar', icon: CalendarDays, path: '/calendar' },
  { key: 'profile', icon: User, path: '/profile' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role === 'admin';
  const navItems = isAdmin ? adminNav : staffNav;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside
      data-testid="sidebar"
      className={cn(
        'fixed left-0 top-0 z-40 h-screen flex flex-col border-r bg-[hsl(var(--sidebar))] transition-all duration-300',
        collapsed ? 'w-[68px]' : 'w-60'
      )}
    >
      {/* Brand */}
      <div className="flex h-14 items-center justify-between px-4 border-b">
        {!collapsed && (
          <Logo size="sm" />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="ml-auto shrink-0"
          data-testid="sidebar-toggle"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Role indicator */}
      {!collapsed && (
        <div className="px-4 py-2 border-b">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground" data-testid="role-badge">
            {isAdmin ? 'Admin' : 'Staff'}
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto">
        {navItems.map(({ key, icon: Icon, path }) => (
          <NavLink
            key={key}
            to={path}
            data-testid={`nav-${key}`}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{t(`nav.${key}`)}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User / Logout */}
      <div className="border-t p-3">
        {user && !collapsed && (
          <div className="mb-2 px-1 truncate text-sm text-muted-foreground" data-testid="sidebar-user-email">
            {user.email}
          </div>
        )}
        <Button
          variant="ghost"
          className={cn('w-full justify-start gap-3', collapsed && 'justify-center')}
          onClick={handleLogout}
          data-testid="logout-button"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>{t('auth.logout')}</span>}
        </Button>
      </div>
    </aside>
  );
}
