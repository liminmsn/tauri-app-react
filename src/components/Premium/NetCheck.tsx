import { Network } from "lucide-react";
import { useEffect, useState } from "react"
import { icon_size, icon_width } from "../JL_TitleBar";

function NetCheck() {
    const [online, setOnline] = useState(true);
    useEffect(() => {
        window.addEventListener('online', (e) => {
            // console.log('网络连接');
            setOnline(true);
        });
        window.addEventListener('offline', (e) => {
            // console.log('网络连接断开');
            setOnline(false);
        });
    }, [])

    const a: React.CSSProperties = {
        background: 'greenyellow'
    }
    const b: React.CSSProperties = {
        background: 'red'
    }

    return <div className="flex items-center h-full">
        <div style={online ? a : b} className={`${online ? 'effect_show_for' : ''} w-2 h-2 mr-1 rounded-full`}></div>
        <Network size={icon_size} strokeWidth={icon_width} />
    </div>
}

export default NetCheck;