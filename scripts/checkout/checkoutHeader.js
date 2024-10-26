import {cart} from "../../data/cart-class.js";

export function renderCheckoutHeader(){
    const html = `Checkout (<a class="return-to-home-link" href="amazon.html"><span>${cart.calculateQuantity()}</span> items</a>)`;

    document.querySelector('.js-checkout-header-middle-section').innerHTML = html;
}