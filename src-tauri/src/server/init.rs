use crate::system;
use crate::system::system_reader::check_exists;
use std::error::Error;
use std::fs;

/* 
STEPS
1   Check if data directory exists. If not, create it.
2   Inside the data directory: Check if server directory exists. 
      If not, create it with the name of the server.
3   Check which os this is on
4   Inside the server directory: create the startup script for the
      relevant OS.
*/

pub fn create_data_directory() {
  if check_exists("data_dir") {
    return;
  }
  fs::create_dir(system::get_path("data_dir"))
    .unwrap_or_else(|e| panic!("Error creating dir: {}", e));
}