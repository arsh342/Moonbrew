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
