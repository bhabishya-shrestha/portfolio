# API Key Setup & Deployment Instructions

## 1. Secrets policy

Variables prefixed with `VITE_` are embedded in the public browser bundle, so they must never hold secrets.
If a feature needs a secret key (e.g. an AI provider), call it from a Vercel serverless function in `/api`
and store the key as a non-`VITE_` environment variable in Vercel.

## 2. Firebase Configuration (GCP)

**Goal**: Get Firebase configuration values for Auth and Database.

1.  Go to [Firebase Console](https://console.firebase.google.com/).
2.  Click **"Add project"** and follow the steps.
3.  **Enable Authentication**:
    - Go to **Build** -> **Authentication**.
    - Click **Get Started**.
    - Enable **Google** or **Email/Password** providers as needed.
4.  **Enable Firestore Database**:
    - Go to **Build** -> **Firestore Database**.
    - Click **Create Database**.
    - Start in **Test mode** (for development).
5.  **Get Config**:
    - Click the **Web icon** (</>) on the Project Overview to add a web app.
    - Register the app (e.g., "Portfolio").
    - Copy the `firebaseConfig` values to your `.env` file:
      - `apiKey` -> `VITE_FIREBASE_API_KEY`
      - `authDomain` -> `VITE_FIREBASE_AUTH_DOMAIN`
      - `projectId` -> `VITE_FIREBASE_PROJECT_ID`
      - `storageBucket` -> `VITE_FIREBASE_STORAGE_BUCKET`
      - `messagingSenderId` -> `VITE_FIREBASE_MESSAGING_SENDER_ID`
      - `appId` -> `VITE_FIREBASE_APP_ID`

## 3. Vercel Deployment

**Goal**: Host the application.

1.  Push your code to a GitHub repository.
2.  Go to [Vercel](https://vercel.com/) and sign in.
3.  Click **"Add New..."** -> **"Project"**.
4.  Import your GitHub repository.
5.  **Environment Variables**:
    - Copy all the values from your `.env` file into the Vercel Environment Variables section.
6.  Click **"Deploy"**.

## 4. App Configuration

- `VITE_APP_NAME`: Your portfolio name.
- `VITE_APP_ENV`: `development` (local) or `production` (on Vercel).
