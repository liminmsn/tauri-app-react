// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

use machine_uid;
#[tauri::command]
fn deviceid() -> Result<String, String> {
    match machine_uid::get() {
        Ok(id) => Ok(id),
        Err(e) => {
            let error_msg = format!("Failed to get device ID: {}", e);
            println!("{}", error_msg);
            Err(error_msg)
        }
    }
}
use tauri::AppHandle;
#[tauri::command]
fn close_app(app: AppHandle) {
    app.exit(0);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, deviceid, close_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
