import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ROUTES from './config/routes';
import { AuthProvider } from './context/auth.context';
import ThemeProvider from './context/theme.context';
import ProtectedRoute from './@lib/protectedRoute/protectedRoute.cmp';

function App() {
  return (
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
  );
}

export default App;
