import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import "./modal3.css";
import Connection from './connectioncreate';

const DropEmailModal = ({handleCloseblock}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [emailType, setEmailType] = useState("Please select an option");

  console.log(selectedOption);
  console.log(emailType);

  const options = [
    "AI Assisted - follow Up3",
    "AI Assisted - follow Up1",
    "AI Assisted",
    "AI Assisted - follow Up2",
    "SalesBank Demo(existing customer",
    "SalesBlink Demo #1",
    "Web-Application - Follow Up1",
   
  ];

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  const handleInsert = () => {
    const result = {selectedOption, emailType};
     console.log(result);
     Connection(selectedOption, emailType);
  }

  const handleButtonClose = () => {
    handleCloseblock();
  }

  return (
    <div className="modal">
      <div className="modal-header">
       
        <button className="close-icon" onClick={handleButtonClose}>×</button>
      </div>
      <h2 className="modal-title">Leads from List(s)</h2>
      <p className="modal-description">
        Connect multiple lists as source for this sequence.
      </p>

      <div className="dropdown-section">
        <label className="dropdown-label">Email template</label>
        <div style={{display:'flex',flexDirection:'row',gap:'0.3rem'}}>
        <div className="edit"><HiPencil style={{marginTop:'8px'}}/></div>
        <button className="new-list-button">New Template
          <div className="plus">+</div>
        </button>
        </div>
        <div className="dropdown-container">
          <input
            type="text"
            className="dropdown-input"
            value={selectedOption}
            onClick={toggleDropdown}
            readOnly
          />
        <div style={{height:'1.7rem',width:'0.08rem',background:'black',position:'absolute',marginLeft:'26rem',marginTop:'10px'}}></div>
        <div style={{position:'absolute',marginLeft:'26.7rem',marginTop:'11px',fontSize:'10px'}}>
              <FaChevronDown
                className="icon-drop"
                onClick={toggleDropdown}
                
              />
            </div>
       
        </div>
        {dropdownVisible && (
          <ul className="dropdown-options">
            {options.map((option, index) => (
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
      </div>

      <div className="form-group">
            <div><label htmlFor="waitType">Send email as</label></div>
            <div>
            <div style={{height:'1.8rem',width:'0.08rem',background:'black',position:'absolute',marginLeft:'26rem',marginTop:'5px'}}></div>
              <select
              id="emailType"
              value={emailType}
              onChange={(e) => setEmailType(e.target.value)}
              
            >
              
              <option value="Please select an option">Please select an option</option>
              <option value="New-Email">New-Email</option>
              <option value="Re-FollowUp">Re-FollowUp</option>
            </select>
           
            </div>

            <p style={{fontStyle:'italic',fontSize:'10px'}}>Since you are sending email as "Re-FollowUp</p>
            <p style={{fontStyle:'italic',position:'absolute',marginTop:'6rem',fontSize:'10px'}}>Subject line of this template will be ignored and follow Up email will be sent in a thread as a reply to the last email</p>
          </div>
      
          <div className="modal-footer">
          <button className="insert-button" onClick={handleInsert}>
            Insert
          </button>
        </div>
    </div>
  );
};

export default DropEmailModal;


