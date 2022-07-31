use::std::path::PathBuf;
use dirs::data_local_dir;

/// Functions handling sysinfo
pub mod system_reader;

/// Gets the path of a specified target.
/// 
/// Available targets: data_dir
pub fn get_path(target: &str) -> PathBuf {
  let mut path = match data_local_dir() {
  None => PathBuf::from("/home/.local/share"),
  Some(environment_path) => {
    environment_path
    }
  };
  path.push("/qcumber");
  match target {
    "data_dir" => path,
    &_ => path,
  }
}