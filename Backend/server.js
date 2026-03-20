require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./database");
db.run(`CREATE TABLE IF NOT EXISTS users (

id INTEGER PRIMARY KEY AUTOINCREMENT,

email TEXT,

password TEXT

)`);
 
db.run(`CREATE TABLE IF NOT EXISTS orders (

id INTEGER PRIMARY KEY AUTOINCREMENT,

email TEXT,

food TEXT,

price INTEGER,

date TEXT

)`);
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
// Fake databases
let users = [];
let orders = [];
 
const SECRET_KEY = process.env.JWT_SECRET;
 
/* ---------------- TOKEN MIDDLEWARE ---------------- */
 
function verifyToken(req, res, next) {
 
  const authHeader = req.headers.authorization;
 
  if (!authHeader) {
    return res.send("Access Denied ❌ No Token Provided");
  }
 
  const token = authHeader.split(" ")[1];
 
  try {
 
    const verified = jwt.verify(token, SECRET_KEY);
 
    req.user = verified;
 
    next();
 
  } catch (err) {
 
    res.send("Invalid Token ❌");
 
  }
 
}
 
/* ---------------- HOME ROUTE ---------------- */
 
app.get("/", (req, res) => {
  res.send("FoodExpress Backend Running 🚀");
});
 
/* ---------------- REGISTER ---------------- */
 
app.post("/register", async (req,res)=>{
 
const {email,password} = req.body;
 
const hashedPassword = await bcrypt.hash(password,10);
 
db.run(
 
"INSERT INTO users (email,password) VALUES (?,?)",
 
[email,hashedPassword],
 
function(err){
 
if(err){

return res.send("Error saving user ❌");

}
 
res.send("User Registered Successfully ✅");
 
}
 
);
 
});
 
/* ---------------- LOGIN ---------------- */
 
app.post("/login", (req,res)=>{
 
const {email,password} = req.body;
 
db.get(
 
"SELECT * FROM users WHERE email = ?",
 
[email],
 
async (err,user)=>{
 
if(!user){

return res.send("User Not Found ❌");

}
 
const validPassword =

await bcrypt.compare(password,user.password);
 
if(!validPassword){

return res.send("Wrong Password ❌");

}
 
const token = jwt.sign(

{email:user.email},

SECRET_KEY,

{expiresIn:"1h"}

);
 
res.json({

message:"Login Successful 🎉",

token

});
 
}
 
);
 
});
 
 
/* ---------------- PLACE ORDER ---------------- */
 
app.post("/order", verifyToken, (req,res)=>{
 
const {food,price} = req.body;
 
db.run(
 
"INSERT INTO orders (email,food,price,date) VALUES (?,?,?,?)",
 
[req.user.email,food,price,new Date().toString()],
 
function(err){
 
if(err){

return res.send("Error saving order ❌");

}
 
res.send("Order Placed Successfully 🎉");
 
}
 
);
 
});
 
 
/* ---------------- USER ORDERS ---------------- */
 
app.get("/myorders", verifyToken, (req,res)=>{
 
db.all(
 
"SELECT * FROM orders WHERE email = ?",
 
[req.user.email],
 
(err,rows)=>{
 
res.json(rows);
 
}
 
);
 
});
 
 
/* ---------------- RESTAURANTS ---------------- */
 
app.get("/restaurants", (req, res) => {
 
  const restaurants = [
    { name: "Italian Hub" },
    { name: "Burger Point" }
  ];
 
  res.json(restaurants);
 
});
 
/* ---------------- FOODS ---------------- */
 
app.get("/foods", (req, res) => {
 
  const foods = [
    {
      name: "Pizza",
      price: 299,
      restaurant: "Italian Hub"
    },
    {
      name: "Burger",
      price: 199,
      restaurant: "Burger Point"
    }
  ];
 
  res.json(foods);
 
});
 
/* ---------------- SERVER ---------------- */
 
const PORT = process.env.PORT || 5000;
 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
 