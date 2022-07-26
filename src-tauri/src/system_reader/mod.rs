use sysinfo::{System, SystemExt};

pub fn get_total_memory() -> u64 {
    let mut sys = System::new_all();
    sys.refresh_all();
    sys.total_memory()
}
