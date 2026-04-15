import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Clock, MapPin, ListChecks, Calendar, ArrowRight,
  Circle, CheckCircle2, Loader2,
} from 'lucide-react';
import { mockTasks, mockShift, mockCalendarEvents } from '@/data/mockData';

export default function StaffDashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);

  const handleClockToggle = () => {
    if (isClockedIn) {
      setIsClockedIn(false);
      setClockInTime(null);
    } else {
      setIsClockedIn(true);
      setClockInTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  };

  const pendingCount = mockTasks.filter((t) => t.status === 'pending').length;
  const inProgressCount = mockTasks.filter((t) => t.status === 'in-progress').length;
  const completedCount = mockTasks.filter((t) => t.status === 'completed').length;

  const todayTasks = mockTasks.filter((t) => t.status !== 'completed').slice(0, 3);
  const upcomingEvents = mockCalendarEvents.filter((e) => e.type === 'appointment').slice(0, 3);

  return (
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
              onClick={handleClockToggle}
              variant={isClockedIn ? 'outline' : 'default'}
              className="gap-2 min-w-[140px]"
              data-testid="clock-toggle-button"
            >
              <Clock className="h-4 w-4" />
              {isClockedIn ? t('staffDash.clockOut') : t('staffDash.clockIn')}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Summary Cards */}
      <div className="grid gap-4 grid-cols-3">
        <Card data-testid="tasks-pending-count">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-amber-50 p-2">
              <Circle className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">{t('staffDash.pending')}</p>
            </div>
          </CardContent>
        </Card>
        <Card data-testid="tasks-inprogress-count">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2">
              <Loader2 className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{inProgressCount}</p>
              <p className="text-xs text-muted-foreground">{t('staffDash.inProgress')}</p>
            </div>
          </CardContent>
        </Card>
        <Card data-testid="tasks-completed-count">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 p-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completedCount}</p>
              <p className="text-xs text-muted-foreground">{t('staffDash.completed')}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Tasks + Upcoming Events */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Tasks */}
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

        {/* Upcoming Events */}
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
                    <Calendar className="h-4 w-4 text-blue-600" />
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
  );
}
