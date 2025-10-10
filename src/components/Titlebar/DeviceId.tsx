import { invoke } from "@tauri-apps/api/core";
import { Card } from "antd";
import { Fingerprint } from "lucide-react";
import { useEffect, useState } from "react";
import { icon_size } from "../JL_TitleBar";
function DeviceID({ className }: { className?: string }) {
    const [id, setId] = useState('');
    useEffect(() => {
        invoke<string>('deviceid').then(setId);
    }, []);
    return <Card className={className} >
        <span className="text-3 mr-1">{id}</span>
        <Fingerprint size={icon_size} style={{ transform: 'translateY(2px)' }} />
    </Card>
}
export default DeviceID;