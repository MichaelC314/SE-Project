import React from 'react';
import '../../styles/Account.css'; // Create a new CSS file for Account-specific styles

function Account({ onLogout, onDeleteAccount }) {
    return (
        <div className="account-page">
        <div className="button-panel">
            <button className="account-button" onClick={onLogout}>Log Out</button>
            <button className="account-button" onClick={onDeleteAccount}>Delete Account</button>
            <button className="account-button">Change Password</button>
            <button className="account-button">Change Profile Picture</button>
        </div>
    </div>
);
}

export default Account;