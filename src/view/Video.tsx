import { Card } from "antd";
import { useEffect, useState } from "react";
import { api_video } from "../api/api_video";
import { useSearchParams } from "react-router";
import JLLoading from "../components/JL_Loding";

function Video() {
    const [searchParams] = useSearchParams();
    const url = searchParams.get('id');
    const [src, setSrc] = useState<string>();
    useEffect(() => {
        url && api_video(url).then(res => {
            console.log(res);
            if (res != null) {
                setSrc(res);
            }
        })
    }, [])

    return <Card className="h-full w-full overflow-hidden">
        {
            src != undefined ?
                <iframe className="border-none w-full h-full" src={src} /> :
                <JLLoading />
        }
    </Card>
}
export default Video;