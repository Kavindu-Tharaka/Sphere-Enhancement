import React, { useContext } from 'react';
import { CheckoutContext } from '../contexts/CheckoutContext';

const styles = {
    popup: {
        border: '1px solid black',
        padding: '20px',
        borderRadius: '5px',
        backgroundColor: 'white',
        width: '200px',
        textAlign: 'center' as 'center',
    },
};

const Popup: React.FC = () => {

    const checkoutContext = useContext(CheckoutContext);

    function handleYesClick(): void {
        checkoutContext?.setShowPopup(false);
        checkoutContext?.setButtonLabel('Completed');
        localStorage.setItem('checkedOut', 'done');

        const now = new Date();
        const checkOutTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
        localStorage.setItem('checkedOutTime', checkOutTime);
    }

    function handleNoClick(): void {
        checkoutContext?.setShowPopup(false);
    }

    return (
        <div style={styles.popup}>
            <p>{checkoutContext?.popupLabel}</p>
            <button onClick={handleYesClick}>Yes</button>
            <button onClick={handleNoClick}>No</button>
        </div>
    );
};

export default Popup;