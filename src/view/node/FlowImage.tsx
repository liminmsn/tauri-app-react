import { Node, NodeProps, Handle, Position } from "@xyflow/react";
import { Card, Image } from "antd";

function FlowImage(props: NodeProps<Node<{ val: Element }>>) {
    // debugger
    const { val } = props.data;
    const src = val.children[0].getAttribute('data-original');
    const href = val.children[1].children[0].getAttribute('href');
    return <Card className="p-1">
        <Image width={180} src={src || ''} />
        <Handle id="image-target" type={"target"} position={Position.Left} />
    </Card>
}
export default FlowImage;