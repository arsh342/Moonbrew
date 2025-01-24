// Favourites Functionality
export const favorites = {
  menuItems: [],
  featuredProducts: []
};

// Utility function to generate unique IDs
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Function to add a product to favorites
export function addToFavorites(product, type = 'menuItems') {
  const favoriteList = favorites[type] || [];
  const productToAdd = { ...product, id: product.id || generateUniqueId() };
  
  if (!favoriteList.some(favorite => favorite.id === productToAdd.id)) {
    favoriteList.push(productToAdd);
    favorites[type] = favoriteList;
  }
}

// Function to remove a product from favorites
export function removeFromFavorites(productId, type = 'menuItems') {
  const favoriteList = favorites[type] || [];
  const index = favoriteList.findIndex(favorite => favorite.id === productId);
  
  if (index !== -1) {
    favoriteList.splice(index, 1);
    favorites[type] = favoriteList;
  }
}

// Function to check if a product is in favorites
export function isInFavorites(productId, type = 'menuItems') {
  const favoriteList = favorites[type] || [];
  return favoriteList.some(favorite => favorite.id === productId);
}

// Function to toggle favorite status
export function toggleFavorite(product, type = 'menuItems') {
  const favoriteList = favorites[type] || [];
  const productToToggle = { ...product, id: product.id || generateUniqueId() };
  const index = favoriteList.findIndex(favorite => favorite.id === productToToggle.id);
  
  if (index !== -1) {
    // If the product is already in favorites, remove it
    favoriteList.splice(index, 1);
  } else {
    // If the product is not in favorites, add it
    favoriteList.push(productToToggle);
  }
  
  favorites[type] = favoriteList;
  return index === -1;
}


