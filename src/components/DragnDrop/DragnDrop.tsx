import React, { useState, DragEvent } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  OnLoadParams,
  Elements,
  Connection,
  Edge,
  MiniMap,
  Node,
} from "react-flow-renderer";

import Sidebar from "./Siderbar";
import { v4 as uuidv4 } from "uuid";

import ConditionalNode from "../CustomNodes/ConditionalNode";
import ProcessNode from "../CustomNodes/ProcessNode";
import StartNode from "../CustomNodes/StartNode";

import "./dnd.css";

const initialElements = [
  {
    id: "1",
    type: "input",
    data: { label: "" },
    position: { x: 250, y: 5 },
  },
];

const nodeTypes = {
  conditionalNode: ConditionalNode,
  processNode: ProcessNode,
  startNode: StartNode,
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

export interface DnDFlowProps {}

const DnDFlow: React.SFC<DnDFlowProps> = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  const [elements, setElements] = useState<Elements>(initialElements);

  const onConnect = (params: Connection | Edge) =>
    setElements((els) => addEdge({ ...params, animated: true }, els));

  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (_reactFlowInstance: OnLoadParams) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (reactFlowInstance) {
      const type = event.dataTransfer.getData("application/reactflow");
      const position = reactFlowInstance.project({
        x: event.clientX,
        y: event.clientY - 40,
      });
      const newNode: Node = {
        id: uuidv4(),
        type,
        position,
        data: { label: `` }, // ${type} node
      };

      setElements((es) => es.concat(newNode));
    }
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper">
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            style={{ width: "100%", height: "90vh" }}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            deleteKeyCode={46}
            nodeTypes={nodeTypes}
            onDragOver={onDragOver}
          >
            <MiniMap
              nodeStrokeColor={(n: any) => {
                if (n.style?.background) return n.style.background;
                if (n.type === "input") return "#0041d0";
                if (n.type === "output") return "#ff0072";
                if (n.type === "default") return "#1a192b";
                if (n.type === "conditionalNode") return "#FF0000";
                if (n.type === "processNode") return "#000";
                return "#eee";
              }}
              nodeColor={(n: any) => {
                if (n.style?.background) return n.style.background;
                return "#fff";
              }}
              nodeBorderRadius={2}
            />
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
