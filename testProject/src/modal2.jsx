import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./modal2.css";
import Connection from "./connectioncreate";

const DropModal = ({ handleCloseModal }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  console.log(selectedOptions);
  const options = [
    "Test List",
    "Test List Sample",
    "SalesBlink Demo (Existing Customers)",
    "SalesBlink Demo",
    "AppSecCon 2023",
    "List Test",
    "Introduction List",
    "Multiple Lists",
  ];

  // Filter options based on the user's input
  const filteredOptions = options
    .filter(
      (option) =>
        option.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedOptions.includes(option) // Exclude already selected options
    )
    .sort((a, b) => {
      const input = inputValue.toLowerCase();
      return (
        a.toLowerCase().indexOf(input) - b.toLowerCase().indexOf(input) ||
        a.length - b.length
      );
    });

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectOption = (option) => {
    setSelectedOptions([...selectedOptions, option]);
    setInputValue(""); // Clear input after selecting
    setDropdownVisible(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setDropdownVisible(true); // Show dropdown when typing
  };

  const removeOption = (optionToRemove) => {
    setSelectedOptions(
      selectedOptions.filter((option) => option !== optionToRemove)
    );
  };

  const clearAllSelections = () => {
    setSelectedOptions([]);
    setInputValue("");
  };

  const handleInsert = async () => {
    try {
      // Save selected options to localStorage
      localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));

      // Call the Connection function with selected options
      await Connection(selectedOptions);

      // Clear selected options and input field after successful insertion
      // setSelectedOptions([]);
      // setInputValue("");
    } catch (error) {
      console.error("Error inserting options:", error);
    }
  };

  const handleCross = () => {
    handleCloseModal();
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <div className="header-two">
          <div className="close-icon" onClick={handleCross}>
            x
          </div>
        </div>
      </div>
      <h2 className="modal-title" style={{ marginTop: "1rem" }}>
        Leads from List(s)
      </h2>

      <p className="modal-description">
        Connect multiple lists as source for this sequence.
      </p>
      <div className="divide"></div>

      <div className="dropdown-section">
        <label className="dropdown-label-two">Select your List(s)</label>
        <button className="list-button">
          <div className="plusicon">+</div>
          <div style={{ marginTop: "0.5rem" }}>New List</div>
        </button>

        {/* Selected Options as Tags */}
        <div className="selected-options">
          {selectedOptions.map((option, index) => (
            <div key={index} className="selected-option">
              {option}
              <span
                className="remove-option"
                onClick={() => removeOption(option)}
              >
                &times;
              </span>
            </div>
          ))}
        </div>

        {/* Dropdown Input */}
        <div className="dropdown-container">
          <input
            type="text"
            className="dropdown-input-two"
            placeholder="Type to search..."
            value={inputValue}
            onChange={handleInputChange}
            onClick={toggleDropdown}
          />
          {selectedOptions.length > 0 && (
            <span className="clear-all-icon" onClick={clearAllSelections}>
              x
            </span>
          )}
          <div
            style={{
              position: "absolute",
              marginLeft: "25.7rem",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                height: "2rem",
                width: "0.08rem",
                background: "black",
                marginTop: "3.5rem",
              }}
            ></div>
            <div>
              <FaChevronDown
                className="dropdown-icon"
                onClick={toggleDropdown}
                style={{ marginLeft: "0.6rem" }}
              />
            </div>
          </div>
        </div>

        {/* Dropdown Options */}
        {dropdownVisible && filteredOptions.length > 0 && (
          <ul className="dropdown-options">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className="dropdown-option"
                onClick={() => selectOption(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
        {dropdownVisible && filteredOptions.length === 0 && (
          <p className="no-options">No matches found</p>
        )}

        {/* Insert Button */}
        <button
          className="insert-button"
          onClick={handleInsert}
          style={{ marginLeft: "23rem", marginTop: "1rem" }}
        >
          Insert
        </button>
      </div>
    </div>
  );
};

export default DropModal;
