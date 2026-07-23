import helloKittyGif from "../assets/Hello_Kitty_Gif.gif";

export default function HomePage({ isHovered, isOpen }) {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center -translate-y-20">

            <h1 className="text-[#CD2C58] pb-60  font-bold font-puff text-6xl">
                Hover the pink bar

            </h1>
            <img
                src={helloKittyGif}
                alt="Hi emoji"
                className="relative -top-6 mt-2 w-30 text-center"
            />

            {isHovered && !isOpen && (
                <p className="text-[#CD2C58]   pb-80  font-bold  font-puff text-6xl">
                    Click Show Modes to match your vibe
                </p>
            )}

            {isOpen && (
                <div className="text-[#CD2C58] mt-10 text-center font-puff text-2xl">
                    <p className="text-bold text-6xl">
                        Click the relevant links below to enter:
                    </p>

                    <ul className="mt-4  font-puff text-2xl">
                        <li>Dreaminess</li>
                        <li>Joy</li>
                        <li>Party</li>
                        <li>Sad</li>
                        <li>Cozy</li>
                    </ul>
                </div>
            )}

        </div>
    );
}