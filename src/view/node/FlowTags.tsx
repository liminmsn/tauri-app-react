import { Card, Pagination, Spin, Tag } from "antd";
import { getTags, TagType } from "../../net/api";
import { Handle, Position } from "@xyflow/react";
import { Suspense, useCallback, useDeferredValue, useEffect, useState } from "react";
import { TagIcon } from "lucide-react";
import { LoadingOutlined } from "@ant-design/icons";


function FlowTags() {
    const [tagArr, setTagArr] = useState<TagType[]>([]);
    const [select, setSelect] = useState<TagType>({ tag: '', src: '' });
    const deferredTagArr = useDeferredValue(tagArr);

    const init = useCallback(() => {
        getTags().then(res => {
            setTagArr(res);
            // setSelect(res[0]);
            // setTimeout(() => {
            //     reactFlowInstance.fitView();
            // }, 100);
        });
    }, [tagArr]);
    useEffect(() => () => init(), []);

    return <Card className="p-2 shadow-sm">
        <div className="mb-2 grid cols-2 gap-y-1 grid-content-baseline">
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
        <Suspense fallback={null}>
            {deferredTagArr.length == 0 && <Spin indicator={<LoadingOutlined spin />} /> ||
                <div className="">
                    <Pagination align="start" defaultCurrent={1} total={50} /> <Handle type={"target"} position={Position.Right} />
                </div>
            }
        </Suspense>
    </Card>;
}

export default FlowTags;