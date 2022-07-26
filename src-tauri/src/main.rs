#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use system_reader::get_total_memory;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_ram])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

pub mod system_reader;

#[tauri::command]
fn get_ram() -> u64 {
    get_total_memory()
}
