import { CSSProperties } from "react";

/**判断两个变量是否全等 返回给入的3参数|null */
export function isEqual<T>(a: any, b: any, c: T): T | null {
    return a === b ? c : null;
}
/**16进制颜色设置透明度 */
export function hexToRgba(hex: string, alpha: number): string {
    // 去掉 # 符号
    hex = hex.replace("#", "");

    // 将 6 位颜色分解为 R、G、B
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // 返回 rgba 格式
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
/**删除所有空格 */
export function rmAllSpace(str: string): string {
    if (typeof str !== 'string') return str;
    return str = str.replace(/\s+/g, '');
}
/**拆分字符串 */
export function getStringArr(str: string, key: string) {
    if (str.lastIndexOf(key) == -1) return [str, ''];
    const a = str.slice(0, str.lastIndexOf(key));
    const b = str.slice(str.lastIndexOf(key));
    return [a, b];
}
export function idxColor(idx: number): CSSProperties {
    const colors = ['red', 'green', 'orange']
    return { color: 'white', borderRadius: '2px', background: colors[idx] || 'var(--THEME_COLOR)' }
}