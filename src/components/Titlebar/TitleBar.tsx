import { Button, Card, Popover } from "antd";
import { FolderHeart, RotateCcw, Cog, CornerUpLeft, HousePlug, FolderClock } from "lucide-react";
import SettingView from "./children/SettingView";
import ControlBtn from "./children/ControlBtn";
import { useCallback, useEffect } from "react";
import SearchIpt from "./children/SearchIpt";
import { useNavigate } from "react-router-dom";
import { JLHistory, JLLovels } from "../../core/store/JL_LocalStorage";
import JLNavigate from "../JL_Navigate";
import icon from '../../assets/icon.png';
import DeviceID from "./children/DeviceId";

export const icon_size = 14;
export const icon_width = 2.4;

export function TitleBar() {
    const navigate = useNavigate();
    const initData = useCallback(() => {
        new JLHistory();
        new JLLovels();
    }, []);
    useEffect(() => initData(), []);

    return <div className="flex" style={{ height: '24px' }}>
        <img className="app-region mr-1" srcSet={icon} />
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
        <Card className="mr-1 w4/10 app-region"></Card>
        {/* <DeviceID className="w-full" /> */}
        <Button className="mr-1 !mb-0" type={"primary"} onClick={() => navigate(history.state.idx * -1)}>
            <HousePlug size={icon_size} strokeWidth={icon_width} />
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
