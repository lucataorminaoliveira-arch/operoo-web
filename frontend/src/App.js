import '@/i18n';
import '@/App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import AuthCallback from '@/components/AuthCallback';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import GuestPage from '@/pages/GuestPage';
import StaffPage from '@/pages/StaffPage';
import AppointmentsPage from '@/pages/AppointmentsPage';
import ClientsPage from '@/pages/ClientsPage';
import MarketingPage from '@/pages/MarketingPage';
import ShopPage from '@/pages/ShopPage';
import TeamPage from '@/pages/TeamPage';
import FrontDeskPage from '@/pages/FrontDeskPage';
import QRCodesPage from '@/pages/QRCodesPage';
import TasksPage from '@/pages/TasksPage';
import CalendarPage from '@/pages/CalendarPage';
import ProfilePage from '@/pages/ProfilePage';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

function AppRouter() {
  const location = useLocation();

  // Check URL fragment for session_id (Google OAuth callback) - SYNCHRONOUS
  if (location.hash?.includes('session_id=')) {
    return <AuthCallback />;
  }

  return (
    <Routes>
      {/* Homepage */}
      <Route path="/" element={<HomePage />} />

      {/* Public routes */}
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

      {/* Guest route — direct QR access, no auth */}
      <Route path="/guest" element={<GuestPage />} />
      <Route path="/guest/:token" element={<GuestPage />} />

      {/* Protected routes with layout */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        {/* Shared route — renders admin or staff dashboard based on role */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Admin-only routes */}
        <Route path="/front-desk" element={<AdminRoute><FrontDeskPage /></AdminRoute>} />
        <Route path="/qr-codes" element={<AdminRoute><QRCodesPage /></AdminRoute>} />
        <Route path="/team" element={<AdminRoute><TeamPage /></AdminRoute>} />
        <Route path="/staff" element={<AdminRoute><StaffPage /></AdminRoute>} />
        <Route path="/appointments" element={<AdminRoute><AppointmentsPage /></AdminRoute>} />
        <Route path="/clients" element={<AdminRoute><ClientsPage /></AdminRoute>} />
        <Route path="/marketing" element={<AdminRoute><MarketingPage /></AdminRoute>} />
        <Route path="/shop" element={<AdminRoute><ShopPage /></AdminRoute>} />

        {/* Staff routes (accessible by all authenticated users) */}
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
