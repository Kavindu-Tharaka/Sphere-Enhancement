import React, { CSSProperties, useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CheckoutContext } from '../../contexts/CheckoutContext';
import Popup from '../Popup';

const CheckinComponent: React.FC = () => {
  const { user, logout } = useAuth();

  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [elapsedTime, setElapsedTime] = useState('00:00');

  const calculateElapsedTime = (checkInTimestamp: number) => {
    const now = Date.now();
    const elapsed = now - checkInTimestamp;

    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  useEffect(() => {
    console.log("useEffect...");
    const checkedInText = localStorage.getItem('checkedIn');
    const checkedOutText = localStorage.getItem('checkedOut');
    const checkInTime = localStorage.getItem('checkedInTime');
    const checkInDate = localStorage.getItem('checkedInDate');
    const checkInTimestamp = localStorage.getItem('checkInTimestamp');
    const checkedOutTime = localStorage.getItem('checkedOutTime');

    if (checkedOutText === 'done') {
      setButtonLabel("Completed");
      setTime(checkedOutTime || '');
      setDate(checkInDate || '');
    } 
    else if (checkedInText === 'done') {
      setButtonLabel("Check Out");
      setTime(checkInTime || '');
      setDate(checkInDate || '');

      if (checkInTimestamp) {
        const elapsed = calculateElapsedTime(parseInt(checkInTimestamp));
        setElapsedTime(elapsed);
      }
    }
    else {
      setButtonLabel("Check In");
    }

    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []); 

  function startCheckIn() {
    const now = new Date();
    const checkInTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
    const checkInDate = now.toLocaleDateString('en-CA').replace(/-/g, '.');
    const checkInTimestamp = now.getTime();

    setButtonLabel("Check Out");
    setTime(checkInTime);
    setDate(checkInDate);

    localStorage.setItem('checkedIn', 'done');
    localStorage.setItem('checkedInTime', checkInTime);
    localStorage.setItem('checkedInDate', checkInDate);
    localStorage.setItem('checkInTimestamp', checkInTimestamp.toString());

    setElapsedTime('00:00');
  }

    const [showPopup, setShowPopup] = useState(false);
    const [buttonLabel, setButtonLabel] = useState('Check In');
    const [popupLabel, setPopupLabel] = useState('Are you sure?');
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const handleButtonClick = () => {
      if(buttonLabel === 'Check In') {
        startCheckIn()
      }
      else if(buttonLabel === 'Check Out') {
        if (parseFloat(elapsedTime) > 8.5) {
          setShowPopup(true);
        } else {
            setShowPopup(true);
            setPopupLabel('Are you sure? You have not completed 8.5 Hours!');
        }
      }
    };

  return (
      <CheckoutContext.Provider value={{ setShowPopup, setButtonLabel, popupLabel }}>
            <div style={styles.container}>
                <h1 className="text-center mb-4">Hi {user?.username}!</h1>
                {!showPopup &&
                    <button
                        style={styles.button}
                        onClick={handleButtonClick}
                        disabled={buttonLabel === 'Completed'}
                    >
                        <div>
                            <span>{currentDateTime.toLocaleDateString('en-CA').replace(/-/g, '.')}</span>
                            <br/>
                            <span>{currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase()}</span>
                            <br/>
                            <span>{buttonLabel}</span>
                        </div>
                    </button>
                }
                {showPopup && <Popup />}
                <p className="text-center mb-4">{elapsedTime} hours worked</p>
                <p className="text-center mb-4">Last checking time</p>
                <p className="text-center mb-4">Checked In @ {date} {time}</p>

                <button onClick={logout}>Logout</button>
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

export default CheckinComponent;
