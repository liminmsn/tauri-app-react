import { Card, Timeline } from "antd";
import { JLHistory } from "../core/store/JL_LocalStorage";
import { useEffect, useState } from "react";
import { DetailType } from "../core/api/api_detail";

function History() {
    const [data, setData] = useState<DetailType[]>([]);
    useEffect(() => () => {
        new JLHistory((obj) => {
            obj.getAll(data => setData(data));
        });
    }, [])

    return <Card className="w-full h-full p-10">
        <Timeline
            items={
                data.map(item => {
                    return {
                        color: 'green',
                        children: <>
                            <Card className="shadow-md w4/10">
                                {item.left.desc}
                            </Card>
                        </>
                    }
                })
            }
        />
    </Card>
}

export default History;