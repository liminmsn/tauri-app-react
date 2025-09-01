import { Node, NodeProps } from "@xyflow/react";
import { Image } from "antd";

function FlowImage(props: NodeProps<Node<{ src: string }>>) {
    return <div>
        <Image src={props.data.src} width={200} />
    </div>
}
export default FlowImage;