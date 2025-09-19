import { Button, Card, Popover } from "antd";
import { Bolt, RefreshCw, ArrowLeft, History } from "lucide-react";
import SettingView from "./children/SettingView";
import ControlBtn from "./children/ControlBtn";
import { CSSProperties, useEffect } from "react";
import SearchIpt from "./children/SearchIpt";
import { useNavigate } from "react-router-dom";
import { JLHistory } from "../../core/store/JL_LocalStorage";
import JLNavigate from "../JL_Navigate";
import icon from '../../assets/icon.png';

const sys_bg: CSSProperties = { background: 'var(--THEME_COLOR)', color: "white", marginLeft: '2px' }

export function TitleBar() {
    const navigate = useNavigate();
    useEffect(() => () => {
        new JLHistory();
    }, []);

    return <div className="flex" style={{ height: '24px' }}>
        <img className="app-region" srcSet={icon} />
        <Card className="mr-1 app-region w-40" style={sys_bg}>
            <span className="ml-1 select-none cursor-pointer" onClick={() => { history.go(-(history.length - 1)) }}>{import.meta.env['VITE_NAME']}</span>
        </Card>
        <JLNavigate url="/history">
            <Button className="mr-1 !mb-0" type={"primary"} >
                <History size={15} />
            </Button>
        </JLNavigate>
        <Card className="mr-1 w-full app-region"></Card>
        <Button className="mr-1 !mb-0" type={"primary"} onClick={() => navigate(-1)}>
            <ArrowLeft size={15} />
        </Button>
        <Button className="mr-1 !mb-0" type={"primary"} onClick={() => globalThis.location.reload()}>
            <RefreshCw size={14} />
        </Button>
        <SearchIpt />
        <Popover content={<SettingView />} trigger={"click"} placement={"bottom"}>
            <Button className="mr-1 !mb-0" type={"primary"}>
                <Bolt size={15} />
            </Button>
        </Popover>
        <ControlBtn />
    </div>
}
