use sysinfo::{System, SystemExt};

pub fn get_total_memory() -> u64 {
    let mut sys = System::new_all();
    sys.refresh_all();
    sys.total_memory()
}

/// Checks if a certain item exists in the local data files
/// 
/// Available targets: server, data_dir
pub fn check_exists(target: &str) -> bool {
    // The base directory (/qcumber inside the local data files)
    let main_dir = super::get_path("data_dir");

    match target {
        "server" => {false},
        "data_dir" => {
            main_dir.is_dir()
        },
        &_ => {false},
    }
}