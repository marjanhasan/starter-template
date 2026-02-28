# React + TypeScript + Redux Toolkit + RTK Query + Tailwind CSS Starter

A production‑ready starter template for modern React applications. It comes pre‑configured with a robust stack, authentication flow, role‑based routing, dark mode, reusable components, and utility functions – all written in TypeScript.

---

## Features

- ⚡ **Vite** – Fast build tool and development server.
- 🧠 **Redux Toolkit** – State management with slices and RTK Query.
- 🔐 **Authentication** – Login, register, logout with token persistence (redux‑persist + cookies + localStorage).
- 🚦 **Routing** – React Router v6 with public, private, and role‑based routes (admin/user).
- 🎨 **Tailwind CSS** – Utility‑first styling with dark mode support.
- 🌗 **Theme Toggle** – Dark/light mode with persistent preference.
- 📦 **Reusable Components** – Button, Input, Modal, Spinner, Timer, Breadcrumbs, Sidebar.
- 🛠 **Utilities** – Debounce, throttle, date formatting (date‑fns), Zod validation schemas.
- 📁 **Scalable Folder Structure** – Clear separation of concerns.
- 🔧 **Path Alias** – Use `@/` for clean imports.

---

## Tech Stack

- **React** 18
- **TypeScript**
- **Vite**
- **Redux Toolkit** (with RTK Query)
- **React Router** v6
- **Tailwind CSS** + `class` dark mode
- **redux-persist** – Persist Redux state
- **js-cookie** – Manage tokens in cookies
- **React Hook Form** + **Zod** – Form handling & validation
- **date-fns** – Date utilities
- **Headless UI** – Accessible UI primitives (used in Modal)

---

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm

---

## Getting Started

### 1. Clone the repository

```
bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```
bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```
env
VITE_API_BASE_URL=https://your-api.com/api/v1
```

Replace with your actual API base URL.

### 4. Start the development server

```
bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

---

## Project Structure

```
src/
├── components/           # Reusable UI and layout components
│   ├── layout/           # Layout wrappers (Layout, DashboardLayout, Navbar, Footer)
│   ├── ui/               # Dumb UI components (Button, Input, Modal, etc.)
│   ├── PrivateRoute.tsx
│   ├── PublicRoute.tsx
│   └── RoleBasedRoute.tsx
├── contexts/             # React context (ThemeContext)
├── features/             # Feature-based modules
│   ├── admin/            # Admin dashboard
│   ├── auth/             # Auth forms (LoginForm, RegisterForm)
│   ├── timer/            # Example timer page
│   └── user/             # User dashboard
├── hooks/                 # Custom hooks (useDebounce, useThrottle, reduxHooks)
├── redux/                 # Redux store, slices, APIs, types
│   ├── hooks/            # baseApi (RTK Query)
│   ├── features/
│   │   └── auth/         # authSlice and authApi
│   ├── types/            # TypeScript types for auth
│   └── store.ts          # Redux store configuration with persist
├── routes/               # Centralized route definitions
├── utils/                # Helper functions (dateUtils, validationSchemas)
├── App.tsx               # Minimal app (optional with RouterProvider)
├── main.tsx              # Entry point (Provider, PersistGate, ThemeProvider)
├── index.css             # Tailwind directives
└── vite-env.d.ts         # Vite types
```

---

## Available Scripts

| Script            | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server (Vite)  |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint                       |

---

## Key Concepts

### Redux Store with Persistence

The store is configured in `src/redux/store.ts` with:

- `baseApi` – RTK Query slice for API calls.
- `auth` slice – persisted using `redux-persist` (saves `token` and `user` in localStorage).
- Middleware includes `baseApi.middleware` and custom serializable check for redux‑persist actions.

### Authentication Flow

- **Login/Register** – Mutations are defined in `authApi.ts`. On success, `extraReducers` in `authSlice` update the state, set cookies (`token`, `refreshToken`), and store the user in localStorage.
- **Logout** – `logOut` action clears state, cookies, and localStorage.
- **Token injection** – `baseApi` automatically adds the token from state to request headers.
- **Route protection** – `PrivateRoute`, `PublicRoute`, and `RoleBasedRoute` guard access based on authentication and user role.

### Routing

Routes are defined in `src/routes/index.tsx` using `createBrowserRouter`. They are nested under `Layout` (for public pages) and `DashboardLayout` (for authenticated pages). Role‑based access is enforced with `<RoleBasedRoute allowedRoles={[...]}>`.

### Theme (Dark/Light Mode)

- `ThemeContext` provides `theme` and `toggleTheme`.
- Tailwind’s `darkMode: 'class'` is enabled. The `dark` class is toggled on the `<html>` element.
- Use `dark:` variants in your classes.

### Utility Functions & Hooks

- **`useDebounce`** / **`useThrottle`** – Custom hooks for performance.
- **`dateUtils`** – Wrappers around date‑fns (`formatDate`, `timeAgo`, `daysUntil`).
- **`validationSchemas`** – Centralized Zod schemas (e.g., `loginSchema`).

### Reusable Components

All UI components are in `src/components/ui/`:

- `Button` – Supports variants, loading state.
- `Input` – With label, error message, and react‑hook‑form integration.
- `Modal` – Using Headless UI.
- `Spinner` – Loading indicator.
- `Timer` – Countdown timer with controls.
- `Breadcrumbs` – Auto‑generated from current route.
- `Sidebar` – Collapsible, role‑based navigation.
- `ThemeToggle` – Dark/light mode switcher.

---

## How to Use

### Adding a New Feature

1. Create a folder under `src/features/` (e.g., `profile`).
2. Add Redux slice (if needed) in `src/redux/features/profile/`.
3. Add RTK Query endpoints in a separate file (e.g., `profileApi.ts`) and inject into `baseApi`.
4. Create components (e.g., `ProfilePage.tsx`).
5. Define routes in `src/routes/index.tsx` (add to appropriate role‑based group).

### Using RTK Query

Example: calling a protected endpoint

```tsx
import { useGetProfileQuery } from "@/redux/features/profile/profileApi";

const Profile = () => {
  const { data, isLoading } = useGetProfileQuery();
  if (isLoading) return <Spinner />;
  return <div>{data?.name}</div>;
};
```

### Form Handling with React Hook Form + Zod

```tsx
const schema = z.object({ email: z.string().email() });
type FormData = z.infer<typeof schema>;

const { register, handleSubmit } = useForm<FormData>({
  resolver: zodResolver(schema),
});
```

### Dark Mode in Components

```tsx
<div className="bg-white dark:bg-gray-800 text-black dark:text-white">
  Content
</div>
```

---

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```
2. The output will be in the `dist/` folder. Deploy its contents to any static hosting service (Netlify, Vercel, AWS S3, etc.).

Make sure to set the environment variables on your hosting platform (e.g., `VITE_API_BASE_URL`).

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Headless UI](https://headlessui.com/)
- [date-fns](https://date-fns.org/)
- [React Hook Form](https://react-hook-form.com/)
