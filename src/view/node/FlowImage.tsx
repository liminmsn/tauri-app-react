import { Node, Handle, Position, useReactFlow, useNodeId, useNodesData } from "@xyflow/react";
import { Card, Image } from "antd";
import { memo, Suspense, useEffect } from "react";
import { fetchImgs } from "../../net/api";

const FlowImage = memo(function () {
    const id = useNodeId()!;
    const data = useNodesData<Node<{ val: Element }>>(id)!;
    const { val } = data.data;
    const src = val.children[0].getAttribute('data-original') || '';
    const title = val.children[0].getAttribute('alt') || '';
    // debugger
    const href = val.children[1].children[0].getAttribute('href');
    const reactFlow = useReactFlow();
    const node = reactFlow.getNode(id)!;
    const { x, y } = node.position;
    useEffect(() => () => {
        href && fetchImgs(href).then((img_arr) => img_arr.forEach((img, idx) => {
            const cid = id.concat('_', Math.random().toString(32).slice(2, 5));
            // debugger
            reactFlow.addNodes({
                type: 'ImageItem',
                id: cid,
                position: { x: x + ((idx * 130) + 300), y: y + ((Math.random() * 300) - 150) },
                data: { img },
            });
            reactFlow.addEdges({
                id: Math.random().toString(36).slice(2),
                source: id,
                target: cid,
                animated: true,
                sourceHandle: 'image-source',
                targetHandle: 'imageitem-target',
            })
        }));
    }, []);
    return <Card className="p-1 shadow-md" key={id}>
        <Suspense fallback={<h2>Loding...🍝🍝🍝</h2>}>
            <div className="text-right" style={{ fontFamily: 'shouxie' }}>{title}</div>
            <Image width={180} src={src} preview={false} />
        </Suspense>
        <Handle id="image-target" type={"target"} position={Position.Left} />
        <Handle id="image-source" type={"source"} position={Position.Right} />
    </Card>
})
export default FlowImage;