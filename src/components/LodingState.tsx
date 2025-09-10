import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export function LoadingState() {
    return <div className="w-full h-full flex justify-center items-center">
        <Spin size={"large"} delay={250} indicator={<LoadingOutlined spin />}></Spin>
    </div>
}