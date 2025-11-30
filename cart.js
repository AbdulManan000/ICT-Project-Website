function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {
    const cart = getCart();
    const container = document.getElementById("cart-items");
    container.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        // price string se Rs remove karke int banana
        const priceNum = parseInt(item.price.replace(/\D/g, ""));
        const itemTotal = priceNum * item.qty;
        total += itemTotal;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.main_image}" width="80">
                <h3>${item.title}</h3>
                <p>Price: ${item.price}</p>
                <p>Qty: ${item.qty}</p>
                <p>Total: Rs ${itemTotal}</p>
                <button onclick="removeItem(${item.id})">Remove</button>
            </div>
            <hr>
        `;
    });

    document.getElementById("total").innerText = "Total Bill: Rs " + total;
}

function removeItem(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id != id);
    saveCart(cart);
    displayCart();
}

document.getElementById("checkout-btn").addEventListener("click", function() {
    localStorage.removeItem("cart");
    showPopup("Order placed successfully!");
    displayCart();
});

displayCart();
