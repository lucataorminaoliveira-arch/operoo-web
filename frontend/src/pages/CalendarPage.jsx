import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { mockCalendarEvents } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalIcon } from 'lucide-react';

const typeStyles = {
  shift: { bg: 'bg-primary/10', text: 'text-primary', dot: 'bg-primary' },
  appointment: { bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-500' },
  dayoff: { bg: 'bg-muted', text: 'text-muted-foreground', dot: 'bg-muted-foreground' },
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getWeekDates(offset = 0) {
  const today = new Date();
  const day = today.getDay();
  const diff = day === 0 ? 6 : day - 1;
  const monday = new Date(today);
  monday.setDate(today.getDate() - diff + offset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function formatDate(d) {
  return d.toISOString().split('T')[0];
}

function isToday(d) {
  const today = new Date();
  return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
}

export default function CalendarPage() {
  const { t } = useTranslation();
  const [weekOffset, setWeekOffset] = useState(0);
  const [view, setView] = useState('week');

  const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset]);

  const eventsForDate = (dateStr) => {
    return mockCalendarEvents.filter((e) => e.date === dateStr);
  };

  const allEvents = [...mockCalendarEvents].sort((a, b) => a.date.localeCompare(b.date));

  const weekLabel = `${weekDates[0].toLocaleDateString('en', { month: 'short', day: 'numeric' })} — ${weekDates[6].toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}`;

  return (
    <div className="space-y-6" data-testid="calendar-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="calendar-title">{t('calendar.title')}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t('calendar.subtitle')}</p>
        </div>
        <Tabs value={view} onValueChange={setView}>
          <TabsList>
            <TabsTrigger value="week" data-testid="view-week">{t('calendar.weekView')}</TabsTrigger>
            <TabsTrigger value="list" data-testid="view-list">{t('calendar.listView')}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {view === 'week' ? (
        <>
          {/* Week Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => setWeekOffset((w) => w - 1)} data-testid="prev-week">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-center">
              <p className="text-sm font-semibold" data-testid="week-label">{weekLabel}</p>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => setWeekOffset(0)} data-testid="today-btn">
                {t('calendar.today')}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setWeekOffset((w) => w + 1)} data-testid="next-week">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Week Grid */}
          <div className="grid grid-cols-7 gap-2" data-testid="week-grid">
            {weekDates.map((date, i) => {
              const dateStr = formatDate(date);
              const events = eventsForDate(dateStr);
              const today = isToday(date);
              return (
                <Card
                  key={dateStr}
                  className={`overflow-hidden ${today ? 'ring-2 ring-primary/40' : ''}`}
                  data-testid={`day-${dateStr}`}
                >
                  <div className={`px-2 py-1.5 text-center border-b ${today ? 'bg-primary/10' : 'bg-muted/30'}`}>
                    <p className="text-[10px] text-muted-foreground uppercase">{DAYS[i]}</p>
                    <p className={`text-sm font-semibold ${today ? 'text-primary' : ''}`}>{date.getDate()}</p>
                  </div>
                  <CardContent className="p-1.5 min-h-[80px] space-y-1">
                    {events.length === 0 ? (
                      <p className="text-[10px] text-muted-foreground text-center pt-4">{t('calendar.noEvents')}</p>
                    ) : (
                      events.map((ev) => {
                        const style = typeStyles[ev.type] || typeStyles.shift;
                        return (
                          <div
                            key={ev.id}
                            className={`rounded px-1.5 py-1 ${style.bg}`}
                            data-testid={`event-${ev.id}`}
                          >
                            <p className={`text-[10px] font-medium leading-tight ${style.text}`}>{ev.title}</p>
                            {ev.startTime && (
                              <p className={`text-[9px] ${style.text} opacity-70`}>{ev.startTime}—{ev.endTime}</p>
                            )}
                          </div>
                        );
                      })
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        /* List View */
        <div className="space-y-3" data-testid="list-view">
          {allEvents.map((event) => {
            const style = typeStyles[event.type] || typeStyles.shift;
            return (
              <Card key={event.id} data-testid={`list-event-${event.id}`}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${style.bg}`}>
                    {event.type === 'shift' ? <Clock className={`h-4 w-4 ${style.text}`} /> : <CalIcon className={`h-4 w-4 ${style.text}`} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.date}
                      {event.startTime && ` \u00b7 ${event.startTime}—${event.endTime}`}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-[10px] shrink-0">{t(`calendar.${event.type}`)}</Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
