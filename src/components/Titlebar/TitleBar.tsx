import { Button, Card, Input, Popover } from "antd";
import { Flower2, Bolt, Search } from "lucide-react";
import SettingView from "./children/SettingView";
import ControlBtn from "./children/ControlBtn";
import { CSSProperties } from "react";

const sys_bg: CSSProperties = { background: 'var(--THEME_COLOR)', color: "white" }

export function TitleBar() {
    return <div className="flex" style={{ height: '24px' }}>
        <Card className="mr-1 app-region w-60" style={sys_bg}>
            <span className="ml-1"><Flower2 size={14} style={{ transform: 'translateY(2px)' }} /></span>
            <span>{import.meta.env['VITE_NAME']}</span>
        </Card>
        <Card className="mr-1 w-full app-region"></Card>
        <Card className="mr-1 w-100 ">
            <div className="flex">
                <Input className="border-none" placeholder="搜索动漫" />
                <Button type="primary"><Search size={14} /></Button>
            </div>
        </Card>
        <Popover content={<SettingView />} trigger={"click"} placement={"bottom"}>
            <Button className="mr-1 !mb-0" type={"primary"}>
                <Bolt size={14} />
            </Button>
        </Popover>
        <ControlBtn />
    </div>
}
