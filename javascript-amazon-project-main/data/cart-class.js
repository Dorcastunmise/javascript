//in OOP, PascalCase is used for things that generate objects

class Cart
{
  cartItems;
  #localStorageKey; // the "#" signifies/denotes that localStorageKey is a private property of class Cart

  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.#loadStorage();
  }

  #loadStorage(){
    //using this to avoid inaccessibility or conflict when the object variable.name changes
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if(!this.cartItems){
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: '2'
        }
      ];
    }
  }

  saveStorage(){
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if(productId == cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if(matchingItem) {
      matchingItem.quantity++;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }

    this.saveStorage();
    this.CartQuantity();
  }
  
  deleteCartItem(productId){
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId != productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveStorage();
    this.CartQuantity();
  }

  calculateCartQuantity() {
    let cartQuantity = 0; 

    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
  }

  CartQuantity() {
    let cartQuantity = this.calculateCartQuantity();

    const quantityElement = document.querySelector('.js-checkout-items-link');
    
    if (quantityElement) {
      quantityElement.innerText = cartQuantity + (cartQuantity === 1 ? ' item' : ' items');
    } 
  }

  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if(productId == cartItem.productId) {
        cartItem.quantity = newQuantity;
        this.saveStorage();
        this.CartQuantity();
      }
    });
  }

  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if(productId == cartItem.productId) {
        matchingItem = cartItem;
      }
    }); 

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveStorage();
  }

}

//both cart, and businessCart are objects generated from a class. Which makes them instances of the Cart() class.
/*
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');
*/
//The private property cannot be changed 
//cart.#localStorageKey = 'aaa';

/*
console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart)
*/

export default Cart;


