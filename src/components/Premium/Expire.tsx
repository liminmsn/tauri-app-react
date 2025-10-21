import { useEffect, useState } from "react";
import { Premium } from "../../core/premium/Premium";
import { Card, notification } from "antd";
import { getDeviceId } from "./DeviceId";
import { GlobalEvent } from "../../core/util/globalEvent";
import { invoke } from "@tauri-apps/api/core";

/**检查订阅 */
export async function getDeviceDate() {
    const check_date = await new Premium().checkDate();
    const day_1 = 1000 * 60 * 24;
    if (check_date.date - day_1 > Date.now()) {
        const time = 3;
        notification.error({
            message: '系统警告!',
            description: '设备时间与当下时间不匹配!,调整时间后重启app',
            duration: time,
            closable: false,
            showProgress: true,
        })
        setTimeout(async () => {
            await invoke('close_app').then();
        }, time * 1000);
    }
    const device_id = await getDeviceId();
    const res = await new Premium().query({ device_id: device_id, out_trade_no: '', query_type: '1' });
    if (res.code == 500) {
        return res.message;
    } else if (res.code == 200 && res.data) {
        sessionStorage.setItem('premium_info', JSON.stringify(res.data));
        return new Date(res.data.premium_time).toLocaleString();
    } else {
        return '----';
    }
}

function Expire() {
    const [date, setDate] = useState('----');
    new GlobalEvent().on('expire_get', () => {
        getDeviceDate().then(setDate);
    })
    useEffect(() => {
        new GlobalEvent().send('expire_get');
    }, []);
    return <Card className="w-full">
        <span className="px-2">{date}</span>
    </Card>
}

export default Expire;