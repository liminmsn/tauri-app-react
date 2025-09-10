import { Button, Card, Carousel, Image, List, Tooltip } from "antd";
import { api_home, api_home_data } from "../api/api_home";
import { useCallback, useEffect, useState } from "react";
import { getStringArr, idxColor } from "../util/util";
import { LoadingState } from "../components/LodingState";

const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};


function Home() {
    const [data, setData] = useState(Object.assign({}, api_home_data));

    const initData = useCallback(() => {
        console.count('a');
        api_home().then(val => setData(val))
    }, [])

    useEffect(() => { }, []);

    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };

    return <div className="flex h-full w-full box-border">
        <Card className="w-full overflow-y-auto overflow-x-hidden p-1">
            <div className="flex">
                <Card className="min-w-100 shadow-md mr-2 overflow-hidden">
                    <Carousel autoplay>
                        <div className="h-full bg-amber">
                            <h3 style={contentStyle}>1</h3>
                        </div>
                    </Carousel>
                </Card>
                <Card className="w-full shadow-md">
                    hello
                </Card>
            </div>

            <Button onClick={() => initData()}>TEST</Button>
        </Card>
        <Card className="w-90 ml-1 overflow-y-auto overflow-x-hidden">
            {
                data.recently.list.length > 0 ?
                    <>
                        <div className="pl-1 text-3 font-bold">{data.recently.title}</div>
                        <List
                            // itemLayout="horizontal"
                            dataSource={data.recently.list}
                            renderItem={(item, index) => (
                                <List.Item className="shadow-md ml-1">
                                    <p className="h-4 min-w-4 text-center text-2" style={{ lineHeight: 2, ...idxColor(index) }}>{index + 1}</p>
                                    <div className="mx-1">
                                        <Image width={30} src={item.img} preview={false} />
                                    </div>
                                    <div className="w8/10">
                                        <Tooltip placement={"left"} title={item.title} arrow>
                                            <p className="text-3 font-bold">{getStringArr(item.title, '第')[0]}</p>
                                        </Tooltip>
                                        <p className="text-2 font-bold">{getStringArr(item.title, '第')[1]}</p>
                                        <p className="text-2">更新时间:{item.dateTime}</p>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </> :
                    <LoadingState />
            }
        </Card>
    </div>
}

export default Home;