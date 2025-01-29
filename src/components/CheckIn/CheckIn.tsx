import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Checkout from '../Checkout';

const CheckinComponent: React.FC = () => {
  const { user, logout } = useAuth();

  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [CheckInOutLabel, setCheckInOutLabel] = useState('');
  const [elapsedTime, setElapsedTime] = useState('00:00');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  let currentDateTimeWhenLogin = new Date();
  let currentTimeWhenLogin = currentDateTimeWhenLogin.toLocaleTimeString();
  let currentDateWhenLogin = currentDateTimeWhenLogin.toLocaleDateString();

  // Calculate elapsed time from check-in timestamp
  const calculateElapsedTime = (checkInTimestamp: number) => {
    const now = Date.now();
    const elapsed = now - checkInTimestamp;

    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  // On component load
  useEffect(() => {
    console.log("useEffect...");
    const savedText = localStorage.getItem('checkedIn');
    const checkInTime = localStorage.getItem('checkedInTime');
    const checkInDate = localStorage.getItem('checkedInDate');
    const checkInTimestamp = localStorage.getItem('checkInTimestamp');

    if (savedText) {
      setCheckInOutLabel("CheckOut");
      setTime(checkInTime || '');
      setDate(checkInDate || '');
      setIsButtonDisabled(true);

      if (checkInTimestamp) {
        const elapsed = calculateElapsedTime(parseInt(checkInTimestamp));
        setElapsedTime(elapsed);
      }
    } else {
      setCheckInOutLabel("CheckIn");
    }
  }, []); 

  // Handle check-in process
  function startCheckIn() {
    const now = new Date();
    const checkInTime = now.toLocaleTimeString();
    const checkInDate = now.toLocaleDateString();
    const checkInTimestamp = now.getTime();

    setCheckInOutLabel("CheckOut");
    setTime(checkInTime);
    setDate(checkInDate);
    setIsButtonDisabled(true);

    localStorage.setItem('checkedIn', 'done');
    localStorage.setItem('checkedInTime', checkInTime);
    localStorage.setItem('checkedInDate', checkInDate);
    localStorage.setItem('checkInTimestamp', checkInTimestamp.toString());

    setElapsedTime('00:00');
  }

  return (
    <div>
      <h2>Protected Content</h2>
      <p>Welcome, {user?.username}!</p>
      
      <button onClick={startCheckIn} disabled={isButtonDisabled}>
        {CheckInOutLabel}
      </button>
      
      {CheckInOutLabel === "CheckIn" && <h3>CheckIn to start your work!</h3>}
      {CheckInOutLabel !== "CheckIn" && <h3>{elapsedTime} hours worked</h3>}   
      
      <h3>Current date when login: {currentDateWhenLogin}</h3>
      <h3>Current time when login: {currentTimeWhenLogin}</h3>
      {CheckInOutLabel !== "CheckIn" && <h3>Last CheckIn @ {date} {time}</h3>}

      {/* Logout button */}
      <button onClick={logout}>Logout</button>

      <br />
      <br />
      <br />
      <br />

      <Checkout/>
    </div>



    // <div>
    // <h2>Protected Content</h2>
    // <p>Welcome, {user?.username}!</p>
    // <button onClick={logout}>Logout</button>
    // </div>
  );
};

export default CheckinComponent;
