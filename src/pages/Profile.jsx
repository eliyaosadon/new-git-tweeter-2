import { useState } from 'react';

function Profile({ userName, onUpdateUserName }) {
    const [newUserName, setNewUserName] = useState(userName);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newUserName.trim() && newUserName !== userName) {
            onUpdateUserName(newUserName.trim());
            setMessage('Username updated successfully! ✓');

            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div className="profile-page">
            <header className="header">
                <h1>Profile Settings</h1>
                <p>Manage your account</p>
            </header>

            <div className="profile-container">
                <div className="profile-section">
                    <div className="profile-avatar-large">
                        {userName[0]}
                    </div>
                    <h2 className="current-username">{userName}</h2>
                </div>

                <div className="profile-form-section">
                    <h3>Change Username</h3>
                    <p className="form-description">
                        This will be displayed on all your tweets
                    </p>

                    <form onSubmit={handleSubmit} className="profile-form">
                        <input
                            type="text"
                            className="profile-input"
                            placeholder="Enter new username"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            maxLength={20}
                        />

                        <button
                            type="submit"
                            className="profile-button"
                            disabled={!newUserName.trim() || newUserName === userName}
                        >
                            Update Username
                        </button>
                    </form>

                    {message && (
                        <div className="success-message">
                            {message}
                        </div>
                    )}
                </div>

                <div className="profile-info">
                    <h3>Account Information</h3>
                    <div className="info-item">
                        <span className="info-label">Current Username:</span>
                        <span className="info-value">{userName}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Member Since:</span>
                        <span className="info-value">Today</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
