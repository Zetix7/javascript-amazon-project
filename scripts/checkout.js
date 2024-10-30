import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
// import "../data/cart-class.js";
// import '../data/backend-practice.js';
import { loadCart } from "../data/cart-class.js";

Promise.all([
    new Promise((resolve, reject) => {
        loadProducts(() => {
            resolve('value1');
        });
    }),
    new Promise(resolve => {
        loadCart(() => {
            resolve('value2');
        });
    })
]).then((values) => {
    console.log(...values);
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
});

// new Promise((resolve, reject) => {
//     loadProducts(() => {
//         resolve('value1');
//     });
// }).then((value) => {
//     console.log(value);
//     return new Promise(resolve => {
//         loadCart(() => {
//             resolve('value2');
//         });
//     });
// }).then((value) => {
//     console.log(value);
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// });

// loadProducts(() => {
//     loadCart(() => {
//         renderCheckoutHeader();
//         renderOrderSummary();
//         renderPaymentSummary();
//     });
// });
