import React, { useState } from 'react';
import { getDb } from '../services/db.mjs';
import { doc, updateDoc } from 'firebase/firestore';
import { encryptData } from './Encryption';
import '../../styles/Account.css'; // Create a new CSS file for Account-specific styles

function Account({ onLogout, onDeleteAccount, userId}) {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const db = getDb();
    

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handlePasswordChange = async () => {
        if (!validatePassword(newPassword)) {
            setPasswordError("Password must be at least 8 characters long, contain one uppercase letter, and one special character.");
            return;
        }
        try {
            const userRef = doc(db, "accountInfo", userId);
            console.log("Updating password for user ID:", userId); 

            const { iv, encryptedData } = await encryptData(newPassword);

            await updateDoc(userRef, { password: encryptedData, iv: iv });
            alert("Password updated successfully!");
            setShowChangePassword(false); // Close the modal
            setNewPassword(''); // Reset input
            setPasswordError(''); // Reset error
        } catch (error) {
            console.error("Error updating password: ", error);
            setPasswordError("Failed to update password. Please try again.");
        }
    };

    return (
        <div className="account-page">
            <div className="button-panel">
                <button className="account-button" onClick={onLogout}>Log Out</button>
                <button className="account-button" onClick={onDeleteAccount}>Delete Account</button>
                <button className="account-button" onClick={() => setShowChangePassword(true)}>Change Password</button>
                <button className="account-button">Change Profile Picture</button>
            </div>

            {/* Change Password Modal */}
            {showChangePassword && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Change Password</h2>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="input"
                        />
                        {passwordError && <p className="error">{passwordError}</p>}
                        <button className="button-primary" onClick={handlePasswordChange}>Submit</button>
                        <button className="button-secondary" onClick={() => setShowChangePassword(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Account;