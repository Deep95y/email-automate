import React, { useState } from "react";
import "./emailtemplate.css";
import DropEmailModal from "./modal3";
import Modal from "react-modal";
import WaitBlockModal from './delaymodal';

const AddBlocksModal = ({ handlePlusClose }) => {
  const [shownlockmodal, setShowblockmodal] = useState(false); // Cold Email Modal
  const [showdelayblock, setShowdelayblock] = useState(false); // Wait Block Modal
  const [isParentModalOpen, setIsParentModalOpen] = useState(true); // Parent Modal

  // Handle opening modals based on block name
  const handleOpenAll = (name) => {
    setIsParentModalOpen(false); // Close Parent Modal
    if (name === "Cold Email") {
      setShowblockmodal(true);
    } else if (name === "Wait") {
      setShowdelayblock(true);
    }
  };

  // Handle Closing Modals
  const handleCloseblock = () => {
    setShowblockmodal(false);
    setIsParentModalOpen(true); // Reopen Parent Modal
  };

  const handleWaitClose = () => {
    setShowdelayblock(false);
    setIsParentModalOpen(true); // Reopen Parent Modal
  };

  // Custom Modal Styles
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

  const blocks = [
    {
      category: "Outreach",
      items: [
        { name: "Cold Email", description: "Send an email to a lead.", icon: "📧" },
        { name: "Task", description: "Schedule a manual task.", icon: "✅" },
      ],
    },
    {
      category: "Conditions",
      items: [
        { name: "Wait", description: "Add a delay between blocks.", icon: "⏳" },
        { name: "If/Else (Rules)", description: "Route leads through the sequence based on events.", icon: "🔀" },
        { name: "A/B Split", description: "Equally split contacts into two separate flows.", icon: "🔗" },
      ],
    },
  ];

  return (
    <>
      {isParentModalOpen && (
        <div className="modal-email">
          <div className="modal-header">
            <span className="modal-close" onClick={handlePlusClose}>✖</span>
          </div>
          <div className="divide3"></div>
          <h2 className="modal-title">Add Blocks</h2>
          <p className="modal-subtitle">Click on a block to configure and add it in sequence.</p>
          <div className="modal-content">
            {blocks.map((blockCategory, categoryIndex) => (
              <div key={categoryIndex} className="block-category">
                <h3 className="block-category-title">{blockCategory.category}</h3>
                <div className="block-items">
                  {blockCategory.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="block-item"
                      onClick={() => handleOpenAll(item.name)}
                    >
                      <div className="block-icon">{item.icon}</div>
                      <div className="block-info">
                        <h4 className="block-name">{item.name}</h4>
                        <p className="block-description">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cold Email Modal */}
      <Modal
        isOpen={shownlockmodal}
        onRequestClose={handleCloseblock}
        style={customStyles}
      >
        <DropEmailModal handleCloseblock={handleCloseblock} />
      </Modal>

      {/* Wait Block Modal */}
      <Modal
        isOpen={showdelayblock}
        onRequestClose={handleWaitClose}
        style={customStyles}
      >
        <WaitBlockModal handleWaitClose={handleWaitClose} handlePlusClose={handlePlusClose}/>
      </Modal>
    </>
  );
};

export default AddBlocksModal;
