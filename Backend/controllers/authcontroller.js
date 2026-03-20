const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
 
let users = [];
 
const SECRET_KEY = "foodexpresssecret";
 
exports.registerUser = async (req,res)=>{
 
const {email,password} = req.body;
 
const hashedPassword = await bcrypt.hash(password,10);
 
users.push({

email,

password:hashedPassword

});
 
res.send("User Registered Successfully");
 
};
 
exports.loginUser = async (req,res)=>{
 
const {email,password} = req.body;
 
const user = users.find(u => u.email === email);
 
if(!user){

return res.send("User Not Found");

}
 
const validPassword = await bcrypt.compare(password,user.password);
 
if(!validPassword){

return res.send("Wrong Password");

}
 
const token = jwt.sign(

{email:user.email},

SECRET_KEY,

{expiresIn:"1h"}

);
 
res.json({

message:"Login Successful",

token

});
 
};
 