import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { cn } from '@/lib/utils';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen" data-testid="app-layout">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile unless open */}
      <div className={cn('hidden lg:block', mobileOpen && '!block')}>
        <Sidebar
          collapsed={collapsed}
          onToggle={() => {
            setCollapsed((c) => !c);
            setMobileOpen(false);
          }}
        />
      </div>

      {/* Main content */}
      <div
        className={cn(
          'transition-all duration-300',
          collapsed ? 'lg:ml-[68px]' : 'lg:ml-60'
        )}
      >
        <TopBar onMobileMenuToggle={() => setMobileOpen((o) => !o)} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
