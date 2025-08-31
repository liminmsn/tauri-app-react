import { Dom } from "../../util/Dom";
import { NetBase } from "../NetBase";

export type TagType = {
    tag: string;
    src: string;
}
//
export async function getTags(): Promise<TagType[]> {
    const res = await new NetBase("/").get().send()
    if (res.status == 200) {
        console.log('请求ok');

        return new Dom(await res.text()).getTag()
    }
    return []
}

export async function getPage() {
    // page-navigator
}