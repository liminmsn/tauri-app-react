import { Input, Button, Card } from "antd";
import { Search } from "lucide-react";

function SearchIpt() {
    return <Card className="mr-1 w-120 ">
        <div className="flex">
            <Input className="border-none" placeholder="搜索动漫" />
            <Button type="primary"><Search size={14} /></Button>
        </div>
    </Card>
}

export default SearchIpt;