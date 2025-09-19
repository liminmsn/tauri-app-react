import { Button, Card, Image, Segmented, Timeline } from "antd";
import { JLHistory } from "../core/store/JL_LocalStorage";
import { useEffect, useState } from "react";
import { DetailType } from "../core/api/api_detail";
import JLTitle from "../components/JL_Title";
import { CirclePlay, Heart, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
            obj.getAll(data => {
                setData(data);
                setSelect({ ...data[0] });
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
        <Card className="shadow-md w5/10 p-2 pt-0 overflow-x-hidden overflow-y-auto">
            <JLTitle>历史记录</JLTitle>
            <Segmented<string>
                options={['3天', '7天', '时间不限']}
                onChange={(value) => {
                    console.log(value);
                }}
            />
            <Timeline
                className="box-border"
                mode={"alternate"}
                items={
                    [...data].reverse().map(item => {
                        return {
                            color: 'blue',
                            children: <>
                                <div style={{ color: 'var(--THEME_COLOR)' }}>
                                    {new Date(item.time || 0).toLocaleDateString()}
                                    <span>-</span>
                                    {new Date(item.time || 0).toLocaleTimeString()}
                                </div>
                                <span className="text-bluegray">{getSelectItem(item.history_item || '')}</span>
                                <Card
                                    style={item.history_item == select?.history_item ? selectStyle : undefined}
                                    className="shadow-md p-2 cursor-pointer flex flex-col"
                                    onClick={() => setSelect(item)}>
                                    <div className="flex">
                                        <Card className="w-100 effect_hover_bg_size" style={{ backgroundImage: `url('${item.left.img}')` }}></Card>
                                        <div className="text-3 ml-2">{item.right.title.one}</div>
                                    </div>
                                </Card>
                            </>
                        }
                    })
                }
            />
        </Card>
        <Card className="shadow-md flex-1 ml-1 overflow-hidden">
            {
                select ?
                    <div className="w-full h-full flex flex-col justify-center items-center text-white" style={selectCentext}>
                        <Card className="w-60 h-80 effect_hover_bg_size shadow-md" style={{ backgroundImage: `url('${select.left.img}')` }}></Card>
                        <div className="w6/10 text-4 font-bold line-height-none mt-4 font_one">{select.right.title.one}</div>
                        <div>{select.right.title.two}</div>
                        <div className="mt-2 font-bold">{getSelectItem(select.history_item || '')}</div>
                        <div className="my-1 w4/10 flex gap-1">
                            <Button className="w-full" type={"primary"} icon={<CirclePlay size={14} />} onClick={() => navigate(`/video?id=${globalThis.btoa(select.history_item!)}&title=${getSelectItem(select.history_item!)}`)}>继续播放</Button>
                            {/* <Button className="w-full" type={"primary"} icon={<Heart size={14} />}>收藏</Button> */}
                        </div>
                    </div> :
                    <div className="h-full flex items-center justify-center">
                        <Image width={80} src="/icon_2.png" preview={false} />
                    </div>
            }
        </Card >
    </div >
}

export default History;