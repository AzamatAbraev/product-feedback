import { useState } from 'react';
import './Dropdown.scss';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("Most Upvotes");

  const options: string[] = ["Most Upvotes", "Least Upvotes", "Most Comments", "Least Comments"];

  const toggleDropdown = (): void => setIsOpen(!isOpen);

  const handleOptionClick = (option: string): void => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <div onClick={toggleDropdown} className="dropdown-header">
        Sort by : {selectedOption} <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map(option => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className="dropdown-item"
              style={{ color: option === selectedOption ? '#c06dfd' : 'black' }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
