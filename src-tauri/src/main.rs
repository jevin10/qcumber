#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_ram, init_program, create_build_context])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

use app::system;
use system::system_reader::get_total_memory;
use app::server;

#[tauri::command]
fn get_ram() -> u64 {
    get_total_memory()
}

#[tauri::command]
fn init_program() {
  server::init::create_data_directory()
}

#[tauri::command]
fn create_build_context() -> bool {
  server::init::create_build_context()
}
// ^ TODO: ACTUALLY CALL AND USE THIS AND TEST IT IN THE APP