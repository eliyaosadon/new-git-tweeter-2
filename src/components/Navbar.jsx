import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <h2>Tweeter 2.0</h2>
                </div>

                <div className="navbar-links">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                    <Link to="/profile" className="nav-link">
                        Profile
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
