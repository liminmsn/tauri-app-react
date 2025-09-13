import { Button, Card, Col, Image, Row, Space, Tag, Tooltip } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { api_detail, api_detail_data } from "../api/api_detail";
import { CirclePlay, Heart } from "lucide-react";
import JLLoading from "../components/JL_Loding";
import { rmAllSpace } from "../util/util";

function Detail() {
    const [params] = useSearchParams();
    const id = params.get('id');
    const [data, setData] = useState(api_detail_data)

    const initData = useCallback(() => {
        if (id) {
            setData({ ...api_detail_data })
            api_detail(id).then(res => {
                setData({ ...res })
            });
        }
    }, [id])

    useEffect(() => { initData() }, [initData])

    const navigate = useNavigate();
    return <div className="h-full flex">
        <Card className="h-full p-1 w2/10">
            {data.right.tags.length == 0 && <JLLoading />}
            <Image className="shadow-md rounded-md" src={data.left.img} />
            <Space className="my-1">
                <Button type={"primary"} icon={<CirclePlay size={14} />}>播放</Button>
                <Button type={"primary"} icon={<Heart size={14} />}>收藏</Button>
            </Space>
            <div><span className="text-blueGray">更新时间：</span>{data.left.upDate}</div>
            <div><span className="text-blueGray">更新状态：</span>{data.left.desc}</div>
        </Card>
        <Card className="h-full p-2 pb-10 box-border w8/10 ml-1 overflow-y-auto">
            <Space size={4} direction={"vertical"}>
                <Space size={0}>
                    {data.right.tags.map(item => {
                        return <Tag key={item} color="var(--THEME_COLOR)">{item}</Tag>
                    })}
                </Space>
                <span className="text-5 font-bold">{data.right.title.one}</span>
                <span className="text-blueGray">{data.right.title.two}</span>
                <div className="text-4 font-bold">相关推荐：</div>
                <Row gutter={10}>
                    {data.right.ref.map(item => {
                        return <Col key={item.href} span={6}>
                            <Card className="cursor-pointer" onClick={() => navigate(`/detail?id=${item.href}`)}>
                                <Card className="h-30 effect_hover_bg_size" style={{backgroundImage:`url('${item.img}')`}}></Card>
                                <div>{item.title}</div>
                            </Card>
                        </Col>
                    })}
                </Row>
                <div className="text-4 font-bold">简介：</div>
                <span className="text-blueGray">{data.right.desc}</span>
                {data.right.volumes.map(item => {
                    return <div className="mb-2" key={item.list[0].href}>
                        <div className="my-2 text-4 font-bold">{rmAllSpace(item.title)}</div>
                        <Row gutter={[4, 4]}>
                            {item.list.map(item => {
                                return <Col key={item.href} span={4}>
                                    <Card className="shadow-md p-2">
                                        <Tooltip title={<span className="text-3">{item.title}</span>} arrow color="var(--THEME_COLOR)" >
                                            <div className="text-nowrap text-3 text-ellipsis overflow-hidden cursor-pointer">
                                                {item.title}
                                            </div>
                                        </Tooltip>
                                    </Card>
                                </Col>
                            })}
                        </Row>
                    </div>
                })}
            </Space>
        </Card>
    </div>
}
export default Detail;