export let cart = [{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
},
{
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
}];

export function addToCart(productId){
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);
    
    let foundProduct = false;

    cart.forEach(cartItem => {
        if(productId === cartItem.productId){
            cartItem.quantity += quantity;
            foundProduct = true;
        }
    });

    if(!foundProduct){
        cart.push({
            productId,
            quantity
        });
    }
}

export function removeFromCart(productId){
    const newCart = [];

    cart.forEach(cartItem => {
        if(cartItem.id !== productId){
            newCart.push(cartItem);
        }
    });
    cart = newCart;
}