So, basically, we are using a lot of text app, like React and Vid and many thing like that. So let's start our project.
-> Initialise git into project
->For designing our application, we are using Daisy UI and Tailwind.
->install tailwind
->We use Daisy UI because Daisy UI gives a lot of components ready made. That's why we are going to use this in our project.
->create a navbar from daisyui 
->always keep making small small commits when u are making a big project

---

## ES6 vs CommonJS — Import & Export

### CommonJS (used in Node.js / backend)
```js
// export
module.exports = App;
module.exports = { App, Helper };

// import
const App = require('./App');
const { App, Helper } = require('./App');
```

### ES6 Modules (used in React / frontend)
```js
// default export — one per file
export default App;

// named export — multiple allowed per file
export const helper = () => {};

// default import
import App from './App';

// named import
import { helper } from './App';

// both at once
import App, { helper } from './App';
```

**Key difference:** CommonJS uses `require()` / `module.exports`. ES6 uses `import` / `export`. React projects use ES6 because Vite (and browsers) support ES modules natively.

---

## Routing Setup

### Install react-router-dom
```bash
npm install react-router-dom
```

### How routing works (client-side)
- All routing is defined in `App.jsx`
- `BrowserRouter` — wraps the entire app, enables client-side routing relative to `basename="/"`
- `Routes` — wrapper that holds all individual `Route` entries
- `Route` — maps a `path` to an `element` (component) to render

### Route structure
```
BrowserRouter (basename="/")
  └── Routes
        └── Route path="/"  →  Body       ← parent route
              ├── Route path="/"  →  Feed
              ├── Route path="/login"  →  Login
              └── Route path="/profile"  →  Profile
```

### Outlet
- `Body` is the parent/layout component (holds Navbar, footer, etc.)
- `<Outlet />` inside `Body` is where children routes get rendered
- Think of it as a slot: whatever child route is active gets injected at the `<Outlet />` position

### Important note on routes
Once routes are created and indexed by Google, changing them hurts SEO. Plan your route structure carefully from the start and avoid renaming/removing routes later.

### App.jsx structure
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './components/Body';

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          {/* children routes rendered inside Body's <Outlet /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Body.jsx structure
```jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Body() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* children routes render here */}
    </>
  );
}

export default Body;
```

---

## CORS (Cross-Origin Resource Sharing)

### What is CORS?
When a browser makes a request from one domain to a **different** domain, the browser blocks it by default. This is called a **CORS error**.

- Same domain → browser allows it (no CORS error)
  - `abc.com` → `abc.com` ✅
- Different domain → browser blocks it (CORS error)
  - `abc.com` → `xyz.com` ❌

This happens in our app because the React frontend (e.g. `localhost:5173`) makes API calls to the backend (e.g. `localhost:8080`) — different ports = different origins.

### Fix — install cors in the backend
```bash
npm install cors
```

### Usage in Express (backend)
```js
const cors = require('cors');
const express = require('express');

const app = express();

// Add cors as the FIRST middleware, above all others
app.use(cors());

// rest of your middlewares and routes below...
app.use(express.json());
```

**Important:** `cors()` must be added as the **first middleware** so it runs before any route handlers and properly sets the response headers on every request.

### Sending cookies across origins (credentials)

By default, browsers do **not** send cookies with cross-origin requests. To store and read tokens in browser cookies, two things must be done:

**Backend — whitelist the frontend origin and allow credentials:**
```js
app.use(cors({
  origin: 'http://localhost:5173',  // your frontend URL (whitelist it)
  credentials: true,                // allow cookies to be sent/received
}));
```

**Frontend — tell axios to include credentials with every request:**
```js
// on a single request
axios.post(url, data, { withCredentials: true });

// or globally for all axios requests
axios.defaults.withCredentials = true;
```

Without `credentials: true` on the backend and `withCredentials: true` on the frontend, the browser will block the cookie and you won't see the token under Application → Cookies in DevTools.

---

## Redux Toolkit

### What is Redux?
Redux is a global state management library. Instead of passing data through props across many components, you store shared data in a central **store** and any component can read from or write to it.

### Install
```bash
npm install @reduxjs/toolkit react-redux
```

### Core concepts

- **Store** — the single central place where all app state lives
- **Slice** — a piece of the store responsible for one domain (e.g. user, feed, connections). Each slice has its own state and reducers.
- **Reducer** — a function inside a slice that defines how state changes
- **Provider** — a React component that wraps the app and makes the store available to all components

### File structure
```
src/
  utils/
    appStore.js      ← creates the store
    userSlice.js     ← slice for logged-in user data
```

### Create a slice (userSlice.js)
```js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser: (state, action) => action.payload,
    removeUser: () => null,
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
```

### Create the store (appStore.js)
```js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    // add more slices here as the app grows
  },
});

