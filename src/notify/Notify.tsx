import { Button, Card, Carousel, Image } from "antd";
import { X } from "lucide-react";
import React from "react";
import icon from '../assets/icon.png';

type NotifyType = {
    show_notify: boolean;
    notify_data: string[];
}

const NotifyStyle: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    top: 0,
    textAlign: 'center',
    zIndex: '16',
    background: 'rgba(0,0,0,0.1)',
    backdropFilter: 'blur(0.5px)',
};

function stringDom(dom: string) {
    return <div className="h-60 flex">
        <iframe srcDoc={dom} className="w-full h-full border-none" />
    </div>;
}

//Notify
class Notify extends React.Component {
    state: Readonly<NotifyType> = {
        show_notify: true,
        notify_data: ['<h1>helloworld</h1>', '<h1>helloworld</h1>']
    };
    componentDidMount() {

    }

    private Title = <div className="flex items-center">
        <Image width={25} src={icon} />
        <span className="ml-1">特别公告</span>
    </div>;
    private Close = <Button onClick={() => this.setState({ show_notify: false })} danger type={"primary"}><X size={14} /></Button>;
    render(): React.ReactNode {
        return this.state.show_notify && <div className="w-full h-full" style={NotifyStyle}>
            <Card className="w-100 h-auto overflow-hidden mt-30" style={{ marginInline: 'auto' }} title={this.Title} extra={this.Close}>
                <Carousel className="h-60" arrows infinite={false}>
                    {
                        this.state.notify_data.map(item => {
                            return stringDom(item);
                        })
                    }
                </Carousel>
            </Card>
        </div>
    }
}

export default Notify;