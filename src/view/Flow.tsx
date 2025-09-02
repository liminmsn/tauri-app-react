import { addEdge, Background, BackgroundVariant, Controls, Edge, MiniMap, Node, NodeTypes, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import { Card, theme } from "antd";
import { useCallback } from "react";
import { useThemeData } from "../theme";
import FlowTags from "./node/FlowTags";
import FlowImage from "./node/FlowImage";
import { FlowImageItem } from "./node/FlowImageItem";

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

    return <div className="flow" style={{ paddingTop: '2px' }}>
        <Card className="h-full overflow-hidden rounded-2xl effect-border effect-border-top-none">
            <div className="" style={{ height: 'calc(100vh - 31px)' }}>
                <ReactFlow
                    minZoom={0.3}
                    maxZoom={2}
                    colorMode={theme_.themeData.algorithm == theme.darkAlgorithm ? 'dark' : 'light'}
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={NodesType}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView >
                    <Controls>
                        {/* <ControlButton onClick={() => alert('Something magical just happened. ✨')}>
                            <OrbitIcon />
                        </ControlButton> */}
                    </Controls>
                    {/* <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="var(--THEME_COLOR)" bgColor="var(--THEME_COLOR_BG)" /> */}
                    <MiniMap nodeStrokeWidth={3} position={'bottom-right'} />
                </ReactFlow>
            </div>
        </Card>
    </div>
}

export default Flow;
