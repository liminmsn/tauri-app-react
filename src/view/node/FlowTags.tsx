import { Card, Spin, Tag } from "antd";
import { fetchTags, TagsType, TagType } from "../../net/api";
import { Handle, Position, useNodeId, useReactFlow } from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import { TagIcon } from "lucide-react";
import { LoadingOutlined } from "@ant-design/icons";


function FlowTags() {
    const id = useNodeId()!;
    const reactFlow = useReactFlow();
    const addNodes = function (imgs: Element[]) {
        imgs.forEach((item, idx) => {
            const nodeId = String('img_').concat(Math.random().toString(36).slice(2, 10));
            reactFlow.addNodes({
                id: nodeId,
                type: 'Image',
                position: { x: 300 + (Math.random() * 400), y: (idx * 400) - 800 },
                data: { parentId: id, val: item }
            });

            reactFlow.addEdges({
                id: `${id}_to_${nodeId}`,
                source: id,
                target: nodeId,
                animated: true,
                type: 'straight',
                sourceHandle: 'tags-source',
                targetHandle: 'image-target',
                style: {
                    colorScheme: 'red'
                }
            });
        });
        // reactFlow.fitView();
    }


    const [tags, setTags] = useState<TagsType>({ tags: [], imgs: [], page: 0, });
    const [select, setSelect] = useState<TagType>({ tag: '', src: '' });
    const init = useCallback(() => {
        fetchTags().then(res => {
            addNodes(res.imgs)
            setTags(res);
            reactFlow.fitView();
        });
    }, [tags]);

    useEffect(() => () => init(), []);

    return <Card className="p-2 max-w-60 effect-border-light">
        <div className="mb-2 grid cols-2 gap-y-1 grid-content-baseline">
            {tags.tags.map(item => {
                return <Tag
                    key={item.tag}
                    onClick={() => setSelect(item)}
                    color={select.tag == item.tag ? 'var(--THEME_COLOR)' : ''}
                    className={String("cursor-pointer").concat(select.tag == item.tag ? 'effect-border-light' : '')}>
                    <span style={{ fontFamily: "shouxie" }}>
                        <TagIcon className="mr-2" size={14} style={{ transform: 'translateY(4px)' }} />
                        {item.tag}
                    </span>
                </Tag>
            })}
        </div>
        {tags.tags.length == 0 && <Spin indicator={<LoadingOutlined spin />} /> ||
            <div className="">
                {tags.page} / 1
            </div>
        }
        {tags.tags.length > 0 && <Handle id="tags-source" type={"source"} position={Position.Right} />}
    </Card>;
}

export default FlowTags;