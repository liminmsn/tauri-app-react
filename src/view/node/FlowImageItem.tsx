import { Handle, Node, Position, useNodeId, useNodesData } from "@xyflow/react";
import { Card, Image } from "antd";
import { memo, Suspense } from "react";

const FlowImageItem = memo(function () {
    const id = useNodeId()!;
    const data = useNodesData<Node<{ img: HTMLImageElement }>>(id)!;
    const { img } = data.data;
    const src = img.getAttribute('data-original') ?? '';

    return <Card className="p-1 shadow-xl" key={id}>
        <Suspense fallback={<h2>Loding...🍝🍝🍝</h2>}>
            <Image width={120} src={src} />
        </Suspense>
        <Handle id={'imageitem-target'} type={"target"} position={Position.Left} />
    </Card>
})

export default FlowImageItem;