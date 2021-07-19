mod parse;
use parse::parse;

fn main() {
    let _ = parse(|log_data| {
        println!("{}", serde_json::to_string(&log_data).unwrap());
    });
}
