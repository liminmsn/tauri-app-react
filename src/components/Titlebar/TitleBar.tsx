import { Button, Card, Popover } from "antd";
import { Bolt, RefreshCw, ArrowLeft, History, Star, FolderHeart } from "lucide-react";
import SettingView from "./children/SettingView";
import ControlBtn from "./children/ControlBtn";
import { CSSProperties, use, useCallback, useEffect } from "react";
import SearchIpt from "./children/SearchIpt";
import { useNavigate } from "react-router-dom";
import { JLHistory, JLLovels } from "../../core/store/JL_LocalStorage";
import JLNavigate from "../JL_Navigate";
import icon from '../../assets/icon.png';

const sys_bg: CSSProperties = { background: 'var(--THEME_COLOR)', color: "white", marginLeft: '2px' }

const icon_size = 14;

export function TitleBar() {
    const navigate = useNavigate();
    const initData = useCallback(() => {
        new JLHistory();
        new JLLovels();
    }, []);
    useEffect(() => initData(), []);

    function break_() {
        navigate(-1)
    }

    return <div className="flex" style={{ height: '24px' }}>
        <img className="app-region" srcSet={icon} />
        <Card className="mr-1 app-region" style={sys_bg}>
            <div className="mx-1 select-none cursor-pointer text-nowrap" onClick={() => { history.go(-(history.length - 1)) }}>{import.meta.env['VITE_NAME']}</div>
        </Card>
        <Card className="mr-1 w-full app-region"></Card>
        <JLNavigate url="/history">
            <Button className="mr-1 !mb-0" type={"primary"} >
                <History size={icon_size} />
            </Button>
        </JLNavigate>
        <JLNavigate url="/lovels">
            <Button className="mr-1 !mb-0" type={"primary"} >
                <FolderHeart size={icon_size} />
            </Button>
        </JLNavigate>
        <Button className="mr-1 !mb-0" type={"primary"} onClick={() => break_()}>
            <ArrowLeft size={icon_size} />
        </Button>
        <Button className="mr-1 !mb-0" type={"primary"} onClick={() => globalThis.location.reload()}>
            <RefreshCw size={icon_size} />
        </Button>
        <SearchIpt />
        <Popover content={<SettingView />} trigger={"click"} placement={"bottom"}>
            <Button className="mr-1 !mb-0" type={"primary"}>
                <Bolt size={icon_size} />
            </Button>
        </Popover>
        <ControlBtn />
    </div>
}
