import { Card } from "antd";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { api_video } from "../api/api_video";

function Video() {
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const id = searchParams.get('id');
        console.log(id);
        if (id) {
            api_video(id).then(res => {
                console.log(res);
            })
        }
    }, [searchParams])

    return <Card className="h-full w-full overflow-hidden">
        <iframe className="border-none w-full h-full" src="https://pframe.xgcartoon.com/player.htm?vid=fbe1f3de-dd5f-416a-8b3b-faf60c8712b9&autoplay=false" />
    </Card>
}
export default Video;