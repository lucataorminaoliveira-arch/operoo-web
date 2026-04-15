import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Users, QrCode, MessageSquare, CalendarClock, Monitor,
  ArrowRight, CheckCircle2, UserPlus, Building2, ChevronRight,
  LayoutDashboard, ListChecks, Shield,
} from 'lucide-react';

const HERO_IMG = 'https://images.unsplash.com/photo-1774192621035-20d11389f781?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwbW9kZXJuJTIwcmVjZXB0aW9ufGVufDB8fHx8MTc3NjI4NDQ1M3ww&ixlib=rb-4.1.0&q=85';

/* ─── Mini UI Mockups ─── */
function DashboardMock() {
  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 border-b px-4 py-2.5 bg-[hsl(var(--sidebar))]">
        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
        <span className="text-xs font-semibold text-primary">Operoo</span>
        <span className="ml-auto text-[10px] text-muted-foreground">Admin Dashboard</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-4 gap-2">
          {[{ l: 'Staff', v: '24' }, { l: 'Guests', v: '12' }, { l: 'Bookings', v: '8' }, { l: 'Revenue', v: '$12K' }].map((s) => (
            <div key={s.l} className="rounded-lg border p-2 text-center">
              <p className="text-lg font-bold">{s.v}</p>
              <p className="text-[9px] text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border p-2.5 space-y-1.5">
            <p className="text-[10px] font-semibold">Quick Actions</p>
            {['Add Staff', 'New Booking', 'Reports'].map((a) => (
              <div key={a} className="flex items-center gap-1.5 rounded bg-muted/50 px-2 py-1">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-[9px]">{a}</span>
              </div>
            ))}
          </div>
          <div className="rounded-lg border p-2.5 space-y-1.5">
            <p className="text-[10px] font-semibold">Recent Activity</p>
            {['Maria clocked in', 'Room 204 check-in', 'Spa booking 3PM'].map((a) => (
              <div key={a} className="flex items-center gap-1.5">
                <div className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                <span className="text-[9px] text-muted-foreground">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StaffMock() {
  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 border-b px-4 py-2.5 bg-[hsl(var(--sidebar))]">
        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
        <span className="text-xs font-semibold text-primary">Operoo</span>
        <span className="ml-auto text-[10px] text-muted-foreground">Staff View</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between rounded-lg border p-2.5">
          <div>
            <p className="text-[10px] font-semibold">Today's Shift</p>
            <p className="text-xs font-bold">07:00 — 15:00</p>
          </div>
          <div className="rounded-full bg-primary px-3 py-1 text-[9px] font-semibold text-primary-foreground">Clock In</div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{ l: 'Pending', v: '4', c: 'bg-amber-50 text-amber-700' }, { l: 'In Progress', v: '2', c: 'bg-blue-50 text-blue-700' }, { l: 'Done', v: '2', c: 'bg-emerald-50 text-emerald-700' }].map((t) => (
            <div key={t.l} className={`rounded-lg p-2 text-center ${t.c}`}>
              <p className="text-lg font-bold">{t.v}</p>
              <p className="text-[9px]">{t.l}</p>
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          {['Prepare Room 302', 'Restock minibar Floor 3', 'Fix AC Room 118'].map((t, i) => (
            <div key={t} className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5">
              <div className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-amber-500'}`} />
              <span className="text-[9px] flex-1">{t}</span>
              <span className="text-[8px] text-muted-foreground">{i === 0 ? 'In Progress' : 'Pending'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatMock() {
  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 border-b px-4 py-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">R</div>
        <div>
          <p className="text-xs font-semibold">Reception</p>
          <p className="text-[9px] text-emerald-600">Online</p>
        </div>
        <span className="ml-auto text-[9px] text-muted-foreground">Room 204</span>
      </div>
      <div className="p-3 space-y-2 bg-[hsl(var(--sidebar))] min-h-[180px]">
        <div className="max-w-[75%] rounded-2xl rounded-bl-md border bg-card px-3 py-2">
          <p className="text-[10px]">Welcome! How can we help you?</p>
          <p className="text-[8px] text-muted-foreground mt-0.5">10:00</p>
        </div>
        <div className="max-w-[75%] ml-auto rounded-2xl rounded-br-md bg-primary px-3 py-2">
          <p className="text-[10px] text-primary-foreground">Can I get extra towels?</p>
          <p className="text-[8px] text-primary-foreground/60 mt-0.5">10:02</p>
        </div>
        <div className="max-w-[75%] rounded-2xl rounded-bl-md border bg-card px-3 py-2">
          <p className="text-[10px]">Of course! We'll send them right away.</p>
          <p className="text-[8px] text-muted-foreground mt-0.5">10:03</p>
        </div>
      </div>
      <div className="border-t px-3 py-2 flex gap-2">
        <div className="flex-1 rounded-full border bg-background px-3 py-1.5 text-[9px] text-muted-foreground">Type a message...</div>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen bg-background" data-testid="homepage">
      {/* ─── Nav ─── */}
      <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg" data-testid="homepage-nav">
        <div className="mx-auto max-w-6xl flex h-14 items-center justify-between px-5">
          <span className="text-xl font-bold tracking-tight text-primary" data-testid="home-brand">Operoo</span>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')} data-testid="nav-signin">
              Sign In
            </Button>
            <Button size="sm" onClick={() => navigate('/register')} data-testid="nav-get-started">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* ─── 1. Hero ─── */}
      <section className="relative overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(89,30%,96%)] via-background to-[hsl(89,20%,92%)]" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 mb-6 shadow-sm">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium">For hotels, restaurants & hospitality</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]" data-testid="hero-headline">
                Run your<br />
                <span className="text-primary">hospitality operations</span><br />
                in one place
              </h1>
              <p className="mt-5 text-base lg:text-lg text-muted-foreground max-w-lg leading-relaxed">
                Staff scheduling, guest communication, and daily operations — streamlined into a single platform your entire team will love.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Button size="lg" className="h-12 px-7 text-base gap-2" onClick={() => navigate('/register')} data-testid="hero-cta-start">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-7 text-base" onClick={() => navigate('/login')} data-testid="hero-cta-signin">
                  Sign In
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Free to start</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> No credit card</span>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src={HERO_IMG} alt="Modern hospitality" className="w-full h-80 object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl border bg-card p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10"><Users className="h-4 w-4 text-primary" /></div>
                  <div><p className="text-xs font-semibold">24 Staff Online</p><p className="text-[10px] text-muted-foreground">All shifts covered</p></div>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 rounded-xl border bg-card p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50"><MessageSquare className="h-4 w-4 text-emerald-600" /></div>
                  <div><p className="text-xs font-semibold">Live Chat</p><p className="text-[10px] text-muted-foreground">Guest connected</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Product Preview ─── */}
      <section className="py-20 lg:py-24" data-testid="preview-section">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Product</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Three interfaces, one platform</h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">Admin overview, staff tools, and guest communication — each designed for its user.</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            <div data-testid="preview-admin">
              <p className="text-sm font-semibold mb-3 flex items-center gap-2"><LayoutDashboard className="h-4 w-4 text-primary" /> Admin Dashboard</p>
              <DashboardMock />
            </div>
            <div data-testid="preview-staff">
              <p className="text-sm font-semibold mb-3 flex items-center gap-2"><ListChecks className="h-4 w-4 text-primary" /> Staff Interface</p>
              <StaffMock />
            </div>
            <div data-testid="preview-chat">
              <p className="text-sm font-semibold mb-3 flex items-center gap-2"><MessageSquare className="h-4 w-4 text-primary" /> Guest Chat — Front Desk</p>
              <ChatMock />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. How It Works ─── */}
      <section className="py-20 lg:py-24 bg-[hsl(var(--sidebar))]" data-testid="how-it-works-section">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">How It Works</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Up and running in minutes</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { step: '01', icon: Shield, title: 'Create your account', desc: 'Register as the admin of your property. You get full control from day one.' },
              { step: '02', icon: UserPlus, title: 'Invite your team', desc: 'Add managers and staff. Each role sees only what they need — nothing more.' },
              { step: '03', icon: Building2, title: 'Manage everything', desc: 'Handle guests, rooms, tables, shifts, and tasks — all from one dashboard.' },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="relative rounded-2xl border bg-card p-6" data-testid={`step-${step}`}>
                <span className="text-4xl font-bold text-primary/10 absolute top-4 right-5">{step}</span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Features ─── */}
      <section className="py-20 lg:py-24" data-testid="features-section">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Features</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Everything your team needs</h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">Built specifically for hospitality — from the front desk to the kitchen.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Users, title: 'Staff Management', desc: 'Manage roles, departments, shifts, and attendance for your entire team.' },
              { icon: QrCode, title: 'Guest QR Access', desc: 'Guests scan a QR code and instantly connect — no app download needed.' },
              { icon: MessageSquare, title: 'Live Front Desk Chat', desc: 'Real-time communication between guests and reception. Simple as texting.' },
              { icon: CalendarClock, title: 'Schedules & Tasks', desc: 'Assign tasks, manage shifts, and track progress from any device.' },
              { icon: Monitor, title: 'Multi-Device Access', desc: 'Works on desktop, tablet, and mobile. Your team can access it anywhere.' },
              { icon: Shield, title: 'Role-Based Access', desc: 'Admins, managers, and staff each see exactly what they need — nothing more.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group rounded-xl border p-6 hover:shadow-md transition-shadow" data-testid={`feature-${title.toLowerCase().replace(/\s/g, '-')}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. Responsive ─── */}
      <section className="py-20 lg:py-24 bg-[hsl(var(--sidebar))]" data-testid="responsive-section">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Works Everywhere</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Designed for every screen</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Whether your manager uses a desktop at the front desk, your staff checks tasks on a tablet, or a guest chats from their phone — Operoo adapts seamlessly.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { label: 'Desktop', desc: 'Full admin dashboard with sidebar navigation' },
                  { label: 'Tablet', desc: 'Optimized layouts for on-the-go management' },
                  { label: 'Mobile', desc: 'Touch-friendly interface for staff and guests' },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-end justify-center gap-4">
              {/* Desktop frame */}
              <div className="hidden sm:block w-56 rounded-lg border-2 border-foreground/10 bg-card p-1.5 shadow-lg">
                <div className="flex gap-1 mb-1.5"><div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/20" /><div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/20" /><div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/20" /></div>
                <div className="rounded bg-[hsl(var(--sidebar))] p-2 h-36 flex gap-1.5">
                  <div className="w-10 space-y-1.5 shrink-0">
                    <div className="h-1.5 w-6 rounded bg-primary/30" />
                    <div className="h-1 w-8 rounded bg-muted-foreground/10" />
                    <div className="h-1 w-7 rounded bg-muted-foreground/10" />
                    <div className="h-1 w-8 rounded bg-muted-foreground/10" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2 w-16 rounded bg-foreground/10" />
                    <div className="grid grid-cols-4 gap-1">
                      {[1,2,3,4].map((i) => <div key={i} className="h-6 rounded bg-card border" />)}
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="h-12 rounded bg-card border" />
                      <div className="h-12 rounded bg-card border" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Tablet frame */}
              <div className="w-36 rounded-lg border-2 border-foreground/10 bg-card p-1.5 shadow-lg">
                <div className="rounded bg-[hsl(var(--sidebar))] p-2 h-48 space-y-2">
                  <div className="h-2 w-12 rounded bg-primary/30" />
                  <div className="grid grid-cols-2 gap-1">{[1,2,3,4].map((i) => <div key={i} className="h-5 rounded bg-card border" />)}</div>
                  <div className="h-8 rounded bg-card border" />
                  <div className="h-8 rounded bg-card border" />
                </div>
              </div>
              {/* Phone frame */}
              <div className="w-20 rounded-xl border-2 border-foreground/10 bg-card p-1 shadow-lg">
                <div className="rounded-lg bg-[hsl(var(--sidebar))] p-1.5 h-40 space-y-1.5">
                  <div className="h-1.5 w-8 mx-auto rounded bg-primary/30" />
                  <div className="space-y-1">
                    {[1,2,3].map((i) => (
                      <div key={i} className="flex gap-1">
                        <div className="h-4 w-4 rounded-full bg-card border shrink-0" />
                        <div className="flex-1 h-4 rounded bg-card border" />
                      </div>
                    ))}
                  </div>
                  <div className="h-6 rounded bg-card border" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Final CTA ─── */}
      <section className="py-20 lg:py-28" data-testid="final-cta-section">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Ready to streamline your operations?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto leading-relaxed">
            Create your admin account and start managing your property in minutes. No setup fees, no complexity.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Button size="lg" className="h-12 px-8 text-base gap-2" onClick={() => navigate('/register')} data-testid="final-cta-register">
              Create Admin Account <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            You will be the administrator of your property. Invite your team after registration.
          </p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t py-8" data-testid="homepage-footer">
        <div className="mx-auto max-w-6xl px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-bold text-primary">Operoo</span>
          <p className="text-xs text-muted-foreground">&copy; 2026 Operoo. Built for hospitality.</p>
        </div>
      </footer>
    </div>
  );
}
