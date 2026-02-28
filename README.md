# React + TypeScript + Redux Toolkit + RTK Query + Tailwind CSS Starter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0.0--beta.16-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.2.1-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

A production-ready starter template for modern React applications. It comes pre-configured with a robust stack, authentication flow, role-based routing, dark mode, reusable components, and utility functions – all written in TypeScript.

---

## Features

- ⚡ **Vite** – Blazing-fast build tool and development server.
- 🧠 **Redux Toolkit** – Efficient state management with slices and RTK Query for data fetching/caching.
- 🔐 **Authentication** – Login, register, logout with token persistence (redux-persist + cookies + localStorage).
- 🚦 **Routing** – React Router v7 with public, private, and role-based routes (admin/user).
- 🎨 **Tailwind CSS v4** – Utility-first styling with native dark mode support (no PostCSS config needed in Vite).
- 🌗 **Theme Toggle** – Dark/light mode with persistent user preference.
- 📦 **Reusable Components** – Button, Input, Modal, Spinner, Timer, Breadcrumbs, Sidebar, ThemeToggle.
- 🛠 **Utilities** – Throttle, debounce, date formatting (date-fns), Zod validation schemas.
- 📁 **Scalable Folder Structure** – Feature-based organization.
- 🔧 **Path Alias** – `@/` for clean imports (e.g. `@/components/ui/Button`).

---

## Tech Stack (Latest Versions as of Feb 2026)

- **React** 19.2.4
- **TypeScript** (latest stable)
- **Vite** 8.0.0-beta.16 (or stable 7.3.1)
- **Redux Toolkit** 2.11.2 (with RTK Query)
- **React Router** 7.13.1
- **Tailwind CSS** 4.2.1 + class-based dark mode
- **redux-persist** – Persist Redux state
- **js-cookie** – Manage tokens in cookies
- **React Hook Form** 7.71.2 + **Zod** 4.3.6 – Form handling & validation
- **date-fns** 4.1.0 – Date utilities
- **Headless UI** – Accessible UI primitives (used in Modal)

---

## Prerequisites

- Node.js ≥20 (18+ works, but 20+ recommended for best compatibility)

---

## Getting Started

### 1. Clone the repository

```
bash
git clone https://github.com/your-username/react-redux-rtk-starter.git
cd react-redux-rtk-starter
```

### 2. Install dependencies

```
bash
npm install
# or pnpm install / yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root (or use `.env.local` for dev-only):

```
env
# Only VITE_* variables are exposed to the client
VITE_API_BASE_URL=https://your-api.com/api/v1
```

Replace with your actual API base URL. Never commit real secrets.

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
│   ├── ui/               # Atomic UI components (Button, Input, Modal, Spinner, etc.)
│   ├── PrivateRoute.tsx
│   ├── PublicRoute.tsx
│   └── RoleBasedRoute.tsx
├── contexts/             # React contexts (ThemeContext)
├── features/             # Feature slices & pages
│   ├── admin/            # Admin dashboard
│   ├── auth/             # Auth forms & logic
│   ├── timer/            # Example timer feature
│   └── user/             # User dashboard
├── hooks/                # Custom hooks (useThrottle, useDebounce, redux hooks)
├── redux/                # Redux setup
│   ├── api/              # baseApi (RTK Query) + endpoint injections
│   ├── features/         # slices (authSlice, etc.)
│   ├── hooks/            # Typed useAppDispatch / useAppSelector
│   └── store.ts          # Store with persist & middleware
├── routes/               # Centralized route definitions
├── utils/                # Helpers (dateUtils, validationSchemas)
├── App.tsx               # Root component with RouterProvider
├── main.tsx              # Entry: Providers (Redux, PersistGate, ThemeProvider)
├── index.css             # Tailwind base import
└── vite-env.d.ts         # Vite env types
```

---

## Available Scripts

| Script            | Description                                 |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Start dev server (Vite + HMR)               |
| `npm run build`   | Build for production                        |
| `npm run preview` | Preview production build locally            |
| `npm run lint`    | Run ESLint                                  |
| `npm run test`    | Run Vitest unit/component tests (add setup) |

---

## Key Concepts

### Redux Store with Persistence

Configured in `src/redux/store.ts` with:

- `baseApi` – RTK Query for API calls.
- `auth` slice – persisted via `redux-persist`.
- Token auto-injected via `prepareHeaders`.

### Authentication Flow

- Mutations in `authApi.ts` → update state & set cookies on success.
- Logout clears everything.
- Protected routes via `PrivateRoute` / `RoleBasedRoute`.

### Routing

Defined in `src/routes/index.tsx` using `createBrowserRouter` (React Router v7). Nested layouts + role guards.

### Theme (Dark/Light Mode)

`ThemeContext` toggles `dark` class on `<html>`. Use `dark:` prefixes in Tailwind classes.

### Utility Functions & Hooks

- `useThrottle` / `useDebounce`
- `dateUtils` wrappers for date-fns
- Zod schemas in `utils/validationSchemas.ts`

### Reusable Components

In `src/components/ui/`:

- `Button` (variants, loading)
- `Input` (errors, RHF integration)
- `Modal` (Headless UI)
- `Spinner`, `Timer`, `Breadcrumbs`, `Sidebar`, `ThemeToggle`

---

## How to Use

### Adding a New Feature

1. Create folder in `src/features/` (e.g. `profile`).
2. Add slice + API endpoints if needed.
3. Build components/pages.
4. Add route in `src/routes/index.tsx`.

### RTK Query Example

```
tsx
import { useGetProfileQuery } from "@/redux/api/profileApi";

const Profile = () => {
  const { data, isLoading } = useGetProfileQuery();
  if (isLoading) return <Spinner />;
  return <div>{data?.name}</div>;
};
```

### Form with React Hook Form + Zod

```
tsx
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({ email: z.string().email() });
type FormData = z.infer<typeof schema>;

const { register, handleSubmit } = useForm<FormData>({
  resolver: zodResolver(schema),
});
```

### Dark Mode Example

```
tsx
<div className="bg-white dark:bg-gray-800 text-black dark:text-white">
  Content
</div>
```

---

## Deployment

```
bash
npm run build
```

Deploy `dist/` to Vercel, Netlify, Cloudflare Pages, etc. Set `VITE_API_BASE_URL` in hosting env vars.

---

## Testing (Recommended Setup)

Add Vitest + React Testing Library + MSW for mocking RTK Query:

```
bash
npm install -D vitest @testing-library/react msw
```

Run: `npm run test`

---

## Contributing

1. Fork the repo.
2. Create feature branch: `git checkout -b feature/amazing-thing`
3. Commit: `git commit -m 'Add amazing thing'`
4. Push & open PR.

---

## License

MIT License – see [LICENSE](LICENSE).

---

## Acknowledgements

- [Vite](https://vite.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [date-fns](https://date-fns.org/)
- [Headless UI](https://headlessui.com/)

Happy coding! 🚀
