import { NetBase } from "../net/NetBase";
import { rmAllSpace } from "../util/util";

export const api_home_data: HomeType = {
    carousel: { title: '', one: [], two: [] },
    recently: { title: '', list: [] }
};

export function api_home() {
    return new Promise<HomeType>(async (resolve, reject) => {
        const res = await new NetBase().get().then();
        const dom = new DOMParser().parseFromString(await res.text(), "text/html");
        const all = dom.getElementsByClassName('warp')[0].children[0];
        const data = api_home_data;
        // -----one
        data.carousel.title = all.children[1].children[0].children[1].children[0].children[0].textContent;
        data.carousel.one = Array.from(all.children[1].children[0].children[0].getElementsByTagName('a')).map(a => {
            return {
                href: a.href,
                img: a.children[0].getAttribute('src') || ' ',
                tags: Array.from(a.children[1].children[0].children).map(tag => rmAllSpace(tag.textContent)),
                author: rmAllSpace(a.children[1].children[1].textContent),
                title: rmAllSpace(a.children[1].children[2].textContent),
                truncate: rmAllSpace(a.children[1].children[3].textContent)
            }
        });
        data.carousel.two = Array.from(all.children[1].children[0].children[1].getElementsByClassName('hot-search__content')[0].getElementsByTagName('a')).map(a => {
            return {
                id: a.children[0].textContent,
                title: a.children[1].textContent,
                href: a.href
            }
        });

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
        
        console.log(data);
        resolve(data);
    });
}

export type HomeType = {
    carousel: {
        title: string;
        one: CarouseOnelItem[],
        two: CarouseTwolItem[]
    };
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
export type CarouseOnelItem = {
    href: string;
    img: string;
    tags: string[];
    author: string;
    title: string;
    truncate: string;
}

type CarouseTwolItem = {
    id: string;
    href: string;
    title: string;
}
