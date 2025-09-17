import { Window } from "@tauri-apps/api/window";
import { Minimize, Fullscreen } from "lucide-react";
import { useState } from "react";

const win = new Window('main');

function JlVideoControl({ title, src }: { src: string; title: string }) {
    const [full, setFull] = useState(false);
    async function fullScene() {
        const bol = !await win.isFullscreen();
        setFull(bol);
        win.setFullscreen(bol);
    }

    return <div className={`w-full h-full ${full ? 'jl_video' : ''}`}>
        <iframe className="border-none w-full h-full" src={src} />
        <div className="jl_video_control p-2">
            <span className="text-4 font-bold " style={{ lineHeight: 1.2 }}>{title}</span>
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
    </div>
}

export default JlVideoControl;