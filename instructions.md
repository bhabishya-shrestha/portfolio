# API Key Setup & Deployment Instructions

## 1. Gemini AI Configuration

**Goal**: Get `VITE_GEMINI_API_KEY`.

1.  Go to [Google AI Studio](https://aistudio.google.com/).
2.  Sign in with your Google account.
3.  Click **"Get API key"** (top left).
4.  Click **"Create API key"**.
5.  Select a project (or create a new one).
6.  Copy the generated key -> `VITE_GEMINI_API_KEY`.

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
