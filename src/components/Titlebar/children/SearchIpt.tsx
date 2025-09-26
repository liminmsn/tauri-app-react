import { Input, Button, Card } from "antd";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { icon_size, icon_width } from "../TitleBar";
import useApp from "antd/es/app/useApp";

function SearchIpt() {
    const { message } = useApp();
    const navigate = useNavigate();
    const [ipt_val, setIptVal] = useState('');
    const onInput = function (e: EventTarget) {
        if (e instanceof HTMLInputElement) {
            setIptVal(() => e.value);
        }
    }
    const go = function () {
        if (globalThis.location.href.lastIndexOf(`/search?id=?q=${ipt_val}`) < 0) {
            if (ipt_val.length > 0) {
                navigate(`/search?id=?q=${ipt_val}`);
            } else {
                message.error('搜索内容不能为空!')
            }
        }
    }
    return <Card className="mr-1 w-120 max-w-120">
        <div className="flex">
            <Input className="border-none" placeholder="巨量动漫有你想看"
                onInput={(e) => onInput(e.target)}
                onKeyDown={(e) => (e.key == "Enter") && go()} />
            <Button type="primary" onClick={() => go()} >
                <Search size={icon_size} strokeWidth={icon_width} />
            </Button>
        </div>
    </Card>
}

export default SearchIpt;