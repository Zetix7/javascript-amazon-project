export let cart = JSON.parse(localStorage.getItem('cart')) || [{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
},
{
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
}];

function saveToCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);
    
    let foundProduct = false;

    cart.forEach(cartItem => {
        if(productId === cartItem.id){
            cartItem.quantity += quantity;
            foundProduct = true;
        }
    });

    if(!foundProduct){
        cart.push({
            id: productId,
            quantity
        });
    }

    saveToCart();
}

export function removeFromCart(productId){
    const newCart = [];

    cart.forEach(cartItem => {
        if(cartItem.id !== productId){
            newCart.push(cartItem);
        }
    });
    cart = newCart;

    saveToCart();
}