const jwt = require("jsonwebtoken");
 
const SECRET_KEY = "foodexpresssecret";
 
function verifyToken(req, res, next) {
 
const authHeader = req.headers.authorization;
 
if (!authHeader) {

return res.send("Access Denied ❌ No Token");

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
 
module.exports = verifyToken;
 