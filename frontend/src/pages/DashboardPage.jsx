import { useAuth } from '@/contexts/AuthContext';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import StaffDashboardPage from '@/pages/StaffDashboardPage';

export default function DashboardPage() {
  const { user } = useAuth();
  return user?.role === 'admin' ? <AdminDashboardPage /> : <StaffDashboardPage />;
}
