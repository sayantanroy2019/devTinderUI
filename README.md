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
