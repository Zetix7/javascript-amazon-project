function Cart(localStorageKey){
    const cart = {
        cartItems: undefined,

        loadFromStorage(){
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [{
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: '2'
            }];
        },
        
        saveToCart(){
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
        
        addToCart(productId){
            const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
            // const quantity = Number(quantitySelector.value);
            const quantity = 1;
            
            let foundProduct;
        
            this.cartItems.forEach(cartItem => {
                if(productId === cartItem.id){
                    foundProduct = cartItem;
                }
            });
        
            if(foundProduct){
                foundProduct.quantity += quantity;
            }
            else{
                this.cartItems.push({
                    id: productId,
                    quantity,
                    deliveryOptionId: '1'
                });
            }
        
            this.saveToCart();
        },
        
        removeFromCart(productId){
            const newCart = [];
        
            this.cartItems.forEach(cartItem => {
                if(cartItem.id !== productId){
                    newCart.push(cartItem);
                }
            });
            this.cartItems = newCart;
        
            this.saveToCart();
        },
        
        updateCartQuantity(){
            let cartQuantity = calculateQuantity();
        
            document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
        },
        
        calculateQuantity(){
            let cartQuantity = 0;
        
            this.cartItems.forEach(cartItem => {
                cartQuantity += cartItem.quantity;
            });
            return cartQuantity;
        },
        
        updateQuantity(productId, newProductQuantity){
                
            const newQuantity = Number(newProductQuantity.value);
        
            cart.forEach(product => {
                if(product.id === productId){
                    product.quantity = newQuantity;
                    document.querySelector(`.js-cart-quantity-${productId}`).innerHTML = newQuantity;
                }
            });
            this.saveToCart();
        },
        
        updateDeliveryOption(productId, deliveryOptionId){
            let foundProduct;
        
            this.cartItems.forEach(cartItem => {
                if(productId === cartItem.id){
                    foundProduct = cartItem;
                }
            });
        
            if(foundProduct){
                foundProduct.deliveryOptionId = deliveryOptionId;
            }
        
            this.saveToCart();
        }
    };

    return cart;
}

const cart = Cart('cart');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);