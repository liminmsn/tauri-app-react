import { Minus, Minimize, Maximize, X } from "lucide-react";
import { Window } from "@tauri-apps/api/window";
import { useState } from "react";
import { Space, Button } from "antd";

const win = new Window('main');
function ControlBtn() {
    const [maximizee, setMaximizee] = useState(false);
    async function toggleMaximize() {
        win.toggleMaximize().then(() => {
            win.isMaximized().then(val => setMaximizee(val))
        });
    }

    return <Space direction={"horizontal"} size={3.5}>
        <Button onClick={() => win.minimize()}><Minus size={14} color="var(--THEME_COLOR)" /></Button>
        <Button onClick={() => toggleMaximize()}>{maximizee ? <Minimize size={14} color="var(--THEME_COLOR)" /> : <Maximize size={14} color="var(--THEME_COLOR)" />}</Button>
        <Button onClick={() => win.close()} danger type={"primary"}><X size={14} /></Button>
    </Space>
}

export default ControlBtn;