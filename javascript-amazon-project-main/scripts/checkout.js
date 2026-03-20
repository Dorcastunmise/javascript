import renderOrderSummary from './checkout/orderSummary.js';
import renderPaymentSummary from './checkout/paymentSummary.js';
import renderCheckoutHeader from './checkout/checkoutHeader.js';
import Cart from '../data/cart-class.js';

const cart = new Cart('cart-oop');

renderOrderSummary(cart);
renderPaymentSummary(cart);
renderCheckoutHeader(cart);
