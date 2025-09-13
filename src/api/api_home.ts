import { NetBase } from "../net/NetBase";
import { rmAllSpace } from "../util/util";

export const api_home_data: HomeType = {
    category: [],
    indexhost: [],
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
                href: a.pathname,
                img: a.children[0].getAttribute('src') || ' ',
                tags: Array.from(a.children[1].children[0].children).map(tag => rmAllSpace(tag.textContent)),
                author: rmAllSpace(a.children[1].children[1].textContent),
                title: rmAllSpace(a.children[1].children[2].textContent),
                truncate: rmAllSpace(a.children[1].children[3].textContent)
            }
        });
        data.carousel.two = Array.from(all.children[1].children[0].children[1].getElementsByClassName('hot-search__content')[0].getElementsByTagName('a')).map(a => {
            return {
                id: rmAllSpace(a.children[0].textContent),
                title: rmAllSpace(a.children[1].textContent),
                href: a.search,
                state: rmAllSpace(a.children[3].getAttribute('class') || '')
            }
        });
        //------host List
        data.indexhost = Array.from(all.getElementsByClassName('index-hot')).map((item => {
            return {
                title: item.children[0].textContent,
                list: Array.from(item.children[1].children).map(idxitem => {
                    return {
                        href: (idxitem.children[0].children[0] as HTMLAnchorElement).pathname,
                        img: idxitem.children[0].children[0].children[0].getAttribute('src') || '',
                        title: idxitem.children[0].children[1].children[0].textContent,
                        dateTime: idxitem.children[0].children[2].children[0].textContent,
                    }
                })
            }
        }));
        //------host tag
        data.category = Array.from(all.getElementsByClassName('index-category')[0].children).map(item => {
            return {
                head: item.children[0].children[0].textContent,
                top_item: {
                    href: item.children[0].children[1].children[0].getAttribute('href') || '',
                    img: item.children[0].children[1].children[0].children[0].getAttribute('src') || '',
                    title: item.children[0].children[1].children[0].children[1].children[0].textContent,
                    dateTime: item.children[0].children[1].children[0].children[1].children[1].textContent
                },
                list: Array.from(item.children[0].children[2].children).map(item => {
                    return {
                        href: item.getAttribute('href') || '',
                        img: item.children[0].children[0].getAttribute('src') || '',
                        title: item.children[1].children[0].textContent,
                        dateTime: item.children[1].children[1].textContent,
                    }
                })
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
        resolve(data);
    });
}

export type HomeType = {
    carousel: {
        title: string;
        one: CarouseOnelItem[];
        two: CarouseTwolItem[];
    };
    indexhost: IndexHostItem[];
    recently: {
        title: string;
        list: RecentlyItem[];
    };
    category: CategoryItem[]
}

export type CategoryItem = {
    head: string;
    top_item: RecentlyItem;
    list: RecentlyItem[]
}

type IndexHostItem = {
    title: string
    list: RecentlyItem[]
}
export type RecentlyItem = {
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
    state: string;
}
