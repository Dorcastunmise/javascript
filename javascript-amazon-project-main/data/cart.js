
export let cart;

loadStorage();
export function loadStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [
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

function saveStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId, quantity = 1) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,   
      deliveryOptionId: '1'
    });
  }

  saveStorage();
  CartQuantity();
}


function deleteCartItem(productId){
  const newCart = [];
  cart.forEach((cartItem) => {
    if(cartItem.productId != productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveStorage();
  CartQuantity();
}

function calculateCartQuantity() {
  let cartQuantity = 0; 

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

function CartQuantity() {
  let cartQuantity = calculateCartQuantity();

  const quantityElement = document.querySelector('.js-checkout-items-link');
  
  if (quantityElement) {
    quantityElement.innerText = cartQuantity + (cartQuantity === 1 ? ' item' : ' items');
  } 
}

function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if(productId == cartItem.productId) {
      cartItem.quantity = newQuantity;
      saveStorage();
      CartQuantity();
    }
  });
}

function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId == cartItem.productId) {
      matchingItem = cartItem;
    }
  }); 

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveStorage();
  
}

export function cartsLoader(cartsFunc){
  const xhr = new XMLHttpRequest();
  // using addEventListener() to make .send() wait for the response as the page loads:
  xhr.addEventListener('load', () => {
    //after the response has loaded
    let carts = xhr.response;
    console.log(carts);
    cartsFunc();
  });


  xhr.open('GET', 'https://superSimplebackend.dev/cart');
  xhr.send(); //this is asynchronous - it sends the request but does not waith for a response
}

export async function loadCartFetch() {
  try {
    const response = await fetch('https://superSimplebackend.dev/cart');
    const text = await response.text;
    console.log(text);
    return text;
  } catch (error) {
    console.error(error);
  }
}

export function resetCart() {
  cart = [];
  saveStorage();
}
export { addToCart, deleteCartItem, CartQuantity, calculateCartQuantity, updateQuantity, updateDeliveryOption };