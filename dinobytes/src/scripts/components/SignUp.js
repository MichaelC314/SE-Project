import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function SignUp({ onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Navigation hook

    const handleSignUp = (e) => {
        e.preventDefault(); // Prevent page reload

        // Dummy sign-up validation
        if (username && password) {
            alert('SignUp successful!'); 
            navigate('/home'); // Redirect to home page
        } else {
            setError('Please fill all fields');
        }
    };

    // Handle clicking outside the box to close the overlay
    const handleClickOutside = (e) => {
        if (e.target.id === 'overlay') {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div id="overlay" style={styles.background}>
            <div style={styles.container}>
                <h2>Sign Up</h2>
                <form onSubmit={handleSignUp} style={styles.form}>
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
                    <button type="submit" style={styles.button}>Sign Up</button>
                    <button type="button" style={styles.button} onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

// Styles for the overlay and form
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
        backdropFilter: 'blur(8px)', // Blur effect on background
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Slight dark overlay
        zIndex: 999, // On top of everything
    },
    container: {
        width: '300px',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: 'white',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)', // Stronger shadow
        zIndex: 1000, // Higher than background
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginTop: '5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        marginBottom: '10px',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
};

export default SignUp;
