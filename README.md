# 🌙 Moonbrew

Moonbrew is a modern web application built with Next.js, featuring authentication using NextAuth.js and Firebase. It provides a smooth and responsive user experience for logging in, managing user sessions, and storing data securely.

## ✨ Features

- 🔒 User authentication with NextAuth.js and Firebase Authentication.
- 🗂️ Secure storage of bills and orders using Firebase Firestore.
- 📱 Responsive design for optimal viewing on all devices.
- 🚀 Easy setup and deployment.
- ⚙️ Customizable authentication logic.

## 🛠️ Technologies Used

- **Next.js** - React framework for building server-side rendered applications.
- **NextAuth.js** - A complete authentication solution for Next.js applications.
- **Firebase** - Backend-as-a-Service for authentication and database storage.
- **React** - JavaScript library for building user interfaces.

## ⚙️ Installation

1. 📥 Clone the repository:

   ```bash
   git clone https://github.com/arsh342/moonbrew.git
   ```

2. 📂 Navigate to the project folder:

   ```bash
   cd moonbrew
   ```

3. 📦 Install dependencies:

   ```bash
   npm install
   ```

4. 🛠️ Set up environment variables (create `.env.local`):

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

## 🚀 Running the Application

To run the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### 🧑‍💻 In Development Mode

When running in development mode, you can:
- 🐛 Debug using detailed logs and error messages.
- 🔄 Use hot reloading for instant updates.

## 📦 Building the Application

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## 🤝 Contributing

We welcome contributions! To contribute:

1. 🍴 Fork the repository.
2. 🌱 Create a new branch for your feature or bug fix.
3. ✍️ Commit your changes and push them to your fork.
4. 🔁 Open a pull request detailing your changes.

## 📬 Contact

We’d love to hear from you! Feel free to reach out:

- 📧 Email: arshth134@gmail.com
- 💼 LinkedIn: https://www.linkedin.com/in/arsh-singh-615903330/
- 🐦 Twitter: https://x.com/Thearshsran
- 🌐 Website: https://moonbrew.vercel.app/

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
