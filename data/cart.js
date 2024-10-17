export const cart = [];

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