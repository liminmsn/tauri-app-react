import { Handle, Node, Position, useNodeId, useNodesData } from "@xyflow/react";
import { Card, Image } from "antd";

function FlowImageItem() {
    const id = useNodeId()!;
    const data = useNodesData<Node<{ img: HTMLImageElement }>>(id)!;
    const { img } = data.data;
    return <Card className="p-1 shadow-xl" key={id}>
        <Image width={120} src={img.getAttribute('data-original') ?? ''} />
        <Handle id={'imageitem-target'} type={"target"} position={Position.Left} />
    </Card>
}

export { FlowImageItem }