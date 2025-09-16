import { Card } from "antd";
import { useEffect, useState } from "react";
import { api_video } from "../api/api_video";
import JLLoading from "../components/JL_Loding";
import { useNavigate } from "react-router";
import { video_config } from "./Detail";

function Video() {
    const [src, setSrc] = useState<string>();
    const navigate = useNavigate();
    useEffect(() => {
        if (video_config.url == '') navigate(-1);
        api_video(video_config.url).then(res => {
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