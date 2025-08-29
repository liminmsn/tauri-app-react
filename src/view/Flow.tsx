import { addEdge, Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import { Card, theme } from "antd";
import { useCallback, useEffect } from "react";
import { useThemeData } from "../theme";
import { initialNodes, initialEdges, NodesType } from "./data/flow";
import { getTags } from "../net/api";

function Flow() {
    const theme_ = useThemeData();
    const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );
    useEffect(() => () => {
        getTags().then(val => {
            console.log(val);
        })
    }, []);

    return <div className="flow" style={{ paddingTop: '2px' }}>
        <Card className="h-full overflow-hidden rounded-2xl effect-border effect-border-top-none">
            <div className="" style={{ height: 'calc(100vh - 31px)' }}>
                <ReactFlow
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
