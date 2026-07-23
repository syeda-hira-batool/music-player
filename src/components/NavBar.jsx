import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar({ isHovered, setIsHovered, isOpen, setIsOpen }) {


    const items = [
        {
            name: "Dreaminess",
            description:
                "It evokes an airy, weightless, and floating sensation, creating a dream-like atmosphere."
        },
        {
            name: "Joy",
            description:
                "It evokes happiness and creates an uplifting, cheerful mood."
        },
        {
            name: "Party",
            description:
                "Perfect if you are in the mood to party and want to feel energetic."
        },
        {
            name: "Sad",
            description:
                "Perfect for when you are feeling overwhelmed on a rainy day."
        },
        {
            name: "Cozy",
            description:
                "Perfect for studying, unwinding, and relaxing."
        }
    ];

    return (
        <header className="relative">

            {!isHovered && (
                <div
                    className="fixed top-0 left-0 w-full h-8 z-50"
                    onMouseEnter={() => setIsHovered(true)}
                />
            )}

            <nav
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    if (!isOpen) setIsHovered(false);
                }}
                className={`
                    fixed
                    top-0
                    left-0
                    z-40
                    w-full
                    bg-[#CD2C58]
                    text-white
                    px-16
                    py-2
                    transition-all
                    duration-300
                    ease-in-out
                    rounded-b-[1000px]

                    ${
                        isHovered
                            ? isOpen
                                ? "h-96"
                                : "h-32"
                            : "h-8"
                    }
                `}
            >

                {isHovered && (
                    <>
                        <div className="flex justify-between items-center">

                            <div className="flex gap-20">

                                <Link
                                    to="/"
                                    onClick={() => {
                                        setIsHovered(true);
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                >
                                    <h1 className="font-puff">Home</h1>
                                    <p className="text-[#FFE6D4] text-sm font-light mt-1 font-[cursive]">
                                        Access the music <br />
                                        player
                                    </p>
                                </Link>

                                <Link to="/SyncPage">
                                    <h1 className="font-puff">Sync</h1>
                                    <p className="text-[#FFE6D4] text-sm font-light mt-1 font-[cursive]">
                                        Enjoy music with <br />
                                        your friends
                                    </p>
                                </Link>

                                <Link to="/InfoPage">
                                    <h1 className="font-puff">Info</h1>
                                    <p className="text-[#FFE6D4] text-sm font-light mt-1 font-[cursive]">
                                        Get to know about <br />
                                        all the music and artists
                                    </p>
                                </Link>

                            </div>

                            <button 
                                onClick={() => setIsOpen(!isOpen)} className="bg-[#F1E2D1] rounded-full font-puff  text-[#CD2C58] px-4 py-2"
                            >
                                Show Modes ★
                            </button>

                        </div>

                        {isOpen && (
                            <ul className="flex justify-end gap-8 mt-12">

                                {items.map((item) => (
                                    <li
                                        key={item.name}
                                        className="w-40 text-center font-puff"
                                    >
                                        <h3 className="font-medium font-puff">
                                            {item.name}
                                        </h3>

                                        <p className="text-[#FFE6D4] text-xs font-light mt-2 leading-relaxed font-[cursive]">
                                            {item.description}
                                        </p>
                                    </li>
                                ))}

                            </ul>
                        )}

                    </>
                )}

            </nav>

        </header>
    );
}