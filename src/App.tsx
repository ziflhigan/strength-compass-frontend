// src/App.tsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PredictionProvider } from './context/PredictionContext';
import { ThemeProvider } from './context/ThemeContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { LoadingSpinner } from './components/common/LoadingSpinner.tsx';
import { Layout } from './components/common/Layouts';
import { AuthGuard } from './components/auth/AuthGuard';

// Lazy load components for better performance
const Landing = React.lazy(() => import('./components/pages/Landing'));
const Dashboard = React.lazy(() => import('./components/pages/Dashboard'));
const MeetLog = React.lazy(() => import('./components/pages/MeetLog'));
const CoachDashboard = React.lazy(() => import('./components/pages/CoachDashboard'));
const Resources = React.lazy(() => import('./components/pages/Resources'));
const FAQ = React.lazy(() => import('./components/pages/FAQ'));
const LoginForm = React.lazy(() => import('./components/auth/LoginForm'));
const RegisterForm = React.lazy(() => import('./components/auth/RegisterForm'));

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <PredictionProvider>
            <Router>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {/* Public routes without layout */}
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<RegisterForm />} />
                  
                  {/* Routes with layout */}
                  <Route path="/*" element={
                    <Layout>
                      <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<Landing />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/faq" element={<FAQ />} />
                        
                        {/* Protected routes */}
                        <Route path="/dashboard" element={
                          <AuthGuard>
                            <Dashboard />
                          </AuthGuard>
                        } />
                        <Route path="/meets" element={
                          <AuthGuard>
                            <MeetLog />
                          </AuthGuard>
                        } />
                        <Route path="/coach" element={
                          <AuthGuard requiredRole="coach">
                            <CoachDashboard />
                          </AuthGuard>
                        } />
                        
                        {/* Redirect unknown routes */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </Layout>
                  } />
                </Routes>
              </Suspense>
            </Router>
          </PredictionProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;