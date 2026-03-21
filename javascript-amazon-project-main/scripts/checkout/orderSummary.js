//import {cart, deleteCartItem, CartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../../utils/currency.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from '../../data/deliveryOptions.js'
import renderPaymentSummary from './paymentSummary.js';
import renderCheckoutHeader from './checkoutHeader.js';
import {cart} from '../../data/cart.js';


function renderOrderSummary(cart){
  
  let cartHtml = '';
  
  cart.cartItems.forEach((cartItem) => {  
    const id = cartItem.productId;
    const quantity = cartItem.quantity;

    let matchingProduct;
    matchingProduct = getProduct(id);

    const deliveryOptionId = cartItem.deliveryOptionId;
    const matchingDeliveryOption = getDeliveryOption(deliveryOptionId);
    const dateString = calculateDeliveryDate(matchingDeliveryOption);

    const html = `
      <div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id} 
        js-cart-item-container  
      ">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label">${quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity"
                data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input">
              <span class="save-quantity-link link-primary js-save-quantity"
              data-product-id="${matchingProduct.id}"
              > 
              Save</span>
              <span class="delete-quantity-link link-primary js-delete-item js-delete-link-${matchingProduct.id}"
              data-product-id="${matchingProduct.id}"
              >
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionSection(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
    cartHtml += html;
    
  });


  function deliveryOptionSection(matchingProduct, cartItem) {
    let optionsHTML = '';
    

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);
      const priceString = deliveryOption.priceCents === 0 ?
                        'FREE' :`$${formatCurrency(deliveryOption.priceCents)}`;
      const ischecked = deliveryOption.id === cartItem.deliveryOptionId;

      optionsHTML += 
      `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}"
        >
          <input type="radio" 
            ${ischecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
          >
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
      ;

    });

    return optionsHTML
  }

  document.querySelector('.js-cart').innerHTML = cartHtml;
  document.querySelectorAll('.js-delivery-option').forEach((radio_element)=>{
    radio_element.addEventListener('click', () =>{
      /*
        const productId = radio_element.dataset.productId;
        const deliveryOptionId = radio_element.dataset.deliveryOptionId;
        or
      */
      const {productId, deliveryOptionId} = radio_element.dataset;
    
      cart.updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary(cart);
      renderPaymentSummary(cart);
    });
  });

  document.querySelectorAll('.js-delete-item').forEach((deleteButton) => {
      deleteButton.addEventListener('click', () => {
        const productId = deleteButton.dataset.productId;
        
        cart.deleteCartItem(productId);
          
        const targetItem = document.querySelector(`.js-cart-item-container-${productId}`);
        targetItem.remove(); 

        renderPaymentSummary();
        renderCheckoutHeader();
        
        cart.CartQuantity();
      });


  });

  document.querySelectorAll('.js-update-quantity').forEach((updateButton) => {
    updateButton.addEventListener('click', () => {
      const productId = updateButton.dataset.productId;
      let cartContainer = document.querySelector(`.js-cart-item-container-${productId}`);
      const isAlreadyToggled = cartContainer.classList.contains('is-editing-quantity');      

      if (isAlreadyToggled) {
        cartContainer.classList.remove('is-editing-quantity');
      } else {
        cartContainer.classList.add('is-editing-quantity'); 
        let quantity_label = cartContainer.querySelector('.js-quantity-label');
        quantity_label.style.display = 'none';
        let update_link = cartContainer.querySelector('.update-quantity-link');
        update_link.style.display = 'none';
      }
    }); 
  });

  function saveQuantity(productId) {
    const eachCart = document.querySelector(`.js-cart-item-container-${productId}`);
    const savedQuantity = Number(eachCart.querySelector('.js-quantity-input').value);

    if (savedQuantity >= 1 && savedQuantity <= 10) {
      const label = eachCart.querySelector('.js-quantity-label');
      const updateLink = eachCart.querySelector('.js-update-quantity');

      label.innerText = savedQuantity;
      label.style.display = '';     
      updateLink.style.display = ''; 
      eachCart.classList.remove('is-editing-quantity');
    } else {
      alert('Quantity must be between 1 and 10');
      return;
    }

    cart.updateQuantity(productId, savedQuantity);
    renderPaymentSummary(cart);
    renderOrderSummary(cart);
    renderCheckoutHeader(cart);
    
  }

  document.querySelectorAll('.js-save-quantity').forEach((saveBtn) => {
    saveBtn.addEventListener('click', () => {
      saveQuantity(saveBtn.dataset.productId);
    });
  });

  document.querySelectorAll('.js-quantity-input').forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const productId = input.closest('[class*="js-cart-item-container-"]')
          .querySelector('.js-save-quantity').dataset.productId;
        saveQuantity(productId);
      }
    });
  });

 
  cart.CartQuantity();
}

export default renderOrderSummary