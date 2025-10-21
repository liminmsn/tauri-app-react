import { Button, Card, Carousel, Image } from "antd";
import { X } from "lucide-react";
import React from "react";
import icon from '../assets/icon.png';
import { GlobalEvent } from "../core/util/globalEvent";

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
    background: 'rgba(0,0,0,0)',
    // backdropFilter: 'blur(0.02px)'
};

//Notify
class Notify extends React.Component {
    state: Readonly<NotifyType> = {
        show_notify: false,
        notify_data: []
    };

    fetchData() {
        this.setState({ ...this.state, notify_data: ['<h1>helloworld</h1>', '<a href="/premium">go</a>'] });
    }

    componentDidMount() {
        new GlobalEvent().on('open_notify', (bol) => {
            this.setState({ ...this.state, show_notify: bol });
        });
    }

    private Title = <div className="flex items-center">
        {/* <Image width={24} src={icon} /> */}
        <span className="ml-1">通知</span>
    </div>;
    private Close = <Button onClick={() => this.setState({ show_notify: false })} danger type={"primary"}><X size={14} /></Button>;
    render(): React.ReactNode {
        return this.state.show_notify && <div className="w-full h-full" style={NotifyStyle}>
            <Card className="w-100 h-auto overflow-hidden mt-30 shadow-md effect_show" style={{ marginInline: 'auto' }} title={this.Title} extra={this.Close}>
                <Carousel className="h-60" arrows autoplay infinite={true} style={{ background: 'var(--THEME_COLOR)' }}>
                    {
                        this.state.notify_data.map((item, idx) => {
                            return <div className="h-60 flex" dangerouslySetInnerHTML={{ __html: item }} key={idx}></div >;
                        })
                    }
                </Carousel>
            </Card>
        </div>
    }
}

export default Notify;