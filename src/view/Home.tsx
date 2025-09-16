import { Card, Carousel, Col, Image, List, Row } from "antd";
import { api_home, api_home_data } from "../api/api_home";
import { useCallback, useEffect, useState } from "react";
import { getStateIcon, getStringArr, idxColor } from "../util/util";
import { useNavigate } from "react-router";
import JLTitle from "../components/JL_Title";
import JLLoading from "../components/JL_Loding";
import JLCard from "../components/Home/JL_Card";
import JLCategoryTop from "../components/Home/JL_CategoryTop";

function Home() {
    const [data, setData] = useState(Object.assign({}, api_home_data));
    const initData = useCallback(() => {
        console.count('home');
        api_home().then(val => setData(val))
    }, [])
    useEffect(() => () => initData(), []);

    const navigate = useNavigate();
    return <div className="flex h-full w-full box-border">
        <Card className="w-full overflow-y-auto overflow-x-hidden p-1 pb-2">
            <div className="flex h-60">
                <div className="flex flex-col w-40">
                    {data.carousel.two.length == 0 && <JLLoading />}
                    <Card className="shadow-md flex-1 pl-1 pb-2">
                        <JLTitle>{data.carousel.title}</JLTitle>
                        {data.carousel.two.map(item =>
                            <div className="flex items-center cursor-pointer" key={item.href} onClick={() => navigate(`/search?id=${item.href}`)}>
                                <div className="h-4 min-w-4 text-center text-2 font_two mr-1" style={{ lineHeight: 2, ...idxColor(Number.parseInt(item.id)) }}>{item.id}</div>
                                <span>{item.title}</span>
                                <span className="ml-1">{getStateIcon(item.state)}</span>
                            </div>
                        )}
                    </Card>
                    <div className="h-16 mt-1 flex">
                        <Card className="shadow-md flex-1"></Card>
                        <Card className="shadow-md flex-1 mx-1" ></Card>
                        <Card className="shadow-md flex-1"></Card>
                    </div>
                </div>
                <Card className="flex-1 shadow-md ml-1 overflow-hidden">
                    {data.carousel.one.length == 0 && <JLLoading />}
                    <Carousel autoplay>
                        {data.carousel.one.map(item => <JLCard key={item.author} id={item.author} onRender={() => null} item={item} />)}
                    </Carousel>
                </Card>
            </div>
            {data.carousel.one.length == 0 && <JLLoading />}
            {/*#TODO:Center list */}
            {
                data.indexhost.map(item => {
                    return <Card className="mt-1" key={item.list[0].img}>
                        <JLTitle>{item.title}</JLTitle>
                        <Row gutter={[6, 6]}>
                            {item.list.map(item => {
                                return <Col span={6} key={item.href}>
                                    <Card className="shadow-md h-full overflow-hidden effect_scale" onClick={() => navigate(`/detail?id=${item.href}`)}>
                                        <Card className="w-full h-20" style={{ backgroundImage: `url('${item.img}')` }}></Card>
                                        <div className="text-3 p-1 font-bold">{item.title}</div>
                                        <div className="text-3 p-1">{item.dateTime}</div>
                                    </Card>
                                </Col>
                            })}
                        </Row>
                    </Card>
                })
            }
            {/*#TODO:bottom grop */}
            <Row gutter={[6, 6]} className="pb-2 mt-2">
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
        {/*#TODO:Right list */}
        <Card className="w2/10 min-w-50 px-1 ml-1 overflow-y-auto">
            {data.recently.list.length == 0 && <JLLoading />}
            <JLTitle>{data.recently.title}</JLTitle>
            <List
                className="pb-1"
                dataSource={data.recently.list}
                renderItem={(item, _index) => (
                    <List.Item className="overflow-hidden rounded shadow-md effect_scale" onClick={() => navigate(`/detail?id=${item.href}`)}>
                        {/* <p className="h-4 min-w-4 text-center text-2 font_two" style={{ lineHeight: 2, ...idxColor(_index) }}>{_index + 1}</p> */}
                        <div className="w-10 mx-1 rounded-sm overflow-hidden">
                            <Image src={item.img} preview={false} />
                        </div>
                        <div className="w-full overflow-auto">
                            <div className="text-3 font-bold text-nowrap text-ellipsis overflow-hidden">{getStringArr(item.title, '第')[0]}</div>
                            <div className="text-3 text-nowrap text-ellipsis overflow-hidden" style={{ lineHeight: 1, color: 'var(--THEME_COLOR)' }}>{getStringArr(item.title, '第')[1]}</div>
                            <div className="text-3">{item.dateTime}</div>
                        </div>
                    </List.Item>
                )}
            />
        </Card>
    </div>
}

export default Home;