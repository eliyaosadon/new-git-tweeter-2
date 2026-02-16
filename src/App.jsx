import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { TweetsProvider } from './context/TweetsContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const savedUserName = localStorage.getItem('userName');
      if (savedUserName) {
        setUserName(savedUserName);
      } else {
        const emailUsername = user.email.split('@')[0];
        setUserName(emailUsername);
        localStorage.setItem('userName', emailUsername);
      }
    }
  }, [user]);

  const updateUserName = (newUserName) => {
    setUserName(newUserName);
    localStorage.setItem('userName', newUserName);
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router basename="/new-git-tweeter-2">
      <div className="app">
        <Navbar user={user} />

        <div className="container">
          <Routes>
            <Route
              path="/login"
              element={
                user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <TweetsProvider userName={userName}>
                    <Home />
                  </TweetsProvider>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute user={user}>
                  <Profile
                    userName={userName}
                    onUpdateUserName={updateUserName}
                  />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;