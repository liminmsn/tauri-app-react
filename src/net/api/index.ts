import { Dom } from "../../util/Dom";
import { NetBase } from "../NetBase";
export type TagType = {
    tag: string;
    src: string;
}
export type TagsType = {
    tags: Array<TagType>,
    page: number,
    imgs: Element[]
}
//
export async function fetchTags(): Promise<TagsType> {
    const res = await new NetBase("/").get().send()
    if (res.status == 200) {
        console.log('请求ok');
        const { dom } = new Dom(await res.text());
        const liArr = Array.from(dom.getElementsByTagName('ul')[0].children[0].children[1].children);
        const page = dom.getElementsByClassName('page-navigator')[0].children;
        const imgs = dom.getElementById('masonry')?.children
        // debugger
        return {
            tags: liArr.map(li => { return { tag: li.textContent, src: li.children[0].getAttribute('href') ?? '' } }),
            page: Number.parseInt(page[page.length - 2].textContent),
            imgs: Array.from(imgs!)
        };
    }
    return {
        page: 0,
        tags: [],
        imgs: []
    }
}
export async function fetchImgs(url: string): Promise<HTMLImageElement[]> {
    const res = await new NetBase().setUrl(url).get().send();
    if (res.status == 200) {
        const { dom } = new Dom(await res.text());
        const imageArr = dom.getElementById('masonry')?.getElementsByTagName('img');
        return Array.from(imageArr ?? []);
    }
    return [];
}