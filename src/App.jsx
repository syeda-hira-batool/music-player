import React from "react";
import NavBar from "./components/NavBar";
import MyFooter from "./components/MyFooter";

export default function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />

            <main className="flex-1">
                {/* content */}
            </main>

            <MyFooter />
        </div>
    );
}
