//import {calculateCartQuantity} from '../../data/cart.js';

function renderCheckoutHeader(cart) {
  const count = cart.calculateCartQuantity();
  const suffix = count === 1 ? 'item' : 'items';
  
  const html = `
    Checkout (<a class="return-to-home-link js-checkout-items-link"
    href="amazon.html">${count} ${suffix}</a>)
  `;

  const container = document.querySelector('.js-header');
  if (container) {
    container.innerHTML = html;
  }

  return html;
}



export default renderCheckoutHeader;