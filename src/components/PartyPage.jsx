import { useNavigate } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";

import SmoothCriminal from "../assets/SmoothCriminal.mp3";
import RideOrDie from "../assets/RideOrDie.mp3";
import Knife from "../assets/Knife.mp3";
import WorldCup from "../assets/WorldCup.mp3";
import RedRed from "../assets/RedRed.mp3";
import Bad from "../assets/Bad.mp3";
import BeatIt from "../assets/BeatIt.mp3";
import BilliJean from "../assets/BilliJean.mp3";

import SmoothCriminalCover from "../assets/SmoothCriminalCover.png";
import RideOrDieCover from "../assets/RideOrDieCover.jfif";
import KnifeCover from "../assets/KnifeCover.jpg";
import WorldCupCover from "../assets/WorldCupCover.jpg";
import RedRedCover from "../assets/RedRedCover.jfif";
import BeatItCover from "../assets/BeatItCover.jfif";

import BackButton from "../assets/backButton.png";
import ForwardButton from "../assets/ForwardButton.png";
import PauseButton from "../assets/PauseButton.png";
import PlayButton from "../assets/playButton.png";
import cd from "../assets/cd.png";

import PartyBg from "../assets/PartyBg.jpg";
import PartyVideo1 from "../assets/partyDance.mp4";


const songs = [
    {
        title: "Smooth Criminal",
        artist: "Michael Jackson",
        audio: SmoothCriminal,
        cover: SmoothCriminalCover,
    },
    {
        title: "RideOrDie",
        artist: "Evan (former Enhypen Member)",
        audio: RideOrDie,
        cover: RideOrDieCover,
    },
    {
        title: "Knife",
        artist: "Enhypen (Sunghoon Version)",
        audio: Knife,
        cover: KnifeCover,
    },
    {
        title: "World Cup",
        artist: "IShowSpeed",
        audio: WorldCup,
        cover: WorldCupCover,
    },
    {
        title: "RedRed",
        artist: "Cortis",
        audio: RedRed,
        cover: RedRedCover,
    },
    {
        title: "Bad",
        artist: "Michael Jackson",
        audio: Bad,
        cover: SmoothCriminalCover,
    },
    {
        title: "Beat It",
        artist: "Michael Jackson",
        audio: BeatIt,
        cover: BeatItCover,
    },
    {
        title: "Billie Jean",
        artist: "Michael Jackson",
        audio: BilliJean,
        cover: BeatItCover,
    },
];

// Light-ray colors for the disco ball burst (inspired by the website)
const discoRayColors = ["#FFFFFF", "#00F0FF", "#FF007F", "#1E1B4B", "#0B0F19"];

const DISCO_RAY_COUNT = 12;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDiscoTiles({ radius = 34, squareSize = 4.5, prec = 13 } = {}) {
    const fuzzy = 0.001;
    const inc = (Math.PI - fuzzy) / prec;
    const tiles = [];
    let key = 0;

    for (let t = fuzzy; t < Math.PI; t += inc) {
        const currentRadius =
            Math.abs(
                radius * Math.cos(0) * Math.sin(t) -
                    radius * Math.cos(Math.PI) * Math.sin(t)
            ) / 2.5;
        const circumference = Math.abs(2 * Math.PI * currentRadius);
        const squaresThatFit = Math.max(1, Math.floor(circumference / squareSize));
        const angleInc = (Math.PI * 2 - fuzzy) / squaresThatFit;

        for (let i = angleInc / 2 + fuzzy; i < Math.PI * 2; i += angleInc) {
            const x = radius * Math.cos(i) * Math.sin(t);
            const y = radius * Math.sin(i) * Math.sin(t);
            const z = radius * Math.cos(t);

            const isEquatorBand = t > 1.3 && t < 1.9;
            const shade = isEquatorBand ? randomInt(150, 255) : randomInt(120, 200);

            tiles.push({
                key: key++,
                wrapperTransform: `translate3d(${x}px, ${y}px, ${z}px)`,
                tileTransform: `rotate(${i}rad) rotateY(${t}rad)`,
                color: `rgb(${shade}, ${shade}, ${shade})`,
                delay: `${(randomInt(0, 20) / 10).toFixed(1)}s`,
                size: squareSize,
            });
        }
    }

    return tiles;
}

