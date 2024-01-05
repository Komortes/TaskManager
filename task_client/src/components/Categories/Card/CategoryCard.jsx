import React from 'react';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ id, title, color, symbol, onCardClick, onRightClick }) => {
  const cardStyle = {
    backgroundColor: color,
    color: getContrastYIQ(color),
  };

  return (
    <div
      className={styles.card}
      onClick={() => onCardClick(title)}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick(e, id);
      }}
      style={cardStyle}
    >
      <div className={styles.symbol_circle}>{symbol}</div>
      <p className={styles.text_title}>{title}</p>
    </div>
  );
};

function getContrastYIQ(hexcolor){
  if (typeof hexcolor !== 'string' || !hexcolor.match(/^#([0-9A-F]{3}){1,2}$/i)) {
    hexcolor = "#ffffff"; 
  }

  hexcolor = hexcolor.replace("#", "");
  var r = parseInt(hexcolor.substr(0,2),16);
  var g = parseInt(hexcolor.substr(2,2),16);
  var b = parseInt(hexcolor.substr(4,2),16);
  var yiq = ((r*299)+(g*587)+(b*114))/1000;
  return (yiq >= 128) ? 'black' : 'white';
}


export default CategoryCard;
