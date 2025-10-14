import { Button, Card, Image, Segmented, Space } from "antd";
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
    right: '-35%',
    transform: 'rotate(-45deg)'
}

const CardStyleSelect: React.CSSProperties = {
    color: 'white',
    background: 'repeating-linear-gradient(to top, var(--THEME_COLOR),var(--THEME_COLOR))',
};

/** -------------------------------------------- */
type PayItem = {
    title: string;
    type: 'zfb' | 'wx'
    icon: string;
}

const pay_list: PayItem[] = [
    {
        type: 'zfb',
        title: '支付宝',
        icon: 'https://mdn.alipayobjects.com/huamei_r48i2l/afts/img/A*IOPwSY89vAcAAAAAAAAAAAAADqWPAQ/original'
    },
    {
        type: 'wx',
        title: '微信',
        icon: 'https://gtimg.wechatpay.cn/resource/xres/wechat_pay_system/merchant_basic/pay/common/image/wechat_partner_logo.svg'
    },
];

function PayItemImage({ type, h }: { type: PayItem, h: number }) {
    return <Image height={h} preview={false} src={type.icon} />
}

function Premium() {
    const [premium_list, setPremium_list] = useState<PremiumList>();
    const [premium_select, setPremium_select] = useState<PremiumListDatum>();
    const [pay_type, setPayType] = useState<PayItem>(pay_list[0]); // 设置默认值

    useEffect(() => {
        new PremiumApi().getList().then(setPremium_list);
    }, []);

    // 转换 pay_list 为 Segmented 需要的格式
    const segmentedOptions = pay_list.map(item => ({
        label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* <Image 
                    src={item.icon} 
                    preview={false} 
                    width={16} 
                    height={16} 
                    style={{ display: 'inline-block' }}
                /> */}
                <span>{item.title}</span>
            </div>
        ),
        value: item.type,
        originalItem: item // 保留原始对象引用
    }));

    const handlePayTypeChange = (value: 'zfb' | 'wx') => {
        const selectedPayItem = pay_list.find(item => item.type === value);
        if (selectedPayItem) {
            setPayType(selectedPayItem);
        }
    };

    return (
        <div className="h-full flex">
            <Card className="px-1 min-w5/11">
                <Card className="p-1 my-1 border-1 border-solid border-gray-2" style={{ background: 'repeating-linear-gradient(to top, var(--THEME_COLOR), var(--THEME_COLOR))' }}>
                    <Space direction="vertical" size={2} className="w-full">
                        <label className="text-3 text-nowrap border-1 text-white">设备id：</label>
                        <DeviceID className="w-full px-1 border-1 border-solid border-gray-2" />
                        <label className="text-3 text-nowrap text-white">订阅到期时间：</label>
                        <Card className="w-full border-1 border-solid border-gray-2">
                            <span className="text-3 px-1">---------</span>
                        </Card>
                    </Space>
                </Card>
                <div className="w-full grid grid-cols-3 gap-1">
                    {premium_list?.data.map(item => {
                        return (
                            <Card
                                className={`p-2 py-6 overflow-hidden cursor-pointer rounded-lg border-1 border-solid border-gray-2 ${item._id === premium_select?._id ? '' : ''}`}
                                key={item._id}
                                style={premium_select?._id == item._id ? CardStyleSelect : undefined}
                                onClick={() => setPremium_select(item)}
                            >
                                <div className="text-3 font-bold line-height-none text-center">{item.dec}</div>
                                <div className="text-3 font_two text-center line-height-none mt-2" style={{ opacity: 0.5 }}>{import.meta.env['VITE_NAME']}</div>
                                <div style={PriceStyle} className="py-0">{item.title}</div>
                            </Card>
                        )
                    })}
                </div>
            </Card>
            <Card className="w-full ml-1 p-2">
                <div className="flex flex-col items-center">
                    <Space direction="vertical" align="center" size={4}>
                        <Segmented
                            options={segmentedOptions}
                            value={pay_type.type}
                            onChange={handlePayTypeChange}
                        />
                        <Card
                            className={`p-2 py-6 overflow-hidden cursor-pointer rounded-lg w-50 max-w-50 border-1 border-solid border-gray-2`}
                            key={premium_select?._id}
                        >
                            <div className="my-2 text-xl font-bold text-center line-height-none text-red-5 font_one">{premium_select?.price || 0}￥</div>
                            <div className="text-3 font_two text-center line-height-none" style={{ opacity: 0.5 }}>{import.meta.env['VITE_NAME']}</div>
                            <div className="pos-absolute pos-top-1">
                                <PayItemImage h={17} type={pay_type} />
                            </div>
                        </Card>
                        <Button type="primary" size="middle" disabled={premium_select == undefined}>发起支付订单</Button>
                        <div className="flex flex-col">
                            <div className="flex h-6 gap-2">
                                <PayItemImage h={10} type={pay_list[0]} />
                                <PayItemImage h={10} type={pay_list[1]} />
                            </div>
                            <span className="text-2 text-gray-4 line-height-none text-center">特别呜谢以上平台提供的支付渠道</span>
                        </div>
                    </Space>
                </div>
            </Card>
        </div>
    )
}

export default Premium;