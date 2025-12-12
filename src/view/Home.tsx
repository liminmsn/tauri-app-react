import { Button, Card } from "antd";
import { NetBase } from "../net/NetBase";

function get() {
    new NetBase().get().send().then(res => {
        console.log(res);
    });
}
function Home() {
    return <div className="home w-full pt-0 box-border" style={{ height: 'calc(100% - 26px)', paddingTop: '2px' }}>
        <Button onClick={get}>TEST</Button>
        {/* <Card className="h-full p-1">
        </Card> */}
    </div>
}

export default Home;