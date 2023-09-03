const data = [
	{
		id: 1,
		name: "Invicta Men's Pro Diver",
		img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
		price: 1740,
		cat: "Dress",
	},
	{
		id: 11,
		name: "Invicta Men's Pro Diver 2",
		img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
		price: 2540,
		cat: "Dress",
	},
	{
		id: 2,
		name: "Timex Men's Expedition Scout ",
		img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
		price: 2400,
		cat: "Sport",
	},
	{
		id: 3,
		name: "Breitling Superocean Heritage",
		img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
		price: 2000,
		cat: "Luxury",
	},
	{
		id: 4,
		name: "Casio Classic Resin Strap ",
		img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
		price: 1600,
		cat: "Sport",
	},
	{
		id: 5,
		name: "Garmin Venu Smartwatch ",
		img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
		price: 2740,
		cat: "Casual",
	},
];

// calling all the necessary classes

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

console.log(categoriesContainer);

// creating a function using backticks and mapping the html code for product div and calling it later on and joining to remove the commas

const displayProducts = (filteredProducts) => {
	productsContainer.innerHTML = filteredProducts
		.map(
			(product) =>
				`
         <div class="product">
            <img
            src=${product.img}
            alt=""
            />
            <span class="name">${product.name}</span>
            <span class="priceText">&#8377;${product.price}</span>
          </div>
      `
		)
		.join("");
};

displayProducts(data);

// for search inputs

searchInput.addEventListener("keyup", (e) => {
	// naming a variable and storing target value into it and lowercasing it so that person types in lowerCase or in uppercase it shows the result;
	const value = e.target.value.toLowerCase();

	// putting if else statement & checking if value is true show the searched item otherwise display the watch page
	// again passing data & filtering the item and lowercasing the name and checking the indexOf value if it is not -1 return the required items

	if (value) {
		displayProducts(
			data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1) //to show the letter typed in the input and display the item that has those letters in the name of the watch
		);
	}
});

// for Categories => making a function and mapping the data

const setCategories = () => {
	const allCats = data.map((item) => item.cat); // fetching the category from the data
	const categories = [
		"All",
		...allCats.filter((item, index) => {
			//  filtering the allCats and passing item and index and returns the single item that stops the replication of the categories and using the spread operator to add "All"
			return allCats.indexOf(item) === index;
		}),
	];
	//passing the map function and innerHTML element on categoriesContainer and joining to remove the commas
	categoriesContainer.innerHTML = categories
		.map(
			(cat) => `
               <span class="cat">${cat}</span>
  `
		)
		.join("");

	// for selecting the category using the ternery operator to check if we click the All it shows all and so on

	categoriesContainer.addEventListener("click", (e) => {
		const selectedItems = e.target.textContent; // shows the child element

		selectedItems === "All"
			? displayProducts(data)
			: displayProducts(data.filter((item) => item.cat === selectedItems));
	});
};

// For range of the mina and max price

const setPrice = () => {
	const priceList = data.map((item) => item.price); //fetching the price from data
	const minPrice = Math.min(...priceList);
	const maxPrice = Math.max(...priceList);

	// setting the min and max value of the range
	priceRange.min = minPrice;
	priceRange.max = maxPrice;

	priceValue.innerHTML = `&#8377; ${minPrice}`; // setting the minimum value as default

	// setting the event listener to priceRange to function the input range

	priceRange.addEventListener("input", (e) => {
		priceValue.innerHTML = "&#8377;" + e.target.value; //for updating the price Range
		displayProducts(data.filter((item) => item.price <= e.target.value)); // for filtering the products using the input range such that price must be equal & less than max price at maximum it shows all the products
	});
};

setCategories();
setPrice();

// for clicking sound

// const audio = new Audio(
//   "https://assets.mixkit.co/active_storage/sfx/1126/1126-preview.mp3"
// );

// categoriesContainer.map((item) => {
//   item.addEventListener("click", () => {
//     audio.play();
//   });
// });
