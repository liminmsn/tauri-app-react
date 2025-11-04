// import { LoadingOutlined } from "@ant-design/icons";
// import { Spin } from "antd";
import { FourSquare } from "react-loading-indicators";

function JLLoading({ icon, children }: { icon?: React.ReactNode, children?: React.ReactNode }) {
    return <div className="w-full h-full flex flex-col justify-center items-center">
        {icon ?? <FourSquare color="var(--THEME_COLOR)" size="small"/>}
        {children || <span className="font-bold">加载中...</span>}
    </div>
}

export default JLLoading;