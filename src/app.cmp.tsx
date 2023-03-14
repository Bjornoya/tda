import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ROUTES from './config/routes';
import { AuthProvider } from './context/auth.context';
import { NotificationProvider } from './context/notification.context';
import ThemeProvider from './context/theme.context';
import ProtectedRoute from './@lib/protectedRoute/protectedRoute.cmp';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <ThemeProvider>
          <AuthProvider>
            <Router>
              <Routes>
                {ROUTES.map((route) => (
                  route.protected ? (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={<ProtectedRoute><route.Component /></ProtectedRoute>}
                    />
                  ) : (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={<route.Component />}
                    />
                  )
                ))}
              </Routes>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </NotificationProvider>
    </QueryClientProvider>
  );
}

export default App;
