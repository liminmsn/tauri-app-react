import { addEdge, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import { Card } from "antd";
import { useCallback } from "react";

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
function Home() {
    const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return <div className="home w-full pt-0 box-border" style={{ height: 'calc(100% - 24.5px)', paddingTop: '2px' }}>
        <Card className="h-full">
            <div style={{ height: 'calc(100vh - 29px)' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView />
            </div>
        </Card>
    </div>
}

export default Home;
