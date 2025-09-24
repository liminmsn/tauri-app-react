import { Window } from "@tauri-apps/api/window";
import { Minimize, CircleX, Fullscreen } from "lucide-react";
import { useState } from "react";
import { icon_size, icon_width } from "../Titlebar/TitleBar";
import { Space } from "antd";

const win = new Window('main');

function JlVideoControl({ title, src }: { src: string; title: string }) {
    const [full, setFull] = useState(false);
    async function fullScene() {
        const bol = !await win.isFullscreen();
        setFull(bol);
        win.setFullscreen(bol);
    }

    const [showControl, setShowControl] = useState(true);

    let id = 0;
    function mouseEnter(bool: boolean) {
        if (bool) {
            setShowControl(true)
        } else {
            clearInterval(id);
            id = setTimeout(() => {
                setShowControl(false);
            }, 3000);
        }
    }
    return <div className={`w-full h-full ${full ? 'jl_video' : ''}`} onMouseEnter={() => mouseEnter(true)}>
        <div className="jl_video_control_main h-10" onMouseEnter={() => mouseEnter(true)}>
            <div className="jl_video_control p-2" style={{ opacity: showControl ? 1 : 0 }} onMouseOut={() => mouseEnter(false)}>
                <span className="text-4 font-bold " style={{ lineHeight: 1.2 }}>{title}</span>
                <div className="flex-1"></div>
                <div>
                    <Space>
                        <span className="cursor-pointer" onClick={() => fullScene()} >
                            {
                                full ?
                                    <Minimize size={icon_size * 1.4} strokeWidth={icon_width} /> :
                                    // <Expand  />
                                    <Fullscreen size={icon_size * 1.4} strokeWidth={icon_width} />
                            }
                        </span>
                        <span className="cursor-pointer" onClick={() => history.back()}>
                            <CircleX size={icon_size * 1.4} strokeWidth={icon_width} />
                        </span>
                    </Space>
                </div>
            </div>
        </div>
        <iframe className="border-none w-full h-full" src={src} />
    </div>
}

export default JlVideoControl;