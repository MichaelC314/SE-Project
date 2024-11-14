import React, { useState } from 'react';
import { getDb } from '../services/db.mjs'; 
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { decryptData } from './Encryption';
import '../../styles/Main.css';

function Login({ onClose, onSwitchToSignUp, onLoginSuccess  }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const db = getDb(); // Get the Firestore instance

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }

        try {
            // Add Decryption


            // create a Firestore query to find the user with the specified username and password
            const userQuery = query(
                collection(db, "accountInfo"),
                where("userId", "==", username)
            );

            const querySnapshot = await getDocs(userQuery);

            // check documents
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const { password: encryptedPassword, iv } = userDoc.data(); // Retrieve the encrypted password and IV

                const decryptedPassword = await decryptData(encryptedPassword, iv);

                if (decryptedPassword === password) {
                    alert('Login successful!');
                    console.log("User ID:", username);
                    const userId = userDoc.id;
                    console.log("Retrieved userId on login:", userId);
                    onLoginSuccess(userId); // set login status to true
                    onClose(); // close the login box after success
                } else {
                    setError("Invalid username or password")
                }
            } else {
                
                setError('Invalid username or password');
            }
        } catch (error) {
            console.error("Error logging in: ", error);
            setError('Failed to log in. Please try again later.');
        }
    };

    return (
        <div className="background">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="input"
                        />
                    </div>
                    <div className="input-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input"
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="button-primary">Login</button>
                    <button type="button" className="button-secondary" onClick={onSwitchToSignUp}>
                        Sign Up
                    </button>
                    <button type="button" className="button-secondary" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
