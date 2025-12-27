import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Rashifal from "./pages/Rashifal";
import Forex from "./pages/Forex";
import DateConverter from "./pages/DateConverter";
import Sapana from "./pages/Sapana";
import Karmakanda from "./pages/Karmakanda";
import About from "./pages/About";  
import Panchanga from "./pages/Panchanga";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="rashifal" element={<Rashifal />} />
          <Route path="forex" element={<Forex />} />
          <Route path="date-converter" element={<DateConverter />} />
<Route path="sapana" element={<Sapana />} />
<Route path="karmakanda" element={<Karmakanda />} />
<Route path="about" element={<About />} />
<Route path="panchanga" element={<Panchanga />} />
          {/* Catch-all for pages we haven't built yet */}
          <Route
            path="*"
            element={
              <div className="p-10 text-center">404 - Page Not Found</div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
