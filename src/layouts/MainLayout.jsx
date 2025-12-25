import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

    <main className="grow container mx-auto max-w-7xl">
        <Outlet />
    </main>

    <Footer />
    </div>
  );
};

export default MainLayout;
