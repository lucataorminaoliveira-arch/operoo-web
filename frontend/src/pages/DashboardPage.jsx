import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserCircle, Calendar, DollarSign, Plus, FileText } from 'lucide-react';

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const stats = [
    { key: 'totalStaff', value: '24', icon: Users, color: 'text-primary' },
    { key: 'activeGuests', value: '12', icon: UserCircle, color: 'text-blue-600' },
    { key: 'todayAppointments', value: '8', icon: Calendar, color: 'text-amber-600' },
    { key: 'monthlyRevenue', value: '$12,450', icon: DollarSign, color: 'text-emerald-600' },
  ];

  return (
    <div className="space-y-8" data-testid="dashboard-page">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ key, value, icon: Icon, color }) => (
          <Card key={key} data-testid={`stat-${key}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t(`dashboard.${key}`)}
              </CardTitle>
              <Icon className={`h-5 w-5 ${color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card data-testid="quick-actions">
          <CardHeader>
            <CardTitle className="text-base">{t('dashboard.quickActions')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3" data-testid="action-add-staff">
              <Plus className="h-4 w-4 text-primary" />
              {t('dashboard.addStaff')}
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3" data-testid="action-new-appointment">
              <Calendar className="h-4 w-4 text-primary" />
              {t('dashboard.newAppointment')}
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3" data-testid="action-view-reports">
              <FileText className="h-4 w-4 text-primary" />
              {t('dashboard.viewReports')}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card data-testid="recent-activity">
          <CardHeader>
            <CardTitle className="text-base">{t('dashboard.recentActivity')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t('dashboard.noActivity')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
