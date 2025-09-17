import { Tag } from "antd";
import { CarouseOnelItem } from "../../api/api_home";
import { useNavigate } from "react-router-dom";

function JLCard({ item }: React.ProfilerProps & { item: CarouseOnelItem }) {
    const navigate = useNavigate();

    const style: React.CSSProperties = {
        backgroundImage: `url('${item.img}')`,
        backgroundSize: 'auto 100%',
        backgroundPositionX: 'center',
        position: 'relative',
        overflow: 'hidden'
    }
    const style_item: React.CSSProperties = {
        position: 'absolute',
        bottom: '0px',
        // maxHeight: '40%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(6px)'
    }

    return < div className="w-full h-60 cursor-pointer" style={style} onClick={() => navigate(`/detail?id=${item.href}`)}>
        <div className="w-full p-1 pb-4" style={style_item}>
            {item.tags.map(tag => <Tag key={tag} color="var(--THEME_COLOR)" className="mr-1 line-height-none" style={{ padding: '2px' }}>{tag}</Tag>)}
            <div className="text-white font-bold">{item.title}</div>
            {/* <div className="text-white">{item.author}</div> */}
            {/* <div>{item.truncate}</div> */}
        </div>
    </div >
}
export default JLCard;