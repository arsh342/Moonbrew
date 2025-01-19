export const menuItems = [
  // Hot Coffees
  {
    name: "Classic Espresso",
    description: "Rich and bold single shot of espresso",
    price: 2.99,
    category: "Hot Coffee",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Small/100512.jpg",
    ingredients: ["Espresso"]
  },
  {
    name: "Cappuccino",
    description: "Espresso topped with foamy milk and a sprinkle of cocoa powder",
    price: 4.49,
    category: "Hot Coffee",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100419.webp",
    ingredients: ["Espresso", "Steamed Milk", "Milk Foam"]
  },
  {
    name: "Caramel Macchiato",
    description: "Espresso with vanilla-flavored syrup, steamed milk and caramel drizzle",
    price: 4.99,
    category: "Hot Coffee",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100405.webp",
    ingredients: ["Espresso", "Vanilla Syrup", "Steamed Milk", "Caramel Sauce"]
  },
  {
    name: "Vietnamese Coffee",
    description: "Traditional Vietnamese coffee with condensed milk",
    price: 4.49,
    category: "Hot Coffee",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/107329.webp",
    ingredients: ["Dark Roast Coffee", "Condensed Milk"]
  },
  {
    name: "Cafe Latte",
    description: "Espresso with steamed milk and light foam",
    price: 4.29,
    category: "Hot Coffee",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100377.webp",
    ingredients: ["Espresso", "Steamed Milk", "Light Foam"]
  },
  {
    name: "Mocha",
    description: "Espresso with chocolate sauce and steamed milk",
    price: 4.79,
    category: "Hot Coffee",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100477.webp",
    ingredients: ["Espresso", "Chocolate Sauce", "Steamed Milk", "Whipped Cream"]
  },

  // Iced Coffees
  {
    name: "Iced Americano",
    description: "Chilled espresso with cold water and ice",
    price: 3.99,
    category: "Iced Coffee",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100441.webp",
    ingredients: ["Espresso", "Water", "Ice"]
  },
  {
    name: "Iced Brown Sugar Latte",
    description: "Espresso with brown sugar syrup and cold milk over ice",
    price: 5.49,
    category: "Iced Coffee",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/104072.webp",
    ingredients: ["Espresso", "Brown Sugar Syrup", "Milk", "Ice"]
  },
  {
    name: "Cold Brew",
    description: "Smooth, cold-steeped coffee served over ice",
    price: 4.49,
    category: "Iced Coffee",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100427.webp",
    ingredients: ["Cold Brew Coffee", "Ice"]
  },
  {
    name: "Iced Vanilla Latte",
    description: "Espresso with vanilla syrup and cold milk over ice",
    price: 4.99,
    category: "Iced Coffee",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/108056.webp",
    ingredients: ["Espresso", "Vanilla Syrup", "Milk", "Ice"]
  },
  {
    name: "Iced Mocha",
    description: "Chilled espresso with chocolate sauce and cold milk",
    price: 5.29,
    category: "Iced Coffee",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100399.webp",
    ingredients: ["Espresso", "Chocolate Sauce", "Milk", "Ice", "Whipped Cream"]
  },

  // Bakery Items
  {
    name: "Butter Croissant",
    description: "Flaky, buttery layers of freshly baked croissant",
    price: 3.49,
    category: "Bakery",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/114550_1.webp",
    ingredients: ["Flour", "Butter", "Yeast"]
  },
  {
    name: "Chocolate Muffin",
    description: "Rich chocolate muffin with chocolate chips",
    price: 3.99,
    category: "Bakery",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/112601.webp",
    ingredients: ["Flour", "Cocoa", "Chocolate Chips"]
  },
  {
    name: "Blueberry Scone",
    description: "Buttery scone filled with fresh blueberries",
    price: 3.99,
    category: "Bakery",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/116498.webp",
    ingredients: ["Flour", "Butter", "Blueberries"]
  },
  {
    name: "Cinnamon Roll",
    description: "Warm, gooey cinnamon roll with cream cheese frosting",
    price: 4.49,
    category: "Bakery",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/M114940.webp",
    ingredients: ["Flour", "Cinnamon", "Cream Cheese Frosting"]
  },
  {
    name: "Banana Bread",
    description: "Moist banana bread with walnuts",
    price: 3.99,
    category: "Bakery",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/M104571.webp",
    ingredients: ["Flour", "Bananas", "Walnuts"]
  },
  {
    name: "Almond Danish",
    description: "Flaky pastry filled with almond cream",
    price: 4.29,
    category: "Bakery",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/116012_1.webp",
    ingredients: ["Flour", "Butter", "Almond Cream"]
  }
];

export const featuredProducts = [
{
  id: 1,
  name: 'Sumatra Dark Roast',
  price: 18.99,
  rating: 4.8,
  image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e',
  description: 'Full-bodied, dark roasted beans with earthy and herbal notes',
  origin: 'Sumatra, Indonesia',
  roastLevel: 'Dark',
  weight: '12 oz'
},
{
  id: 2,
  name: 'Ethiopian Yirgacheffe',
  price: 21.99,
  rating: 4.9,
  image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
  description: 'Light roasted beans with floral and citrus notes',
  origin: 'Yirgacheffe, Ethiopia',
  roastLevel: 'Light',
  weight: '12 oz'
},
{
  id: 3,
  name: 'Colombian Supremo',
  price: 19.99,
  rating: 4.7,
  image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf',
  description: 'Medium roasted with caramel sweetness and nutty undertones',
  origin: 'Colombia',
  roastLevel: 'Medium',
  weight: '12 oz'
},
{
  id: 4,
  name: 'Guatemala Antigua',
  price: 20.99,
  rating: 4.8,
  image: 'https://images.unsplash.com/photo-1558579506-f4646fdc7cba?q=80&w=2448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  description: 'Medium-dark roast with chocolate and spice notes',
  origin: 'Antigua, Guatemala',
  roastLevel: 'Medium-Dark',
  weight: '12 oz'
}
];

// Favourites Functionality
export const favorites = [];

// Function to add a product to favorites
export function addToFavorites(product) {
if (!favorites.some(favorite => favorite.id === product.id)) {
  favorites.push(product);
}
}

// Function to remove a product from favorites
export function removeFromFavorites(productId) {
const index = favorites.findIndex(favorite => favorite.id === productId);
if (index !== -1) {
  favorites.splice(index, 1);
}
}

// Function to check if a product is in favorites
export function isInFavorites(productId) {
return favorites.some(favorite => favorite.id === productId);
}
