import { Image } from "antd";
import preview from "../assets/cd.png";
import { useEffect, useState } from "react";
const lodimg_ = "/loding/4.gif";

type JLImage = {
    src: string;
    lodimg?: string;
    errimg?: string;
    className?: string;
}

function JLImage({ src, className, lodimg = lodimg_, errimg = preview }: JLImage) {
    const [lod_err, setLoderr] = useState(false);
    useEffect(() => { setLoderr(false) });

    return lod_err ?
        <div className="w-full h-full min-height-45"></div>
        : <Image preview={false} src={src}
            className={className}
            fallback={errimg}
            onErrorCapture={() => setLoderr(true)}
            placeholder={
                <Image preview={false} srcSet={lodimg} />
            }
        />;
}
export default JLImage;