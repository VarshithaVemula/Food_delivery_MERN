import React from 'react';
import './Verify.css';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
  const navigate = useNavigate();

  return (
    <div className='verify'>
      <h2>Payment failed or cancelled.</h2>
      <button onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};

export default Verify;
