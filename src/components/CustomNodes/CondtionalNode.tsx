import React, { memo, FC } from "react";
import "./conditionalNode.css";

import { Handle, Position, NodeProps } from "react-flow-renderer";

const ConditionalNode: FC<NodeProps> = () => {
  return (
    <>
      <div className="rhombus">
        <Handle
          type="target"
          position={Position.Right}
          style={{ background: "#555", top: "auto", bottom: "auto" }}
        />
        <Handle
          type="source"
          position={Position.Left}
          style={{ background: "#555", top: 80, bottom: "auto" }}
        />
      </div>
    </>
  );
};

export default memo(ConditionalNode);
