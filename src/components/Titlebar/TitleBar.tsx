import { Button, Card, Popover } from "antd";
import { Flower2, Bolt, RefreshCw, CircleArrowLeft } from "lucide-react";
import SettingView from "./children/SettingView";
import ControlBtn from "./children/ControlBtn";
import { CSSProperties } from "react";
import SearchIpt from "./children/SearchIpt";
import { useNavigate } from "react-router";

const sys_bg: CSSProperties = { background: 'var(--THEME_COLOR)', color: "white" }

export function TitleBar() {
    const navigate = useNavigate();

    return <div className="flex" style={{ height: '24px' }}>
        <Card className="mr-1 app-region w-60" style={sys_bg}>
            <span className="ml-1"><Flower2 size={14} style={{ transform: 'translateY(2px)' }} /></span>
            <span className="font_one">{import.meta.env['VITE_NAME']}</span>
        </Card>
        <Card className="mr-1 w-full app-region"></Card>
        <Button className="mr-1 !mb-0" type={"primary"} onClick={() => navigate(-1)}>
            <CircleArrowLeft size={14} />
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
