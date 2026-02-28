export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} MyApp. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
