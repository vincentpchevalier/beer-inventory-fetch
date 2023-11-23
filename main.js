// create an array called beerMenu to store the beer objects
const beerMenu = [];
const orders = [];

// create a function called fetchBeers() to fetch a list of beers from https://random-data-api.com/api/v2/beers
function init() {
	console.log('App initialized.');
	fetchBeers();

	// use if you want to create a button that fetches the beers instead of loading them on initialization
	document.querySelector('#beerList').addEventListener('click', orderBeer);
}

// run the fetchBeers() function when the app is initialized
function fetchBeers() {
	const size = 5;
	const url = `https://random-data-api.com/api/v2/beers?size=${size}`;

	fetch(url)
		.then((response) => {
			if (!response.ok) throw new Error(response.statusText);
			return response.json();
		})
		.then((beers) => {
			// create beer object only keeping the id, name, style, alcohol, and price properties in each beer object
			const localBeers = beers.map((beer) => {
				const localBeer = {
					id: beer.id,
					name: beer.name,
					style: beer.style,
					alcohol: beer.alcohol,
					price: getRandomPrice(7, 15),
				};
				return localBeer;
			});
			return localBeers;
		})
		.then((beers) => {
			// push new beer objects into beerMenu
			beerMenu.push(...beers);
			console.log(beerMenu);

			// use the beerMenu array to display the list of beers (with the price included)
			displayBeers(beerMenu);
		})
		.catch((err) => console.log(err));
}

// create a function called displayBeers() to display the list of beers in the beerList <ul>

// build the list of beers with the following markup:
// `
//   <li class="beer" data-id="${beer.id}">
//     <div class="beer__info">
//       <p class="beer__name">${beer.name}</p>
//       <p class="beer__style">${beer.style}</p>
//       <p class="beer__abv">${beer.alcohol}</p>
//     </div>
//     <p class="beer__price">$${beer.price}</p>
//     <button id="addBeerButton" class="beer__button">Add to Order</button>
//   </li>
// `

function displayBeers(beers) {
	console.log(beers);
	const beerList = document.querySelector('#beerList');

	let html = beers
		.map((beer) => {
			return `
              <li class="beer" data-id="${beer.id}">
                <div class="beer__info">
                  <p class="beer__name">${beer.name}</p>
                  <p class="beer__style">${beer.style}</p>
                  <p class="beer__abv">${beer.alcohol}</p>
                </div>
                <p class="beer__price">$${beer.price}</p>
                <button id="addBeerButton" class="beer__button">Add to Order</button>
              </li>
            `;
		})
		.join('');
	// console.log(html);
	beerList.innerHTML = html;
}

// create a function that returns a random price between two numbers and that is a string with two decimal places

function getRandomPrice(min, max) {
	const cents = Math.random() < 0.5 ? '00' : '50';
	const dollars = Math.trunc(Math.random() * (max - min + 1) + min);
	return `${dollars}.${cents}`;
}

/* 

WHERE WE WILL START DURING SESSION TWO

*/

// create a function called orderBeer() to add a beer to an order array when the user clicks the "Add to Order" button

function orderBeer(ev) {
	// use ev.target, .matched(), and .closest() to get the beer id from the clicked beer
	if (ev.target.matches('#addBeerButton')) {
		console.log(ev.target.closest('.beer'));
		const listId = +ev.target.closest('.beer').dataset.id;
		console.log(listId);

		const beer = beerMenu.find((beer) => beer.id === listId);

		const existingOrder = orders.find((order) => order.id === listId);

		if (existingOrder) {
			existingOrder.tally += 1;
		} else {
			const order = {
				id: beer.id,
				name: beer.name,
				price: beer.price,
				tally: 1,
			};
			orders.push(order);
		}

		displayOrders(orders);
		displayTotalPrice(orders);
	}
}

// create a function called displayOrders() to display the orders from the orders array in the orderList <ul>

function displayOrders(orderArr) {
	const orderList = document.querySelector('#orderList');
	console.log(orderArr);

	let html = orderArr
		.map((order) => {
			return `
	      <li class="order" data-id="${order.id}">
	        <p class="order__name">${order.name}</p>
	        <p class="order__tally">${order.tally}</p>
	        <p class="order__price">$${order.price}</p>
	      </li>
	    `;
		})
		.join('');

	console.log(html);
	orderList.innerHTML = html;
}

function calculateTotalPrice(orders) {
	return orders.reduce(
		(totalPrice, order) => totalPrice + order.price * order.tally,
		0
	);
}

function displayTotalPrice(orders) {
	const total = calculateTotalPrice(orders);
	const totalPriceDisplay = document.querySelector('#totalPrice');
	totalPriceDisplay.textContent = `$${total.toFixed(2)}`;
}

// create an object called order and include the id, name, price, and tally. create an orders array to store the orders. push each order to an array of orders

// const order = {
// 	id: beer.id,
// 	name: beer.name,
// 	price: beer.price,
// 	tally: 1,
// };

// modify the orderBeer() function to check if the beer is already in the orders array. if it is, increment the tally by 1. if it is not, add the beer to the orders array

// calculate the total price of the order by multiplying the beer price by the number of beers in each order object reduce=>(totalPrice + orderPrice * tally)

// initialize the app
document.addEventListener('DOMContentLoaded', init);
