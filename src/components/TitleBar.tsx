import { Button, Card, Space } from "antd";
import { Minus, X, Maximize, Minimize, Flower2 } from "lucide-react";
import { Window } from "@tauri-apps/api/window";
import { useState } from "react";
const win = new Window('main');

export function TitleBar() {
    const [maximizee, setMaximizee] = useState(false);

    function toggleMaximize() {
        win.toggleMaximize().then(() => {
            win.isMaximized().then(val => setMaximizee(val))
        })
    }

    return <div className="flex">
        <Card className="w-60 mr-1">
            <Flower2 size={14} color="" />
            <span>{import.meta.env['VITE_APPNAME']}</span>
        </Card>
        <Card className="w-full mr-1 app-region">{String(maximizee)}</Card>
        <Space direction={"horizontal"} size={2}>
            <Button onClick={() => win.minimize()} icon={<Minus size={14} />} />
            <Button onClick={() => toggleMaximize()} icon={maximizee ? <Minimize size={14} /> : <Maximize size={14} />} />
            <Button onClick={() => win.close()} danger type={"primary"} icon={<X size={14} />} />
        </Space>
    </div>
}