import { addEdge, Background, BackgroundVariant, Controls, Edge, MiniMap, Node, NodeTypes, Panel, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import { Card, theme } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useThemeData } from "../theme";
import FlowTags from "./node/FlowTags";
import FlowImage from "./node/FlowImage";
import FlowImageItem from "./node/FlowImageItem";
import { GlobalEvent } from "../util/globalEvent";

const NodesType: NodeTypes = {
    Image: FlowImage,
    ImageItem: FlowImageItem,
    Tags: FlowTags,
};

const initialEdges: Edge[] = [];
const initialNodes: Node[] = [
    {
        id: `tags`,
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

    const [showMiniMap, setShowMinMap] = useState(false);
    useEffect(() => {
        return () => {
            new GlobalEvent().on('mini_map', (bool) => setShowMinMap(bool));
        }
    }, [])

    return <div className="flow" style={{ paddingTop: '2px' }}>
        <Card className="h-full overflow-hidden rounded-2xl effect-border effect-border-top-none">
            <div className="" style={{ height: 'calc(100vh - 28px)' }}>
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
                    <Panel position="top-left">top-left</Panel>
                    <Controls />
                    <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--THEME_COLOR)" bgColor="var(--THEME_COLOR_BG)" />
                    {showMiniMap && <MiniMap nodeStrokeWidth={1} />}
                </ReactFlow>
            </div>
        </Card>
    </div>
}

export default Flow;
