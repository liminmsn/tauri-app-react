import { Card, Col, Row, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api_search, api_search_data, SearchType } from "../core/api/api_search";
import { rmAllSpace } from "../core/util/util";
import JLLoading from "../components/JL_Loding";

function Search() {
    const [params] = useSearchParams();
    const id = params.get('id');
    const [data, setData] = useState<SearchType>(Object.assign({}, api_search_data));

    useEffect(() => {
        setData({ title: '', list: [] });
        if (id) {
            api_search(id).then(val => setData(val));
        }
    }, [id]);

    const navigate = useNavigate();
    return <Card className="h-full p-1 overflow-x-hidden overflow-y-auto">
        {data.list.length == 0 && <JLLoading />}
        <Card className="shadow-sm mb-1 text-center font-bold" style={{ backgroundColor: 'var(--THEME_COLOR_BG)', color: 'var(--THEME_COLOR)' }}>{data.title}</Card>
        <Row gutter={[4, 4]}>
            {data.list.map(item => {
                return <Col key={item.href} span={4}>
                    <Card onClick={() => navigate(`/detail?id=${item.href}`)} className="cursor-pointer h-full">
                        <div className="flex flex-col h-full">
                            <Card className="shadow-md overflow-hidden min-h-30 h-30 text-word-break effect_hover_bg_size" style={
                                {
                                    backgroundImage: `url('${item.img}'),url('/icon_2.png')`,
                                    backgroundSize: '100%,60%'
                                }
                            }></Card>
                            <div className="text-3 text-white pt-1">
                                <Space size={4}>
                                    {item.tags.map((item, idx) => {
                                        return <Tag key={idx} color="var(--THEME_COLOR)" className="mr-1 line-height-none" style={{ padding: '2px' }}>{item}</Tag>
                                    })}
                                </Space>
                            </div>
                            <div className="p-2 pt-1 box-border text-word-break">{rmAllSpace(item.title)}</div>
                            <div className="flex-1"></div>
                            <div className="p-2 pt-1 box-border text-3 fong_one text-word-break text-bluegray">{rmAllSpace(item.author)}</div>
                        </div>
                    </Card>
                </Col>
            })}
        </Row>
    </Card >
}

export default Search;