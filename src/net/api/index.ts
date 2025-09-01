import { Dom } from "../../util/Dom";
import { NetBase } from "../NetBase";

export type TagType = {
    tag: string;
    src: string;
}
//
export async function fetchTags(): Promise<TagType[]> {
    const res = await new NetBase("/").get().send()
    if (res.status == 200) {
        console.log('请求ok');
        const { dom } = new Dom(await res.text());
        const liArr = Array.from(dom.getElementsByTagName('ul')[0].children[0].children[1].children);
        return liArr.map(li => { return { tag: li.textContent, src: li.children[0].getAttribute('href') ?? '' } });
    }
    return []
}

export async function getPage() {
    // page-navigator
}