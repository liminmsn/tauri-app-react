import { Window } from "@tauri-apps/api/window";
import { Minimize, Fullscreen, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const win = new Window('main');

function JlVideoControl({ title }: { title: string }) {
    const navigate = useNavigate();

    const [full, setFull] = useState(false);
    async function fullScene() {
        const bol = !await win.isFullscreen();
        setFull(bol);
        win.setFullscreen(bol);
    }

    return <div className="jl_video_control p-2">
        <div className="flex items-center">
            <ChevronLeft size={24} onClick={() => navigate(-1)} />
            <span className="ml-2 text-4 font-bold " style={{ lineHeight: 1.2 }}>{title}</span>
        </div>
        <div className="flex-1"></div>
        <div>
            <span className="flex cursor-pointer" onClick={() => fullScene()}>
                {
                    full ?
                        <Minimize size={24} /> :
                        <Fullscreen size={24} />
                }
            </span>
        </div>
    </div>
}

export default JlVideoControl;