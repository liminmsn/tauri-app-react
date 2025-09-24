import { NetBase } from "../net/NetBase";
import { rmAllSpace } from "../util/util";
export const api_detail_data: DetailType = {
    left: { img: '', href: '', upDate: '', desc: '' },
    right: {
        title: {
            one: '',
            two: ''
        },
        tags: [],
        desc: '',
        ref: [],
        volumes: []
    }
}
export function api_detail(src: string) {
    return new Promise<DetailType>(async (resolve, _resject) => {
        const res = await new NetBase(src).get().then();
        const dom = new DOMParser().parseFromString(await res.text(), 'text/html');
        const all = dom.getElementsByClassName('detail')[0].children[0];
        const data = Object.assign({}, api_detail_data);
        data.left = {
            img: all.children[0].children[0].children[0].getAttribute('src') || '',
            href: all.children[0].children[0].children[1].children[0].children[0].children[0].getAttribute('href') || '',
            upDate: rmAllSpace(all.children[0].children[0].children[2].children[1].textContent),
            desc: rmAllSpace(all.children[0].children[0].children[3].children[1].textContent)
        }

        const volumesArr: volumesType[] = [];

        Array.from(all.children[1].getElementsByClassName('detail-right__volumes')[0].children[1].children).forEach((item) => {
            if (item.classList.contains('volume-title')) {
                volumesArr.push({
                    title: item.textContent,
                    list: []
                });
            } else {
                volumesArr[volumesArr.length - 1].list.push({
                    title: rmAllSpace(item.textContent),
                    href: item.children[0].getAttribute('href') || '',
                })
            }
        })
        data.right = {
            title: {
                one: rmAllSpace(all.children[1].getElementsByClassName('detail-right__title')[0].children[0].textContent) || '',
                two: rmAllSpace(all.children[1].getElementsByClassName('detail-right__title')[0].children[1].textContent) || ''
            },
            tags: Array.from(all.children[1].getElementsByClassName('detail-right__tags')[0].children).map(item => {
                return rmAllSpace(item.textContent)
            }),
            desc: all.children[1].getElementsByClassName('detail-right__desc')[0].children[1].textContent,
            ref: Array.from(all.children[1].getElementsByClassName('row')[0].children).map(item => {
                return {
                    img: item.children[0].children[0].children[0].getAttribute('src') || '',
                    href: item.children[0].children[0].getAttribute('href') || '',
                    title: item.children[0].children[1].textContent,
                    desc: item.children[0].children[2].textContent
                }
            }),
            volumes: volumesArr
        }
        // console.log(data);
        resolve(data);
    });
}


type volumesType = {
    title: string,
    list: {
        title: string;
        href: string;
    }[]
}
export type DetailType = {
    left: {
        img: string;
        href: string;
        upDate: string;
        desc: string;
    }
    right: {
        tags: string[];
        title: {
            one: string;
            two: string;
        };
        desc: string;
        ref: {
            img: string;
            href: string;
            title: string;
            desc: string;
        }[],
        volumes: volumesType[];
    }
    history_item?: string;
    lovels_item?: string;
    time?: number;
    detail?: string;
}