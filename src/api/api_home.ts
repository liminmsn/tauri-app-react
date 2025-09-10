import { NetBase } from "../net/NetBase";

export function api_home() {
    console.log("api_home");
    return (function () {
        const res_: HomeType = { recently: [] };
        new NetBase().get().then(async res => {
            const dom = new DOMParser().parseFromString(await res.text(), "text/html");
            const all = dom.getElementsByClassName('warp')[0].children[0];

            res_.recently = Array.from(all.children[6].children[0].children[1].children).map(item => {
                // console.log(item);

                const img = item.getElementsByTagName('amp-img')[0] as HTMLImageElement;
                const title = item.children[1];
                const dateTime = item.children[3];
                return {
                    href: item.getAttribute('href') || '',
                    img: img.src,
                    title: title.innerHTML,
                    dateTime: dateTime.innerHTML
                } as RecentlyItem;
            });
            console.log(res_);
        });
        return res_;
    })();
}

type HomeType = {
    recently: RecentlyItem[];
}

type RecentlyItem = {
    href: string;
    img: string;
    title: string;
    dateTime: string;
}
