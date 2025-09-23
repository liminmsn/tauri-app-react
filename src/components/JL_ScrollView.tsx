import { Card, FloatButton } from "antd";
import { ArrowUpToLine } from "lucide-react";
import React, { useRef, useState } from "react";
import { icon_size, icon_width } from "./Titlebar/TitleBar";

type JLScrollViewType = {
    children: React.ReactNode;
    pos?: React.CSSProperties;
    /**0-1 */
    speed?: number;
}
export function JLScrollView({ children, pos = { right: 12, bottom: 12 }, speed = 1 }: JLScrollViewType) {
    const [show, setShow] = useState(false);
    const scroll = useRef<HTMLDivElement>(null);
    const onScroll = function () {
        const { scrollTop } = scroll.current!;
        const { scrollHeight } = document.body;
        setShow(scrollTop > (scrollHeight * speed));
    }

    return <div className="w-full h-full overflow-hidden">
        <Card className="overflow-y-auto overflow-x-hidden w-full h-full pr-1" ref={scroll} onScroll={onScroll}>
            {children}
        </Card>
        {show && <FloatButton.Group shape="square" style={pos}>
            {/* <FloatButton.BackTop
                visibilityHeight={0}
                onClick={() => scroll.current?.scrollTo({ top: 0, behavior: 'smooth' })} /> */}
            <FloatButton
                type="primary"
                icon={<ArrowUpToLine size={icon_size} strokeWidth={icon_width} />}
                onClick={() => scroll.current?.scrollTo({ top: 0, behavior: 'smooth' })} />
        </FloatButton.Group>}
    </div>
}
export default JLScrollView;