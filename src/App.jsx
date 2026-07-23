import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import MyFooter from "./components/MyFooter";
import HomePage from "./components/HomePage";

export default function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen flex flex-col">
              <NavBar
                isHovered={isHovered}
                setIsHovered={setIsHovered}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />

              <main className="flex-1">

                <HomePage
                  isHovered={isHovered}
                  isOpen={isOpen}
                />

              </main>

              <MyFooter />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}