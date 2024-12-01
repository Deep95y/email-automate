import React, { useState } from "react";
import "./delaymodal.css";
import Connection from './connectioncreate';


const WaitBlockModal = ({ handleWaitClose, handlePlusClose }) => {
  const [waitFor, setWaitFor] = useState("");
  const [waitType, setWaitType] = useState("");

  // const data = { waitFor, waitType };
  // console.log("Data inserted:", data);
  
  const handleInsert = async () => {

    const data = { waitFor, waitType };
    console.log("Data inserted:", data);
  
    // Save both waitFor and waitType together in localStorage
    localStorage.setItem('data', JSON.stringify(data));
  
    // Call Connection function
    await Connection(waitFor, waitType);
  
    // Close both modals after inserting (if handleCloseAll is a function)
    handleCloseAll();
  
    // Clear state after saving to localStorage and completing the function
    // setWaitFor("");
    // setWaitType("");
  };
  

  const handleCloseAll = () => {
    if (typeof handleWaitClose === "function") {
      handleWaitClose(); // Close the secondary modal
    }
    if (typeof handlePlusClose === "function") {
      handlePlusClose(); // Close the primary modal
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Modal Header */}
        <div className="headBar">
          <button className="close-icon" onClick={handleCloseAll}>
            ✖
          </button>
        </div>
        <div className="modalHeader">
          <h2 className="modal-title">Wait</h2>
          <p className="modal-description" style={{ marginBottom: "15px" }}>
            Add a delay between blocks.
          </p>
        </div>

        {/* Modal Form */}
        <div className="modal-form">
          <div className="form-group">
            <label htmlFor="waitFor">Wait For</label>
            <input
              type="number"
              id="waitFor"
              value={waitFor}
              onChange={(e) => setWaitFor(e.target.value)}
              placeholder="Enter a value"
            />
          </div>

          <div className="form-group">
            <label htmlFor="waitType">Wait Type</label>
            <select
              id="waitType"
              value={waitType}
              onChange={(e) => setWaitType(e.target.value)}
            >
              <option value="Seconds">Seconds</option>
              <option value="Minutes">Minutes</option>
              <option value="Hours">Hours</option>
              <option value="Days">Days</option>
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="insert-button" onClick={handleInsert}>
            Insert
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitBlockModal;
