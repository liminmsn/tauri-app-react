import { Input, Button, Card, message } from "antd";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";

function SearchIpt() {
    const navigate = useNavigate();
    let ipt_val = '';
    const onInput = function (e: EventTarget) {
        if (e instanceof HTMLInputElement) {
            ipt_val = e.value;
        }
    }
    const go = function () {
        if (ipt_val.length > 0) {
            navigate(`/search?id=?q=${ipt_val}`);
        } else {
            message.error('输入内容不能为空！')
        }
    }
    return <Card className="mr-1 w-120 ">
        <div className="flex">
            <Input className="border-none" placeholder="搜索动漫" onChange={(e) => onInput(e.target)} />
            <Button type="primary" onClick={() => go()} ><Search size={14} /></Button>
        </div>
    </Card>
}

export default SearchIpt;