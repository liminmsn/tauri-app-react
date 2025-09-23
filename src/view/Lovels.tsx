import { Card, Col, Row, Space, Tag } from "antd";
import { useCallback, useEffect, useState } from "react";
import { JLLovels } from "../core/store/JL_LocalStorage";
import { DetailType } from "../core/api/api_detail";
import { rmAllSpace } from "../core/util/util";
import { useNavigate } from "react-router-dom";

function Levels() {
    const [data, setData] = useState<DetailType[]>([]);
    const intData = useCallback(() => {
        new JLLovels(db => {
            db.getAll('lovels', (data) => {
                debugger
                setData([...data]);
            });
        });
    }, []);

    useEffect(() => intData(), []);
    const navigate = useNavigate();
    return <Card className="w-full h-full overflow-x-hidden overflow-y-auto box-border p-1">
        <Row gutter={[4, 4]}>
            {data.map(item => {
                return <Col key={item.lovels_item} span={4}>
                    <Card onClick={() => navigate('/detail'.concat(item.lovels_item || ''))} className="cursor-pointer">
                        <div className="flex flex-col h-full">
                            <Card className="shadow-md overflow-hidden min-h-30 h-30 text-word-break effect_hover_bg_size" style={
                                {
                                    backgroundImage: `url('${item.left.img}'),url('/icon_2.png')`,
                                    backgroundSize: '100%,60%'
                                }
                            }></Card>
                            <div className="text-3 text-white pt-1">
                                <Space size={4}>
                                    {item.right.tags.map((item, idx) => {
                                        return <Tag key={idx} color="var(--THEME_COLOR)" className="mr-1 line-height-none" style={{ padding: '2px' }}>{item}</Tag>
                                    })}
                                </Space>
                            </div>
                            <div className="p-2 pt-1 box-border text-word-break">{rmAllSpace(item.right.title.one)}</div>
                            {/* <div className="flex-1"></div> */}
                            {/* <div className="p-2 pt-1 box-border text-3 fong_one text-word-break text-bluegray">{rmAllSpace(item.left.desc)}</div> */}
                        </div>
                    </Card>
                </Col>
            })}
        </Row>
    </Card>
}

export default Levels;