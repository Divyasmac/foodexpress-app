let cart = [];
let total = 0;
 
function orderFood(foodName, price) {
    cart.push({ name: foodName, price: price });
    total += price;
 
    updateCart();
}
 
function updateCart() {
    let cartList = document.getElementById("cart-items");
    cartList.innerHTML = "";
 
    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - ₹${item.price}`;
        cartList.appendChild(li);
    });
 
    document.getElementById("total-price").textContent = `Total: ₹${total}`;
    
}
function clearCart() {
    cart = [];
    total = 0;
    updateCart();
}