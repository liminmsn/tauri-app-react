import { Card, Image } from "antd";
import { useEffect, useState } from "react";
import { api_video } from "../core/api/api_video";
import { useNavigate, useSearchParams } from "react-router-dom";
import JLLoading from "../components/JL_Loding";
import JlVideoControl from "../components/Video/JL_Video_Control";
import icon from "./../assets/4.gif";
import { PayQueryResData } from "../core/premium/Premium";

function Video() {
    const [searchParams] = useSearchParams();
    const url = searchParams.get('id');
    const title = searchParams.get('title');
    const navigate = useNavigate();
    const [src, setSrc] = useState<string>();

    const initData = function () {
        const premium_info = sessionStorage.getItem('premium_info');
        if (premium_info != null) {
            const data: PayQueryResData = JSON.parse(premium_info);
            // debugger;
            //有效时间内
            if (Date.now() <= data.premium_time) {
                url && api_video(globalThis.atob(url)).then(res => res && setSrc(res));
            } else {
                navigate("/premium");
            }
        } else {
            // debugger;
            navigate("/premium");
        }
    }

    useEffect(() => {
        initData();
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