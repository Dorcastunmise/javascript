import renderOrderSummary from './checkout/orderSummary.js';
import renderPaymentSummary from './checkout/paymentSummary.js';
import renderCheckoutHeader from './checkout/checkoutHeader.js';
import Cart from '../data/cart-class.js';
import { productsLoader } from '../data/products.js';
import { cartsLoader } from '../data/cart.js';
//import '../data/backend-practice.js';

const cart = new Cart('cart-oop');

// resolve() controls when to go to the next step ...just like Jasmine done()
//Promise() enables JavaScript to run multiple code at same time
//Promise.all([]) - enables the programmer to run multiple promises at the same time
Promise.all([
  new Promise((resolve) => {
    //this inner function runs immediately
    productsLoader(() => {
      resolve(); // this stops the process after productsLoader is dine running
      //resolve('value1') this function accepts values to be passed. and such values are used in .then
    });

  }),
  new Promise((resolve) => {
    cartsLoader(() => {
      resolve();
    });
  })

//}).then((value) => {  value content is value1 from resolve()
]).then(() => {
  renderOrderSummary(cart);
  renderPaymentSummary(cart);
  renderCheckoutHeader(cart);
});


/*
//replacing this with Promise to avoid multiple calbacks and nesting
productsLoader(() => {
  cartsLoader(()=> {
    renderOrderSummary(cart);
    renderPaymentSummary(cart);
    renderCheckoutHeader(cart);
  });
  
});
*/
