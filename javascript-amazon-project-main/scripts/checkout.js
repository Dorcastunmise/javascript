import renderOrderSummary from './checkout/orderSummary.js';
import renderPaymentSummary from './checkout/paymentSummary.js';
import renderCheckoutHeader from './checkout/checkoutHeader.js';
import Cart from '../data/cart-class.js';
import { fetchProducts } from '../data/products.js';
import { cartsLoader } from '../data/cart.js';
//import '../data/backend-practice.js';

const cart = new Cart('cart-oop');

/*
  async makes a function returns a promise.
  await lets the code wait for the promise to finish before going to the next line of code. It enables writing asynchronous code like a normal code

  Async form:
*/
async function pageLoader() {
  try {
    //throw 'error'; to manually create an error in try/catch
    await fetchProducts();
    //reject can be passed as well to create an error in the future
    await new Promise((resolve, reject) => {
      //throw 'error'; to manually create an error in promise too
      cartsLoader(() => {
        //reject('error3');
        resolve();
      });
    });

  } catch (error){
    alert('Error encountered: ' + error);
  } finally {}

  renderOrderSummary(cart);
  renderPaymentSummary(cart);
  renderCheckoutHeader(cart);
 
}

pageLoader();

/*

  new Promise form:
  resolve() controls when to go to the next step ...just like Jasmine done()
  Promise() enables JavaScript to run multiple code at same time
  Promise.all([]) - enables the programmer to run multiple promises at the same time

Promise.all([
  //fetchProducts() is used in place of new Promise( ... productsLoader... since fetchProducts() returns a promise
  
  
  new Promise((resolve) => {
    this inner function runs immediately
    productsLoader(() => {
      resolve(); this stops the process after productsLoader is done running and resolve()  accepts values to be passed into it
      e.g resolve('value1') and such values are used in .then e.g(then(value1))
    });

  }), 
  fetchProducts(),
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

Callback form:

//replacing this with Promise to avoid multiple calbacks and nesting
productsLoader(() => {
  cartsLoader(()=> {
    renderOrderSummary(cart);
    renderPaymentSummary(cart);
    renderCheckoutHeader(cart);
  });
  
});
*/
