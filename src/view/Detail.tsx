import { Button, Card, Col, Row, Space, Tag, Tooltip } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api_detail, api_detail_data } from "../core/api/api_detail";
import { CirclePlay, Heart } from "lucide-react";
import JLLoading from "../components/JL_Loding";
import { rmAllSpace } from "../core/util/util";
import { JLHistory, JLLovels } from "../core/store/JL_LocalStorage";
import useApp from "antd/es/app/useApp";


const itemSelect_NO: React.CSSProperties = {
    // fontWeight: 'bold'
}
const itemSelect_YES: React.CSSProperties = {
    backgroundColor: 'var(--THEME_COLOR)',
    // fontWeight: 'bold',
    color: 'white'
}

function Detail() {
    const { message } = useApp();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [data, setData] = useState(api_detail_data);
    const [lovel, setLovel] = useState(false);
    const [select, setSelect] = useState('');

    const initData = useCallback(() => {
        setSelect(localStorage.getItem('page_detail_select') || '');
        if (id) {
            setData({ ...api_detail_data });
            api_detail(id).then(res => {
                setData({ ...res });
            });
        }
        //收藏判断
        new JLLovels((db) => {
            db.isIn('lovels', globalThis.location.search).then(bol => setLovel(bol));
        });
    }, [id]);

    useEffect(() => {
        initData();
        return () => {
            setData({ ...api_detail_data });
        }
    }, [id]);

    //打开
    const navigate = useNavigate();
    function nav(url: string, title?: string) {
        localStorage.setItem('page_detail_select', url);
        const data_ = { ...data, history_item: url, detail: id || '' };
        new JLHistory((obj) => {
            obj.addHistory(data_);
        });
        setData(data);
        setTimeout(() => {
            navigate(`/video?id=${globalThis.btoa(url)}&title=${title}`);
        }, 200);
    }

    // 收藏
    function add_lovel() {
        if (lovel) {
            new JLLovels(obj => {
                const req = obj.delLovel(location.search);
                req?.addEventListener('success', (_e) => {
                    setLovel(false);
                    message.info('取消收藏');
                });
            });
        } else {
            //收藏
            new JLLovels((obj) => {
                const res = obj.addLovel({ ...data, lovels_item: location.search });
                res?.addEventListener('success', (_e) => {
                    setLovel(true);
                    message.success('添加收藏');
                    obj.close();
                });
            });
        }
    }

    return <Card className="h-full">
        <div className="h-full box-border flex p-1">
            <div className="h-full flex flex-col min-w-40 max-w-40">
                <Card className="box-border p-1" style={{ backgroundColor: "var(--THEME_COLOR)" }}>
                    <Card className="min-h-45 h-45 effect_hover_bg_size" style={{ backgroundImage: `url('${data.left.img}')`, backgroundSize: "cover" }}></Card>
                </Card>
                {data.right.tags.length == 0
                    ? <JLLoading /> :
                    <Card className="flex-1 shadow-md p-1">
                        <div className="my-1 w-full flex gap-1">
                            <Button className="w-full" type={"primary"} icon={<CirclePlay size={14} />} onClick={() => nav(data.left.href, data.right.volumes[0].list[0].title)}>播放</Button>
                            <Button className="w-full" type={"primary"}
                                icon={<Heart size={14} color={lovel ? 'red' : 'white'} />}
                                onClick={() => add_lovel()}>收藏</Button>
                        </div>
                        <div>
                            <span className="font-bold">更新时间：</span><br />
                            <span className="text-blueGray font_two text-3">{data.left.upDate}</span>
                        </div>
                        <div>
                            <span className="font-bold">更新状态：</span><br />
                            <span className="text-blueGray font_two text-3">{data.left.desc}</span>
                        </div>
                    </Card>
                }
            </div>
            <Card className="h-full w-full box-border overflow-y-auto shadow-md px-1 ml-1">
                {data.history_item}
                {data.right.tags.length == 0
                    ? <JLLoading /> :
                    <Space className="pb-2" size={4} direction={"vertical"}>
                        <Space size={0}>
                            {data.right.tags.map((item,idx) => {
                                return <Tag key={idx} color="var(--THEME_COLOR)">{item}</Tag>
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
                                        return <Col key={item.href} span={6}>
                                            <Tooltip placement={'bottom'} title={<span className="text-3">{item.title}</span>} arrow >
                                                <Card className={`shadow p-2 effect_scale select-none`} style={select == item.href ? itemSelect_YES : itemSelect_NO} onClick={() => nav(item.href, item.title)}>
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