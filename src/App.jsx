import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TweetsProvider } from './context/TweetsContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import './index.css';

function App() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const savedUserName = localStorage.getItem('userName');
    if (savedUserName) {
      setUserName(savedUserName);
    } else {
      setUserName('User');
      localStorage.setItem('userName', 'User');
    }
  }, []);

  const updateUserName = (newUserName) => {
    setUserName(newUserName);
    localStorage.setItem('userName', newUserName);
  };

  return (
    <Router basename="/new-git-tweeter-2">
      <TweetsProvider userName={userName}>
        <div className="app">
          <Navbar />

          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/profile"
                element={
                  <Profile
                    userName={userName}
                    onUpdateUserName={updateUserName}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </TweetsProvider>
    </Router>
  );
}

export default App;
