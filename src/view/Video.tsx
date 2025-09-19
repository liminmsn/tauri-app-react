import { Card, Image } from "antd";
import { useEffect, useState } from "react";
import { api_video } from "../core/api/api_video";
import { useSearchParams } from "react-router-dom";
import JLLoading from "../components/JL_Loding";
import JlVideoControl from "../components/Video/JL_Video_Control";
import icon from "./../assets/icon.png";

function Video() {
    const [searchParams] = useSearchParams();
    const url = searchParams.get('id');
    const title = searchParams.get('title');
    const [src, setSrc] = useState<string>();
    useEffect(() => {
        url && api_video(globalThis.atob(url)).then(res => res && setSrc(res));
    }, [])

    return <Card className="h-full w-full overflow-hidden">
        {
            src == undefined ?
                <JLLoading icon={<Image width={60} srcSet={icon} preview={false} />} /> :
                <JlVideoControl src={src} title={title || ''} />
        }
    </Card>
}
export default Video;