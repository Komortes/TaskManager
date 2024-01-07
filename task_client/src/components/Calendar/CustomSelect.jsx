import React, { useState } from 'react';
import Option from './Option';
import styles from './CustomSelect.module.css'; 

const CustomSelect = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (value, label) => {
    console.log("Selected value:", value);
    console.log("Selected label:", label);
    setSelectedValue(label);
    setIsOpen(false);
    onSelect(value);
  };

  return (
    <div className={styles.customSelect} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.selectedValue}>{selectedValue || "Select category"}</div>
      {isOpen && (
        <div className={styles.options}>
          {options.map(option => (
            console.log("Option:", option),
            <Option
              key={option.id}
              {...option}
              onSelect={() => handleSelect(option.value, option.label)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
