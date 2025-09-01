import { Card, Spin, Tag } from "antd";
import { fetchTags, TagsType, TagType } from "../../net/api";
import { Handle, Position, useNodeId, useReactFlow } from "@xyflow/react";
import { Suspense, useCallback, useDeferredValue, useEffect, useState } from "react";
import { TagIcon } from "lucide-react";
import { LoadingOutlined } from "@ant-design/icons";


function FlowTags() {
    const id = useNodeId()!;
    const reactFlow = useReactFlow();
    // debugger
    const addNodes = function (imgs: Element[]) {
        imgs.forEach((item, idx) => {
            const nodeId = String('img_').concat(Math.random().toString(36).slice(2, 10));
            reactFlow.addNodes({
                id: nodeId,
                type: 'Image',
                position: { x: 300 + (Math.random() * Number(Date.now().toString().slice(0, 4))), y: idx * 80 },
                data: { parentId: id, val: item }
            });

            reactFlow.addEdges({
                id: `${id}_to_${nodeId}`,
                source: id,
                target: nodeId,
                animated: true,
                sourceHandle: 'tags-source',
                targetHandle: 'image-target',
            });
        });
        // reactFlow.fitView();
    }


    const [tags, setTags] = useState<TagsType>({ tags: [], page: 0, imgs: [] });
    const [select, setSelect] = useState<TagType>({ tag: '', src: '' });
    const deferredTagArr = useDeferredValue(tags);
    const init = useCallback(() => {
        fetchTags().then(res => {
            addNodes(res.imgs)
            setTags(res);
        });
    }, [tags]);

    useEffect(() => () => init(), []);

    return <Card className="p-2 shadow-sm max-w-60">
        <div className="mb-2 grid cols-2 gap-y-1 grid-content-baseline">
            {tags.tags.map(item => {
                return <Tag
                    key={item.tag}
                    color={select.tag == item.tag ? 'var(--THEME_COLOR)' : 'default'}>
                    <span
                        className={`cursor-pointer ${item == select ? 'effect-text-mask' : 'effect-text-mask_two'}`}
                        style={{ fontFamily: "shouxie" }}
                        onClick={() => setSelect(item)}>
                        <TagIcon className="mr-2" size={14} style={{ transform: 'translateY(4px)' }} />
                        {item.tag}
                    </span>
                </Tag>
            })}
        </div>
        <Suspense fallback={null}>
            {deferredTagArr.tags.length == 0 && <Spin indicator={<LoadingOutlined spin />} /> ||
                <div className="">
                    {tags.page} / 1
                </div>
            }
        </Suspense>
        <Handle id="tags-source" type={"source"} position={Position.Right} />
    </Card>;
}

export default FlowTags;