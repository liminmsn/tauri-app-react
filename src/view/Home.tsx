import { Avatar, Button, Card, Image, List, Spin, Tag, Tooltip } from "antd";
import { LoadingState } from "../components/LodingState";
import { api_home, api_home_data, HomeType } from "../api/api_home";
import { useCallback, useEffect, useState } from "react";
import { getStringArr, idxColor, rmAllSpace } from "../util/util";


function Home() {
    const [data, setData] = useState(Object.assign({}, api_home_data));

    const initData = useCallback(() => {
        console.count('a');
        api_home().then(val => setData(val))
    }, [])

    useEffect(() => { }, []);

    return <div className="flex h-full w-full box-border">
        <Card className="w-full overflow-y-auto overflow-x-hidden p-1">
            <Button onClick={() => initData()}>TEST</Button>
        </Card>
        <Card className="w-90 ml-1 overflow-y-auto overflow-x-hidden">
            <div className="pl-1 text-sm font-bold">{data.recently.title}</div>
            <List
                itemLayout="horizontal"
                dataSource={data.recently.list}
                renderItem={(item, index) => (
                    <List.Item>
                        <p className="h-4 min-w-4 text-center text-2" style={{ lineHeight: 2, ...idxColor(index) }}>{index + 1}</p>
                        <div className="mx-1">
                            <Image width={30} src={item.img} preview={false} />
                        </div>
                        <div className="w8/10">
                            <Tooltip placement={"left"} title={item.title} arrow>
                                <p className="text-3">{getStringArr(item.title, '第')[0]}</p>
                            </Tooltip>
                            <p className="text-3">{getStringArr(item.title, '第')[1]}</p>
                            <p className="text-2">更新时间:{item.dateTime}</p>
                        </div>
                    </List.Item>
                )}
            />
        </Card>
    </div>
}

export default Home;