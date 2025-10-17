import { invoke } from "@tauri-apps/api/core";
import { Card } from "antd";
import { useEffect, useState } from "react";

/**获取程序拼接后的设备id */
export async function getDeviceId() {
    const id_ = await invoke<string>('deviceid');
    return String('jldm-').concat(id_);
}
function DeviceID({ className }: { className?: string }) {
    const [id, setId] = useState('');

    useEffect(() => {
        getDeviceId().then(setId);
    }, []);
    return <Card className={className} >
        <span className="text-3 mr-1">{id}</span>
    </Card>
}
export default DeviceID;