const menuItems = [
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
    },
  
    // Specialty Drinks
    {
      name: "Matcha Latte",
      description: "Premium green tea powder whisked with steamed milk",
      price: 4.99,
      category: "Specialty",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100364.webp",
      ingredients: ["Matcha Green Tea", "Steamed Milk"]
    },
    {
      name: "Chai Tea Latte",
      description: "Spiced black tea with steamed milk",
      price: 4.49,
      category: "Specialty",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100367.webp",
      ingredients: ["Chai Tea Blend", "Steamed Milk"]
    },
    {
      name: "Hot Chocolate",
      description: "Rich chocolate with steamed milk and whipped cream",
      price: 3.99,
      category: "Specialty",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/107934.webp",
      ingredients: ["Chocolate", "Steamed Milk", "Whipped Cream"]
    },
    {
      name: "London Fog",
      description: "Earl Grey tea with vanilla and steamed milk",
      price: 4.49,
      category: "Specialty",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/104736.webp",
      ingredients: ["Earl Grey Tea", "Vanilla Syrup", "Steamed Milk"]
    },
    {
      name: "Golden Turmeric Latte",
      description: "Turmeric blend with steamed milk and honey",
      price: 4.99,
      category: "Specialty",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/112554.webp",
      ingredients: ["Turmeric", "Honey", "Steamed Milk", "Spices"]
    },
  
    // Seasonal Specials
    {
      name: "Pumpkin Spice Latte",
      description: "Espresso with pumpkin spice syrup and steamed milk",
      price: 5.49,
      category: "Seasonal",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100374.webp",
      ingredients: ["Espresso", "Pumpkin Spice Syrup", "Steamed Milk", "Whipped Cream"]
    },
    {
      name: "Mint Mocha",
      description: "Chocolate and mint flavored coffee with whipped cream",
      price: 5.49,
      category: "Seasonal",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/104783.webp",
      ingredients: ["Espresso", "Chocolate Sauce", "Mint Syrup", "Steamed Milk"]
    },
    {
      name: "Gingerbread Latte",
      description: "Espresso with gingerbread syrup and steamed milk",
      price: 5.49,
      category: "Seasonal",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/113523.webp",
      ingredients: ["Espresso", "Gingerbread Syrup", "Steamed Milk", "Whipped Cream"]
    },
    {
      name: "Maple Pecan Latte",
      description: "Espresso with maple syrup and pecan flavoring",
      price: 5.49,
      category: "Seasonal",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/111091.webp",
      ingredients: ["Espresso", "Maple Syrup", "Pecan Syrup", "Steamed Milk"]
    },
  
    // Breakfast Items
    {
      name: "Avocado Toast",
      description: "Smashed avocado on sourdough with cherry tomatoes",
      price: 8.99,
      category: "Breakfast",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/115300_1.webp",
      ingredients: ["Sourdough Bread", "Avocado", "Cherry Tomatoes", "Sea Salt"]
    },
    {
      name: "Breakfast Sandwich",
      description: "Egg, cheese, and bacon on a croissant",
      price: 6.99,
      category: "Breakfast",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100096_1.webp",
      ingredients: ["Croissant", "Egg", "Cheese", "Bacon"]
    },
    {
      name: "Yogurt Parfait",
      description: "Greek yogurt with granola and fresh berries",
      price: 5.99,
      category: "Breakfast",
      image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/101729.webp",
      ingredients: ["Greek Yogurt", "Granola", "Mixed Berries", "Honey"]
    }
  ];

export default menuItems; 