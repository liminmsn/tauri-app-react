import { NetBase } from "../net/NetBase";

class Premium extends NetBase {
    getList() {
        return new Promise<PremiumList>(async (resolve, reject) => {
            this.setUrl("https://fc-mp-00fbb6fa-0b8f-41d8-ac0c-122a477de70e.next.bspapp.com/get_preimium_list");
            const res = await this.get().then().then();
            console.log(res);
            if (res.status == 200) {
                resolve(res.json());
            } else {
                reject(await res.text());
            }
        });
    }
}

interface PremiumList {
    affectedDocs: number;
    data: PremiumListDatum[];
}

interface PremiumListDatum {
    _id: string;
    title: string;
    price: string;
    dec: string;
    time_map: number;
}

export { Premium };
export type { PremiumList, PremiumListDatum };
