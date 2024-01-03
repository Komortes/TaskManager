import React from 'react';
import './TagCard.css'; 

const AddTagCard = ({ onAddClick  }) => {
    const cardStyle = {
        backgroundImage: "linear-gradient(144deg,#af40ff,#5b42f3 50%,#00ddeb)",
    };

return (
    <div 
      className="card" 
      onClick={onAddClick}
      style={cardStyle} 
    >
      <p className="text-title">Create</p>
    </div>
  );
};

export default AddTagCard;
