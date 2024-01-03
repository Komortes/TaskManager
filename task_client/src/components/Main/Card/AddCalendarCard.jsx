import React from 'react';
import './CalendarCard.css'; 

const AddCalendarCard = ({ onAddClick  }) => {
    const cardStyle = {
        backgroundImage: "linear-gradient(144deg,#af40ff,#5b42f3 50%,#00ddeb)",
    };
    return (
        <div className="card" style={cardStyle} onClick={onAddClick}>
            <div className="card-img"></div>
            <div className="card-info">
                <div className="card-text">
                    <p className="text-title">Create</p>
                </div>
                <div className="card-icon">
                    <svg viewBox="0 0 40 40" width="28" height="28" fill="white">
                        <path d="M20,20 L20,8 L24,8 L24,20 L36,20 L36,24 L24,24 L24,36 L20,36 L20,24 L8,24 L8,20 L20,20 Z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default AddCalendarCard;
