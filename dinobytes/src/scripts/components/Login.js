import React, { useState } from 'react';
import '../../styles/Main.css'; // Correct relative path

function Login({ onClose, onSwitchToSignUp }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault(); // Prevent page reload

        // Dummy login validation
        if (username === 'admin' && password === 'password') {
            alert('Login successful!');
            onClose(); // Close the login box after success
        } else {
            setError('Invalid username or password');
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