export const menuItems = [
    // Hot Coffees
    {
      id:"classic-espresso",
      name: "Classic Espresso",
      description: "Rich and bold single shot of espresso",
      price: 2.99,
      category: "Hot Coffee",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Small/100512.jpg",
      ingredients: ["Espresso"]
    },
    {
      id:"cappuccino",
      name: "Cappuccino",
      description: "Espresso topped with foamy milk and a sprinkle of cocoa powder",
      price: 4.49,
      category: "Hot Coffee",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100419.webp",
      ingredients: ["Espresso", "Steamed Milk", "Milk Foam"]
    },
    {
      id:"caramel-macchiato",
      name: "Caramel Macchiato",
      description: "Espresso with vanilla-flavored syrup, steamed milk and caramel drizzle",
      price: 4.99,
      category: "Hot Coffee",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100405.webp",
      ingredients: ["Espresso", "Vanilla Syrup", "Steamed Milk", "Caramel Sauce"]
    },
    {
      id:"vietnamese-coffee",
      name: "Vietnamese Coffee",
      description: "Traditional Vietnamese coffee with condensed milk",
      price: 4.49,
      category: "Hot Coffee",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/107329.webp",
      ingredients: ["Dark Roast Coffee", "Condensed Milk"]
    },
    {
      id:"cafe-latte",
      name: "Cafe Latte",
      description: "Espresso with steamed milk and light foam",
      price: 4.29,
      category: "Hot Coffee",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100377.webp",
      ingredients: ["Espresso", "Steamed Milk", "Light Foam"]
    },
    {
      id:"mocha",
      name: "Mocha",
      description: "Espresso with chocolate sauce and steamed milk",
      price: 4.79,
      category: "Hot Coffee",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100477.webp",
      ingredients: ["Espresso", "Chocolate Sauce", "Steamed Milk", "Whipped Cream"]
    },
  
    // Iced Coffees
    {
      id:"iced-americano",
      name: "Iced Americano",
      description: "Chilled espresso with cold water and ice",
      price: 3.99,
      category: "Iced Coffee",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100441.webp",
      ingredients: ["Espresso", "Water", "Ice"]
    },
    {
      id:"iced-brown-sugar-latte",
      name: "Iced Brown Sugar Latte",
      description: "Espresso with brown sugar syrup and cold milk over ice",
      price: 5.49,
      category: "Iced Coffee",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/104072.webp",
      ingredients: ["Espresso", "Brown Sugar Syrup", "Milk", "Ice"]
    },
    {
      id:"cold-brew",
      name: "Cold Brew",
      description: "Smooth, cold-steeped coffee served over ice",
      price: 4.49,
      category: "Iced Coffee",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100427.webp",
      ingredients: ["Cold Brew Coffee", "Ice"]
    },
    {
      id:"iced-vanilla-latte",
      name: "Iced Vanilla Latte",
      description: "Espresso with vanilla syrup and cold milk over ice",
      price: 4.99,
      category: "Iced Coffee",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/108056.webp",
      ingredients: ["Espresso", "Vanilla Syrup", "Milk", "Ice"]
    },
    {
      id:"iced-mocha",
      name: "Iced Mocha",
      description: "Chilled espresso with chocolate sauce and cold milk",
      price: 5.29,
      category: "Iced Coffee",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100399.webp",
      ingredients: ["Espresso", "Chocolate Sauce", "Milk", "Ice", "Whipped Cream"]
    },
  
    // Bakery Items
    {
      id:"butter-croissant",
      name: "Butter Croissant",
      description: "Flaky, buttery layers of freshly baked croissant",
      price: 3.49,
      category: "Bakery",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/114550_1.webp",
      ingredients: ["Flour", "Butter", "Yeast"]
    },
    {
      id:"chocolate-muffin",
      name: "Chocolate Muffin",
      description: "Rich chocolate muffin with chocolate chips",
      price: 3.99,
      category: "Bakery",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/112601.webp",
      ingredients: ["Flour", "Cocoa", "Chocolate Chips"]
    },
    {
      id:"blueberry-scone",
      name: "Blueberry Scone",
      description: "Buttery scone filled with fresh blueberries",
      price: 3.99,
      category: "Bakery",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/116498.webp",
      ingredients: ["Flour", "Butter", "Blueberries"]
    },
    {
      id:"cinnamon-roll",
      name: "Cinnamon Roll",
      description: "Warm, gooey cinnamon roll with cream cheese frosting",
      price: 4.49,
      category: "Bakery",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/M114940.webp",
      ingredients: ["Flour", "Cinnamon", "Cream Cheese Frosting"]
    },
    {
      id:"banana-bread",
      name: "Banana Bread",
      description: "Moist banana bread with walnuts",
      price: 3.99,
      category: "Bakery",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/M104571.webp",
      ingredients: ["Flour", "Bananas", "Walnuts"]
    },
    {
      id:"almond-danish",
      name: "Almond Danish",
      description: "Flaky pastry filled with almond cream",
      price: 4.29,
      category: "Bakery",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/116012_1.webp",
      ingredients: ["Flour", "Butter", "Almond Cream"]
    },
  
    // Specialty Drinks
    {
      id:"matcha-latte",
      name: "Matcha Latte",
      description: "Premium green tea powder whisked with steamed milk",
      price: 4.99,
      category: "Specialty",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100364.webp",
      ingredients: ["Matcha Green Tea", "Steamed Milk"]
    },
    {
      id:"chai-tea-latte",
      name: "Chai Tea Latte",
      description: "Spiced black tea with steamed milk",
      price: 4.49,
      category: "Specialty",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100367.webp",
      ingredients: ["Chai Tea Blend", "Steamed Milk"]
    },
    {
      id:"hot-chocolate",
      name: "Hot Chocolate",
      description: "Rich chocolate with steamed milk and whipped cream",
      price: 3.99,
      category: "Specialty",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/107934.webp",
      ingredients: ["Chocolate", "Steamed Milk", "Whipped Cream"]
    },
    {
      id:"london-fog",
      name: "London Fog",
      description: "Earl Grey tea with vanilla and steamed milk",
      price: 4.49,
      category: "Specialty",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/104736.webp",
      ingredients: ["Earl Grey Tea", "Vanilla Syrup", "Steamed Milk"]
    },
    {
      id:"golden-turmeric-latte",
      name: "Golden Turmeric Latte",
      description: "Turmeric blend with steamed milk and honey",
      price: 4.99,
      category: "Specialty",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/112554.webp",
      ingredients: ["Turmeric", "Honey", "Steamed Milk", "Spices"]
    },
  
    // Seasonal Specials
    {
      id:"pumpkin-spice-latte",
      name: "Pumpkin Spice Latte",
      description: "Espresso with pumpkin spice syrup and steamed milk",
      price: 5.49,
      category: "Seasonal",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100374.webp",
      ingredients: ["Espresso", "Pumpkin Spice Syrup", "Steamed Milk", "Whipped Cream"]
    },
    {
      id:"mint-mocha",
      name: "Mint Mocha",
      description: "Chocolate and mint flavored coffee with whipped cream",
      price: 5.49,
      category: "Seasonal",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/104783.webp",
      ingredients: ["Espresso", "Chocolate Sauce", "Mint Syrup", "Steamed Milk"]
    },
    {
      id:"gingerbread-latte",
      name: "Gingerbread Latte",
      description: "Espresso with gingerbread syrup and steamed milk",
      price: 5.49,
      category: "Seasonal",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/113523.webp",
      ingredients: ["Espresso", "Gingerbread Syrup", "Steamed Milk", "Whipped Cream"]
    },
    {
      id:"maple-pecan-latte",
      name: "Maple Pecan Latte",
      description: "Espresso with maple syrup and pecan flavoring",
      price: 5.49,
      category: "Seasonal",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/111091.webp",
      ingredients: ["Espresso", "Maple Syrup", "Pecan Syrup", "Steamed Milk"]
    },
  
    // Breakfast Items
    {
      id:"avocado-toast",
      name: "Avocado Toast",
      description: "Smashed avocado on sourdough with cherry tomatoes",
      price: 8.99,
      category: "Breakfast",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/115300_1.webp",
      ingredients: ["Sourdough Bread", "Avocado", "Cherry Tomatoes", "Sea Salt"]
    },
    {
      id:"breakfast-sandwich",
      name: "Breakfast Sandwich",
      description: "Egg, cheese, and bacon on a croissant",
      price: 6.99,
      category: "Breakfast",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100096_1.webp",
      ingredients: ["Croissant", "Egg", "Cheese", "Bacon"]
    },
    {
      id:"yogurt-parfait",
      name: "Yogurt Parfait",
      description: "Greek yogurt with granola and fresh berries",
      price: 5.99,
      category: "Breakfast",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/101729.webp",
      ingredients: ["Greek Yogurt", "Granola", "Mixed Berries", "Honey"]
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