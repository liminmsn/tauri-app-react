// import { LoadingOutlined } from "@ant-design/icons";
// import { Spin } from "antd";

import { Image } from "antd";

function JLLoading({ icon }: { icon?: React.ReactNode }) {
    return <div className="w-full h-full flex flex-col justify-center items-center">
        {icon}
        <span className="mt-2 font-bold">加载中...</span>
    </div>
}

export default JLLoading;