import React from 'react';
import styles from './CalendarCard.module.css'; 

const AddCalendarCard = ({ onAddClick  }) => {
    const cardStyle = {
        backgroundImage: "linear-gradient(144deg,#af40ff,#5b42f3 50%,#00ddeb)",
    };
    return (
        <div className={styles.card} style={cardStyle} onClick={onAddClick}>
            <div className={styles.card_img}></div>
            <div className={styles.card_info}>
                <div className={styles.card_text}>
                    <p className={styles.text_title}>Create</p>
                </div>
                <div className={styles.card_icon}>
                    <svg viewBox="0 0 40 40" width="28" height="28" fill="white">
                        <path d="M20,20 L20,8 L24,8 L24,20 L36,20 L36,24 L24,24 L24,36 L20,36 L20,24 L8,24 L8,20 L20,20 Z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default AddCalendarCard;
