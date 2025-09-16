import { Button, Card, Col, Image, Row, Space, Tag, Tooltip } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { api_detail, api_detail_data } from "../api/api_detail";
import { CirclePlay, Heart } from "lucide-react";
import JLLoading from "../components/JL_Loding";
import { rmAllSpace } from "../util/util";

export let video_config = {
    url: ''
};

function Detail() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [data, setData] = useState(api_detail_data);
    const [select, setSelect] = useState('');

    const initData = useCallback(() => {
        if (id) {
            setData({ ...api_detail_data })
            api_detail(id).then(res => {
                setData({ ...res })
            });
        }
    }, [id]);

    useEffect(() => { initData() }, [initData]);

    const navigate = useNavigate();

    function nav(url: string) {
        setSelect(() => url);
        navigate(`/video`);
        video_config.url = url;
    }
    return <Card className="h-full">
        <div className="h-full box-border flex p-1">
            <div className="h-full w2/10 max-w-60 flex flex-col">
                <Card className="flex-1 shadow-md p-1">
                    {data.right.tags.length == 0
                        ? <JLLoading /> :
                        <>
                            <Image className="shadow-md rounded-md w-full" preview={false} src={data.left.img} />
                            <div className="my-1 w-full flex gap-1">
                                <Button className="w-full" type={"primary"} icon={<CirclePlay size={14} />} onClick={() => nav(data.left.href)}>播放</Button>
                                <Button className="w-full" type={"primary"} icon={<Heart size={14} />}>收藏</Button>
                            </div>
                            <div>
                                <span className="font-bold">更新时间：</span><br />
                                <span className="text-blueGray font_two text-3">{data.left.upDate}</span>
                            </div>
                            <div>
                                <span className="font-bold">更新状态：</span><br />
                                <span className="text-blueGray font_two text-3">{data.left.desc}</span>
                            </div>
                        </>
                    }
                </Card>
                <Card className="h1/11 mt-1 shadow-md" ></Card>
                <Card className="h1/11 mt-1 shadow-md" ></Card>
            </div>
            <Card className="h-full w-full box-border overflow-y-auto shadow-md p-2 ml-1">
                {data.right.tags.length == 0
                    ? <JLLoading /> :
                    <Space className="pb-2" size={4} direction={"vertical"}>
                        <Space size={0}>
                            {data.right.tags.map(item => {
                                return <Tag key={item} color="var(--THEME_COLOR)">{item}</Tag>
                            })}
                        </Space>
                        <span className="text-4 font-bold">{data.right.title.one}</span>
                        <span className="text-blueGray font_two">{data.right.title.two}</span>
                        <div className=" font-bold">相关推荐：</div>
                        <div className="w-8/10 overflow-x-auto flex gap-2">
                            {data.right.ref.map(item => {
                                return <Card key={item.href} className="w3/10 max-w-40 effect_scale" onClick={() => navigate(`/detail?id=${item.href}`)}>
                                    <Card className="h-20 effect_hover_bg_size" style={{ backgroundImage: `url('${item.img}')` }}></Card>
                                    <div className="text-3 max-h-10 p-1 multiline-ellipsis">{item.title}</div>
                                </Card>
                            })}
                        </div>
                        <div className=" font-bold">简介：</div>
                        <span className="text-blueGray font_two">{data.right.desc}</span>
                        {data.right.volumes.map(item => {
                            return <div key={item.list[0].href}>
                                <div className="my-2  font-bold">{rmAllSpace(item.title)}</div>
                                <Row gutter={[6, 6]}>
                                    {item.list.map(item => {
                                        return <Col key={item.href} span={3}>
                                            <Tooltip placement={'bottom'} title={<span className="text-3">{item.title}</span>} arrow >
                                                <Card className={`shadow-md p-2 effect_scale`} style={{ backgroundColor: `${select == item.title ? 'var(--THEME_COLOR_BG)' : ''}` }} onClick={() => nav(item.href)}>
                                                    <div className="text-nowrap text-3 text-ellipsis overflow-hidden cursor-pointer">
                                                        {item.title}
                                                    </div>
                                                </Card>
                                            </Tooltip>
                                        </Col>
                                    })}
                                </Row>
                            </div>
                        })}
                    </Space>
                }
            </Card>
        </div>
    </Card>
}
export default Detail;