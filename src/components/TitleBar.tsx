import { Button, Card, Popover, Space, Switch } from "antd";
import { Minus, X, Maximize, Minimize, Flower2, Bolt } from "lucide-react";
import { Window } from "@tauri-apps/api/window";
import { useState, CSSProperties } from "react";
import { useThemeData, theme_color_arr, setThemeColor, toggleThemeDark } from "../theme";
import { isEqual } from "../util/util";
const win = new Window('main');

const sysBG: CSSProperties = { background: 'var(--THEME_COLOR)', border: 'none', color: 'white' };

export function TitleBar() {
    const [maximizee, setMaximizee] = useState(false);
    function toggleMaximize() {
        win.toggleMaximize().then(() => {
            win.isMaximized().then(val => setMaximizee(val));
        });
    }

    return <div className="flex">
        <Card className="min-w-30 text-center select-none" style={sysBG}>
            <span className="mr-2"><Flower2 size={14} style={{ transform: 'translateY(2px)' }} /></span>
            <span className="effect-text-mask">{import.meta.env['VITE_NAME']}</span>
        </Card>
        <Card className="w-full mx-1 app-region"></Card>
        <Popover content={<SettingView />} trigger={"click"} placement={"bottom"}>
            <Button className="mr-1" type={"primary"}>
                <Bolt size={14} />
            </Button>
        </Popover>
        <Space direction={"horizontal"} size={3}>
            <Button onClick={() => win.minimize()}><Minus size={14} /></Button>
            <Button onClick={() => toggleMaximize()}>{maximizee ? <Minimize size={14} /> : <Maximize size={14} />}</Button>
            <Button onClick={() => win.close()} danger type={"primary"}><X size={14} /></Button>
        </Space>
    </div>
}

//设置视图
function SettingView() {
    const config = useThemeData();
    const select_color: CSSProperties = {
        boxShadow: '0 1px 10px var(--THEME_COLOR)'
    }

    return <div className="">
        {/* <label className="text-sm">夜间：</label> */}
        <Switch value={localStorage.getItem('theme_dart') === 'true'} onChange={(bol: boolean) => toggleThemeDark(config, bol)} />
        <div className="flex mt-1 gap-1">
            {theme_color_arr.map(color => {
                return <div key={color}
                    className={`w-5 h-5 rounded-sm`}
                    style={{ background: color, ...isEqual(color, config.themeData.token?.colorPrimary, select_color) }}
                    onClick={() => setThemeColor(config, color)}></div>
            })}
        </div>
    </div>
}