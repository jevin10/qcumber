use crate::system;
use crate::system::system_reader::check_exists;
use std::fs;
use std::path::PathBuf;
use serde_json::Result;
use serde::{Deserialize, Serialize};
use std::io::prelude::*;
use std::fs::{OpenOptions, File};

#[derive(Serialize, Deserialize)]
struct BuildContext {
  ram: u64,
}

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

fn build_context_path() -> PathBuf {
  let mut path = system::get_path("data_dir");
  path.push(".buildContext.json");
  return path;
}


/// Creates a temporary file "buildContext.json" in the data directory.
/// 
/// Returns true if completed, false if data directory doesnt exist
/// 
/// Should always be followed by delete_build_context in the same scope.
pub fn create_build_context() -> bool {
  if !check_exists("data_dir") {
    return false;
  }

  let path = build_context_path();

  fs::File::create(path)
    .unwrap_or_else(|e| panic!("Error creating file: {}, does a buildContext already exist?", e));
  
  return true;
}

pub fn write_build_context(ram: u64) -> bool {
  let build_context = BuildContext {
    ram
  };

  let j = serde_json::to_string(&build_context).unwrap();

  let path = build_context_path();

  let mut file = OpenOptions::new()
  .read(true)
  .write(true)
  .create(true)
  .open(path)
  .unwrap();

  file.write(j.as_bytes())
    .unwrap_or_else(|e|panic!("Error writing file: {}", e));

  return true;
}