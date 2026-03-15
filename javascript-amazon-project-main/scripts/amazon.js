import { cart as myCart } from "../data/cart";
import { products } from "../data/products";

let productsHtml = '';

products.forEach((product) => {
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
          src="images/ratings/rating-${rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
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


document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    /*
      dataset provides all the data attribute attached to the button.
      e.g button.dataset gives:
      DOMStringMap {productId: '5968897c-4d27-4872-89f6-5bcb052746d7'}productId: "5968897c-4d27-4872-89f6-5bcb052746d7"[[Prototype]]: DOMStringMap
    */
    const productId = button.dataset.productId;
    let matchingItem;

    myCart.forEach((item) => {
      if(productId == item.productId) {
        matchingItem = item;
      }
    });

    if(matchingItem) {
      matchingItem.quantity++;
    } else {
      myCart.push({
        productId: productId,
        quantity: 1
      });
    }   

    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerText = cartQuantity;
  
  });
})