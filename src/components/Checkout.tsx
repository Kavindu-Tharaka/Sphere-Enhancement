import React, { useState, useEffect, CSSProperties } from 'react';
import Popup from './Popup';
import { CheckoutContext } from '../contexts/CheckoutContext';

const Checkout: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [buttonLabel, setButtonLabel] = useState('Checkout');
    const [popupLabel, setPopupLabel] = useState('Are you sure?');
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const numOfHours = 15;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleButtonClick = () => {
        if (numOfHours > 8) {
            setShowPopup(true);
        } else {
            setShowPopup(true);
            setPopupLabel('Are you sure? You have not completed 8.5 Hours!');
        }
    };

    return (
        <CheckoutContext.Provider value={{ setShowPopup, setButtonLabel, popupLabel, numOfHours }}>
            <div style={styles.container}>
                <h1 className="text-center mb-4">Hi {'{user}'}</h1>
                {!showPopup &&
                    <button
                        style={styles.button}
                        onClick={handleButtonClick}
                        disabled={buttonLabel === 'Completed'}
                    >
                        <div>
                            <span>{currentDateTime.toLocaleDateString()}</span>
                            <br/>
                            <span>{currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            <br/>
                            <span>{buttonLabel}</span>
                        </div>
                    </button>
                }
                {showPopup && <Popup />}
                <p className="text-center mb-4">{'{hoursWorked}'} hours worked</p>
                <p className="text-center mb-4">Last checking time</p>
                <p className="text-center mb-4">Checked In @ {'{chekedInTime here}'}</p>
            </div>
        </CheckoutContext.Provider>
    );
};

const styles: { [key: string]: CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        position: 'relative' as 'relative',
    },
    button: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '16px',
        cursor: 'pointer',
    }
};

export default Checkout;