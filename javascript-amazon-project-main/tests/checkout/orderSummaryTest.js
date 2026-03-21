import renderOrderSummary from '../../../scripts/checkout/orderSummary.js'
import { loadStorage, cart } from '../../../data/cart.js';
import { productsLoader } from '../../data/products.js';


//Integration Test: testing many units.pieces of code working together
//Hooks: enables the running of code for each test. Hooks in jasmine examples include beforeEach(), afterEach(), beforeAll(), afterAll()

describe('Test suite: renderOrderSummary functionality', () => {

  // beforeAll() runs ONCE before all tests in this describe block
  // Useful for expensive setup that doesn't need to reset between tests
  //done() - Jasmine function : here it will not allow beforeAll() to automatically go to the next step untill done() is called. It controls when to go to the next step
  beforeAll((done) => {
    productsLoader(() => {
      done();
    }); //since this function is asynchronous, done() lets the response to be received beofre the tests run
    
  });

  //beforeEach() hook runs before each test case here
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    const fstId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const scdId = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    document.querySelector('.js-test-container').innerHTML = 
    `
      <div class="js-cart"></div>
      <div class="payment-summary"></div>
    `;
     
    spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify(
        [
          {
            productId: fstId,
            quantity: 2,
            deliveryOptionId: '1'
          },
          {
            productId: scdId,
            quantity: 1,
            deliveryOptionId: '2'
          }
        ]
      );
    });
    
    loadStorage();
    renderOrderSummary();
  });

  // afterEach() runs after each individual test
  // Great for cleanup so one test doesn't affect the next
  afterEach(() => {
    console.log('afterEach: cleaning up after each test');
    document.querySelector('.js-test-container').innerHTML = '';
  });

  // afterAll() runs ONCE after all tests in this describe block finish
  // Good for final teardown (e.g., closing connections, resetting global state)
  afterAll(() => {
    console.log('afterAll: runs once after all tests are done');
  });

  it('cart display', () => {
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    expect(document.querySelector(`.js-product-quantity-${fstId}`).innerText).toContain('Quantity: 2');
    expect(document.querySelector(`.js-product-quantity-${scdId}`).innerText).toContain('Quantity: 1');
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('removal of product', ()=> {
    document.querySelector(`.js-delete-link-${scdId}`).click();
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(document.querySelector(`.js-cart-item-container-${scdId}`)).toEqual(null);
    expect(document.querySelector(`.js-cart-item-container-${fstId}`)).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(fstId);
    document.querySelector('.js-test-container').innerHTML = '';
  });

  // a nested describe block to show hooks can be scoped
  // Hooks inside a nested describe only apply to tests within it
  describe('Nested describe: hooks scoping example', () => {

    // This beforeEach only runs for tests inside this nested block
    beforeEach(() => {
      console.log('Nested beforeEach: runs before each test in this nested block only');
    });

    // This afterEach only runs for tests inside this nested block
    afterEach(() => {
      console.log('Nested afterEach: runs after each test in this nested block only');
    });

    it('example nested test to demonstrate scoped hooks', () => {
      // This test has BOTH the outer beforeEach and the nested beforeEach run before it
      // Hook execution order: outer beforeEach → nested beforeEach → test → nested afterEach → outer afterEach
      expect(true).toBe(true);
    });
  });
});