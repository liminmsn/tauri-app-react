export const JLLOG = {
    info: (message: any) => console.log(
        "%cINFO%c " + message,
        "background: #2196F3; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;",
        "margin-left: 8px;"
    ),
    success: (message: any) => console.log(
        "%cSUCCESS%c " + message,
        "background: #4CAF50; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;",
        "margin-left: 8px;"
    ),
    warning: (message: any) => console.log(
        "%cWARNING%c " + message,
        "background: #ff9800; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;",
        "margin-left: 8px;"
    ),
    error: (message: any) => console.log(
        "%cERROR%c " + message,
        "background: #f44336; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;",
        "margin-left: 8px;"
    )
};