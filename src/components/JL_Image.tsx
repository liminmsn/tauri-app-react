import { Image } from "antd";
import preview from "../assets/loding.gif";
import { useEffect } from "react";
const lodimg_ = "/loding/loding.gif";

type JLImage = {
    src?: string;
    lodimg?: string;
    errimg?: string;
    className?: string;
}

function JLImage({ src, className, lodimg = lodimg_, errimg = preview }: JLImage) {
    useEffect(() => { }, [src])
    return <Image
        loading={"lazy"}
        preview={true}
        src={src}
        className={className}
        fallback={errimg}
        placeholder={<Image preview={false} srcSet={lodimg} />}
    />
}

export default JLImage;