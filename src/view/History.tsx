import { Card, Timeline } from "antd";
import { JLHistory } from "../core/store/JL_LocalStorage";
import { useEffect, useState } from "react";
import { DetailType } from "../core/api/api_detail";
import JLTitle from "../components/JL_Title";

function History() {
    const [data, setData] = useState<DetailType[]>([]);
    useEffect(() => () => {
        new JLHistory((obj) => {
            obj.getAll(data => setData(data));
        });
    }, [])

    return <div className="flex w-full h-full">
        <Card className="shadow-md w-60 box-border p-2 pt-0 overflow-x-hidden overflow-y-auto">
            <JLTitle>历史记录</JLTitle>
            <Timeline
                items={
                    [...data,...data,...data,...data,...data,...data,...data].map(item => {
                        return {
                            color: 'var(--THEME_COLOR_BG)',
                            children: <>
                                <Card className="shadow-md p-2 cursor-pointer">
                                    {new Date(item.time || 0).toLocaleDateString()}
                                    <span>--</span>
                                    {new Date(item.time || 0).toLocaleTimeString()}
                                </Card>
                            </>
                        }
                    })
                }
            />
        </Card>
        <Card className="shadow-md flex-1 ml-1">
            123
        </Card>
    </div>
}

export default History;