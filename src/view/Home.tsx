import { Button, Card, Carousel, Image, List, Tooltip } from "antd";
import { api_home, api_home_data } from "../api/api_home";
import { useCallback, useEffect, useState } from "react";
import { getStringArr, idxColor } from "../util/util";
import JLTitle from "../components/JL_Title";
import JLLoading from "../components/JL_Loding";
import JLCard from "../components/Home/JL_Card";

const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
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
            <div className="flex h-70">
                <Card className="w-50 shadow-md p-1 pt-0">
                    {
                        data.carousel.two.length > 0 ?
                            <>
                                <JLTitle>{data.carousel.title}</JLTitle>
                                {data.carousel.two.map(item =>
                                    <div key={item.id} className="flex items-center">
                                        <div className="h-4 min-w-4 text-center text-2 font_two mr-1" style={{ lineHeight: 2, ...idxColor(Number.parseInt(item.id)) }}>{item.id}</div>
                                        <span>{item.title}</span>
                                    </div>
                                )}
                            </> :
                            <JLLoading />
                    }
                </Card>
                <Card className="w-full shadow-md ml-1 overflow-hidden">
                    <Carousel autoplay>
                        {data.carousel.one.map(item => <JLCard key={item.author} id={item.author} onRender={() => null} item={item} />)}
                    </Carousel>
                </Card>
            </div>

            <Card className="mt-1 shadow-md p-1">
                <Button onClick={() => initData()}>TEST</Button>
            </Card>
        </Card>
        <Card className="w-90 p-1 ml-1 overflow-y-auto">
            {
                data.recently.list.length > 0 ?
                    <>
                        <JLTitle>{data.recently.title}</JLTitle>
                        <List
                            dataSource={data.recently.list}
                            renderItem={(item, index) => (
                                <List.Item className="my-1 overflow-hidden rounded-sm shadow-md font_one">
                                    <p className="h-4 min-w-4 text-center text-2 font_two" style={{ lineHeight: 2, ...idxColor(index) }}>{index + 1}</p>
                                    <div className="mx-1 min-w-8 rounded-sm overflow-hidden">
                                        <Image width={30} src={item.img} preview={false} />
                                    </div>
                                    <div className="w8/10">
                                        <Tooltip placement={"left"} title={item.title} arrow>
                                            <p className="text-3 !line-height-snug">{getStringArr(item.title, '第')[0]}</p>
                                        </Tooltip>
                                        <p className="text-2 !line-height-snug">{getStringArr(item.title, '第')[1]}</p>
                                        <p className="text-2 font_two">更新时间:{item.dateTime}</p>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </> :
                    <JLLoading />
            }
        </Card>
    </div>
}

export default Home;