import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Clock, MapPin, ArrowRight, X,
  Circle, CheckCircle2, Loader2, ScanLine, QrCode,
} from 'lucide-react';
import { mockTasks, mockShift, mockCalendarEvents } from '@/data/mockData';

/* ─── QR Scanner Overlay ─── */
function QRScannerOverlay({ onSuccess, onClose }) {
  const { t } = useTranslation();
  const [phase, setPhase] = useState('scanning'); // scanning | success

  useEffect(() => {
    if (phase !== 'scanning') return;
    const timer = setTimeout(() => setPhase('success'), 2500);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'success') return;
    const timer = setTimeout(() => onSuccess(), 1800);
    return () => clearTimeout(timer);
  }, [phase, onSuccess]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col" data-testid="qr-scanner-overlay">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <span className="text-white/80 text-sm font-medium">{t('clockIn.scanTitle')}</span>
        <button onClick={onClose} className="text-white/60 hover:text-white" data-testid="scanner-close">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Scanner area */}
      <div className="flex-1 flex items-center justify-center px-8">
        {phase === 'scanning' ? (
          <div className="relative w-64 h-64" data-testid="scanner-frame">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-[3px] border-l-[3px] border-primary rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-10 h-10 border-t-[3px] border-r-[3px] border-primary rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-[3px] border-l-[3px] border-primary rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-[3px] border-r-[3px] border-primary rounded-br-lg" />
            {/* Scanning line */}
            <div className="absolute left-3 right-3 h-0.5 bg-primary/80 animate-scan-line rounded-full" />
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <QrCode className="h-12 w-12 text-white/10" />
            </div>
          </div>
        ) : (
          <div className="text-center" data-testid="scanner-success">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
              <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{t('clockIn.success')}</h2>
            <p className="text-sm text-white/60">{t('clockIn.successDesc')}</p>
          </div>
        )}
      </div>

      {/* Bottom text */}
      {phase === 'scanning' && (
        <div className="px-8 pb-10 text-center">
          <p className="text-white/50 text-xs">{t('clockIn.scanInstruction')}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Clock-Out Confirmation ─── */
function ClockOutOverlay({ onConfirm, onClose }) {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-5" data-testid="clockout-overlay">
      <div className="bg-card rounded-2xl p-6 w-full max-w-xs text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50">
          <Clock className="h-7 w-7 text-amber-600" />
        </div>
        <h3 className="font-bold text-lg mb-1">{t('clockIn.clockOutTitle')}</h3>
        <p className="text-sm text-muted-foreground mb-5">{t('clockIn.clockOutDesc')}</p>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose} data-testid="clockout-cancel">{t('common.cancel')}</Button>
          <Button className="flex-1" onClick={onConfirm} data-testid="clockout-confirm">{t('clockIn.clockOutConfirm')}</Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Dashboard ─── */
export default function StaffDashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [showClockOut, setShowClockOut] = useState(false);

  const handleClockInTap = () => {
    if (isClockedIn) {
      setShowClockOut(true);
    } else {
      setShowScanner(true);
    }
  };

  const handleScanSuccess = () => {
    setIsClockedIn(true);
    setClockInTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setShowScanner(false);
  };

  const handleClockOut = () => {
    setIsClockedIn(false);
    setClockInTime(null);
    setShowClockOut(false);
  };

  const pendingCount = mockTasks.filter((t) => t.status === 'pending').length;
  const inProgressCount = mockTasks.filter((t) => t.status === 'in-progress').length;
  const completedCount = mockTasks.filter((t) => t.status === 'completed').length;

  const todayTasks = mockTasks.filter((t) => t.status !== 'completed').slice(0, 3);
  const upcomingEvents = mockCalendarEvents.filter((e) => e.type === 'appointment').slice(0, 3);

  return (
    <>
      {showScanner && <QRScannerOverlay onSuccess={handleScanSuccess} onClose={() => setShowScanner(false)} />}
      {showClockOut && <ClockOutOverlay onConfirm={handleClockOut} onClose={() => setShowClockOut(false)} />}

      <div className="space-y-6" data-testid="staff-dashboard">
        {/* Shift + Clock-in Row */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Today's Shift */}
          <Card data-testid="today-shift-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">{t('staffDash.todayShift')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{mockShift.today.startTime} — {mockShift.today.endTime}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{mockShift.today.location}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clock In/Out */}
          <Card data-testid="clock-card">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className={`h-2.5 w-2.5 rounded-full ${isClockedIn ? 'bg-primary animate-pulse' : 'bg-muted-foreground/30'}`} />
                  <span className="text-sm font-semibold" data-testid="clock-status">
                    {isClockedIn ? t('staffDash.onShift') : t('staffDash.offShift')}
                  </span>
                </div>
                {isClockedIn && clockInTime && (
                  <p className="text-xs text-muted-foreground" data-testid="clock-in-time">
                    {t('staffDash.clockedInAt')} {clockInTime}
                  </p>
                )}
              </div>
              <Button
                onClick={handleClockInTap}
                variant={isClockedIn ? 'outline' : 'default'}
                className="gap-2 min-w-[140px]"
                data-testid="clock-toggle-button"
              >
                {isClockedIn ? <Clock className="h-4 w-4" /> : <ScanLine className="h-4 w-4" />}
                {isClockedIn ? t('staffDash.clockOut') : t('staffDash.clockIn')}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Tasks Summary Cards */}
        <div className="grid gap-4 grid-cols-3">
          <Card data-testid="tasks-pending-count">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg bg-amber-50 p-2"><Circle className="h-4 w-4 text-amber-600" /></div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-xs text-muted-foreground">{t('staffDash.pending')}</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="tasks-inprogress-count">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2"><Loader2 className="h-4 w-4 text-blue-600" /></div>
              <div>
                <p className="text-2xl font-bold">{inProgressCount}</p>
                <p className="text-xs text-muted-foreground">{t('staffDash.inProgress')}</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="tasks-completed-count">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg bg-emerald-50 p-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /></div>
              <div>
                <p className="text-2xl font-bold">{completedCount}</p>
                <p className="text-xs text-muted-foreground">{t('staffDash.completed')}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Tasks + Upcoming Events */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card data-testid="todays-tasks">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">{t('staffDash.todaysTasks')}</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1" onClick={() => navigate('/tasks')} data-testid="view-all-tasks">
                {t('dashboard.viewAll')} <ArrowRight className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 rounded-lg border p-3" data-testid={`dash-task-${task.id}`}>
                  <div className={`mt-0.5 rounded-full p-1 ${task.status === 'in-progress' ? 'bg-blue-50' : 'bg-amber-50'}`}>
                    {task.status === 'in-progress'
                      ? <Loader2 className="h-3.5 w-3.5 text-blue-600" />
                      : <Circle className="h-3.5 w-3.5 text-amber-600" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                      <Badge
                        variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'secondary' : 'outline'}
                        className="text-[10px] px-1.5 py-0"
                      >
                        {t(`tasks.${task.priority}`)}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card data-testid="upcoming-events">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">{t('staffDash.upcomingEvents')}</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1" onClick={() => navigate('/calendar')} data-testid="view-calendar">
                {t('dashboard.viewAll')} <ArrowRight className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t('staffDash.noUpcoming')}</p>
              ) : (
                upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 rounded-lg border p-3" data-testid={`dash-event-${event.id}`}>
                    <div className="rounded-lg bg-blue-50 p-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.date} &middot; {event.startTime}—{event.endTime}</p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
