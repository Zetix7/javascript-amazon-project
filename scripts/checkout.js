import {cart, removeFromCart, calculateQuantity, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

let cartSumaryHTML = '';

cart.forEach(cartItem => {
    const productId = cartItem.id;

    let productFound;

    products.forEach(product => {
        if(productId === product.id){
            productFound = product;
        }
    });

    cartSumaryHTML += `<div class="cart-item-container js-cart-item-container-${productFound.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
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
                <div class="delivery-option">
                    <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${productFound.id}">
                    <div>
                        <div class="delivery-option-date">
                            Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                            FREE Shipping
                        </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productFound.id}">
                    <div>
                        <div class="delivery-option-date">
                            Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                            $4.99 - Shipping
                        </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productFound.id}">
                    <div>
                        <div class="delivery-option-date">
                            Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                            $9.99 - Shipping
                        </div>
                    </div>
                </div>
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