export default appStore;
```

### Provide the store to the app (App.jsx)
```jsx
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        ...
      </BrowserRouter>
    </Provider>
  );
}
```

The `Provider` must wrap everything so that all components inside can access the store.

### Using the store in a component
```js
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './utils/userSlice';

// read from store
const user = useSelector((store) => store.user);

// write to store
const dispatch = useDispatch();
dispatch(addUser(userData));
```

### After login — store the user data
```js
const response = await axios.post('/auth/login', { email, password });
dispatch(addUser(response.data));  // saves user into Redux store
```

---

## Persisting Login on Refresh

### The problem
Redux store lives in memory. On every page refresh it resets to `null`. Even though the auth token is still in the browser cookie, the store doesn't know about it — so the user appears logged out.

### The fix — fetch user on Body mount
`Body` is the parent layout that wraps all protected routes. When `Body` mounts (i.e. on every page load/refresh), we call the `/profile` API. The browser automatically sends the cookie with this request. If the token is valid, the backend returns the user and we store it in Redux. If not (token missing or expired), we redirect to `/login`.

This also acts as a **route guard** — no route inside Body is accessible without a valid token.

### Implementation in Body.jsx
```jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return; // already in store, no need to re-fetch

    try {
      const res = await axios.get(BASE_URL + '/profile/view', { withCredentials: true });
      dispatch(addUser(res.data));
    } catch (err) {
      // token missing or invalid — send to login
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};
```

### How it works step by step
1. User logs in → token saved in browser cookie → user saved in Redux
2. User refreshes → Redux resets to `null`
3. `Body` mounts → `fetchUser` runs
4. Browser sends cookie automatically with the `/profile/view` request
5. Backend validates token → returns user data
6. User saved back into Redux → app works as if never refreshed
7. If token is missing/expired → redirected to `/login`

### Why check `if (userData) return`?
Avoids making a redundant API call when navigating between pages (Body re-mounts but Redux already has the user from the current session).

---

## Logout Feature

### Why logout is more than just navigation

If you only navigate to `/login` without logging out properly, the user data stays in the Redux store. If the user somehow goes back (browser back button, etc.), they'd still appear logged in even though the server invalidated their token. This creates a security issue.

### The three-step logout process

**Step 1: Call the logout API**
- Make a POST request to `/auth/logout` (or your backend's logout endpoint)
- The backend invalidates the token (usually by blacklisting it or clearing the session)
- Browser automatically sends the token cookie with this request (`withCredentials: true`)
- The server responds: token is now invalid on the backend side

**Step 2: Remove user from Redux store**
- Dispatch `removeUser()` action from the userSlice
- This clears the Redux store (`user: null`)
- Now the frontend knows there's no user either
- Prevents stale user data from persisting in memory

**Step 3: Navigate to login page**
- After removing the user from Redux, redirect to `/login`
- User sees the login page immediately
- If they try to visit a protected route, Body's `fetchUser` will fail (no token) and redirect again

### Why this order matters

1. **API first** — ensures backend-side logout (token invalidated)
2. **Redux clear second** — ensures frontend-side logout (store cleared)
3. **Navigation last** — ensures user sees login page with everything reset

If you skip any step:
- Skip API call → token still valid on backend, security risk
- Skip Redux clear → user data lingers in memory, may reappear
- Skip navigation → user still sees protected content (confusing)

All three must happen in order for a clean logout.

---

## Error Handling in Login Form

### The problem
When login fails, the error message is static (hardcoded). But different errors need different messages:
- Wrong password → "Invalid credentials"
- User not found → "Email not registered"
- Server error → "Something went wrong, try again later"
- Network error → "No internet connection"

### Solution — use `useState` for dynamic error messages

**Create a state variable to hold the error message:**
```jsx
const [error, setError] = useState('');
```

**Catch the error and update state:**
```jsx
try {
  const response = await axios.post(loginUrl, { email, password });
  dispatch(addUser(response.data));
  navigate('/');
} catch (err) {
  // Get the error message from the backend response
  const errorMsg = err.response?.data?.message || err.message;
  setError(errorMsg); // update state with dynamic message
}
```

**Display the error in the UI:**
```jsx
{error && <p className="text-red-500 text-sm">{error}</p>}
```

### How it works

1. User submits login form
2. If login succeeds → navigate away (error stays empty, not displayed)
3. If login fails → backend returns error message → `setError()` updates state → error displays below password field
4. User sees the specific error and can retry

### Where the error message comes from

The backend sends it in the response:
```json
{
  "message": "Email not registered"
}
```

Frontend catches this with `err.response?.data?.message` and stores it in state.

### Optional chaining (`?.`)
- `err.response?.data?.message` — safely access nested data
- If `response` doesn't exist, it returns `undefined` instead of crashing
- Fallback to `err.message` (generic error) if nested message doesn't exist
