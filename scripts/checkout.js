import {cart, removeFromCart, calculateQuantity, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';

let cartSumaryHTML = '';

cart.forEach(cartItem => {
    const productId = cartItem.id;

    let productFound;

    products.forEach(product => {
        if(productId === product.id){
            productFound = product;
        }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach(option => {
        if(option.id === deliveryOptionId){
            deliveryOption = option;
        }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSumaryHTML += `<div class="cart-item-container js-cart-item-container-${productFound.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${productFound.image}">

            <div class="cart-item-details">
                <div class="product-name">
                    ${productFound.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(productFound.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-cart-quantity-${productFound.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${productFound.id}">
                    Update
                    </span>
                    <input class="quantity-input js-quantity-input-${productFound.id}">
                    <span class="save-quantity-link link-primary js-save-link" data-product-id="${productFound.id}">
                    Save
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productFound.id}">
                    Delete
                    </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(productFound, cartItem)}
            </div>
        </div>
    </div>`;
});
document.querySelector('.js-order-summary').innerHTML = cartSumaryHTML;

document.querySelectorAll('.js-delete-link').forEach(link => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        checkout();
    });
});

document.querySelectorAll('.js-update-link').forEach(link => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');
    });
});

document.querySelectorAll('.js-save-link').forEach(link => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.remove('is-editing-quantity');

        const productQuantity = document.querySelector(`.js-quantity-input-${productId}`);

        updateQuantity(productId, productQuantity);
        checkout();
    });
});

checkout();
function checkout(){
    document.querySelectorAll('.js-total-items').forEach(item => {
        item.innerHTML = `${calculateQuantity()}`;
    });
}
function deliveryOptionsHTML(productFound, cartItem){
    let html ='';
    deliveryOptions.forEach(deliveryOption => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`
        const isChecked = cartItem.deliveryOptionId === deliveryOption.id;
    
        html += `<div class="delivery-option">
            <input type="radio" 
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${productFound.id}">
            <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
            </div>
        </div>`
    });

    return html;
}