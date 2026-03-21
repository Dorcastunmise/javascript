//getItem() only accepts the key
export const orders = JSON.parse(localStorage.getItem('carts')) || []; 

export function addOrder(order) {
  //unshift - inserts new elements at the start of an array, and returns the new length of the array.
  orders.unshift(order);
  updOrderStorage();
}

function updOrderStorage() {
  //localStorage only supports strings
  localStorage.setItem('orders', JSON.stringify(orders))
}