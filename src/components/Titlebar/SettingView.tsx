import { Button, ColorPicker, ColorPickerProps, GetProp, Switch } from "antd";
import { addThemeColor as addThemeColor_, delThemeColor, setThemeColor, theme_color_arr, toggleThemeDark, useThemeData } from "../../theme";
import { CSSProperties, useState } from "react";
import { isEqual } from "../../core/util/util";
import { DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons";

type Color = GetProp<ColorPickerProps, 'value'>;

//设置视图
function SettingView() {
    const config = useThemeData();
    const select_color: CSSProperties = {
        boxShadow: '0 1px 10px var(--THEME_COLOR)'
    }

    const [color, setColor] = useState<Color>('');
    const addThemeColor = function (config: any, color: string) {
        if (color) {
            addThemeColor_(config, color);
            setColor('');
        }
    }

    return <div className="">
        <label className="text-3">夜间模式：</label>
        <Switch value={localStorage.getItem('theme_dart') === 'true'} onChange={(bol: boolean) => toggleThemeDark(config, bol)} />
        <br />
        <label className="text-3">主题色：</label>
        <div className="flex items-center my-1">
            <ColorPicker className="w-5 h-5" size="small" value={color} onChangeComplete={(val) => setColor(val.toHexString())} />
            <Button className="ml-1" onClick={() => addThemeColor(config, color.toString())} >
                <PlusSquareOutlined />
            </Button>
            <Button className="ml-1" onClick={() => delThemeColor(config, config.themeData.token!.colorPrimary!)} >
                <DeleteOutlined />
            </Button>
        </div>
        <div className="mt-1 grid grid-cols-4 gap-1">
            {theme_color_arr.map(color => {
                return <div key={color}
                    className={`w-5 h-5 rounded-sm cursor-pointer`}
                    style={{ background: color, ...isEqual(color, config.themeData.token?.colorPrimary, select_color) }}
                    onClick={() => setThemeColor(config, color)}></div>
            })}
        </div>
    </div>
}

export default SettingView;