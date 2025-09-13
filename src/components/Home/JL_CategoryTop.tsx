import { Card, Image, Tooltip } from "antd";
import { CategoryItem } from "../../api/api_home";
import { useNavigate } from "react-router";

function JLCategoryTop({ item }: { item: CategoryItem }) {
    const navigate = useNavigate();
    return <div className="flex flex-col">
        <div className="effect_hover_bg_size pos-relative rounded-md overflow-hidden h-20 cursor-pointer" onClick={() => navigate(`/detail?id=${item.top_item.href}`)} style={{ backgroundImage: `url('${item.top_item.img}')` }}>
            <div className="text-white text-3 font-bold text-shadow-md p-2">{item.top_item.title}</div>
        </div>
        {item.list.map(item => {
            return <div key={item.href} className="flex overflow-hidden mt-1 cursor-pointer" onClick={() => navigate(`/detail?id=${item.href}`)}>
                <div className="min-w-8 max-w-8 overflow-hidden rounded-sm" ><Image src={item.img} preview={false} /></div>
                <Tooltip title={<span className="text-3">{item.title}</span>} arrow color="var(--THEME_COLOR)" >
                    <span className="ml-1 text-3 text-nowrap overflow-hidden text-ellipsis">{item.title}</span>
                </Tooltip>
            </div>
        })}
    </div>
}

export default JLCategoryTop;