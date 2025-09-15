import { NetBase } from "../net/NetBase";

export async function api_video(src: string) {
    const res = await new NetBase(src).get().then();
    const dom = new DOMParser().parseFromString(await res.text(), 'text/html');
    // dom.getElementsByTagName('iframe')[0].src
    console.log(dom);
}