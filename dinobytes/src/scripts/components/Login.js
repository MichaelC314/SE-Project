import React, { useState } from 'react';

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
        <div style={styles.background}>
            <div style={styles.container}>
                <h2>Login</h2>
                <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    {error && <p style={styles.error}>{error}</p>}
                    <button type="submit" style={styles.button}>Login</button>
                    <button type="button" style={styles.button} onClick={onSwitchToSignUp}>
                        Sign Up
                    </button>
                    <button type="button" style={styles.button} onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

// Styles for the login form
const styles = {
    background: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(8px)', // Blur effect
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Overlay
        zIndex: 999,
    },
    container: {
        width: '300px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        zIndex: 1000,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    input: {
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%',
        marginTop: '5px',
    },
    button: {
        margin: '10px 0',
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
    },
};

export default Login;
