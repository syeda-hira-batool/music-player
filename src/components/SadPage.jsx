import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import sadBackground from "../assets/joy-background.mp4";

import OurSummer from "../assets/OurSummer.mp3";
import Ghosting from "../assets/Ghosting.mp3";
import BlueHour from "../assets/BlueHour.mp3";

import OurSummerCover from "../assets/OurSummer.png";
import GhostingCover from "../assets/Ghosting.jfif";
import BlueHourCover from "../assets/BlueHour.jfif";

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
];

export default function SadPage() {
    const navigate = useNavigate();

    const audioRef = useRef(null);

    const [playlistOpen, setPlaylistOpen] = useState(false);
    const [playerOpen, setPlayerOpen] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [playing, setPlaying] = useState(false);

    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

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
            `}</style>


            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source
                    src={sadBackground}
                    type="video/mp4"
                />
            </video>

            <PixelDust />


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

                    <h2 className="text-white text-3xl mb-8 font-CormorantGaramond">
                        Dream Playlist
                    </h2>

                    <div className="space-y-4 font-CormorantGaramond">

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
                                <h3 className="text-white text-lg font-CormorantGaramond">
                                    {song.title}
                                </h3>

                                <p className="text-white/60 text-sm font-CormorantGaramond">
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

                    <h2 className="text-white text-3xl font-CormorantGaramond mb-8">
                        Now Playing
                    </h2>

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

                    <h3 className="text-white text-2xl mt-8 font-CormorantGaramond">
                        {currentSong.title}
                    </h3>

                    <p className="text-white/60 mt-2 font-CormorantGaramond">
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
                font-CormorantGaramond
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
                ← Exit Dreaminess
            </button>


            <h2 className="fixed bottom-17 left-8 z-50 text-xs text-white/60 font-CormorantGaramond">
                Press F11 for better experience
            </h2>

        </div>
    );
}