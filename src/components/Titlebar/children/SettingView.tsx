import { Switch } from "antd";
import { setThemeColor, theme_color_arr, toggleThemeDark, useThemeData } from "../../../theme";
import { CSSProperties } from "react";
import { isEqual } from "../../../core/util/util";

//设置视图
function SettingView() {
    const config = useThemeData();
    const select_color: CSSProperties = {
        boxShadow: '0 1px 10px var(--THEME_COLOR)'
    }

    return <div className="">
        <label className="text-3">暗黑主题：</label>
        <Switch value={localStorage.getItem('theme_dart') === 'true'} onChange={(bol: boolean) => toggleThemeDark(config, bol)} />
        <div className="flex mt-1 gap-1">
            {theme_color_arr.map(color => {
                return <div key={color}
                    className={`w-5 h-5 rounded-sm`}
                    style={{ background: color, ...isEqual(color, config.themeData.token?.colorPrimary, select_color) }}
                    onClick={() => setThemeColor(config, color)}></div>
            })}
        </div>
        
    </div>
}

export default SettingView;