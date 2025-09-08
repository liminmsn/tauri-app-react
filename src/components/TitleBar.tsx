import { Button, Card, Popover } from "antd";
import { Map, Bolt, RotateCw, Venus } from "lucide-react";
import { CSSProperties } from "react";
import SettingView from "./btn/SettingView";
import ControlButton from "./btn/ControlButton";
import { GlobalEvent } from "../util/globalEvent";


const sysBG: CSSProperties = { color: 'var(--THEME_COLOR)' };

export function TitleBar() {
    let mini_map = false;

    function ToggleShowMap() {
        mini_map = !mini_map;
        new GlobalEvent().send('mini_map', mini_map)
    }

    return <div className="flex">
        <Button className="ymr-2 !border-none" style={{ background: 'var(--THEME_COLOR)', color: 'white' }}>
            <Venus size={14} />
        </Button>
        <Card className="min-w-20 text-center select-none ymr-2 effect-border" style={sysBG}>
            <span>{import.meta.env['VITE_NAME']}</span>
        </Card>
        <Button className="ymr-2" onClick={() => ToggleShowMap()} type={"primary"}>
            <Map size={14} />
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
