import { Node, NodeProps } from "@xyflow/react";
import { Tag } from "antd";

function FlowTag(props: NodeProps<Node<{ tag: string }>>) {
    return <Tag bordered style={{ fontFamily: "shouxie" }}>{props.data.tag}</Tag>
}

export default FlowTag;