import { Card, Segmented, Space } from "antd";
import { useEffect, useState } from "react";
import { Premium as PremiumApi, PremiumList, PremiumListDatum } from '../core/premium/Premium';
import DeviceID from "../components/Titlebar/DeviceId";


const PriceStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'wxxlt',
    background: 'repeating-linear-gradient(to left, #7a0101ff, #ff0000, #7a0101ff)',
    color: 'white',
    position: 'absolute',
    bottom: '6px',
    right: '-40%',
    transform: 'rotate(-45deg)'
}
const CardStyle: React.CSSProperties = {
    color: 'white',
    // fontFamily: 'wxxlt',
    background: 'repeating-linear-gradient(to top, var(--THEME_COLOR),var(--THEME_COLOR_BG))',
};

function Premium() {
    const [premium_list, setPremium_list] = useState<PremiumList>();
    const [premium_select, setPremium_select] = useState<PremiumListDatum>();
    useEffect(() => {
        new PremiumApi().getList().then(setPremium_list);
    }, []);

    return <div className="h-full flex">
        <Card className="px-1 pt-1 w-200">
            <Card className="p-1 mb-1" style={{ background: 'repeating-linear-gradient(to top, var(--THEME_COLOR), var(--THEME_COLOR_BG))' }}>
                <Space direction="vertical" size={2} className="w-full">
                    <label className="text-3 text-nowrap text-white font-bold">设备id：</label>
                    <DeviceID className="w-full px-1" />
                    <label className="text-3 text-nowrap text-white font-bold">订阅到期时间：</label>
                    <Card className="w-full">
                        <span className="text-3 px-1">{new Date().toLocaleDateString()}</span>
                    </Card>
                </Space>
            </Card>
            <div className="w-full grid grid-cols-3 gap-1">
                {premium_list?.data.map(item => {
                    return <Card
                        className={`p-2 py-6 overflow-hidden cursor-pointer rounded-lg ${item._id === premium_select?._id ? 'shadow-md' : ''}`}
                        key={item._id}
                        style={CardStyle}
                        onClick={() => setPremium_select(item)}
                    >
                        <div className="text-3 font-bold line-height-none">{item.dec}</div>
                        <div className="my-2 text-xl font-bold text-center font_null line-height-none">{item.price}￥</div>
                        <div className="text-3 font_two text-center line-height-none" style={{ opacity: 0.5 }}>{import.meta.env['VITE_NAME']}</div>
                        <div style={PriceStyle} className="py-0">{item.title}</div>
                    </Card>
                })}
            </div>
        </Card>
        <Card className="w-full ml-1 p-2">
            <Segmented
                options={['微信', '支付宝']}
                onChange={(value) => {

                }}
            />
        </Card>
    </div>
}
export default Premium;