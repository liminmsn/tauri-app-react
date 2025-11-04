import { Alert, Button, Card, Image, Modal, Segmented, Space } from "antd";
import { useEffect, useState } from "react";
import { CreatePayType, Premium as PremiumApi, PremiumList, PremiumListDatum } from '../core/premium/Premium';
import DeviceID, { getDeviceId } from "../components/Premium/DeviceId";
import JLLoading from "../components/JL_Loding";
import JLImage from "../components/JL_Image";
import Expire from "../components/Premium/Expire";
import useApp from "antd/es/app/useApp";
import { CircleCheckBig, CircleX } from "lucide-react";
import { icon_width } from "../components/JL_TitleBar";
import { GlobalEvent } from "../core/util/globalEvent";

const PriceStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'center',
    // fontFamily: 'wxxlt',
    fontWeight: 'bold',
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

type PayItem = {
    title: string;
    type: 'alipay' | 'wxpay'
    icon: string;
}

const pay_list: PayItem[] = [
    {
        type: 'alipay',
        title: '支付宝',
        icon: 'https://mdn.alipayobjects.com/huamei_r48i2l/afts/img/A*IOPwSY89vAcAAAAAAAAAAAAADqWPAQ/original'
    },
    {
        type: 'wxpay',
        title: '微信',
        icon: 'https://gtimg.wechatpay.cn/resource/xres/wechat_pay_system/merchant_basic/pay/common/image/wechat_partner_logo.svg'
    },
];

function PayItemImage({ type, h }: { type: PayItem, h: number }) {
    return <Image height={h} preview={false} src={type.icon} />
}

// 转换 pay_list 为 Segmented 需要的格式
function segmentedOptions() {
    return pay_list.map(item => ({
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

}

type PremiumPayType = { pay_type: PayItem, item: PremiumListDatum, modaOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>] };

function PremiumPay({ modaOpen, item, pay_type }: PremiumPayType) {
    const [isModalOpen, setIsModalOpen] = modaOpen;
    const [payObj, setPayObj] = useState<CreatePayType>();
    const app = useApp();

    async function PayQuery() {
        if (payObj) {
            const device_id = await getDeviceId();
            const res = await new PremiumApi().query({
                device_id: device_id,
                out_trade_no: payObj?.trade_no,
                query_type: '0'
            });
            app.notification.error({
                icon: <CircleX size={26} color={res.code == 200 ? '#0f0' : '#f00'} />,
                duration: 1,
                message: res.code,
                description: res.message
            });
            setIsModalOpen(false);
            //更新状态
            if (res.code == 200) {
                new GlobalEvent().send('expire_get');
                console.log(res, 'zfcx');
            }
        }
    }

    function fetchData() {
        setPayObj(undefined);
        new PremiumApi().createPay({
            title: item.title,
            price: item.price,
            pay_type: pay_type.type
        }).then(setPayObj);
    }
    useEffect(() => {
        fetchData();
    }, [pay_type])

    return <Modal
        title={<div>
            <span>{`请使用${pay_type.title}扫码支付`}</span>
            <sup className="ml-1">
                <Image height={10} src={pay_type.icon} preview={false} />
            </sup>
        </div>}
        closable={false}
        maskClosable={true}
        open={isModalOpen}
        footer={() => (
            <>
                <Button type="dashed" size="middle" onClick={PayQuery}>算了再想想</Button>
                <Button type="primary" size="middle" className="font-bold" onClick={PayQuery}>我已经完成支付</Button>
            </>
        )}
    >
        <div className="text-center">
            <div>{import.meta.env['VITE_NAME']}订阅/{item.title}</div>
            <div className="my-2 text-xl font-bold text-center line-height-none text-red-5">{item.price}</div>
            {/* <Image width={200} src={payObj?.img} /> */}
            <div className="w-60 h-60" style={{ marginInline: 'auto' }}>
                <JLImage lodimg={''} src={payObj?.img} />
            </div>
        </div>
    </Modal>
}

function Premium() {
    const [premium_list, setPremium_list] = useState<PremiumList>();
    const [premium_select, setPremium_select] = useState<PremiumListDatum>();//选中
    const [pay_type, setPayType] = useState<PayItem>(pay_list[0]); // 设置支付方式
    const modaOpen = useState(false);//弹窗

    useEffect(() => { fetchData() }, []);
    const fetchData = async () => {
        await new PremiumApi().getList().then((val) => {
            setPremium_list(val);
            setPremium_select(val.data[0]);
        });
    }
    const handlePayTypeChange = (value: 'alipay' | 'wxpay') => {
        const selectedPayItem = pay_list.find(item => item.type === value);
        if (selectedPayItem) {
            setPayType(selectedPayItem);
        }
    };

    return (
        <div className="h-full flex">
            <Card className="px-1 min-w5/11">
                <Card className="p-1 my-1" style={{ background: 'repeating-linear-gradient(to top, var(--THEME_COLOR), var(--THEME_COLOR))' }}>
                    <Space direction="vertical" size={2} className="w-full">
                        <label className="text-3 text-nowrap border-1 text-white">设备id：</label>
                        <DeviceID className="w-full px-2" />
                        <label className="text-3 text-nowrap text-white">订阅到期时间：</label>
                        <Expire />
                    </Space>
                </Card>
                {premium_list == undefined ?
                    <div className="text-center"><JLLoading >&nbsp;</JLLoading></div> :
                    <div className="w-full grid grid-cols-3 gap-1">
                        {
                            premium_list?.data.map(item => {
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
                            })
                        }
                    </div>
                }
            </Card>
            <Card className="w-full ml-1 p-2">
                <div className="flex flex-col items-center">
                    <Space direction="vertical" align="center" size={4}>
                        <Segmented
                            options={segmentedOptions()}
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
                        <Button type="primary" size="middle" disabled={premium_select == undefined} onClick={() => modaOpen[1](true)}>创建付款二维码</Button>
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
            {premium_select && <PremiumPay pay_type={pay_type} modaOpen={modaOpen} item={premium_select} />}
        </div>
    )
}

export default Premium;