import { Image } from "antd";
import preview from "../assets/3.gif";

function JLImage({ src, className }: { src: string, className?: string }) {
    return <Image preview={false} src={src}
        className={className}
        fallback="/loding/4.gif"
        placeholder={
            <Image preview={false} srcSet={preview} />
        }
    />;
}
export default JLImage;