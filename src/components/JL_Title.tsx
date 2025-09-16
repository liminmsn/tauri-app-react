import { Tag } from "lucide-react";
import { rmAllSpace } from "../util/util";

function JLTitle({ children }: { children: string }) {
    return <div className="py-1 font-bold" style={{ color: 'var(--THEME_COLOR)' }}>
        <Tag color="var(--THEME_COLOR)" size={16} style={{ transform: 'translateY(3px)' }} />
        <span className="ml-1">{rmAllSpace(children)}</span>
    </div>
}

export default JLTitle;