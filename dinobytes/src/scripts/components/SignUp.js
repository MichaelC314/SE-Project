import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Main.css'; // Correct relative path

function SignUp({ onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    const handleClickOutside = useCallback((e) => {
        if (e.target.id === 'overlay') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]); // Include handleClickOutside in the dependency array

    return (
        <div id="overlay" className="background">
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignUp} className="signup-form">
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
                    <button type="submit" className="button-primary">Sign Up</button>
                    <button type="button" className="button-secondary" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
