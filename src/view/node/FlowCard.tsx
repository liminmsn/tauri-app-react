import { Node, NodeProps } from "@xyflow/react";
import { Card, Image } from "antd";

function FlowCard(prop: NodeProps<Node<{ src: string }>>) {
    return <Card className="p-1 shadow-xl">
        <Image width={100} height={150} src={prop.data.src} />
    </Card>;
}

export default FlowCard;