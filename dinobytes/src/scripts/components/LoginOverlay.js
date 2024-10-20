import React, { useRef, useEffect } from 'react';
import Login from './Login';

function LoginOverlay({ onClose }) {
    const containerRef = useRef(null);

    // Close the login box if user clicks outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                onClose(); // Call the parent-provided onClose handler
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div style={styles.background}>
            <div ref={containerRef} style={styles.container}>
                <h2>Login</h2>
                <Login />
            </div>
        </div>
    );
}

// Styles for the overlay and container
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
        backdropFilter: 'blur(8px)', // Blur effect on the background
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Slight dark overlay
        zIndex: 1000, // Ensure it's on top of everything
    },
    container: {
        width: '300px',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: 'white',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)',
    },
};

export default LoginOverlay;