export default function PartyPage() {
    const navigate = useNavigate();

    const audioRef = useRef(null);

    const [playlistOpen, setPlaylistOpen] = useState(false);
    const [playerOpen, setPlayerOpen] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [playing, setPlaying] = useState(false);

    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const [discoActive, setDiscoActive] = useState(false);

    const discoTiles = useMemo(() => generateDiscoTiles(), []);

    const currentSong = songs[currentIndex];

    const playSong = (song) => {
        const index = songs.findIndex(
            (s) => s.title === song.title
        );

        setCurrentIndex(index);

        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.load();
                audioRef.current.play();
                setPlaying(true);
            }
        }, 0);

        setPlayerOpen(true);
    };

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (playing) {
            audioRef.current.pause();
            setPlaying(false);
        } else {
            audioRef.current.play();
            setPlaying(true);
        }
    };

    const nextSong = () => {
        const newIndex =
            currentIndex === songs.length - 1
                ? 0
                : currentIndex + 1;

        setCurrentIndex(newIndex);

        setTimeout(() => {
            audioRef.current.load();
            audioRef.current.play();
            setPlaying(true);
        }, 0);
    };

    const previousSong = () => {
        const newIndex =
            currentIndex === 0
                ? songs.length - 1
                : currentIndex - 1;

        setCurrentIndex(newIndex);

        setTimeout(() => {
            audioRef.current.load();
            audioRef.current.play();
            setPlaying(true);
        }, 0);
    };

    const handleSeek = (e) => {
        const value = Number(e.target.value);

        audioRef.current.currentTime = value;

        setProgress(value);
    };

    const formatTime = (time) => {
        if (!time) return "0:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${String(seconds).padStart(2, "0")}`;
    };

    const toggleDisco = () => {
        setDiscoActive((prev) => !prev);
    };

    const launchConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            <style>{`
                .dream-progress {
                    -webkit-appearance: none;
                    appearance: none;
                    background: transparent;
                }

                .dream-progress::-webkit-slider-runnable-track {
                    height: 4px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 2px;
                }

                .dream-progress::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 24px;
                    height: 40px;
                    margin-top: -21px;
                    background-image: url(${cd});
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                    border: none;
                    cursor: pointer;
                }

                .dream-progress::-moz-range-track {
                    height: 4px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 2px;
                }

                .dream-progress::-moz-range-thumb {
                    width: 24px;
                    height: 40px;
                    background-image: url(${cd});
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                    border: none;
                    border-radius: 0;
                    cursor: pointer;
                }

                .bg-photo-bleed {
                    background-image: url(${PartyBg});
                    background-size: cover;
                    background-position: center;
                    transform: scale(1.15);
                    filter: blur(34px) brightness(0.55) saturate(1.25);
                }

                .bg-photo-main {
                    background-image: url(${PartyBg});
                    background-size: cover;
                    background-position: center;
                    filter: blur(0.6px) contrast(1.06) saturate(1.15) brightness(0.82);
                }

                .bg-grain {
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
                    background-size: 180px 180px;
                    mix-blend-mode: overlay;
                    opacity: 0.05;
                }

                @keyframes disco-tiles-rotate {
                    0% { transform: rotateX(90deg) rotateZ(0deg); }
                    100% { transform: rotateX(90deg) rotateZ(360deg); }
                }

                @keyframes disco-core-rotate {
                    0% { transform: rotateX(90deg) rotateY(0deg); }
                    100% { transform: rotateX(90deg) rotateY(-360deg); }
                }

                @keyframes disco-tile-reflect {
                    0% { opacity: 0.45; }
                    50% { opacity: 1; }
                    100% { opacity: 0.45; }
                }

                .disco-tiles-idle {
                    animation: disco-tiles-rotate 16s linear infinite;
                }

                .disco-tiles-active {
                    animation: disco-tiles-rotate 5s linear infinite;
                }

                .disco-core-idle {
                    animation: disco-core-rotate 16s linear infinite;
                }

                .disco-core-active {
                    animation: disco-core-rotate 5s linear infinite;
                }

                .disco-tile {
                    animation: disco-tile-reflect 3s linear infinite;
                    backface-visibility: hidden;
                    border-radius: 1px;
                }

                .disco-tile-active {
                    animation-duration: 1.3s;
                }

                @keyframes disco-rays-rotate {
                    from {
                        transform: translateX(-50%) rotate(0deg);
                    }
                    to {
                        transform: translateX(-50%) rotate(360deg);
                    }
                }

                .disco-rays-spin {
                    left: 50%;
                    animation: disco-rays-rotate 6s linear infinite;
                }

                .disco-ray {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 5px;
                    height: 320px;
                    margin-left: -2.5px;
                    transform-origin: top center;
                    opacity: 0.55;
                }

                @keyframes disco-shimmer-move {
                    0% {
                        background-position: 0 0, 30px 30px;
                    }
                    100% {
                        background-position: 200px 200px, 230px 230px;
                    }
                }

                .disco-shimmer {
                    background-image:
                        radial-gradient(rgba(255,255,255,0.55) 1px, transparent 2.5px),
                        radial-gradient(rgba(0,240,255,0.35) 1px, transparent 2.5px);
                    background-size: 60px 60px, 60px 60px;
                    animation: disco-shimmer-move 3s linear infinite;
                    mix-blend-mode: screen;
                    opacity: 0.55;
                }

                .playlist-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
                }

                .playlist-scroll::-webkit-scrollbar {
                    width: 6px;
                }

                .playlist-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }

                .playlist-scroll::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.25);
                    border-radius: 999px;
                }

                .playlist-scroll::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.4);
                }
            `}</style>

            <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0F021B]">
                <div className="absolute inset-0 bg-photo-bleed" />
                <div className="absolute inset-0 bg-photo-main" />
                <div className="absolute inset-0 bg-grain" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#FFD0FC_0%,#D926A9_35%,#4A0E4E_70%,#0F021B_100%)] opacity-40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <div
                className="fixed top-0 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
                style={{ perspective: "700px" }}
            >
                <div className="w-[2px] h-10 bg-white/40" />

                <button
                    onClick={toggleDisco}
                    aria-label="Toggle disco lights"
                    aria-pressed={discoActive}
                    className="relative w-20 h-20 p-0 border-0 bg-transparent cursor-pointer hover:scale-105 active:scale-95 transition"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div
                        className="absolute inset-[-10px] rounded-full pointer-events-none"
                        style={{
                            background: "white",
                            opacity: discoActive ? 0.35 : 0.18,
                            filter: "blur(14px)",
                            transition: "opacity 0.4s ease",
                        }}
                    />

                    <div
                        className={`absolute inset-0 rounded-full ${
                            discoActive ? "disco-core-active" : "disco-core-idle"
                        }`}
                        style={{
                            background: "linear-gradient(#141414, #3a3a3a)",
                            transformStyle: "preserve-3d",
                            boxShadow: "inset 0 0 12px 2px rgba(0,0,0,0.6)",
                        }}
                    />

                    <div
                        className={`absolute inset-0 ${
                            discoActive ? "disco-tiles-active" : "disco-tiles-idle"
                        }`}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {discoTiles.map((tile) => (
                            <div
                                key={tile.key}
                                className="absolute top-1/2 left-1/2"
                                style={{
                                    width: tile.size,
                                    height: tile.size,
                                    marginLeft: -tile.size / 2,
                                    marginTop: -tile.size / 2,
                                    transform: tile.wrapperTransform,
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                <div
                                    className={`disco-tile ${
                                        discoActive ? "disco-tile-active" : ""
                                    }`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        transform: tile.tileTransform,
                                        backgroundColor: tile.color,
                                        animationDelay: tile.delay,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </button>
            </div>

            {discoActive && (
                <>
                    <div className="fixed top-[80px] left-1/2 z-40 pointer-events-none w-0 h-0 disco-rays-spin">
                        {Array.from({ length: DISCO_RAY_COUNT }).map((_, i) => {
                            const angle = (360 / DISCO_RAY_COUNT) * i;
                            const color =
                                discoRayColors[i % discoRayColors.length];

                            return (
                                <div
                                    key={i}
                                    className="disco-ray"
                                    style={{
                                        transform: `rotate(${angle}deg)`,
                                        background: `linear-gradient(to bottom, ${color}, transparent)`,
                                    }}
                                />
                            );
                        })}
                    </div>

                    <div className="fixed inset-0 z-30 pointer-events-none disco-shimmer" />

                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 w-48 md:w-64 h-72 md:h-96 rounded-3xl overflow-hidden border border-white/20 bg-black/30 backdrop-blur-md shadow-2xl transition-all duration-500 animate-bounce">
                        <video
                            src={PartyVideo1}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>
                </>
            )}

            <button
                id="hs-run-on-click-run-confetti"
                onClick={launchConfetti}
                aria-label="Blow confetti"
                className="
                fixed
                top-6
                right-6
                z-50
                w-14
                h-14
                rounded-full
                bg-white/15
                backdrop-blur-xl
                border
                border-white/30
                shadow-xl
                text-2xl
                flex
                items-center
                justify-center
                hover:scale-110
                active:scale-95
                transition
                "
            >
                🎉
            </button>

            <audio
                ref={audioRef}
                onLoadedMetadata={() =>
                    setDuration(audioRef.current.duration)
                }
                onTimeUpdate={() =>
                    setProgress(audioRef.current.currentTime)
                }
                onEnded={nextSong}
            >
                <source src={currentSong.audio} />
            </audio>

            <div
                className={`
                fixed
                left-0
                top-0
                h-full
                w-80
                z-40
                bg-black/20
                backdrop-blur-2xl
                border-r
                border-white/10
                transition-transform
                duration-500
                ${
                    playlistOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }
                `}
            >
                <button
                    onClick={() => setPlaylistOpen(!playlistOpen)}
                    className="
                    absolute
                    right-[-56px]
                    top-1/2
                    -translate-y-1/2
                    w-14
                    h-16
                    rounded-r-2xl
                    bg-white/10
                    backdrop-blur-xl
                    border
                    border-l-0
                    border-white/20
                    text-white
                    text-2xl
                    hover:bg-white/20
                    transition
                    flex
                    items-center
                    justify-center
                    "
                >
                    ☰
                </button>

                <div className="p-8 h-full flex flex-col">
                    <h2 className="text-white text-3xl mb-8 shrink-0 font-monoton">
                        Party Playlist
                    </h2>

                    <div className="space-y-4 font-monoton flex-1 min-h-0 overflow-y-auto pr-2 playlist-scroll">
                        {songs.map((song, index) => (
                            <button
                                key={song.title}
                                onClick={() => playSong(song)}
                                className={`
                                w-full
                                p-4
                                rounded-2xl
                                border
                                text-left
                                transition

                                ${
                                    currentIndex === index
                                        ? "bg-white/20 border-white/30"
                                        : "bg-white/5 border-white/10 hover:bg-white/10"
                                }
                                `}
                            >
                                <h3 className="text-white text-lg font-monoton">
                                    {song.title}
                                </h3>

                                <p className="text-white/60 text-sm font-display">
                                    {song.artist}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div
                className={`
                fixed
                right-0
                top-0
                h-full
                w-96
                z-40
                bg-black/20
                backdrop-blur-2xl
                border-l
                border-white/10
                transition-transform
                duration-500
                ${
                    playerOpen
                        ? "translate-x-0"
                        : "translate-x-full"
                }
                `}
            >
                <button
                    onClick={() => setPlayerOpen(!playerOpen)}
                    className="
                    absolute
                    left-[-56px]
                    top-1/2
                    -translate-y-1/2
                    w-14
                    h-16
                    rounded-l-2xl
                    bg-white/10
                    backdrop-blur-xl
                    border
                    border-r-0
                    border-white/20
                    text-white
                    text-2xl
                    hover:bg-white/20
                    transition
                    flex
                    items-center
                    justify-center
                    "
                >
                    ♪
                </button>

                <div className="flex flex-col items-center p-8">
                    <h2 className="text-white text-3xl font-monoton mb-8">
                        Now Playing
                    </h2>

                    <div className="relative">
                        <img
                            src={currentSong.cover}
                            alt={currentSong.title}
                            className="
                            w-60
                            h-60
                            object-cover
                            rounded-3xl
                            border
                            border-white/20
                            shadow-2xl
                            "
                        />
                    </div>

                    <h3 className="text-white text-2xl mt-8 font-monoton">
                        {currentSong.title}
                    </h3>

                    <p className="text-white/60 mt-2 font-monoton">
                        {currentSong.artist}
                    </p>

                    <div className="w-full mt-10">
                        <input
                            type="range"
                            min={0}
                            max={duration || 0}
                            value={progress}
                            onChange={handleSeek}
                            className="
                            dream-progress
                            w-full
                            cursor-pointer
                            "
                        />

                        <div className="flex justify-between mt-2 text-xs text-white/60">
                            <span>{formatTime(progress)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-8 mt-10">
                        <button
                            onClick={previousSong}
                            className="hover:scale-110 transition"
                        >
                            <img
                                src={BackButton}
                                alt="Previous"
                                className="w-10"
                            />
                        </button>

                        <button
                            onClick={togglePlay}
                            className="hover:scale-110 transition flex items-center justify-center w-28 h-28"
                        >
                            <img
                                src={
                                    playing
                                        ? PauseButton
                                        : PlayButton
                                }
                                alt="Play Pause"
                                className="w-28 object-contain"
                            />
                        </button>

                        <button
                            onClick={nextSong}
                            className="hover:scale-110 transition"
                        >
                            <img
                                src={ForwardButton}
                                alt="Next"
                                className="w-10"
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* EXIT BUTTON */}
            <button
                onClick={() => navigate("/")}
                className="
                fixed
                font-monoton
                bottom-6
                left-6
                z-50
                rounded-full
                bg-black/30
                px-4
                py-2
                text-white
                text-sm
                backdrop-blur-xl
                opacity-60
                hover:opacity-100
                "
            >
                ← Exit the mode
            </button>

            <h2 className="fixed bottom-17 left-8 z-50 text-xs text-white/60 font-monoton">
                Press F11 for better a experience
            </h2>
        </div>
    );
}