import { useState } from "react";

export default function NavBar() {
    
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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
        <header
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setIsOpen(false);
            }}
        >
            <nav
                className={`absolute top-0 left-0 w-full bg-[#CD2C58] text-white px-16 py-2 transition-all duration-300 ease-in-out rounded-b-[1000px] ${
                    isHovered
                        ? isOpen
                            ? "h-96"
                            : "h-32"
                        : "h-8"
                }`}
            >
                {isHovered && (
                    <>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-20">
                                <span>
                                    Home
                                    <p className="text-[#FFE6D4] text-sm font-light mt-1">
                                        Access the music <br /> player
                                    </p>
                                </span>

                                <span>
                                    Sync
                                    <p className="text-[#FFE6D4] text-sm font-light mt-1">
                                        Enjoy music with <br /> your friends
                                    </p>
                                </span>

                                <span>
                                    Info
                                    <p className="text-[#FFE6D4] text-sm font-light mt-1">
                                        Get to know about <br /> all the music and artists
                                    </p>
                                </span>
                            </div>

                            <button
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                Show Modes ★
                            </button>
                        </div>
                        
                        {isOpen && (
                            <ul className="flex justify-end gap-8 mt-12">
                                {items.map((item) => (
                                    <li
                                        key={item.name}
                                        className="w-40 text-center"
                                    >
                                        <h3 className="font-medium">
                                            {item.name}
                                        </h3>

                                        <p className="text-[#FFE6D4] text-xs font-light mt-2 leading-relaxed">
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