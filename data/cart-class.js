class Cart{
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
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
    
    #saveToCart(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }
    
    addToCart(productId){
        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantity = Number(quantitySelector.value);
        // const quantity = 1;
        
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
    
        this.#saveToCart();
    }
    
    removeFromCart(productId){
        const newCart = [];
    
        this.cartItems.forEach(cartItem => {
            if(cartItem.id !== productId){
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;
    
        this.#saveToCart();
    }
    
    updateCartQuantity(){
        let cartQuantity = this.calculateQuantity();
    
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    }
    
    calculateQuantity(){
        let cartQuantity = 0;
    
        this.cartItems.forEach(cartItem => {
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    }
    
    updateQuantity(productId, newProductQuantity){
            
        const newQuantity = Number(newProductQuantity.value);
    
        this.cartItems.forEach(product => {
            if(product.id === productId){
                product.quantity = newQuantity;
                document.querySelector(`.js-cart-quantity-${productId}`).innerHTML = newQuantity;
            }
        });
        this.#saveToCart();
    }
    
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
    
        this.#saveToCart();
    }
}

export const cart = new Cart('cart-opp');
const businessCart = new Cart('cart-business');
