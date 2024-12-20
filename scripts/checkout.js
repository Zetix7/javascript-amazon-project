import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
// import "../data/cart-class.js";
// import '../data/backend-practice.js';
import { loadCart } from "../data/cart-class.js";

async function loadPage(){
    try {
        await loadProductsFetch();
        await new Promise(resolve => {
            loadCart(() => {
                resolve();
            });
        });
    } catch (error) {
        console.error(`Unexpect error: ${error}`);
    }
    
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

// Promise.all([
//     loadProductsFetch(),
//     new Promise(resolve => {
//         loadCart(() => {
//             resolve('value2');
//         });
//     })
// ]).then((values) => {
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// });

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
