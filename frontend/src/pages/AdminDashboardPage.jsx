import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users, UserCircle, Calendar, DollarSign, Plus, FileText,
  Clock, Package, ArrowRight,
} from 'lucide-react';
import { mockStaff, mockActivity } from '@/data/mockData';

const iconMap = {
  clock: Clock,
  user: UserCircle,
  calendar: Calendar,
  package: Package,
};

export default function AdminDashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const stats = [
    { key: 'totalStaff', value: String(mockStaff.length), icon: Users, color: 'bg-primary/10 text-primary' },
    { key: 'activeGuests', value: '12', icon: UserCircle, color: 'bg-blue-50 text-blue-600' },
    { key: 'todayAppointments', value: '8', icon: Calendar, color: 'bg-amber-50 text-amber-600' },
    { key: 'monthlyRevenue', value: '$12,450', icon: DollarSign, color: 'bg-emerald-50 text-emerald-600' },
  ];

  return (
    <div className="space-y-6" data-testid="admin-dashboard">
      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map(({ key, value, icon: Icon, color }) => (
          <Card key={key} className="overflow-hidden" data-testid={`stat-${key}`}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">{t(`dashboard.${key}`)}</p>
                  <p className="text-2xl font-bold tracking-tight">{value}</p>
                </div>
                <div className={`rounded-xl p-2.5 ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Quick Actions */}
        <Card className="lg:col-span-2" data-testid="quick-actions">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">{t('dashboard.quickActions')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-3 h-11" onClick={() => navigate('/staff')} data-testid="action-add-staff">
              <div className="rounded-md bg-primary/10 p-1"><Plus className="h-3.5 w-3.5 text-primary" /></div>
              {t('dashboard.addStaff')}
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 h-11" onClick={() => navigate('/appointments')} data-testid="action-new-appointment">
              <div className="rounded-md bg-blue-50 p-1"><Calendar className="h-3.5 w-3.5 text-blue-600" /></div>
              {t('dashboard.newAppointment')}
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 h-11" data-testid="action-view-reports">
              <div className="rounded-md bg-amber-50 p-1"><FileText className="h-3.5 w-3.5 text-amber-600" /></div>
              {t('dashboard.viewReports')}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-3" data-testid="recent-activity">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">{t('dashboard.recentActivity')}</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1" data-testid="view-all-activity">
              {t('dashboard.viewAll')} <ArrowRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActivity.map((item) => {
                const Icon = iconMap[item.icon] || Clock;
                return (
                  <div key={item.id} className="flex items-start gap-3" data-testid={`activity-${item.id}`}>
                    <div className="mt-0.5 rounded-full bg-muted p-1.5">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-snug">{item.message}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Overview */}
      <Card data-testid="staff-overview">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">{t('nav.staff')}</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1" onClick={() => navigate('/staff')} data-testid="view-all-staff">
            {t('dashboard.viewAll')} <ArrowRight className="h-3 w-3" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {mockStaff.slice(0, 6).map((member) => (
              <div key={member.id} className="flex items-center gap-2.5 rounded-lg border p-3" data-testid={`staff-card-${member.id}`}>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {member.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{member.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
