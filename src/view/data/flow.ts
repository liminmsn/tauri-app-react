import { Edge, Node, NodeTypes } from "@xyflow/react";
import FlowCard from "../node/FlowCard";
import FlowTag from "../node/FlowTag";
import { TextUpdaterNode } from "../node/TextUpdateNode";

const NodesType: NodeTypes = {
    textUpdater: TextUpdaterNode,
    Tag: FlowTag,
    Card: FlowCard
};
const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

initialNodes.push({
    id: '0',
    type: 'Card',
    position: { x: 0, y: 0 },
    data: { tags: ['1', '2', '3', '4'] },
});

export { NodesType, initialEdges, initialNodes }