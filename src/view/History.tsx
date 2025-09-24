import { Button, Card, Image, Timeline } from "antd";
import { JLHistory } from "../core/store/JL_LocalStorage";
import { useCallback, useEffect, useState } from "react";
import { DetailType } from "../core/api/api_detail";
import JLTitle from "../components/JL_Title";
import { useNavigate } from "react-router-dom";
import JLScrollView from "../components/JL_ScrollView";

function History() {
    const [data, setData] = useState<DetailType[]>([]);
    const [select, setSelect] = useState<DetailType>();
    function getSelectItem(history_item: string) {
        let val = '';
        data.forEach(item => {
            item.right.volumes.forEach(item_ => {
                item_.list.forEach(item__ => {
                    if (item__.href == history_item) {
                        val = item__.title;
                    }
                });
            });
        });
        return val;
    }

    function fetchData() {
        new JLHistory((obj) => {
            obj.getAll('history', data => {
                setData(data.reverse());
                if (data.length > 0) {
                    setSelect({ ...data[0] });
                }
            });
        });
    }

    useEffect(() => fetchData(), []);
    const navigate = useNavigate();

    const selectStyle: React.CSSProperties = { backgroundColor: 'var(--THEME_COLOR)', color: 'white', transition: 'all 250ms ease' };
    const selectCentext: React.CSSProperties = {
        background: `
        linear-gradient(to top right, rgba(0,0,0,1), transparent),
        url('${select ? select.left.img : ''}') center`
    };
    return <div className="flex w-full h-full">
        <Card className="shadow-md flex-1 ml-1 overflow-hidden">
            {
                select ?
                    <div className="w-full h-full flex flex-col items-center pt20 text-white" style={selectCentext}>
                        <Card className="w-60 h-80 max-h-80 effect_hover_bg_size shadow-md" style={{ backgroundImage: `url('${select.left.img}')` }}></Card>
                        <div className="text-4 font-bold line-height-none mt-4 font_one">{select.right.title.one}</div>
                        <div>{select.right.title.two}</div>
                        <div className="mt-2 font-bold">{getSelectItem(select.history_item || '')}</div>
                        <div className="my-1 w4/10 flex gap-1">
                            <Button className="w-full" type={"primary"} onClick={() => navigate(`/video?id=${globalThis.btoa(select.history_item!)}&title=${getSelectItem(select.history_item!)}`)}>继续播放</Button>
                            <Button className="w-full" type={"primary"} onClick={() => {
                                navigate(`/detail?id=${select.detail}`);
                                console.log(select);
                            }}>详情</Button>
                        </div>
                    </div> :
                    <div className="h-full flex items-center justify-center">
                        <Image width={80} src="/icon_2.png" preview={false} />
                    </div>
            }
        </Card >
        <Card className="shadow-md w5/10 max-w-150 pl-2 overflow-hidden">
            <JLScrollView>
                <JLTitle>历史记录</JLTitle>
                {
                    data.length == 0 ?
                        <p className="text-bluegray">暂无历史播放记录...</p>
                        :
                        <>
                            {/* <Segmented<string>
                            options={['3天', '7天', '时间不限']}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        /> */}
                            <Timeline
                                className="box-border"
                                mode={"alternate"}
                                items={
                                    data.map(item => {
                                        return {
                                            color: 'blue',
                                            children: <>
                                                <div style={{ color: 'var(--THEME_COLOR)' }}>
                                                    {new Date(item.time || 0).toLocaleDateString()}
                                                    <span> </span>
                                                    {new Date(item.time || 0).toLocaleTimeString()}
                                                </div>
                                                <Card
                                                    className="shadow-md cursor-pointer p-2"
                                                    style={item.history_item == select?.history_item ? selectStyle : undefined}
                                                    onClick={() => setSelect(item)}>
                                                    <div className="flex">
                                                        <Card className="effect_hover_bg_size w-20 h-20 mr-2" style={{ backgroundImage: `url('${item.left.img}')` }}></Card>
                                                        <div className="flex-1">{item.right.title.one}</div>
                                                    </div>
                                                </Card>
                                                <span className="text-bluegray">{getSelectItem(item.history_item || '')}</span>
                                            </>
                                        }
                                    })
                                }
                            />
                        </>
                }
            </JLScrollView>
        </Card>
    </div >
}

export default History;