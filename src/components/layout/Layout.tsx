import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow container mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
