import React, { useState } from 'react';
import './PopupComponent.css'
import { Input } from '@mui/material';
import { useDispatch } from 'react-redux';

const PopupBox = ({ content}) => {
  const dispatch = useDispatch();

  const toggleActive = () => {
    dispatch({ type: 'TOGGLE_ACTIVE' });
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
      <h6 style={{color:'black', marginBottom:"20px"}}>{content}</h6>
        <Input type="text" className='ticket' placeholder="Ticket ID here..." autoFocus>
        </Input>
        <button className='CheckStatus'>
          Check Status
        </button>
        <p className='result'>

        </p>

        <button className="close-button" onClick={toggleActive}>
          Close
        </button>
        
      </div>
    </div>
  );
};


export default PopupBox;
