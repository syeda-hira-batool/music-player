import helloKittyGif from "../assets/Hello_Kitty_Gif.gif";
import danceGif from "../assets/dance.gif"; 

export default function HomePage({ isHovered, isOpen }) {
    return (
        <div className="flex flex-col items-center justify-center py-7 px-6">

            <h1 className="text-[#CD2C58] pb-6 font-bold font-puff text-6xl text-center">
                Hover the pink bar
            </h1>
            <img
                src={helloKittyGif}
                alt="Hi emoji"
                className="relative w-30 text-center"
            />

            {isHovered && !isOpen && (
                <p className="text-[#CD2C58] pt-8 font-bold font-puff text-6xl text-center">
                    Click Show Modes to match your vibe
                </p>
            )}

            {isOpen && (
                <div className="text-[#CD2C58] mt-40 text-center font-puff text-2xl flex flex-col items-center">
                    <p className="font-bold text-6xl pb-6">
                        Click the relevant links above ↑ to enter
                    </p>

                    <img 
                        src={danceGif} 
                        alt="Dancing bunny" 
                        className="w-40 h-auto mt-4" 
                    />
                </div>
            )}

        </div>
    );
}