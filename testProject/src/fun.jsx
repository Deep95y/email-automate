import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Mainmodal from './modal1';
import AddBlocksModal from './emailtemplate';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const initialNodes = [
  {
    id: "standalone",
    data: {
      label: (
        <NodeContent label="New Sequence Start" nodeId="standalone" />
      ),
    },
    position: { x: 400, y: 100 },
    style: { background: "#FFD3D3", padding: 10, border: "1px solid #888", cursor: "pointer" },
  },
];

const initialEdges = [];

function NodeContent({ label, nodeId, onEdit, onDelete }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span>{label}</span>
      <div style={{ display: "flex", gap: "8px" }}>
        <FiEdit style={{ cursor: "pointer" }} onClick={() => onEdit(nodeId)} />
        <FiTrash2 style={{ cursor: "pointer" }} onClick={() => onDelete(nodeId)} />
      </div>
    </div>
  );
}

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeId, setNodeId] = useState(2);
  const [showModal1, setShowModal1] = useState(false);
  const [showPlusModal, setShowPlusModal] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [delayTimeInNumber, setDelayTimeInNumber] = useState(0);
  const [typeSelect, setTypeSelect] = useState("");

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  useEffect(() => {
    const storedType = localStorage.getItem('selectedType');
    if (storedType) {
      setTypeSelect(JSON.parse(storedType));
    }

    const storedName = localStorage.getItem('selectedOptions');
    if (storedName) {
      setSelectedList(JSON.parse(storedName));
    }

    const storedTemplate = localStorage.getItem('result');
    if (storedTemplate) {
      const parsedTemplate = JSON.parse(storedTemplate);
      setSelectedTemplate(parsedTemplate.selectedOption || "Default Email Template");
    }

    const storedTimeNumber = localStorage.getItem('data');
    if (storedTimeNumber) {
      const parsedData = JSON.parse(storedTimeNumber);
      setDelayTimeInNumber(parsedData.waitFor || 0);
    }
  }, []);

  const handleStandaloneClick = () => {
    setShowModal1(true);
    const newNodeId = `${nodeId}`;
    const plusNodeId = `${nodeId + 1}`;

    const newNode = {
      id: newNodeId,
      data: {
        label: (
          <NodeContent
            label={selectedList.join(", ") || "New Node"}
            nodeId={newNodeId}
            onEdit={handleEditNode}
            onDelete={handleDeleteNode}
          />
        ),
      },
      position: { x: 400, y: 200 },
      style: { background: "#FFD3D3", padding: 10, border: "1px solid #888" },
    };

    const plusNode = {
      id: plusNodeId,
      data: { label: "+" },
      position: { x: 400, y: 300 },
      style: {
        background: "#D9F5E9",
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 24,
        fontWeight: "bold",
        border: "2px solid #4CAF50",
        cursor: "pointer",
      },
    };

    const newEdge = {
      id: `e${newNodeId}-${plusNodeId}`,
      source: newNodeId,
      target: plusNodeId,
      type: "smoothstep",
    };

    setNodes((nds) => [...nds, newNode, plusNode]);
    setEdges((eds) => [...eds, newEdge]);
    setNodeId((id) => id + 2);
  };

  const handlePlusClick = (id) => {
    setShowPlusModal(true);
    const newNodeId = `${nodeId}`;

    let newLabel = "";
    if (typeSelect === "email") {
      newLabel = selectedTemplate || "Default Email Template";
    } else if (typeSelect === "Wait") {
      newLabel = `Wait: ${delayTimeInNumber}`;
    } else {
      newLabel = "New Node";
    }

    const newNode = {
      id: newNodeId,
      data: {
        label: (
          <NodeContent
            label={newLabel}
            nodeId={newNodeId}
            onEdit={handleEditNode}
            onDelete={handleDeleteNode}
          />
        ),
      },
      position: { x: 400, y: 200 },
      style: { background: "#FFD3D3", padding: 10, border: "1px solid #888" },
    };

    const newEdge = {
      id: `e${newNodeId}-${id}`,
      source: newNodeId,
      target: id,
      type: "smoothstep",
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, newEdge]);
    setNodeId((id) => id + 1);
  };

  const handleEditNode = (id) => {
    const newLabel = prompt("Enter new label:");
    if (newLabel) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id
            ? {
                ...node,
                data: {
                  ...node.data,
                  label: (
                    <NodeContent
                      label={newLabel}
                      nodeId={id}
                      onEdit={handleEditNode}
                      onDelete={handleDeleteNode}
                    />
                  ),
                },
              }
            : node
        )
      );
    }
  };

  const handleDeleteNode = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  };

  const handleNodeClick = (event, node) => {
    if (node.id === "standalone") {
      handleStandaloneClick();
    } else if (node.data.label === "+") {
      handlePlusClick(node.id);
    }
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.90)',
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
    },
  };

  Modal.setAppElement("#root");

  return (
    <>
      <div style={{ height: 500 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          fitView
        >
          <MiniMap nodeColor={(node) => (node.id === "1" ? "red" : "blue")} />
          <Controls />
          <Background color="#888" gap={16} />
        </ReactFlow>
      </div>

      <Modal isOpen={showModal1} onRequestClose={() => setShowModal1(false)} style={customStyles}>
        <Mainmodal handleClose={() => setShowModal1(false)} />
      </Modal>

      <Modal isOpen={showPlusModal} onRequestClose={() => setShowPlusModal(false)} style={customStyles}>
        <AddBlocksModal handlePlusClose={() => setShowPlusModal(false)} />
      </Modal>
    </>
  );
}

export default Flow;
