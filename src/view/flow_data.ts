import { Edge, Node, NodeTypes } from "@xyflow/react";
import FlowCard from "./node/FlowCard";
import FlowTag from "./node/FlowTag";
import { TextUpdaterNode } from "./node/TextUpdateNode";
import { FlowPagInation } from "./node/FlowPagInation";

const NodesType: NodeTypes = {
    textUpdater: TextUpdaterNode,
    Tag: FlowTag,
    Pag: FlowPagInation,
    Card: FlowCard
};
const initialNodes: Node[] = [
    {
        id: `0`,
        type: 'Card',
        position: { x: 0, y: 0 },
        data: { tags: [] },
    },
    {
        id: `1`,
        type: 'Pag',
        position: { x: 400, y: 0 },
        data: { tags: [] },
    }
];
const initialEdges: Edge[] = [];

export { NodesType, initialEdges, initialNodes }