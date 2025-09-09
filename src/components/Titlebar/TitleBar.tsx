import { Button, Card, Popover } from "antd";
import { Flower2, Bolt } from "lucide-react";
import SettingView from "./children/SettingView";
import ControlBtn from "./children/ControlBtn";

export function TitleBar() {
    return <div className="flex">
        <Card className="mr-1 app-region w-40">
            <span className="ml-1"><Flower2 size={14} color="var(--THEME_COLOR)" style={{ transform: 'translateY(2px)' }} /></span>
            <span style={{ color: 'var(--THEME_COLOR)' }}>{import.meta.env['VITE_NAME']}</span>
        </Card>
        <Card className="mr-1 w-full app-region"></Card>
        <Popover content={<SettingView />} trigger={"click"} placement={"bottom"}>
            <Button className="mr-1" type={"primary"}>
                <Bolt size={14} />
            </Button>
        </Popover>
        <ControlBtn />
    </div>
}
