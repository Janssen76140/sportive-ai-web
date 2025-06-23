import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

export const useAuthRedirect = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Auth redirect check:', { loading, isAuthenticated, userType: user?.userType });
    if (!loading && isAuthenticated && user) {
      // Redirect based on user type
      const redirectPath = getDashboardPath(user.userType);
      console.log('Redirecting to:', redirectPath);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, loading, navigate]);
};

export const getDashboardPath = (userType: string): string => {
  switch (userType) {
    case 'parent':
      return '/dashboard';
    case 'academy':
      return '/academy';
    case 'admin':
      return '/admin';
    default:
      return '/login';
  }
};