import React from "react";
import { Link } from "react-router-dom";

export default function MyFooter() {
    return (
        <footer className="relative w-full py-4 bg-[#CD2C58] font-puff">
            <p className="text-[#FFE6D4]   text-center  ">&copy; 2026 this is the project to showcase my frontend skills.</p>
            <Link to = "/About">
            <h1 className="text-center text-[#FFE6D4] font-puff">About</h1>
            </Link>
        </footer>
    );
}