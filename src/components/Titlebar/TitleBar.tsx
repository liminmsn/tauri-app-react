import { Button, Card, Popover } from "antd";
import { Bolt, RefreshCw, ArrowLeft } from "lucide-react";
import SettingView from "./children/SettingView";
import ControlBtn from "./children/ControlBtn";
import { CSSProperties, useEffect } from "react";
import SearchIpt from "./children/SearchIpt";
import { useNavigate } from "react-router-dom";
import { JLHistory } from "../../core/store/JL_LocalStorage";

const sys_bg: CSSProperties = { background: 'var(--THEME_COLOR)', color: "white", marginLeft: '2px' }

export function TitleBar() {
    const navigate = useNavigate();
    useEffect(() => () => {
        new JLHistory();
    }, []);

    return <div className="flex" style={{ height: '24px' }}>
        <img className="app-region" width={24} src="/icon_2.png" />
        <Card className="mr-1 app-region w-40" style={sys_bg}>
            <span className="ml-1 font_one select-none cursor-pointer" onClick={() => { history.go(-(history.length - 1)) }}>{import.meta.env['VITE_NAME']}</span>
        </Card>
        <Card className="mr-1 w-full app-region"></Card>
        <Button className="mr-1 !mb-0" type={"primary"} onClick={() => navigate(-1)}>
            <ArrowLeft size={14} />
        </Button>
        <Button className="mr-1 !mb-0" type={"primary"} onClick={() => globalThis.location.reload()}>
            <RefreshCw size={14} />
        </Button>
        <SearchIpt />
        <Popover content={<SettingView />} trigger={"click"} placement={"bottom"}>
            <Button className="mr-1 !mb-0" type={"primary"}>
                <Bolt size={14} />
            </Button>
        </Popover>
        <ControlBtn />
    </div>
}
