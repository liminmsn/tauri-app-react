import { NetBase } from "../net/NetBase";
import { rmAllSpace } from "../util/util";

export const api_home_data: HomeType = {
    recently: { title: '', list: [] }
};

export function api_home() {
    return new Promise<HomeType>(async (resolve, reject) => {
        const res = await new NetBase().get().then();
        const dom = new DOMParser().parseFromString(await res.text(), "text/html");
        const all = dom.getElementsByClassName('warp')[0].children[0];
        const data = api_home_data;
        console.log(all);
        

        // -----尾部
        data.recently.title = all.children[6].children[0].children[0].textContent;
        data.recently.list = Array.from(all.children[6].children[0].children[1].children).map(item => {
            const img = item.getElementsByTagName('amp-img')[0];
            const title = item.children[1];
            const dateTime = item.children[3];
            return {
                href: item.getAttribute('href') || '',
                img: img.getAttribute('src'),
                title: rmAllSpace(title.textContent),
                dateTime: rmAllSpace(dateTime.innerHTML)
            } as RecentlyItem;
        });
        resolve(data);
    });
}

export type HomeType = {
    recently: {
        title: string;
        list: RecentlyItem[];
    };
}

type RecentlyItem = {
    href: string;
    img: string;
    title: string;
    dateTime: string;
}
