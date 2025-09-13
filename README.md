# 🍴 **Forkify Recipe App**

![Forkify Logo](src/img/logo.png)

---

## 🌍 **Overview**

The **Forkify Recipe App** is a production-ready JavaScript masterpiece built with **ES6+ features**, **modular architecture**, and the **MVC (Model–View–Controller) pattern**. This project chronicles my evolution as an aspiring full-stack developer, blending clean code principles with real-world functionality. Key highlights include seamless API integration, robust state management, and user-centric features like bookmarking and recipe uploads—all optimized for performance and scalability.

Whether you're exploring advanced JS patterns or seeking inspiration for your next project, Forkify exemplifies how to architect maintainable, interactive web apps without frameworks. Dive in and cook up something amazing!

---

## 📋 **Table of Contents**

- [Overview](#-overview)
- [Architecture: MVC Pattern](#-architecture-mvc-pattern)
- [Core Features](#-core-features)
- [Key JavaScript Concepts Practiced](#-key-javascript-concepts-practiced)
- [Codebase Structure](#-codebase-structure)
- [UI & Styling (SCSS)](#-ui--styling-scss)
- [Getting Started](#-getting-started)
- [Best Practices Applied](#-best-practices-applied)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🏗️ **Architecture: MVC Pattern**

Forkify follows a disciplined **MVC structure** for separation of concerns, ensuring scalability and testability:

1. **Model (`model.js`)**:

   - Manages data fetching via AJAX.
   - Handles app state (recipes, search results, bookmarks).
   - Executes business logic: servings updates, pagination, persistence.
   - Integrates localStorage for offline data.

2. **View (`views/*.js`)**:

   - Dedicated classes for recipe details, search, bookmarks, pagination, and uploads.
   - Base `View` class: Rendering, spinners, errors, success messages, and a **custom diffing algorithm** (updates only changed DOM nodes—like React's virtual DOM).

3. **Controller (`controller.js`)**:

   - Central hub: Routes user events (search, select, paginate, bookmark, upload).
   - Subscribes to view-published events and orchestrates model-view updates.

4. **Config (`config.js`)**:
   - Global constants: `API_URL`, `RESULTS_PER_PAGE`, `KEY`, `MODAL_CLOSE_SEC`, `TIMEOUT_SEC`.
   - Enhances maintainability across the app.

This pattern decouples components, making the codebase a breeze to extend or debug.

---

## ⚙️ **Core Features**

- ✅ **Search Recipes**: Real-time queries via the Forkify API.
- ✅ **View Recipe Details**: Full breakdown—title, ingredients, servings, time, publisher.
- ✅ **Pagination**: Seamless navigation through result pages.
- ✅ **Bookmarking**: Persistent saves with localStorage integration.
- ✅ **Update Servings**: Dynamic ingredient scaling.
- ✅ **Upload Recipes**: Custom recipe submission to the API.
- ✅ **Error Handling**: Graceful, user-friendly feedback for failures.
- ✅ **Responsive UI**: Adaptive design across devices.
- ✅ **Publisher–Subscriber Pattern**: Loose coupling for event-driven interactions.

---

## 📚 **Key JavaScript Concepts Practiced**

### 🔑 **Async JavaScript**

- Fetching/posting with `fetch` API.
- Timeout races via `Promise.race`.
- `async/await` with try/catch for resilient flows.

### 🔒 **State Management**

- Centralized `state` object:
  ```javascript
  state = {
    recipe: {},
    search: { query, results, resultsPerPage, page },
    bookmarks: [],
  };
  ```
- Single source of truth for consistent UI.

### 📦 **LocalStorage Persistence**

- `persistBookmarks()` for saves.
- `init()` for seamless app reloads.

### 🧩 **Modular JavaScript**

- Named/default exports/imports.
- ES6 modules for clean file splits.
- Reusable components via `helpers.js`.

### 🖼️ **View Layer Enhancements**

- Spinner rendering for loading states.
- Error/success messages.
- **Diffing Algorithm**: Efficient partial DOM updates.

### 🔁 **Publisher–Subscriber Pattern**

- Views emit events; controller subscribes and coordinates.

### 🛠️ **Utility Functions**

- `AJAX()`: Unified GET/POST handler.
- `timeout()`: Guards against infinite requests.

---

## 📁 **Codebase Structure**

```
forkify-app/
├── js/
│   ├── controller.js       # MVC Controller: Event orchestration
│   ├── model.js            # MVC Model: State, API, logic
│   ├── config.js           # Constants & settings
│   ├── helpers.js          # AJAX, timeout utils
│   └── views/
│       ├── View.js         # Base: Rendering, diffing, errors
│       ├── recipeView.js   # Recipe details view
│       ├── resultsView.js  # Search results
│       ├── bookmarksView.js # Bookmarks list
│       ├── paginationView.js # Page controls
│       └── addRecipeView.js # Upload form
├── scss/                   # SCSS source files
└── index.html              # App entry point
```

---

## 🎨 **UI & Styling (SCSS)**

- **Color Palette**: Warm gradients for an inviting vibe.
- **Breakpoints**: Responsive grids for desktop, tablet, mobile (`$bp-medium`, etc.).
- **SCSS Magic**: Variables (`$color-primary`), nesting, media queries.
- **Layout**: CSS Grid with named areas (header, list, recipe)—clean and flexible.

---

## 🚀 **Getting Started**

1. **Clone the Repo**:

   ```
   git clone https://github.com/sheharyarr-ahmed/Forkify-App.git
   cd Forkify-App
   ```

2. **Install Dependencies**:

   ```
   npm install
   ```

3. **Development Mode** (with Parcel for HMR):

   ```
   npm start
   ```

4. **Build for Production**:

   ```
   npm run build
   ```

5. **Open Locally**:
   - Navigate to `dist/index.html` in your browser.

Pro Tip: Use Parcel for live reloading during tweaks!

---

## 🧪 **Best Practices Applied**

- **Separation of Concerns**: Strict MVC for modularity.
- **Modular Code**: ES6 imports/exports for reusability.
- **Defensive Programming**: Guard clauses, comprehensive error handling.
- **Immutability**: Non-mutating state updates.
- **Centralized Config**: Easy tweaks without hunting code.
- **Decoupled Events**: Publisher–Subscriber for flexible architecture.

These principles ensure Forkify is not just functional, but a blueprint for enterprise-level JS apps.

---

## 🤝 **Contributing**

Inspired by Forkify? Fork the repo, experiment with new features (e.g., user auth or image uploads), and open a PR. Let's collaborate to make it even tastier!

---

## 📜 **License**

This project represents the culmination of my JavaScript learning journey — covering modern ES6+ features, architecture patterns, and best practices.

---
