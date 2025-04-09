# 🔗 ClipLink - Frontend

This is the **frontend** of the ClipLink application, a Micro-SaaS URL shortener and analytics platform. The frontend is built with **React**, **Redux Toolkit**, and **TailwindCSS**, providing a modern and responsive user interface for managing and analyzing shortened links.

---

## 🌐 Live Demo

You can access the deployed application here:  
**[ClipLink Frontend](https://clip-link-frontend.vercel.app/)**

---

## 📦 Tech Stack

- **Frontend Framework:** React (with Vite for fast builds)
- **State Management:** Redux Toolkit
- **Styling:** TailwindCSS
- **Charts:** Recharts
- **HTTP Client:** Axios
- **Routing:** React Router DOM

---

## 📁 Project Structure

```
/client
├── public/               # Static assets
├── src/                  # Source code
│   ├── app/              # Redux store configuration
│   ├── assets/           # Images and other assets
│   ├── components/       # Reusable UI components
│   ├── features/         # Redux slices and API logic
│   ├── pages/            # Page-level components
│   ├── services/         # Utility services (e.g., Axios instance)
│   ├── utils/            # Helper functions
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point for rendering the app
│   ├── index.css         # Global styles
│   └── App.css           # Additional styles
├── .env                  # Environment variables
├── vite.config.js        # Vite configuration
├── package.json          # Project dependencies and scripts
```

---

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Harshdev625/ClipLink-Frontend.git
   cd cliplink-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

---

## 🚀 Features

- **Authentication:** Login functionality with JWT-based authentication.
- **Dashboard:** View and manage all your shortened links.
- **Link Creation:** Create new short links with optional custom aliases and expiration dates.
- **Analytics:** View detailed analytics for each link, including:
  - Total clicks
  - Daily clicks (line chart)
  - Device and browser breakdown (bar charts)
  - Recent clicks (table with IP, device, browser, OS, and timestamp)
- **Responsive Design:** Fully responsive UI built with TailwindCSS.

---

## 📂 Key Files and Folders

### `src/components/`

Reusable UI components like:

- **Navbar:** Navigation bar with links and logout functionality.
- **LinkCard:** Displays individual link details.
- **ChartCard:** Renders charts for analytics.
- **RecentClicksTable:** Displays a table of recent clicks.
- **ProtectedRoute:** Protects routes that require authentication.

### `src/pages/`

Page components for different routes:

- **LoginPage:** Login form for authentication.
- **Dashboard:** Displays all user links.
- **CreateLinkPage:** Form to create new short links.
- **ViewLinkStats:** Displays analytics for a specific link.
- **NotFound:** 404 page for undefined routes.

### `src/features/`

Redux slices and APIs for managing state:

- **auth/**: Handles user authentication.
- **links/**: Manages link creation and retrieval.
- **analytics/**: Fetches and stores analytics data.

### `src/services/`

Utility services:

- **axiosInstance.js**: Configured Axios instance for API requests.
- **tokenHelper.js**: Helper functions for managing JWT tokens.

### `src/utils/`

Helper functions:

- **validateUrl.js**: Validates URLs.
- **generateRandomString.js**: Generates random strings.
- **formatDate.js**: Formats dates for display.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Developed by **Harsh Dev** .

---