//import {cart, calculateCartQuantity} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import { formatCurrency } from '../../utils/currency.js';
import {addOrder} from '../../data/orders.js';


function renderPaymentSummary(cart){
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.cartItems.forEach((cartItem) => { 
    const id = cartItem.productId;
    const quantity = cartItem.quantity;
    const cartId = cartItem.deliveryOptionId;

    let product;
    product = getProduct(id);
    productPriceCents += product.priceCents * quantity;

    let selDeliveryOpt = getDeliveryOption(cartId);
    shippingPriceCents += selDeliveryOpt.priceCents;

  });  
  
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const TaxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + TaxCents;
  const orderQuantity = cart.calculateCartQuantity();
  const paymentSummaryHTML = 
  `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${orderQuantity}):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(TaxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button 
      class="place-order-button button-primary js-place-order
    ">
      Place your order
    </button>
  `;

  document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;
  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        const response = await fetch('https://superSimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            cart: cart
          })
        });

          const order = await response.json(); //using await since response.json() returns a promise
          addOrder(order);
      } catch (error) {
        console.log(`Error: ${error}`);
      }

      /*
        window.location - enables access to browser's url. The Window.location read-only property returns a Location object with information about the current location of the document.
        The href property of the Location interface is a stringifier that returns a string containing the whole URL, and allows the href to be updated.
      */
      window.location.href = 'orders.html';

    });
}

export default renderPaymentSummary;