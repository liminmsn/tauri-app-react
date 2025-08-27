import { theme, ThemeConfig } from "antd";
import { createContext, useContext, useState } from "react";
import { hexToRgba } from "../util/util";
type ThemeContextType = { themeData: ThemeConfig; setThemeData: React.Dispatch<React.SetStateAction<ThemeConfig>> };
type ThemeProviderType = React.FC<{ children: React.ReactNode }>;

//默认主题配置
const themeData_: ThemeConfig = {
    algorithm: localStorage.getItem('theme_dart') === 'true' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
        borderRadius: 4
    },
}
//初始化主题
const theme_color_arr: string[] = JSON.parse(import.meta.env['VITE_COLOR_ARR']);
const theme_color = localStorage.getItem('theme_color');
if (theme_color) {
    themeData_.token!.colorPrimary = theme_color;
} else {
    themeData_.token!.colorPrimary = theme_color_arr[0];
    localStorage.setItem('theme_color', theme_color_arr[0]);
}
setCssPropColor(themeData_.token!.colorPrimary);


const ThemeContext = createContext<ThemeContextType | null>(null);
const ThemeProvider: ThemeProviderType = function ({ children }) {
    const [themeData, setThemeData] = useState(themeData_);
    return <ThemeContext.Provider value={{ themeData, setThemeData }}>
        {children}
    </ThemeContext.Provider>;
}

const useThemeData = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useThemeData must be used within a ThemeProvider");
    }
    return context;
};

const setThemeColor = ({ themeData, setThemeData }: ThemeContextType, color: string) => {
    themeData.token!.colorPrimary = color;
    setThemeData(() => ({ algorithm: themeData.algorithm, token: { ...themeData.token } } as ThemeConfig));
    localStorage.setItem('theme_color', color);
    setCssPropColor(color);
}
const toggleThemeDark = ({ themeData, setThemeData }: ThemeContextType, bool: boolean) => {
    setThemeData(() => ({ token: themeData.token, algorithm: bool ? theme.darkAlgorithm : theme.defaultAlgorithm } as ThemeConfig));
    localStorage.setItem('theme_dart', String(bool));
}

function setCssPropColor(color: string) {
    document.documentElement.style.setProperty('--THEME_COLOR', color);
    document.documentElement.style.setProperty('--THEME_COLOR_BG', hexToRgba(color, 0.05));
}


export { ThemeProvider, theme_color_arr, useThemeData, setThemeColor, toggleThemeDark };