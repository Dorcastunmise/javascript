import {calculateCartQuantity} from '../../data/cart.js';

function renderCheckoutHeader() {
  const count = calculateCartQuantity();
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

renderCheckoutHeader();

export default renderCheckoutHeader;