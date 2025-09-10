import { Button, Card, Spin } from "antd";
import { NetBase } from "../net/NetBase";
import { LoadingState } from "../components/LodingState";
import { api_home } from "../api/api_home";


function get() {
    api_home();
}
function Home() {

    return <div className="flex h-full w-full box-border">
        <Card className="w-full overflow-y-auto overflow-x-hidden p-1">
            <Button onClick={get}>TEST</Button>
            <div className="h-1000"></div>
        </Card>
        <Card className="w3/10 ml-1 p-1">
            <LoadingState />
        </Card>
    </div>
}

export default Home;