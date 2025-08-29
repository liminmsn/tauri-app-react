import { Dom } from "../../util/Dom";
import { NetBase } from "../NetBase";

export async function getTags() {
    const res = await new NetBase("/").get().send()
    if (res.status == 200) {
        return new Dom(await res.text()).getTag()
    }
}