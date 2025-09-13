import { Card, Carousel, Col, Image, List, Row } from "antd";
import { api_home, api_home_data } from "../api/api_home";
import { useCallback, useEffect, useState } from "react";
import { getStateIcon, getStringArr, idxColor } from "../util/util";
import JLTitle from "../components/JL_Title";
import JLLoading from "../components/JL_Loding";
import JLCard from "../components/Home/JL_Card";
import JLCategoryTop from "../components/Home/JL_CategoryTop";
import { Link, useNavigate } from "react-router";

function Home() {
    const [data, setData] = useState(Object.assign({}, api_home_data));
    const initData = useCallback(() => {
        console.count('home');
        api_home().then(val => setData(val))
    }, [])
    useEffect(() => () => initData(), []);

    const navigate = useNavigate();
    return <div className="flex h-full w-full box-border cursor-pointer">
        <Card className="w-full overflow-y-auto overflow-x-hidden p-1 pb-10">
            <div className="flex h-70">
                <div className="flex flex-col w-50">
                    <Card className="shadow-md w-full h-full pl-1">
                        <JLTitle>{data.carousel.title}</JLTitle>
                        {data.carousel.two.length == 0 && <JLLoading />}
                        {data.carousel.two.map(item =>
                            <div className="flex items-center cursor-pointer" key={item.href} onClick={() => navigate(`/search?id=${item.href}`)}>
                                <div className="h-4 min-w-4 text-center text-2 font_two mr-1" style={{ lineHeight: 2, ...idxColor(Number.parseInt(item.id)) }}>{item.id}</div>
                                <span>{item.title}</span>
                                <span className="ml-1">{getStateIcon(item.state)}</span>
                            </div>
                        )}
                    </Card>
                    <Card style={{ backgroundColor: 'var(--THEME_COLOR_BG)' }} className="shadow-md h-10 mt-1 text-center"></Card>
                </div>
                <Card className="w-full shadow-md ml-1 overflow-hidden">
                    {data.carousel.one.length == 0 && <JLLoading />}
                    <Carousel autoplay>
                        {data.carousel.one.map(item => <JLCard key={item.author} id={item.author} onRender={() => null} item={item} />)}
                    </Carousel>
                </Card>
            </div>
            {data.carousel.one.length == 0 && <JLLoading />}
            {
                data.indexhost.map(item => {
                    return <Card className="mt-1" key={item.list[0].img}>
                        <JLTitle>{item.title}</JLTitle>
                        <Row gutter={[10, 10]}>
                            {item.list.map(item => {
                                return <Col span={6} key={item.href}>
                                    <Card className="shadow-md h-full overflow-hidden cursor-pointer" onClick={() => navigate(`/detail?id=${item.href}`)}>
                                        <Image className="w-full" src={item.img} preview={false} />
                                        <div className="text-3 p-1 font-bold">{item.title}</div>
                                        <div className="text-3 p-1">{item.dateTime}</div>
                                    </Card>
                                </Col>
                            })}
                        </Row>
                    </Card>
                })
            }
            <Row gutter={[10, 10]} className="mt-2">
                {
                    data.category.map(item => {
                        return <Col span={6} key={item.top_item.href}>
                            <Card className="shadow-md p-1">
                                <JLTitle>{item.head}</JLTitle>
                                <JLCategoryTop item={item} />
                            </Card>
                        </Col>
                    })
                }
            </Row>
        </Card>
        <Card className="w-70 px-1 ml-1 overflow-y-auto">
            <JLTitle>{data.recently.title}</JLTitle>
            {data.recently.list.length == 0 && <JLLoading />}
            <List
                className="pb-1"
                dataSource={data.recently.list}
                renderItem={(item, index) => (
                    <List.Item className="mb-1 overflow-hidden rounded shadow-md cursor-pointer" onClick={() => navigate(`/detail?id=${item.href}`)}>
                        <p className="h-4 min-w-4 text-center text-2 font_two" style={{ lineHeight: 2, ...idxColor(index) }}>{index + 1}</p>
                        <div className="mx-1 min-w-8 rounded-sm overflow-hidden">
                            <Image width={30} src={item.img} preview={false} />
                        </div>
                        <div className="w8/10">
                            <p className="text-3 font-bold">{getStringArr(item.title, '第')[0]}</p>
                            <p className="text-2">{getStringArr(item.title, '第')[1]}</p>
                            <p className="text-2">更新时间:{item.dateTime}</p>
                        </div>
                    </List.Item>
                )}
            />
        </Card>
    </div>
}

export default Home;