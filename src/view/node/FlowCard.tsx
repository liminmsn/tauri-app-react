import { Card, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { getTags, TagType } from "../../net/api";
import { TagIcon } from "lucide-react";
import { Handle, Position, useReactFlow } from "@xyflow/react";


function FlowCard() {
    const reactFlowInstance = useReactFlow();
    const [tagArr, setTagArr] = useState<TagType[]>([]);
    const [select, setSelect] = useState<TagType>({ tag: '', src: '' });

    useEffect(() => {
        return () => {
            getTags().then(res => {
                setTagArr(res);
                // setSelect(res[0]);
                // setTimeout(() => {
                //     reactFlowInstance.fitView();
                // }, 100);
            });
        }
    }, []);

    return <Card className="p-2 shadow-sm">
        {tagArr.length == 0 && <Spin /> || <Handle type={"target"} position={Position.Right} />}
        <div className="grid cols-2 gap-y-1 grid-content-baseline">
            {tagArr.map(item => {
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
    </Card>;
}

export default FlowCard;