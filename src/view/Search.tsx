import { Card, Col, Row, Space, Tag } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { api_search, api_search_data, SearchType } from "../api/api_search";
import { rmAllSpace } from "../util/util";
import JLLoading from "../components/JL_Loding";

function Search() {
    const [params] = useSearchParams();
    const id = params.get('id');
    const [data, setData] = useState<SearchType>(Object.assign({}, api_search_data));

    const initData = useCallback(() => {
        setData({ title: '', list: [] });
        if (id) {
            api_search(id).then(val => setData(val));
        }
    }, [id]);

    useEffect(() => initData(), []);

    const navigate = useNavigate();
    return <Card className="h-full p-1 overflow-x-hidden overflow-y-auto">
        {data.list.length == 0 && <JLLoading />}
        <Card className="shadow-sm mb-1 text-center" style={{ backgroundColor: 'var(--THEME_COLOR_BG)', color: 'var(--THEME_COLOR)' }}>{data.title}</Card>
        <Row gutter={[4, 0]}>
            {data.list.map(item => {
                return <Col key={item.href} span={4}>
                    <Card onClick={() => navigate(`/detail?id=${item.href}`)} className="cursor-pointer">
                        <Card className="h-45 shadow-md overflow-hidden effect_hover_bg_size" style={{ backgroundImage: `url('${item.img}')` }}></Card>
                        <div className="text-3 text-white pt-1">
                            <Space size={4}>
                                {item.tags.map((item, idx) => {
                                    return <Tag key={idx} color="var(--THEME_COLOR)" className="mr-1 line-height-none" style={{ padding: '2px' }}>{item}</Tag>
                                })}
                            </Space>
                        </div>
                        <div className="p-2 pt-1 box-border text-word-break">{rmAllSpace(item.title)}</div>
                    </Card>
                </Col>
            })}
        </Row>
    </Card >
}

export default Search;