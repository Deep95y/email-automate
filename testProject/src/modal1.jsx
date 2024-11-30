import React, { useState } from "react";
import "./modal1.css";
import Modal from "react-modal";
import DropModal from "./modal2";

const Mainmodal = ({ handleClose }) => {
  const [showMainModal, setShowMainModal] = useState(true); // State to track Main Modal visibility
  const [showDropModal1, setShowDropModal1] = useState(false); // State to track DropModal visibility

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.90)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      background: "transparent",
      margin: 0,
      padding: 0,
      border: "none",
      outline: "none",
      position: "fixed",
      boxSizing: "border-box",
      overflow: "hidden",
    },
  };

  Modal.setAppElement("#root");

  const handleCloseModal = () => {
    setShowDropModal1(false); // Close DropModal
  };

  const handleOpenDropModal = (id) => {
    if (id === 1) {
      setShowMainModal(false); // Close Main Modal
      setShowDropModal1(true); // Open DropModal
    }
  };

  const handleClickclose = () => {
    setShowMainModal(false); // Close Main Modal
   // Call parent component's close handler if any
  };

  const items = [
    {
      id: 1,
      title: "Leads from List(s)",
      description: "Connect multiple lists as source for this sequence.",
      icon: "👥",
    },
    {
      id: 2,
      title: "Segment by Events",
      description: "Create a segment of leads who have engaged with emails.",
      icon: "📊",
    },
    {
      id: 3,
      title: "Segment of List",
      description: "Create a segment of leads which match SalesBlink Variables.",
      icon: "📂",
    },
    {
      id: 4,
      title: "Lead from CRM Integration",
      description: "Pulls leads from your CRM integrations.",
      icon: "⚡",
    },
  ];

  // Helper function to group items into pairs
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const groupedItems = chunkArray(items, 2);

  return (
    <>
      {/* Main Modal */}
      <Modal
        isOpen={showMainModal}
        onRequestClose={handleClickclose}
        style={customStyles}
      >
        <div className="main">
          <div className="header">
            <div className="close" onClick={handleClickclose}>
              x
            </div>
          </div>

          <div className="title">Add a source block</div>
          <p className="description">
            Pick a block @ configure, any new leads that match rules will be
            added to sequence automatically
          </p>
          <div className="divider"></div>

          <div className="sources-title">Sources</div>

          <div className="container">
            {groupedItems.map((group, index) => (
              <div className="column" key={index}>
                {group.map((item, idx) => (
                  <div
                    className="box"
                    key={idx}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      cursor: "pointer", // Make it clickable
                    }}
                    onClick={() => handleOpenDropModal(item.id)} // Handle modal open
                  >
                    <div
                      style={{
                        height: "3rem",
                        width: "3rem",
                        borderRadius: "0.3rem",
                        border: "1px solid #ccc",
                        alignItems: "center",
                        padding: "5px",
                        marginTop: "5px",
                        background: "lightpink",
                      }}
                    >
                      <div style={{ fontSize: "2rem" }}>{item.icon}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div
                        style={{
                          marginLeft: "2rem",
                          fontWeight: "bolder",
                          fontSize: "1rem",
                          marginBottom: "10px",
                        }}
                      >
                        {item.title}
                      </div>
                      <div style={{ marginLeft: "2rem" }}>
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* DropModal */}
      <Modal
        isOpen={showDropModal1}
        onRequestClose={handleCloseModal}
        style={customStyles}
      >
        <DropModal handleCloseModal={handleCloseModal} />
      </Modal>
    </>
  );
};

export default Mainmodal;
