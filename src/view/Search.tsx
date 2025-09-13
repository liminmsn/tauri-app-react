import { Card, Col, Row, Space } from "antd";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { api_search, api_search_data, SearchType } from "../api/api_search";
import { rmAllSpace } from "../util/util";
import JLLoading from "../components/JL_Loding";

const itemStyle: CSSProperties = {};
const tagStyle: CSSProperties = { paddingInline: '4px', background: 'var(--THEME_COLOR)', border: '1px solid var(--THEME_COLOR)' };

function Search() {
    const [params] = useSearchParams();
    const id = params.get('id');
    const [data, setData] = useState<SearchType>(Object.assign({}, api_search_data));

    const initData = useCallback(() => {
        setData({ title: '', list: [] })
        if (id) {
            api_search(id).then(val => setData(val))
        }
    }, [id]);

    useEffect(() => {
        initData();
    }, [initData]);

    return <Card className="h-full p-1 overflow-x-hidden overflow-y-auto">
        {data.list.length == 0 && <JLLoading />}
        <div>{data.title}</div>
        <Row gutter={[10, 0]}>
            {data.list.map(item => {
                return <Col key={item.href} span={4}>
                    <Card>
                        <Card className="h-25 shadow-md overflow-hidden effect_hover_bg_size" style={{ ...itemStyle, backgroundImage: `url('${item.img}')` }}></Card>
                        <div className="text-3 text-white pt-1">
                            <Space size={4}>
                                {item.tags.map((item, idx) => {
                                    return <span key={idx} style={tagStyle} className="font-bold">{item}</span>
                                })}
                            </Space>
                        </div>
                        {/* <span className="text-3 text-word-break">{rmAllSpace(item.author)}</span> */}
                        <div className="p-2 pt-1 text-3 box-border font-bold text-word-break">{rmAllSpace(item.title)}</div>
                    </Card>
                </Col>
            })}
        </Row>
    </Card >
}

export default Search;