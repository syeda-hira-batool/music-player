import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import MyFooter from "./components/MyFooter";
import HomePage from "./components/HomePage";
import SyncPage from "./components/SyncPage";
import InfoPage from "./components/InfoPage";

export default function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <main className="flex-1 pt-8">
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
          </Routes>
        </main>

        <MyFooter />
      </div>
    </Router>
  );
}