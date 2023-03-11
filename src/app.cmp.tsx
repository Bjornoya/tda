import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ROUTES from './config/routes';
import { AuthProvider } from './context/auth.context';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              Component={route.Component}
            />
          ))}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
