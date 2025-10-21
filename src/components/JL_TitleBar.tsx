import { Button, Card, Popover } from "antd";
import { FolderHeart, RotateCcw, Cog, CornerUpLeft, FolderClock, Megaphone, Tickets, House } from "lucide-react";
import SettingView from "./Titlebar/SettingView";
import ControlBtn from "./Titlebar/ControlBtn";
import { useCallback, useEffect } from "react";
import SearchIpt from "./Titlebar/SearchIpt";
import { useNavigate } from "react-router-dom";
import { JLHistory, JLLovels } from "../core/store/JL_LocalStorage";
import JLNavigate from "./JL_Navigate";
import icon from '../assets/icon.png';
import NetCheck from "./Premium/NetCheck";

export const icon_size = 14;
export const icon_width = 2.4;

function JLTitleBar() {
    const navigate = useNavigate();
    const initData = useCallback(() => {
        new JLHistory();
        new JLLovels();
    }, []);
    useEffect(() => initData(), []);

    return <div className="flex" style={{ height: '24px' }}>
        <img className="app-region mr-1" src={icon} style={{ minWidth: '24px' }} />
        <Card className="px-2 mr-1">
            <NetCheck />
        </Card>
        <Card className="mr-1 w-100 app-region text-center">
        </Card>
        <Button className="mr-1 !mb-0" type={"primary"} onClick={() => new GlobalEvent().send('open_notify', true)}>
            <Megaphone size={icon_size} strokeWidth={icon_width} />
        </Button>
        <JLNavigate url="/premium">
            <Button className="mr-1 !mb-0" type={"primary"}>
                <Tickets size={icon_size} strokeWidth={icon_width} />
            </Button>
        </JLNavigate>
        <Card className="mr-1 w-full app-region"></Card>
        <JLNavigate url="/history">
            <Button className="mr-1 !mb-0" type={"primary"} >
                <FolderClock size={icon_size} strokeWidth={icon_width} />
            </Button>
        </JLNavigate>
        <JLNavigate url="/lovels">
            <Button className="mr-1 !mb-0" type={"primary"} >
                <FolderHeart size={icon_size} strokeWidth={icon_width} />
            </Button>
        </JLNavigate>
        {/* <Card className="mr-1 w-34 app-region"></Card> */}
        <Button className="mr-1 !mb-0" type={"primary"} onClick={() => {
            if (location.pathname != '/') {
                navigate(history.state.idx * -1)
            }
        }}>
            <House size={icon_size} strokeWidth={icon_width} />
        </Button>
        <Button className="mr-1 !mb-0" type={"primary"} onClick={() => navigate(-1)}>
            <CornerUpLeft size={icon_size} strokeWidth={icon_width} />
        </Button>
        <Button className="mr-1 !mb-0" type={"primary"} onClick={() => location.reload()}>
            <RotateCcw size={icon_size} strokeWidth={icon_width} />
        </Button>
        <SearchIpt />
        <Popover content={<SettingView />} trigger={"click"} placement={"bottom"}>
            <Button className="mr-1 !mb-0" type={"primary"}>
                <Cog size={icon_size} strokeWidth={icon_width} />
            </Button>
        </Popover>
        <ControlBtn />
    </div>
}

export default JLTitleBar;