export let cart;

loadFromStorage();

export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart')) || [{
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
    },
    {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
    }];
}

function saveToCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);
    // const quantity = 1;
    
    let foundProduct;

    cart.forEach(cartItem => {
        if(productId === cartItem.id){
            foundProduct = cartItem;
        }
    });

    if(foundProduct){
        foundProduct.quantity += quantity;
    }
    else{
        cart.push({
            id: productId,
            quantity,
            deliveryOptionId: '1'
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

export function updateCartQuantity(){
    let cartQuantity = calculateQuantity();

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

export function calculateQuantity(){
    let cartQuantity = 0;

    cart.forEach(cartItem => {
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}

export function updateQuantity(productId, newProductQuantity){
        
    const newQuantity = Number(newProductQuantity.value);

    cart.forEach(product => {
        if(product.id === productId){
            product.quantity = newQuantity;
            document.querySelector(`.js-cart-quantity-${productId}`).innerHTML = newQuantity;
        }
    });
    saveToCart();
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let foundProduct;

    cart.forEach(cartItem => {
        if(productId === cartItem.id){
            foundProduct = cartItem;
        }
    });

    if(foundProduct){
        foundProduct.deliveryOptionId = deliveryOptionId;
    }

    saveToCart();
}