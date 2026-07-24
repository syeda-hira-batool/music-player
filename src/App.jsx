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
import JoyPage from "./components/JoyPage";
import ComfortPage from "./components/ComfortPage";

function AppContent() {
const [isHovered, setIsHovered] = useState(false);
const [isOpen, setIsOpen] = useState(false);


const location = useLocation();
const navigate = useNavigate();

const isDreamMode = location.pathname === "/DreamPage";
const isJoyMode = location.pathname === "/JoyPage";
const isComfortMode = location.pathname === "/ComfortPage";

// True if the user is inside any mood mode
const isMoodMode = isDreamMode || isJoyMode || isComfortMode;

useEffect(() => {
    if (!isMoodMode) return;

    const handleEscape = (event) => {
        if (event.key === "Escape") {
            navigate("/");
        }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
        window.removeEventListener("keydown", handleEscape);
    };
}, [isMoodMode, navigate]);

return (
    <div className="flex min-h-screen flex-col">

        {/* Show navbar only outside mood mode */}
        {!isMoodMode && (
            <NavBar
                isHovered={isHovered}
                setIsHovered={setIsHovered}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        )}

        <main
            className={
                isMoodMode
                    ? "flex-1"
                    : "flex-1 pt-8"
            }
        >
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

                <Route
                    path="/SyncPage"
                    element={<SyncPage />}
                />

                <Route
                    path="/InfoPage"
                    element={<InfoPage />}
                />

                <Route
                    path="/about"
                    element={<AboutPage />}
                />

                <Route
                    path="/DreamPage"
                    element={<DreamPage />}
                />

                <Route
                    path="/JoyPage"
                    element={<JoyPage />}
                />

                <Route
                    path="/ComfortPage"
                    element={<ComfortPage />}
                />
            </Routes>
        </main>

        {/* Show footer only outside mood mode */}
        {!isMoodMode && <MyFooter />}

    </div>
);


}

export default function App() {
return ( <Router> <AppContent /> </Router>
);
}
