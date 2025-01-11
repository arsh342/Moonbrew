# ☕ Moonbrew Coffee Shop

## 📖 Table of Contents
- [About](#-about)
- [Features](#-features)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🚀 About
🌟 Moonbrew Coffee Shop is a modern, responsive web application built with Next.js, designed to showcase our artisanal coffee selection and provide a seamless online ordering experience for coffee enthusiasts. 🌟 The application integrates a home page, menu, shopping cart, and checkout process for an all-in-one coffee-shopping experience. 🌟

---

## 🌟 Features
- **Responsive design** for all devices
- **Interactive menu** with category filtering
- **Real-time shopping cart** updates
- **Smooth animations** using Framer Motion
- **Toast notifications** for user feedback
- **Simplified checkout process**

---

## 🏁 Getting Started

### Prerequisites
📋 Before starting, ensure you have the following installed: 📋
- Node.js (v14 or later)
- npm or yarn

### Installation
1. Clone the repository: 🌱
   ```bash
   git clone https://github.com/your-username/moonbrew-coffee-shop.git
   ```
2. Navigate to the project directory: 📁
   ```bash
   cd moonbrew-coffee-shop
   ```
3. Install the dependencies: 🔧
   ```bash
   npm install
   # or
   yarn install
   ```
4. Create a `next.config.js` file in the root directory with the following content: 🛠️
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     images: {
       domains: ['example.com'], // Add your image domains here
     },
   };

   module.exports = nextConfig;
   ```
5. Ensure you have the necessary image files in your `public/images` directory. 🖼️

---

## 🔤 Usage
To run the development server: 🚀
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application. 🌐

---

## 💂️ Project Structure
📁 The project is organized as follows: 📁
```plaintext
moonbrew-coffee-shop/
├── app/
│   └── page.tsx
├── public/
│   └── images/
│       ├── hero-image.jpg
│       ├── espresso.jpg
│       ├── cappuccino.jpg
│       ├── latte.jpg
│       ├── iced-coffee.jpg
│       ├── croissant.jpg
│       └── muffin.jpg
├── .gitignore
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```

---

## 🛠 Technologies Used
🚀 This project utilizes the following technologies: 🚀
- [Next.js](https://nextjs.org/) - Framework for server-rendered React applications
- [Framer Motion](https://www.framer.com/motion/) - For animations
- [React Toastify](https://github.com/fkhadra/react-toastify) - For toast notifications
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [TypeScript](https://www.typescriptlang.org/) - For type safety
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) - For code formatting and linting

---

## 🤝 Contributing
Contributions are welcome! 🎉 Please follow these steps: 🎉
1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/AmazingFeature`. 🎨
3. Commit your changes: `git commit -m 'Add AmazingFeature'`. ✅
4. Push to the branch: `git push origin feature/AmazingFeature`. 📤
5. Open a Pull Request. 🚀

---

## 👍 License
🌟 Distributed under the MIT License. See `LICENSE` for more information. 🌟

---

## 📞 Contact
📬 Your Name - https://twitter.com/ - mailto:arshth134@gmail.com 📬

Project Link: https://github.com/arsh342/Moonbrew 🌐

---

<<<<<<< HEAD
Made with ❤️ by the Moonbrew Coffee Shop Team 🌟
=======
Made with ❤️ by the Moonbrew Coffee Shop Team 🌟

=======
# Moonbrew Coffee

Welcome to the Moonbrew Coffee project! This is a web application that allows users to browse and order coffee and bakery products online. The application is built using Next.js for the frontend and Express.js with MongoDB for the backend.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Firebase Configuration](#firebase-configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (sign up, sign in, Google sign-in)
- Browse a variety of coffee and bakery products
- Add items to cart and proceed to checkout
- View order history
- Responsive design for mobile and desktop

## Technologies Used

- **Frontend**: 
  - Next.js
  - React
  - Tailwind CSS
  - Framer Motion
  - Firebase (for authentication and Firestore)
  
- **Backend**: 
  - Express.js
  - MongoDB
  - Firebase Admin SDK

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/moonbrew-coffee.git
   cd moonbrew-coffee
   ```

2. Navigate to the frontend and backend directories and install dependencies:

   ```bash
   cd frontend
   npm install

   cd ../backend
   npm install
   ```

3. Set up environment variables:

   - Create a `.env.local` file in the `frontend` directory and add your Firebase configuration.
   - Create a `.env.local` file in the `backend` directory and add your MongoDB connection string and JWT secret.

## Usage

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend server:

   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## API Endpoints

### User Endpoints

- **POST** `/api/users/register` - Register a new user
- **POST** `/api/users/login` - Login a user
- **GET** `/api/users/profile` - Get user profile
- **PUT** `/api/users/profile` - Update user profile

### Menu Endpoints

- **GET** `/api/menu` - Get all menu items
- **POST** `/api/menu` - Create a new menu item (admin only)
- **PUT** `/api/menu/:id` - Update a menu item (admin only)
- **DELETE** `/api/menu/:id` - Delete a menu item (admin only)

### Order Endpoints

- **GET** `/api/orders` - Get all orders for a user
- **GET** `/api/orders/:id` - Get a specific order
- **POST** `/api/orders` - Create a new order
- **PUT** `/api/orders/:id` - Update order status

## Firebase Configuration

Make sure to set up your Firebase project and Firestore database. Update the `.env.local` file in the `frontend` directory with your Firebase configuration values.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
<<<<<<< Updated upstream
=======
>>>>>>> 70808958c7835e1da6157b63dd032e066383ecc2
>>>>>>> Stashed changes
