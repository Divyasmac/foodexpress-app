const sqlite3 = require("sqlite3").verbose();
 
const db = new sqlite3.Database("./foodexpress.db", (err) => {
 
if(err){
console.log("Database error:", err);
}else{
console.log("SQLite Connected ✅");
}
 
});
 
module.exports = db;