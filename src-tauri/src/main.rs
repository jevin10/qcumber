#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_ram])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

/** Operations relating to handling of the system the server runs on*/
pub mod system;
/** Functions relating to handling of the server configurations*/
pub mod server;

use system::system_reader::get_total_memory;

#[tauri::command]
fn get_ram() -> u64 {
    get_total_memory()
}
