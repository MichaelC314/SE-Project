import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDb } from '../services/db.mjs';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import '../../styles/Main.css';

function SignUp({ onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const db = getDb(); 

    // function to validate username and password
    const validateInputs = () => {
        if (username.length < 6) {
            setError("Username must be at least 6 characters long.");
            return false;
        }
        
        //checks if password meets criteria. Below are special characters
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 8 characters long, contain one uppercase letter, and one special character.");
            return false;
        }

        setError('');
        return true;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        // check if inputs meet the criteria
        if (!validateInputs()) {
            return;
        }

        if (username && password) {
            try {
                // Query Firestore to check if the username/password combination already exists
                const userQuery = query(
                    collection(db, "accountInfo"),
                    where("userId", "==", username),
                    where("password", "==", password)
                );

                const querySnapshot = await getDocs(userQuery);

                if (!querySnapshot.empty) {
                    // if matching document found, fail
                    setError('This username and password combination already exists.');
                } else {
                    // If no matching document, proceed with sign-up
                    await addDoc(collection(db, "accountInfo"), {
                        userId: username,
                        password: password
                    });
                    alert('SignUp successful!');
                    navigate('/home'); // Redirect to home page
                }
            } catch (error) {
                console.error("Error adding user to database: ", error);
                setError('Sign-up failed. Please try again.');
            }
        } else {
            setError('Please fill all fields');
        }
    };

    //below is formatting stuff.
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
    }, [handleClickOutside]);

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
