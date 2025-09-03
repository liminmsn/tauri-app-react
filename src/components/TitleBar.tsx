import { Button, Card, Popover } from "antd";
import { Flower2, Bolt, RotateCw, Volleyball } from "lucide-react";
import { CSSProperties } from "react";
import SettingView from "./btn/SettingView";
import ControlButton from "./btn/ControlButton";


const sysBG: CSSProperties = { background: 'var(--THEME_COLOR)', border: 'none', color: 'white' };

export function TitleBar() {
    return <div className="flex">
        <Card className="min-w-30 text-center select-none ymr-2 animate__fadeIn" style={sysBG}>
            <span className="mr-2"><Flower2 size={14} style={{ transform: 'translateY(2px)' }} /></span>
            <span className="effect-text-mask">{import.meta.env['VITE_NAME']}</span>
        </Card>
        <Button className="ymr-2" onClick={() => globalThis.location.reload()} type={"primary"}>
            <Volleyball size={14} />
        </Button>
        <Button className="ymr-2" onClick={() => globalThis.location.reload()} type={"primary"}>
            <RotateCw size={14} />
        </Button>
        <Card className="w-full ymr-2 app-region effect-border"></Card>
        <Popover content={<SettingView />} trigger={"click"} placement={"bottom"}>
            <Button className="ymr-2" type={"primary"}>
                <Bolt size={14} />
            </Button>
        </Popover>
        <ControlButton />
    </div>
}
