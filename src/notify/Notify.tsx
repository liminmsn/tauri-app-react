import { Button, Card } from "antd";
import { X } from "lucide-react";
import React from "react";
import icon from '../assets/icon.png';

const NotifyStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: '16',
    left: 0,
    top: 0,
    background: 'rgba(0,0,0,0.01)',
    backdropFilter: 'blur(0.5px)',
};
const Title = <div className="flex items-center">
    <img className="app-region mr-1 h-6" srcSet={icon} />
    <span>重要通知</span>
</div>;
const Close = <Button onClick={() => { }} danger type={"primary"}><X size={14} /></Button>;
class Notify extends React.Component {
    state: Readonly<{}> = {};
    render(): React.ReactNode {
        return <div className="w-full h-full flex justify-center items-center" style={NotifyStyle}>
            <Card className="w5/10 h4/10" title={Title} extra={Close}>
                hello
            </Card>
        </div>
    }
}

export default Notify;