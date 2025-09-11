import { Image, Tag } from "antd";
import { CarouseOnelItem } from "../../api/api_home";

function JLCard({ item }: React.ProfilerProps & { item: CarouseOnelItem }) {
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
        backdropFilter: 'blur(4px)'
    }

    return < div className="w-full h-70" style={style} >
        <div className="w-full p-1 pb-4" style={style_item}>
            <div className="text-3 text-white">{item.title}</div>
            <div>
                {item.tags.map(tag => <Tag color="var(--THEME_COLOR)" className="p-0 text-3 line-height-none" style={{ padding: '2px' }}>{tag}</Tag>)}
            </div>
            {/* <div>{item.truncate}</div> */}
            {/* <div>{item.author}</div> */}
        </div>
    </div >
}
export default JLCard;