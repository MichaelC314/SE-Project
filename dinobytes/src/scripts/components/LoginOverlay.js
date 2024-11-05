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
        <div className="background">
            <div ref={containerRef} className="login-container">
                <Login onClose={onClose} />
            </div>
        </div>
    );
}

export default LoginOverlay;
