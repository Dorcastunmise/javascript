//import { addToCart, calculateCartQuantity} from "../data/cart.js";
//or import * as CartModule from "../data/cart"; 
// then to use its content:CartModule.addToCart()
import { products, productsLoader } from "../data/products.js";
import Cart from '../data/cart-class.js';

productsLoader(renderProductsGrid); 

function renderProductsGrid(){
  let cart = new Cart('cart-oop');
  let productsHtml = '';

  //products.forEach((product) => {
  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;

  // If a search exists in the URL parameters,
  // filter the products that match the search.
  if (search) {
    filteredProducts = products.filter((product) => {
      // return product.name.includes(search);
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  filteredProducts.forEach((product) => {
    const {id, image, name, rating, priceCents, keywords} = product;
    const productHtml = 
    `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src=${image}>
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container"
        >
          <select  class="js-quantity-selector" data-product-id="${id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.linkDisplay()} <!--Polymorphism: using a method without knowing its class-->

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <!--A data attribute is an HTML attribute enables the attachment of any info to an element.
          Its syntax requires a prefix of "data-"-->
        <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${id}"
        >
          Add to Cart
        </button>
      </div>
    `;

    productsHtml += productHtml;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHtml;

  //updateCartQuantity() stays in this file because it updates the page i.e cart quantity in the header, which is part of the DOM structure of this page. If we put it in cart.js, then we would have to import that function into this file and then call it here, which is not ideal because cart.js should only be responsible for managing the cart data, not updating the DOM.

  function updateCartQuantity() {
    
    let cartQuantity = cart.calculateCartQuantity();

    document.querySelector('.js-cart-quantity').innerText = cartQuantity; 
  }

  updateCartQuantity();

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      /*
        dataset provides all the data attribute attached to the button.
        e.g button.dataset gives:
        DOMStringMap {productId: '5968897c-4d27-4872-89f6-5bcb052746d7'}productId: "5968897c-4d27-4872-89f6-5bcb052746d7"[[Prototype]]: DOMStringMap
      */
     
      const productId = button.dataset.productId;
      const quantitySelector = document.querySelector(
        `.js-quantity-selector[data-product-id="${productId}"]`
      );
      const quantity = Number(quantitySelector.value);
     
      cart.addToCart(productId, quantity);
      updateCartQuantity();
    });
  });

  document.querySelector('.js-search-button')
  .addEventListener('click', () => {
    const search = document.querySelector('.js-search-bar').value;
    window.location.href = `amazon.html?search=${search}`;
  });

    //searching by pressing "Enter" on the keyboard.
  document.querySelector('.js-search-bar')
    .addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const searchTerm = document.querySelector('.js-search-bar').value;
        window.location.href = `amazon.html?search=${searchTerm}`;
      }
    });

}