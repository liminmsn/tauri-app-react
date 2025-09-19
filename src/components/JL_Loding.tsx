// import { LoadingOutlined } from "@ant-design/icons";
// import { Spin } from "antd";

import { Image } from "antd";

function JLLoading({ icon, children }: { icon?: React.ReactNode, children?: React.ReactNode }) {
    return <div className="w-full h-full flex flex-col justify-center items-center">
        {icon}
        {children || <span className="mt-2 font-bold">加载中...</span>}
    </div>
}

export default JLLoading;