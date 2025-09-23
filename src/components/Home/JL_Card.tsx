import { Tag } from "antd";
import { CarouseOnelItem } from "../../core/api/api_home";
import { useNavigate } from "react-router-dom";

function JLCard({ item }: React.ProfilerProps & { item: CarouseOnelItem }) {
    const navigate = useNavigate();

    const style: React.CSSProperties = {
        backgroundImage: `url('${item.img}')`,
        backgroundSize: 'auto 100%',
        backgroundPositionX: 'center',
        overflow: 'hidden'
    }
    const style_item: React.CSSProperties = {
        backgroundColor: 'rgba(0,0,0,0.2)',
        background: 'repeating-linear-gradient(rgba(0,0,0,0.2), black)'
    }

    return < div key={item.author} className="h-60 max-h-60 cursor-pointer flex flex-col" style={style} onClick={() => navigate(`/detail?id=${item.href}`)}>
        <div className="flex-1"></div>
        <div className="w-full p-1 pb-5 overflow-hidden rounded-sm" style={style_item}>
            {item.tags.map(tag => <Tag key={tag} color="var(--THEME_COLOR)" className="mr-1 line-height-none" style={{ padding: '2px' }}>{tag}</Tag>)}
            <div className="text-white text-nowrap overflow-hidden text-ellipsis">{item.title}</div>
        </div>
    </div >
}
export default JLCard;