import React, { memo, FC } from "react";
import "./customNode.css";

import { Handle, Position, NodeProps } from "react-flow-renderer";

const ColorSelectorNode: FC<NodeProps> = () => {
  return (
    <>
      <div className="rhombus">
        <Handle
          type="target"
          position={Position.Right}
          style={{ background: "#555", top: "auto", bottom: "auto" }}
        />
        <div>
          <div className="textInRhombus">Triangle</div>
        </div>
        <Handle
          type="source"
          position={Position.Left}
          style={{ background: "#555", top: 100, bottom: "auto" }}
        />
      </div>
    </>
  );
};

export default memo(ColorSelectorNode);
