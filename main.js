// Create an array called beerMenu to store the beer objects.
const beerMenu = [];
const orders = [];

// Create a function called fetchBeers() to fetch a list of beers from https://random-data-api.com/api/v2/beers
function init() {
	console.log('App initialized.');
	fetchBeers();

	// Add an event listener to the beerList <ul> to listen for clicks on the "Add to Order" buttons in the beer list.
	document.querySelector('#beerList').addEventListener('click', orderBeer);
}

// Run the fetchBeers() function when the app is initialized.
function fetchBeers() {
	const size = 3;
	const url = `https://random-data-api.com/api/v2/beers?size=${size}`;

	fetch(url)
		.then((response) => {
			if (!response.ok) throw new Error(response.statusText);
			return response.json();
		})
		.then((beers) => {
			// Create a beer object only keeping the id, name, style, and alcohol properties from the fetched beer data. Create a new price property with a random price between $7 and $15. (Build a function called getRandomPrice() to generate a random price between these two numbers and that is a string with two decimal places.)
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
			// Push new beer objects into beerMenu.
			beerMenu.push(...beers);
			console.log(beerMenu);

			// Use the beerMenu array to display the list of beers (with the random price included).
			displayBeers(beerMenu);
		})
		.catch((err) => console.log(err));
}

function getRandomPrice(min, max) {
	const cents = Math.random() < 0.5 ? '00' : '50';
	const dollars = Math.trunc(Math.random() * (max - min + 1) + min);
	return `${dollars}.${cents}`;
}

// Create a function called displayBeers() to display the list of beers in the beerList <ul>.

// Build the list of beers using a map, join, and a template literal using the following markup:
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
	beerList.innerHTML = html;
}

// Create a function called orderBeer() to add a beer to the order array when the user clicks the "Add to Order" button. Only include the id, name, price, and tally to your order object. Use ev.target and the .matches() method to check if the clicked element is the "Add to Order" button. Use the .closest() method to get the beer id from the clicked beer.

// Your data should look like this:
// const order = {
// 	id: beer.id,
// 	name: beer.name,
// 	price: beer.price,
// 	tally: 1,
// };

// Check if the beer is already in the orders array. If it is not, add the beer to the orders array with a tally of 1. Otherwise, increment the tally by 1.

function orderBeer(ev) {
	// Use ev.target, .matched(), and .closest() to get the beer id from the clicked beer.
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

// Create a function called displayOrders() to display the orders from the orders array in the orderList <ul>. Use the document fragment and append methods to display the orders on the page.

function displayOrders(orderArr) {
	const orderList = document.querySelector('#orderList');
	console.log(orderArr);

	const fragment = document.createDocumentFragment();

	orderArr.forEach((order) => {
		const li = document.createElement('li');
		li.classList.add('order');
		li.dataset.id = order.id;

		const nameParagraph = document.createElement('p');
		nameParagraph.classList.add('order__name');
		nameParagraph.textContent = order.name;
		li.appendChild(nameParagraph);

		const tallyParagraph = document.createElement('p');
		tallyParagraph.classList.add('order__tally');
		tallyParagraph.textContent = order.tally;
		li.appendChild(tallyParagraph);

		const priceParagraph = document.createElement('p');
		priceParagraph.classList.add('order__price');
		priceParagraph.textContent = `$${order.price}`;
		li.appendChild(priceParagraph);

		fragment.appendChild(li);
	});

	// Clear existing content before appending the fragment.
	orderList.innerHTML = '';

	// Append the fragment to the orderList.
	orderList.appendChild(fragment);
}

// Calculate the total price of the order by multiplying the beer price by the number of beers in each order object. Then use the reduce method (totalPrice + orderPrice * tally) to find the total price of the order. Display the total price in the totalPriceDisplay <p> element.

function calculateTotalPrice(orders) {
	return orders.reduce((totalPrice, order) => {
		return totalPrice + order.price * order.tally;
	}, 0);
	// return orders.reduce(
	// 	(totalPrice, order) => totalPrice + order.price * order.tally,
	// 	0
	// );
}

function displayTotalPrice(orders) {
	const total = calculateTotalPrice(orders);
	const totalPriceDisplay = document.querySelector('#totalPrice');
	totalPriceDisplay.textContent = `$${total.toFixed(2)}`;
}

// Initialize the app.
document.addEventListener('DOMContentLoaded', init);
