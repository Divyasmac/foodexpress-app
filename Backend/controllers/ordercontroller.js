let orders = [];
 
exports.placeOrder = (req,res)=>{
 
const {food,price} = req.body;
 
const newOrder = {

email:req.user.email,

food,

price,

date:new Date()

};
 
orders.push(newOrder);
 
res.json({

message:"Order Placed Successfully",

order:newOrder

});
 
};
 
exports.getOrders = (req,res)=>{
 
const userOrders = orders.filter(

order => order.email === req.user.email

);
 
res.json(userOrders);
 
};
 