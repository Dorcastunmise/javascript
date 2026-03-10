
/*
  every event listener gets an event object
  clicks, keydowns = events
  onclick, onkeydown, onscroll, onmouseenter(hovering over), onmouseleave(stop hovering over) = event listeners
*/
function subscribe(){
  const domElement = document.querySelector('.js-subscribe-btn');
  
  /*
    innerText - gives the text itself without the surrounding whitespaces
    innerHTML - gives the text with the surrounding whitespaces
  */

  if(domElement.innerText == "Subscribe"){
    domElement.innerHTML  = "Subscribed";
    domElement.classList.add('is-subscribed');
  } else {
    domElement.innerHTML  = " Subscribe";
    domElement.classList.remove('is-subscribed');
  }
}

function calculateTotal(){
  const inputElement = document.querySelector('.js-cost-input');
  let cost = Number(inputElement.value);
  if (cost < 40) cost += 10;
  document.querySelector('.js-total-cost').innerHTML = `$${cost}`;
}

function handleCost(event) {
  if (event.key == 'Enter') {
    calculateTotal();
  }
}
