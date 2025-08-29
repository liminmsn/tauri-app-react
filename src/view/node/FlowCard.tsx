import { Node, NodeProps } from "@xyflow/react";
import { Card, Tag } from "antd";
import { TagIcon } from "lucide-react";

function FlowCard(prop: NodeProps<Node<{ tags: string[] }>>) {
    return <Card className="p-1 shadow-xl">
        <div className="gird cols-6">
            {prop.data.tags.map(tag => {
                return <Tag key={tag} icon={<TagIcon />}>
                    {tag}
                </Tag>
            })}
        </div>
    </Card>;
}

export default FlowCard;