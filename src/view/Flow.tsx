import { addEdge, Background, BackgroundVariant, Controls, Edge, Node, NodeTypes, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import { Card, theme } from "antd";
import { useCallback } from "react";
import { useThemeData } from "../theme";
import { TextUpdaterNode } from "./node/TextUpdateNode";
import FlowTag from "./node/FlowTag";
import FlowCard from "./node/FlowCard";


const NodesType: NodeTypes = {
    textUpdater: TextUpdaterNode,
    Tag: FlowTag,
    Card: FlowCard
};
const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

initialNodes.push({
    id: '0',
    type: 'Tag',
    position: { x: 0, y: 0 },
    data: { tag: '纯正' },
});
initialNodes.push(...(function () {
    const arr = [];
    const containerWidth = document.body.clientWidth;
    const containerHeight = document.body.clientHeight ;
    for (let i = 0; i < 10; i++) {
        const x = Math.floor(Math.random() * (containerWidth - 120));
        const y = Math.floor(Math.random() * (containerHeight - 120));
        arr.push(
            {
                id: `${i + 1}`,
                type: 'Card',
                position: { x, y },
                data: { src: 'https://img-s.msn.cn/tenant/amp/entityid/BB1msIHt?w=0&h=0&q=60&m=6&f=jpg&u=t' },
            }
        );
    }
    return arr;
})());


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
