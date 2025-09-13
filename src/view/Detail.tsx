import { Button, Card } from "antd";
import { useSearchParams } from "react-router";

function Detail() {
    const [params] = useSearchParams();
    const id = params.get('id');
    return <div className="h-full">
        <Card className="h-full p-1">
            {id}
        </Card>
    </div>
}
export default Detail;