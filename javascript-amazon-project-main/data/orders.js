//getItem() only accepts the key
export const orders = JSON.parse(localStorage.getItem('orders')) || []; 

export function addOrder(order) {
  //unshift - inserts new elements at the start of an array, and returns the new length of the array.
  orders.unshift(order);
  updOrderStorage();
}

function updOrderStorage() {
  //localStorage only supports strings
  localStorage.setItem('orders', JSON.stringify(orders))
}

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}