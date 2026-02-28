import { Link, useLocation } from "react-router-dom";

const breadcrumbNameMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/profile": "Profile",
  "/admin": "Admin",
  "/timer": "Timer",
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex items-center space-x-2">
        <li className="flex items-center">
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const name = breadcrumbNameMap[to] || value;

          return (
            <li key={to} className="flex items-center">
              <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
              {isLast ? (
                <span className="text-gray-600 dark:text-gray-400">{name}</span>
              ) : (
                <Link
                  to={to}
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
