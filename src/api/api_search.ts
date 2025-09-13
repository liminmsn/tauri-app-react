import { NetBase } from "../net/NetBase";

export const api_search_data: SearchType = { title: '', list: [] };
export function api_search(q: string) {
    return new Promise<SearchType>(async (resolve, reject) => {
        const res = await new NetBase(`/search${q}`).get().then();
        const dom = new DOMParser().parseFromString(await res.text(), 'text/html');
        const all = dom.getElementsByClassName('search')[0].children;

        api_search_data.title = all[0].textContent;
        api_search_data.list = Array.from(all[1].children).map(item => {
            return {
                href: item.children[0].getAttribute('href') ?? '',
                img: item.children[0].children[0].children[0].getAttribute('src') ?? '',
                tags: Array.from(item.children[0].children[0].children[1].children).map(item => {
                    return item.textContent;
                }),
                author: item.children[0].children[1].children[0].textContent,
                title: item.children[0].children[1].children[1].textContent,
            }
        });

        resolve(api_search_data);
    });
}


export type SearchType = {
    title: string;
    list: SearchListItem[]
}

type SearchListItem = {
    href: string;
    img: string;
    tags: string[];
    author: string;
    title: string;
}