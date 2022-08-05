use crate::system;
use crate::system::system_reader::check_exists;
use std::fs;
use std::path::PathBuf;

/* 
STEPS
1   Check if data directory exists. If not, create it.
2   Inside the data directory: Check if server directory exists. 
      If not, create it with the name of the server.
3   Check which os this is on
4   Inside the server directory: create the startup script for the
      relevant OS.
*/

/// Creates the data directory for qcumber.
pub fn create_data_directory() {
  if check_exists("data_dir") {
    return;
  }
  fs::create_dir(system::get_path("data_dir"))
    .unwrap_or_else(|e| panic!("Error creating dir: {}", e));
}


/// Creates a temporary file "buildContext.json" in the data directory.
/// 
/// Should always be followed by delete_build_context in the same scope.
pub fn create_build_context() -> bool {
  if !check_exists("data_dir") {
    return false;
  }

  let mut path = system::get_path("data_dir");
  path.push(".buildContext.json");

  fs::File::create(path)
    .unwrap_or_else(|e| panic!("Error creating file: {}, does a buildContext already exist?", e));
  
  return true;
}

pub fn write_build_context() -> bool {
  return false;
}