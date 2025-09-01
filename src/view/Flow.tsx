import { addEdge, Background, BackgroundVariant, Controls, Edge, Node, NodeTypes, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import { Card, theme } from "antd";
import { useCallback } from "react";
import { useThemeData } from "../theme";
import { FlowPagInation } from "./node/FlowPagInation";
import FlowTags from "./node/FlowTags";
import FlowTag from "./node/FlowTag";
import FlowImage from "./node/FlowImage";

const NodesType: NodeTypes = {
    Pag: FlowPagInation,
    Image: FlowImage,
    Tags: FlowTags,
    Tag: FlowTag,
};

const initialEdges: Edge[] = [];
const initialNodes: Node[] = [
    {
        id: `0`,
        type: 'Tags',
        position: { x: 0, y: 0 },
        data: { tags: [] },
    }
];

function Flow() {
    const theme_ = useThemeData();
    const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );
    // useEffect(() => {
    //     _setNodes(nodes => [
    //         ...nodes,
    //     ]);
    // }, []);

    return <div className="flow" style={{ paddingTop: '2px' }}>
        <Card className="h-full overflow-hidden rounded-2xl effect-border effect-border-top-none">
            <div className="" style={{ height: 'calc(100vh - 31px)' }}>
                <ReactFlow
                    minZoom={0.5}
                    maxZoom={2}
                    colorMode={theme_.themeData.algorithm == theme.darkAlgorithm ? 'dark' : 'light'}
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={NodesType}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView >
                    <Controls />
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="var(--THEME_COLOR)" bgColor="var(--THEME_COLOR_BG)" />
                </ReactFlow>
            </div>
        </Card>
    </div>
}

export default Flow;
