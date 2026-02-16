import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

function Navbar({ user }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <h2>🐦 Tweeter</h2>
                </div>

                <div className="navbar-links">
                    {user ? (
                        <>
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                            <Link to="/profile" className="nav-link">
                                Profile
                            </Link>
                            <button onClick={handleLogout} className="nav-link logout-btn">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;