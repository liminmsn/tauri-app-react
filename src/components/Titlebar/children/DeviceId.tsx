import { invoke } from "@tauri-apps/api/core";
import { Card } from "antd";
import { Fingerprint } from "lucide-react";
import { useEffect, useState } from "react";
import { icon_size } from "../TitleBar";
function DeviceID({ className }: { className?: string }) {
    const [id, setId] = useState('');
    useEffect(() => {
        invoke('deviceid').then((val: any) => {
            console.log(val);
            setId(val);
        })
    });
    return <Card className={className} >
        <Fingerprint size={icon_size} />
        <span className="text-3">{id}</span>
    </Card>
}
export default DeviceID;