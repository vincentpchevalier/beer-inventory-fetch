// initialize the app

function init() {
	console.log('App initialized.');
}

// create a function called displayBeers() to display the list of beers in the beerList <ul>

// create a function called fetchBeers() to fetch a list of beers from https://random-data-api.com/api/v2/beers

// run the fetchBeers() function when the app is initialized

// build the list of beers with the following markup:
// `
//   <li class="beer" data-id="${beer.id}">
//     <p class="beer__name">${beer.name}</p>
//     <p class="beer__style">${beer.style}</p>
//     <p class="beer__abv">${beer.alcohol}</p>
//     <p class="beer__price">$0.00</p>
//     <button id="addBeerButton" class="beer__button">Add to Order</button>
//   </li>
// `

// create a function that returns a random price between two numbers and that is a string with two decimal places

// return to the fetchBeers() function and refactor to add the price to each beer object. only keep the id, name, style, alcohol, and price properties in each beer object

// create an array called beerMenu to store the beer objects

// use the beerMenu array to display the list of beers (with the price included)

// create a function called orderBeer() to add a beer to an order array when the user clicks the "Add to Order" button

// use ev.target, .matched(), and .closest() to get the beer id from the clicked beer

// create an object called order and include the id, name, and price. create an orders array to store the orders. push each order to an array of orders

// const order = {
// 	id: beer.id,
// 	name: beer.name,
// 	price: beer.price,
// };

// create a function called displayOrders() to display the orders from the orders array in the orderList <ul>

// build the list of orders with the following markup:
// `
// 	  <li class="order" data-id="${order.id}">
// 	    <p class="order__name">${order.beer}</p>
// 	    <p class="order__price">$${price}</p>
// 	  </li>
// 	`

// modify the orderBeer() function to check if the beer is already in the orders array. if it is, increment the quantity by 1. if it is not, add the beer to the orders array

document.addEventListener('DOMContentLoaded', init);
