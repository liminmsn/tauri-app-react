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