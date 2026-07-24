import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from "react-router-dom";

import NavBar from "./components/NavBar";
import MyFooter from "./components/MyFooter";
import HomePage from "./components/HomePage";
import SyncPage from "./components/SyncPage";
import InfoPage from "./components/InfoPage";
import AboutPage from "./components/AboutPage";
import DreamPage from "./components/DreamPage";

function AppContent() {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isDreamMode = location.pathname === "/DreamPage";

  useEffect(() => {
    if (!isDreamMode) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isDreamMode, navigate]);

  return (
    <div className="flex min-h-screen flex-col">

      {/* Only show navbar outside mood mode */}
      {!isDreamMode && (
        <NavBar
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}

      <main className={isDreamMode ? "flex-1" : "flex-1 pt-8"}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                isHovered={isHovered}
                isOpen={isOpen}
              />
            }
          />

          <Route path="/SyncPage" element={<SyncPage />} />
          <Route path="/InfoPage" element={<InfoPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/DreamPage" element={<DreamPage />} />
        </Routes>
      </main>

      {/* Only show footer outside mood mode */}
      {!isDreamMode && <MyFooter />}

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}