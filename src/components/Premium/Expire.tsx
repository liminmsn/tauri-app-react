import { useEffect, useState } from "react";
import { Premium } from "../../core/premium/Premium";
import { Card } from "antd";
import { getDeviceId } from "./DeviceId";

export async function getDeviceDate() {
    const device_id = await getDeviceId();
    const res = await new Premium().query({ device_id: device_id, out_trade_no: '', query_type: '1' });
    // const res = await new Premium().query({ device_id: 'ab2ca696418ab01d463037cd0c0691434c602a1939b6923ece9dec5c77768f03', out_trade_no: '', query_type: '1' });
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
    useEffect(() => {
        getDeviceDate().then(setDate);
    }, []);
    return <Card className="w-full">
        <span className="px-2">{date}</span>
    </Card>
}

export default Expire;