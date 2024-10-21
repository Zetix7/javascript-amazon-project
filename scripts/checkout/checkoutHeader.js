import {calculateQuantity} from "../../data/cart.js";

export function renderCheckoutHeader(){
    const html = `Checkout (<a class="return-to-home-link" href="amazon.html"><span>${calculateQuantity()}</span> items</a>)`;

    document.querySelector('.js-checkout-header-middle-section').innerHTML = html;
}