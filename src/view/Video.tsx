import { Card, Image } from "antd";
import { useEffect, useState } from "react";
import { api_video } from "../api/api_video";
import { useSearchParams } from "react-router-dom";
import JLLoading from "../components/JL_Loding";
import JlVideoControl from "../components/Video/JL_Video_Control";

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
                <JLLoading icon={<Image width={60} src={"/icon_2.png"} preview={false} />} /> :
                <div className="jl_video w-full h-full">
                    <iframe className="border-none w-full h-full" src={src} />
                    <JlVideoControl title={title || ''} />
                </div>
        }
    </Card>
}
export default Video;