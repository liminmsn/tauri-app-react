import { Handle, Position } from "@xyflow/react";
import { Card, Pagination } from "antd";

export function FlowPagInation() {
    return <Card className="p-2 px-4">
        <Pagination align="start" defaultCurrent={1} total={50} />
        <Handle type={"source"} position={Position.Left} />
        <Handle type={"target"} position={Position.Right} />
    </Card>
}