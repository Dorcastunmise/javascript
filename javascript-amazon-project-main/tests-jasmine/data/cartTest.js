import {addToCart, cart, loadStorage} from '../../data/cart.js'



//Unit Testing
//Test Coverage: How much of the code is being tested
// Flaky test: A test that sometimes passes and sometimes fails
// Mock: replacing a method with a fake version. And a mock only lasts for one test and once that test is finished, the method is no longer mocked

describe('Test Suite: Adding to Cart',()=>{
  let productID = 'aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f';
  
  it('Addition of existing product into the cart', () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productID,
          quantity: 1,
          deliveryOptionId: '1'
        }
      ]);
    });

    loadStorage();
    addToCart('aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f');
    expect(cart.length).toEqual(1);

    //to check and ensure, localStorage.setItem() was called in addToCart() and to check how many times localStorage.setItem() was called in addToCart()
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    //what values it received
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
      {
        productId: productID,
        quantity: 2,
        deliveryOptionId: '1'
      }
    ]));

      expect(cart[0].productId).toEqual(productID);
      expect(cart[0].quantity).toEqual(2);
    //addToCart('dd82ca78-a18b-4e2a-9250-31e67412f98d');
  });

  it('Addition of a new product into the cart', () => {

    //Using spyOn() to mock/create a fake version of localStorage.getItem('cart') and that of set

    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    loadStorage();
    addToCart('aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f');
    expect(cart.length).toEqual(1);

    //to check and ensure, localStorage.setItem() was called in addToCart() and to check how many times localStorage.setItem() was called in addToCart()
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    //what values it received
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
      {
        productId: productID,
        quantity: 1,
        deliveryOptionId: '1'
      }
    ]));

      expect(cart[0].productId).toEqual(productID);
      expect(cart[0].quantity).toEqual(1);

  });
});