import React, { useState } from 'react';
import Popup from './Popup';
import { CheckoutContext } from '../contexts/CheckoutContext';
import { CSSProperties } from 'react';

const Checkout: React.FC = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [buttonLabel, setButtonLabel] = useState('Checkout');
    const [popupLabel, setPopupLabel] = useState('Are you sure?');
    const numOfHours = 15;

    const handleButtonClick = () => {
        if (numOfHours > 8) {
            setShowPopup(true);
        } else {
            setShowPopup(true);
            setPopupLabel('Are you sure? You have not completed 8.5 Hours!');
        }
    };

    return (
        <CheckoutContext.Provider value={{setShowPopup, setButtonLabel, popupLabel, numOfHours}}>
            <div style={styles.container}>
                <h1 style={styles.centeredText}>Hi Kavindu</h1>
                {!showPopup && 
                    <button 
                    style={styles.button}
                    onClick={handleButtonClick}
                    disabled={buttonLabel === 'Completed'}
                    >
                        {buttonLabel}
                    </button>}
                {showPopup && <Popup/>}
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
    },
    popup: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center' as 'center',
    },
    centeredText: {
        marginBottom: '10px',
    }
};

export default Checkout;