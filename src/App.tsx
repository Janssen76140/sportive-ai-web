import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.tsx';
import LoginPage from './components/LoginPage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import OnboardingFlow from './pages/onboarding/OnboardingFlow.tsx';
import ParentDashboard from './pages/dashboard/ParentDashboard.tsx';
import AcademyDashboard from './pages/dashboard/AcademyDashboard.tsx';
import AdminDashboard from './pages/dashboard/AdminDashboard.tsx';
import { OnboardingProvider } from './context/OnboardingContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/onboarding" 
            element={
              <OnboardingProvider>
                <OnboardingFlow />
              </OnboardingProvider>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requiredUserType="parent">
                <ParentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/academy" 
            element={
              <ProtectedRoute requiredUserType="academy">
                <AcademyDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredUserType="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;