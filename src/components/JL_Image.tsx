import { Image } from "antd";
import preview from "../assets/loding.gif";
const lodimg_ = "/loding/loding.gif";

type JLImage = {
    src?: string;
    lodimg?: string;
    errimg?: string;
    className?: string;
}

function JLImage({ src, className, lodimg = lodimg_, errimg = preview }: JLImage) {
    return <Image
        loading={"eager"}
        preview={false}
        src={src}
        className={className}
        fallback={errimg}
        placeholder={<Image preview={false} srcSet={lodimg} />}
    />
}

export default JLImage;