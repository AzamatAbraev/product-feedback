import { useState } from 'react';
import './Dropdown.scss';

interface DropdownProps {
  sortBy: string;
  setSortBy: (option: string) => void;
}

const Dropdown = ({ sortBy, setSortBy }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const options: string[] = ["Most Upvotes", "Least Upvotes", "Most Comments", "Least Comments"];

  const toggleDropdown = (): void => setIsOpen(!isOpen);

  const handleOptionClick = (option: string): void => {
    setSortBy(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <div onClick={toggleDropdown} className="dropdown-header">
        Sort by: {sortBy} <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map(option => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`dropdown-item ${option === sortBy ? 'selected' : ''}`}
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
