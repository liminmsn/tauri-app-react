import { NetBase } from "../net/NetBase";

export async function api_video(src: string) {
    const res = await new NetBase(src).get().then();
    const dom = new DOMParser().parseFromString(await res.text(), 'text/html');
    const box = dom.getElementById('video_content');
    if (box) {
        return box.children[0].getAttribute('src')
    }
    return undefined;
}