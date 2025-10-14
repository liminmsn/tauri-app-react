import { Image } from "antd";
import preview from "../assets/cd.png";
const lodimg_ = "/loding/4.gif";

type JLImage = {
    src: string;
    lodimg?: string;
    errimg?: string;
    className?: string;
}

function JLImage({ src, className, lodimg = lodimg_, errimg = preview }: JLImage) {
    return <Image preview={false} src={src}
        className={className}
        fallback={errimg}
        placeholder={<Image preview={false} srcSet={lodimg} />}
    />
}

export default JLImage;