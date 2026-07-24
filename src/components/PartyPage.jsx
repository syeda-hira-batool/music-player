import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import OurSummer from "../assets/OurSummer.mp3";
import Ghosting from "../assets/Ghosting.mp3";
import BlueHour from "../assets/BlueHour.mp3";
import AboutYou from "../assets/AboutYou.mp3";

import OurSummerCover from "../assets/OurSummer.png";
import GhostingCover from "../assets/Ghosting.jfif";
import BlueHourCover from "../assets/BlueHour.jfif";
import AboutYouCover from "../assets/AboutYou.jfif";

import BackButton from "../assets/backButton.png";
import ForwardButton from "../assets/ForwardButton.png";
import PauseButton from "../assets/PauseButton.png";
import PlayButton from "../assets/playButton.png";
import cd from "../assets/cd.png";



const songs = [
    {
        title: "Our Summer",
        artist: "Tomorrow X Together",
        audio: OurSummer,
        cover: OurSummerCover,
    },
    {
        title: "Ghosting",
        artist: "Tomorrow X Together",
        audio: Ghosting,
        cover: GhostingCover,
    },
    {
        title: "Blue Hour",
        artist: "Tomorrow X Together",
        audio: BlueHour,
        cover: BlueHourCover,
    },
    {
        title: "About You",
        artist: "The 1975",
        audio: AboutYou,
        cover: AboutYouCover,
    },
];

// Light-ray colors for the disco ball burst
const discoRayColors = ["#FFFFFF", "#00F0FF", "#FF007F", "#1E1B4B", "#0B0F19"];

// Confetti palette pulled from both provided gradients
const confettiColors = [
    "#FFD0FC",
    "#D926A9",
    "#4A0E4E",
    "#00F0FF",
    "#FF007F",
    "#1E1B4B",
    "#FFFFFF",
];

