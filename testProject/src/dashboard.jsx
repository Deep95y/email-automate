import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Mainmodal from "./modal1";
import AddBlocksModal from "./emailtemplate";
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
    style: {
      background: "#FFD3D3",
      padding: 10,
      border: "1px solid #888",
      cursor: "pointer",
    },
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
  const [selectedType, setSelectedType] = useState(""); // Stores 'email' or 'delay'
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [emailType, setEmailType] = useState("");
  const [delayTimeInNumber, setDelayTimeInNumber] = useState("");
  const [delayTimeInType, setDelayTimeInType] = useState("");

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  useEffect(() => {
    const storedTemplate = JSON.parse(localStorage.getItem("selectedOption"));
    if (storedTemplate) setSelectedTemplate(storedTemplate);

    const storedEmailType = JSON.parse(localStorage.getItem("emailType"));
    if (storedEmailType) setEmailType(storedEmailType);

    const storedTimeNumber = JSON.parse(localStorage.getItem("waitFor"));
    if (storedTimeNumber) setDelayTimeInNumber(storedTimeNumber);

    const storedTimeType = JSON.parse(localStorage.getItem("waitType"));
    if (storedTimeType) setDelayTimeInType(storedTimeType);
  }, []);

  const handlePlusClick = (id) => {
    const newNodeId = `${nodeId}`;

    let newLabel = "";
    if (selectedType === "email") {
      newLabel = `${selectedTemplate} - ${emailType}`;
    } else if (selectedType === "delay") {
      newLabel = `Wait: ${delayTimeInNumber} ${delayTimeInType}`;
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
      id: `e${id}-${newNodeId}`,
      source: id,
      target: newNodeId,
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

  const handleStandaloneClick = () => {
    if (selectedType) {
      handlePlusClick("standalone");
    } else {
      alert("Please select Email or Delay first.");
    }
  };

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setSelectedType("email")}>Add Email</button>
        <button onClick={() => setSelectedType("delay")}>Add Delay</button>
      </div>

      <div style={{ height: 500 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleStandaloneClick}
          fitView
          style={{ background: "#FAFAFA" }}
        >
          <MiniMap nodeColor={(node) => (node.id === "1" ? "red" : "blue")} />
          <Controls />
          <Background color="#888" gap={16} />
        </ReactFlow>
      </div>
    </>
  );
}

export default Flow;
