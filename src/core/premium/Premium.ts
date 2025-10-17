import { NetBase } from "../net/NetBase";
type PremiumList = {
    affectedDocs: number;
    data: PremiumListDatum[];
}

type PremiumListDatum = {
    _id: string;
    title: string;
    price: string;
    dec: string;
    time_map: number;
}

type CreatePayParam = {
    title: string;
    price: string;
    pay_type: 'alipay' | 'wxpay'
}

export type CreatePayType = {
    code: number;
    msg: string;
    trade_no: string;
    O_id: string;
    payurl: string;
    payurl2: string;
    qrcode: string;
    img: string;
}

type PayQuery = {
    device_id: string;
    out_trade_no: string;
    query_type: '0' | '1';
}
export type PayQueryRes = { code: number; message: string; data?: PayQueryResData }

export interface PayQueryResData {
    _id: string;
    device_id: string;
    premium_time: number;
    out_trade_no: string;
}


class Premium extends NetBase {
    getList() {
        this.setUrl("https://fc-mp-00fbb6fa-0b8f-41d8-ac0c-122a477de70e.next.bspapp.com/get_preimium_list");
        return new Promise<PremiumList>(async (resolve, reject) => {
            const res = await this.get().then().then();
            if (res.status == 200) {
                resolve(res.json());
            } else {
                reject(await res.text());
            }
        });
    }
    createPay(parame: CreatePayParam) {
        this.setUrl("https://fc-mp-00fbb6fa-0b8f-41d8-ac0c-122a477de70e.next.bspapp.com/pay");
        this.post(JSON.stringify(parame));
        return new Promise<CreatePayType>(async (resolve, reject) => {
            const res = await this.then();
            if (res.status == 200) {
                resolve(res.json());
            } else {
                reject({})
            }
        });
    }
    query(parame: PayQuery) {
        this.setUrl("https://fc-mp-00fbb6fa-0b8f-41d8-ac0c-122a477de70e.next.bspapp.com/pay_query");
        this.post(JSON.stringify(parame));
        return new Promise<PayQueryRes>(async (resolve, reject) => {
            const res = await this.then();
            if (res.status == 200) {
                resolve(res.json());
            } else {
                reject(await res.text());
            }
        });
    }
}

export { Premium };
export type { PremiumList, PremiumListDatum };
