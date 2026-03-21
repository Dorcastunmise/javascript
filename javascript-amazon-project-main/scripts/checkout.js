import renderOrderSummary from './checkout/orderSummary.js';
import renderPaymentSummary from './checkout/paymentSummary.js';
import renderCheckoutHeader from './checkout/checkoutHeader.js';
import Cart from '../data/cart-class.js';
import { productsLoader } from '../data/products.js';
//import '../data/backend-practice.js';

const cart = new Cart('cart-oop');

productsLoader(() => {
  renderOrderSummary(cart);
  renderPaymentSummary(cart);
  renderCheckoutHeader(cart);
});

