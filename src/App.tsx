import React, { lazy, Suspense, type ComponentType, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const Education = lazy(() => import('./pages/Education'));
const AcademicAchievements = lazy(() => import('./pages/AcademicAchievements'));
const ProfessionalExperience = lazy(() => import('./pages/ProfessionalExperience'));
const FieldWorkExperience = lazy(() => import('./pages/FieldWorkExperience'));
const ExtraCurricular = lazy(() => import('./pages/ExtraCurricular'));
const References = lazy(() => import('./pages/References'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Login = lazy(() => import('./pages/Login'));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('isAdminAuthenticated') !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  return <>{children}</>;
}

function page(Component: ComponentType, protectedRoute = false) {
  const content = (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <Component />
    </Suspense>
  );

  if (protectedRoute) {
    return <ProtectedRoute>{content}</ProtectedRoute>;
  }

  return content;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={page(Home)} />
        <Route path="education" element={page(Education)} />
        <Route path="achievements/academic" element={page(AcademicAchievements)} />
        <Route path="achievements/professional" element={page(ProfessionalExperience)} />
        <Route path="achievements/fieldwork" element={page(FieldWorkExperience)} />
        <Route path="achievements/extracurricular" element={page(ExtraCurricular)} />
        <Route path="references" element={page(References)} />
        <Route path="gallery" element={page(Gallery)} />
        <Route path="contact" element={page(Contact)} />
      </Route>
      <Route path="login" element={page(Login)} />
      <Route path="admin-dashboard" element={page(AdminDashboard, true)} />
    </Routes>
  );
}
