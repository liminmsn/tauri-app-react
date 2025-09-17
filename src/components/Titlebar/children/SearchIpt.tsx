import { Input, Button, Card, message } from "antd";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchIpt() {
    const navigate = useNavigate();
    const [ipt_val, setIptVal] = useState('');
    const onInput = function (e: EventTarget) {
        if (e instanceof HTMLInputElement) {
            setIptVal(e.value);
        }
    }
    const go = function () {
        if (ipt_val.length > 0) {
            navigate(`/search?id=?q=${ipt_val}`);
        } else {
            message.error('搜索内容不能为空!')
        }
    }
    return <Card className="mr-1 w-120 ">
        <div className="flex">
            <Input className="border-none" placeholder="搜索动漫"
                onChange={(e) => onInput(e.target)}
                onKeyDown={(e) => (e.key == "Enter") && go()} />
            <Button type="primary" onClick={() => go()} >
                <Search size={14} />
            </Button>
        </div>
    </Card>
}

export default SearchIpt;