import { ThemeConfig } from "antd";
import { createContext, useContext, useState } from "react";
type ThemeContextType = { themeData: ThemeConfig; setThemeData: React.Dispatch<React.SetStateAction<ThemeConfig>> } | null;
type ThemeProviderType = React.FC<{ children: React.ReactNode }>;

//默认主题配置
const themeData_: ThemeConfig = {
    token: {
        borderRadius: 2
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

const ThemeContext = createContext<ThemeContextType>(null);
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

export { ThemeProvider, useThemeData };