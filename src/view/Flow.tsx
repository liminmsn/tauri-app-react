import { addEdge, Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import { Card, theme } from "antd";
import { useCallback } from "react";
import { useThemeData } from "../theme";
import { TextUpdaterNode } from "./node/TextUpdateNode";


const initialNodes = [
    // { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    // { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    { id: '3', position: { x: 0, y: 120 }, type: 'textUpdater', data: { label: '1' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

function Flow() {
    const theme_ = useThemeData();

    const nodeTypes = {
        textUpdater: TextUpdaterNode,
    };
    const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return <div className="flow w-full pt-0 box-border" style={{ height: 'calc(100% - 24.1px)', paddingTop: '2px' }}>
        <Card className="h-full border-none">
            { }
            <div style={{ height: 'calc(100vh - 26.1px)' }}>
                <ReactFlow
                    colorMode={theme_.themeData.algorithm == theme.darkAlgorithm ? 'dark' : 'light'}
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView >
                    <Controls />
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="var(--THEME_COLOR)" />
                </ReactFlow>
            </div>
        </Card>
    </div>
}

export default Flow;
