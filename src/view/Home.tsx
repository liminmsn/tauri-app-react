import { Card, Carousel, Col, Image, List, Row } from "antd";
import { api_home, api_home_data } from "../core/api/api_home";
import { useCallback, useEffect, useState } from "react";
import { getStateIcon, getStringArr, idxColor } from "../core/util/util";
import { useNavigate } from "react-router-dom";
import JLTitle from "../components/JL_Title";
import JLLoading from "../components/JL_Loding";
import JLCard from "../components/Home/JL_Card";
import JLCategoryTop from "../components/Home/JL_CategoryTop";
import icon from '../assets/icon.png';
import JLScrollView from "../components/JL_ScrollView";

function Home() {
    const [data, setData] = useState(Object.assign({}, api_home_data));
    const initData = useCallback(() => {
        api_home().then(val => setData(val))
    }, [])
    useEffect(() => initData(), []);

    const navigate = useNavigate();
    return data.carousel.title === '' ?
        <Card className="w-full h-full">
            <JLLoading icon={<Image width={60} srcSet={icon} preview={false} />}>
                <span className="font-bold">动漫获取中...</span>
            </JLLoading>
        </Card> :
        <div className="flex h-full w-full box-border">
            <Card className="w-full overflow-x-hidden p-1">
                <JLScrollView>
                    <div className="flex h-60">
                        <div className="flex flex-col min-w-40 max-w-40">
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
                        </div>
                        <Card className="flex-1 shadow-md ml-1 overflow-hidden">
                            <Carousel autoplay>
                                {data.carousel.one.map(item => <JLCard key={item.author} id={item.author} onRender={() => null} item={item} />)}
                            </Carousel>
                        </Card>
                    </div>
                    {/*#TODO:Center list */}
                    {
                        data.indexhost.map(item => {
                            return <Card className="mt-1" key={item.list[0].img}>
                                <JLTitle>{item.title}</JLTitle>
                                <Row gutter={[6, 6]}>
                                    {item.list.map(item => {
                                        return <Col span={6} key={item.href}>
                                            <Card className="shadow-md h-full overflow-hidden effect_scale" onClick={() => navigate(`/detail?id=${item.href}`)}>
                                                <div className="h-full flex flex-col">
                                                    <Card className="w-full min-h-18" style={{ backgroundImage: `url('${item.img}')` }}></Card>
                                                    <div className="text-3 p-1 font-bold">{item.title}</div>
                                                    <div className="h-full"></div>
                                                    <div className="text-3 text-bluegray p-1">{item.dateTime}</div>
                                                </div>
                                            </Card>
                                        </Col>
                                    })}
                                </Row>
                            </Card>
                        })
                    }
                    {/*#TODO:bottom grop */}
                    <Row gutter={[6, 6]} className="mt-2 pb-1">
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
                </JLScrollView>
            </Card>
            {/* #TODO:Right list */}
            <Card className="w3/12 min-w-50 overflow-hidden ml-1 p-1">
                <JLScrollView speed={0.2}>
                    <JLTitle>{data.recently.title}</JLTitle>
                    <List
                        dataSource={data.recently.list}
                        renderItem={(item, _index) => (
                            <List.Item className="overflow-hidden rounded effect_scale mb-1" onClick={() => navigate(`/detail?id=${item.href}`)}>
                                <p className="h-4 min-w-4 text-center text-2 font_two" style={{ lineHeight: 2, ...idxColor(_index) }}>{_index + 1}</p>
                                <div className="w-10 mx-1 rounded-sm overflow-hidden">
                                    <Image src={item.img} preview={false} />
                                </div>
                                <div className="w-full overflow-auto">
                                    <div className="text-3 font-600 text-nowrap text-ellipsis overflow-hidden">{getStringArr(item.title, '第')[0]}</div>
                                    <div className="text-3 text-nowrap text-ellipsis overflow-hidden" style={{ lineHeight: 1, color: 'var(--THEME_COLOR)' }}>{getStringArr(item.title, '第')[1]}</div>
                                    <div className="text-3 text-bluegray">{item.dateTime}</div>
                                </div>
                            </List.Item>
                        )} />
                </JLScrollView>
            </Card>
        </div >
}

export default Home;