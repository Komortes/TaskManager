import React, { useState,useEffect } from 'react';
import Option from './Option';
import styles from './CustomSelect.module.css'; 

const CustomSelect = ({ options, onSelect, selectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptionLabel, setSelectedOptionLabel] = useState("");

  useEffect(() => {
    const selectedOption = options.find(option => option.value === selectedValue);
    if (selectedOption) {
      setSelectedOptionLabel(selectedOption.label);
    }
  }, [selectedValue, options]);

  const handleSelect = (value, label) => {
    console.log("Selected value:", value);
    console.log("Selected label:", label);
    setSelectedOptionLabel(label);
    setIsOpen(false);
    onSelect(value);
  };

  return (
    <div className={styles.customSelect} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.selectedValue}>{selectedOptionLabel || "Select category"}</div>
      {isOpen && (
        <div className={styles.options}>
          {options.map(option => (
            <Option
              key={option.value}
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
