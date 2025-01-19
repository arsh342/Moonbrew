# Moonbrew

Moonbrew is a modern web application built with Next.js, featuring authentication using NextAuth.js. It provides a smooth and responsive user experience for logging in and managing user sessions.

## Features

- User authentication with NextAuth.js.
- Responsive design for optimal viewing on all devices.
- Easy setup and deployment.
- Customizable authentication logic.

## Technologies Used

- **Next.js** - React framework for building server-side rendered applications.
- **NextAuth.js** - A complete authentication solution for Next.js applications.
- **React** - JavaScript library for building user interfaces.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/moonbrew.git
   ```

2. Navigate to the project folder:

   ```bash
   cd moonbrew
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables (create `.env.local`):

   ```plaintext
   NEXTAUTH_URL=http://localhost:3000
   
   # Firebase Configuration
   
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

## Running the Application

To run the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Building the Application


To start the production server:

```bash
npm start
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