const DISCO_RAY_COUNT = 12;
const CONFETTI_COUNT = 70;

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
    const [confetti, setConfetti] = useState([]);

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

    const triggerDisco = () => {
        setDiscoActive(false);

        // restart animation even if clicked again mid-burst
        requestAnimationFrame(() => {
            setDiscoActive(true);
        });

        setTimeout(() => setDiscoActive(false), 1000);
    };

    const launchConfetti = () => {
        const pieces = Array.from({ length: CONFETTI_COUNT }).map((_, i) => ({
            id: `${Date.now()}-${i}`,
            left: Math.random() * 100,
            color:
                confettiColors[
                    Math.floor(Math.random() * confettiColors.length)
                ],
            rotation: Math.round(Math.random() * 360),
            duration: 2.5 + Math.random() * 2,
            delay: Math.random() * 0.4,
            drift: Math.round((Math.random() - 0.5) * 220),
            size: 6 + Math.round(Math.random() * 6),
        }));

        setConfetti(pieces);

        setTimeout(() => setConfetti([]), 5200);
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

                @keyframes ray-burst {
                    0% {
                        transform: rotate(var(--angle)) scaleY(0);
                        opacity: 0.95;
                    }
                    60% {
                        opacity: 0.65;
                    }
                    100% {
                        transform: rotate(var(--angle)) scaleY(1);
                        opacity: 0;
                    }
                }

                .disco-ray {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    width: 5px;
                    height: 320px;
                    margin-left: -2.5px;
                    transform-origin: top center;
                    animation: ray-burst 1s ease-out forwards;
                }

                @keyframes disco-glow-pulse {
                    0% { box-shadow: 0 0 20px 6px rgba(255,255,255,0.6); }
                    50% { box-shadow: 0 0 60px 24px rgba(0,240,255,0.55); }
                    100% { box-shadow: 0 0 20px 6px rgba(255,255,255,0.6); }
                }

                .disco-ball-active {
                    animation: disco-glow-pulse 1s ease-out;
                }

                @keyframes confetti-fall {
                    0% {
                        transform: translateY(-10vh) translateX(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(110vh) translateX(var(--drift)) rotate(720deg);
                        opacity: 0.85;
                    }
                }

                .confetti-piece {
                    position: fixed;
                    top: 0;
                    border-radius: 2px;
                    animation-name: confetti-fall;
                    animation-timing-function: ease-in;
                    animation-fill-mode: forwards;
                    pointer-events: none;
                    z-index: 60;
                }
            `}</style>


            {/* Background Gradient */}

            <div
                className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,#FFD0FC_0%,#D926A9_35%,#4A0E4E_70%,#0F021B_100%)]"
            />


            {/* DISCO BALL */}

            <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">

                {/* Hanging string */}
                <div className="w-[2px] h-10 bg-white/40" />

                {/* Ball */}
                <button
                    onClick={triggerDisco}
                    aria-label="Shake the disco ball"
                    className={`
                    w-20
                    h-20
                    rounded-full
                    bg-[radial-gradient(circle_at_30%_30%,#ffffff_0%,#d9d9d9_35%,#8a8a8a_65%,#333333_100%)]
                    border
                    border-white/40
                    shadow-xl
                    cursor-pointer
                    hover:scale-105
                    active:scale-95
                    transition
                    ${discoActive ? "disco-ball-active" : ""}
                    `}
                    style={{
                        backgroundImage:
                            "radial-gradient(circle_at_30%_30%, #ffffff 0%, #d9d9d9 35%, #8a8a8a 65%, #333333 100%), repeating-linear-gradient(45deg, rgba(255,255,255,0.25) 0px, rgba(255,255,255,0.25) 2px, transparent 2px, transparent 8px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 2px, transparent 2px, transparent 8px)",
                    }}
                />

            </div>

            {/* DISCO LIGHT BURST */}

            {discoActive && (
                <div className="fixed top-[80px] left-1/2 -translate-x-1/2 z-40 pointer-events-none w-0 h-0">
                    {Array.from({ length: DISCO_RAY_COUNT }).map((_, i) => {
                        const angle = (360 / DISCO_RAY_COUNT) * i;
                        const color =
                            discoRayColors[i % discoRayColors.length];

                        return (
                            <div
                                key={i}
                                className="disco-ray"
                                style={{
                                    "--angle": `${angle}deg`,
                                    background: `linear-gradient(to bottom, ${color}, transparent)`,
                                }}
                            />
                        );
                    })}
                </div>
            )}

            {/* CONFETTI OVERLAY */}

            {confetti.map((piece) => (
                <div
                    key={piece.id}
                    className="confetti-piece"
                    style={{
                        left: `${piece.left}%`,
                        width: `${piece.size}px`,
                        height: `${piece.size * 0.4}px`,
                        backgroundColor: piece.color,
                        transform: `rotate(${piece.rotation}deg)`,
                        animationDuration: `${piece.duration}s`,
                        animationDelay: `${piece.delay}s`,
                        "--drift": `${piece.drift}px`,
                    }}
                />
            ))}


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

                <div className="p-8">

                    <h2 className="text-white text-3xl mb-8 font-SadFont">
                        Comfort Playlist
                    </h2>

                    <div className="space-y-4 font-SadFont">

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
                                <h3 className="text-white text-lg font-SadFont">
                                    {song.title}
                                </h3>

                                <p className="text-white/60 text-sm font-SadFont">
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

                    <h2 className="text-white text-3xl font-SadFont mb-8">
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

                        {/* CONFETTI BUTTON */}

                        <button
                            onClick={launchConfetti}
                            aria-label="Blow confetti"
                            className="
                            absolute
                            -bottom-3
                            -right-3
                            w-12
                            h-12
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

                    </div>

                    <h3 className="text-white text-2xl mt-8 font-SadFont">
                        {currentSong.title}
                    </h3>

                    <p className="text-white/60 mt-2 font-SadFont">
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

            <button
                onClick={() => navigate("/")}
                className="
                fixed
                font-SadFont
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


            <h2 className="fixed bottom-17 left-8 z-50 text-xs text-white/60 font-SadFont">
                Press F11 for better experience
            </h2>

        </div>
    );
}