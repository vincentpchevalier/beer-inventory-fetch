// Initialize the app.

// Create an array called beerMenu to store the beer objects.

// Create a function called fetchBeers() to fetch a list of beers from https://random-data-api.com/api/v2/beers

// Add an event listener to the beerList <ul> to listen for clicks on the "Add to Order" buttons in the beer list.

// Run the fetchBeers() function when the app is initialized.

// Create a beer object only keeping the id, name, style, and alcohol properties from the fetched beer data. Create a new price property with a random price between $7 and $15. (Build a function called getRandomPrice() to generate a random price between these two numbers and that is a string with two decimal places.)

// Push new beer objects into beerMenu.

// Use the beerMenu array to display the list of beers (with the random price included).

// Create a function called displayBeers() to display the list of beers in the beerList <ul>.

// Build the list of beers using a map, join, and a template literal using the following markup:
// `
//  <li class="beer" data-id="${beer.id}">
//    <div class="beer__info">
//      <p class="beer__name">${beer.name}</p>
//      <p class="beer__style">${beer.style}</p>
//      <p class="beer__abv">${beer.alcohol}</p>
//    </div>
//    <p class="beer__price">$${beer.price}</p>
//    <button id="addBeerButton" class="beer__button">Add to Order</button>
//  </li>
//`;

// Create a function called orderBeer() to add a beer to the order array when the user clicks the "Add to Order" button. Only include the id, name, price, and tally to your order object. Use ev.target and the .matches() method to check if the clicked element is the "Add to Order" button. Use the .closest() method to get the beer id from the clicked beer.

// Your data should look like this:
// const order = {
// 	id: beer.id,
// 	name: beer.name,
// 	price: beer.price,
// 	tally: 1,
// };

// Check if the beer is already in the orders array. If it is not, add the beer to the orders array with a tally of 1. Otherwise, increment the tally by 1.

// Use ev.target, .matched(), and .closest() to get the beer id from the clicked beer.

// Create a function called displayOrders() to display the orders from the orders array in the orderList <ul>. Use the document fragment and append methods to display the orders on the page.

// Clear existing content before appending the fragment.

// Append the fragment to the orderList.

// Calculate the total price of the order by multiplying the beer price by the number of beers in each order object. Then use the reduce method (totalPrice + orderPrice * tally) to find the total price of the order. Display the total price in the totalPriceDisplay <p> element.

