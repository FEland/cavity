import React, { useEffect } from 'react';
import Login from "pages/Login.js";

const FullScreenLogin = ({ onClose }) => {

    useEffect(() => {
        const handleEscapeKey = (event) => {
          if (event.key === 'Escape') {
            onClose();  // Close the modal when Escape key is pressed
          }
        };
    
        // Attach event listener
        window.addEventListener('keydown', handleEscapeKey);
    
        // Clean up event listener when the component unmounts or modal closes
        return () => {
          window.removeEventListener('keydown', handleEscapeKey);
        };
      }, [onClose]);

    const handleOverlayClick = (event) => {
        // Close the modal when the overlay (background) is clicked
        if (event.target === event.currentTarget) {
          onClose();
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',  // Take full screen height
                backgroundColor: 'rgba(0, 0, 0, 0.8)',  // semi-transparent background
                zIndex: 100,  // ensures it's on top
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',  // Center the modal in the middle of the screen
                overflowY: 'auto',  // Enable scrolling if content overflows vertically

            }}
            onClick={handleOverlayClick}
        >
            <div
                style={{
                    // position: 'fixed',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    width: '90%',
                    height: '90%',
                    // maxWidth: '500px',  // Max width for the modal
                    // maxHeight: '90%',   // Max height for the modal (90% of the viewport height)
                    overflowY: 'auto',  // Enable scrolling if content overflows vertically
                    textAlign: 'center',
                    // transform: 'scale(0.9)',  // Slightly scale down the entire modal content



                }}
            >
                <Login  />
            </div>
        </div>
    );
};

export default FullScreenLogin;
