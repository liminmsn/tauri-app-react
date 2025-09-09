import { Button, Card } from "antd";
import { NetBase } from "../net/NetBase";

function get() {
    new NetBase().get().send().then(res => {
        console.log(res);
    });
}
function Home() {
    return <div className="flex h-full w-full box-border pt-1">
        <Card className="w-full p-1 overflow-y-auto overflow-x-hidden">
            <Button onClick={get}>TEST</Button>
            <div className="h-1000"></div>
        </Card>
        <Card className="w3/10  p-1 ml-1">
            hello
        </Card>
    </div>
}

export default Home;