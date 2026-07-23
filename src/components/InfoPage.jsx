import { useState } from "react";

import catDance2Gif from "../assets/cat2.gif";

export default function InfoPage() {
    const [search, setSearch] = useState("");
    const [artist, setArtist] = useState("");
    const [mode, setMode] = useState("artist"); // "artist" | "song" needs both
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!search.trim()) return;
        if (mode === "song" && !artist.trim()) {
            setError("Please enter the artist name too");
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            if (mode === "artist") {
                const response = await fetch(
                    `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(search)}`
                );

                if (!response.ok) throw new Error("Something went wrong while fetching");

                const text = await response.text();
                if (!text) throw new Error("No response from server, try again");
                const data = JSON.parse(text);
                const artistResult = data.artists?.[0];

                if (!artistResult) throw new Error("No artist found");

                setResult({
                    image: artistResult.strArtistThumb || artistResult.strArtistFanart,
                    title: artistResult.strArtist,
                    subtitle: null,
                    paragraph: artistResult.strBiographyEN,
                    fields: [
                        { label: "Country", value: artistResult.strCountry },
                        { label: "Genre", value: artistResult.strGenre },
                    ],
                });
            } else {
                // searchtrack.php requires BOTH the artists and the track title
                const response = await fetch(
                    `https://www.theaudiodb.com/api/v1/json/2/searchtrack.php?s=${encodeURIComponent(
                        artist
                    )}&t=${encodeURIComponent(search)}`
                );

                if (!response.ok) throw new Error("Something went wrong while fetching");

                const text = await response.text();
                if (!text) throw new Error("No response from server, try again");
                const data = JSON.parse(text);
                const track = data.track?.[0];

                if (!track) throw new Error("No song found");

                let image = track.strTrackThumb || track.strAlbumThumb;

                // Track objects often don't include artwork directly, but they
                // do include idAlbum, so fetch the album to get its cover.
                if (!image && track.idAlbum) {
                    try {
                        const albumRes = await fetch(
                            `https://www.theaudiodb.com/api/v1/json/2/album.php?m=${track.idAlbum}`
                        );
                        if (albumRes.ok) {
                            const albumText = await albumRes.text();
                            if (albumText) {
                                const albumData = JSON.parse(albumText);
                                image = albumData.album?.[0]?.strAlbumThumb;
                            }
                        }
                    } catch {
                        // if this fails, just show the card without an image
                    }
                }

                setResult({
                    image,
                    title: track.strTrack,
                    subtitle: track.strArtist,
                    paragraph: track.strDescriptionEN,
                    fields: [
                        { label: "Album", value: track.strAlbum },
                        { label: "Genre", value: track.strGenre },
                    ],
                });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        /* Increased top padding to pt-36 to bring everything lower down */
        <div className="min-h-screen p-6 pt-36 flex flex-col items-center gap-8">

            {/* Row container placing Cat 1 on the left, Form in the middle, Cat 2 on the right */}
            <div className="flex flex-row items-center justify-center gap-4 w-full max-w-2xl">
                

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-3 w-full max-w-md"
                >
                    <div className="flex gap-2 text-sm">
                        <button
                            type="button"
                            onClick={() => setMode("artist")}
                            className={`px-3 py-1 rounded-full font-puff ${
                                mode === "artist"
                                    ? "bg-[#CD2C58] text-[#FFE6D4]"
                                    : "bg-white/60 text-[#CD2C58]"
                            }`}
                        >
                            Artist
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode("song")}
                            className={`px-3 py-1 rounded-full font-puff ${
                                mode === "song"
                                    ? "bg-[#CD2C58] text-[#FFE6D4]"
                                    : "bg-white/60 text-[#CD2C58]"
                            }`}
                        >
                            Song
                        </button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 w-full">
                        <label htmlFor="search" className="sr-only">
                            Search
                        </label>
                        {mode === "song" && (
                            <>
                                <label htmlFor="artist" className="sr-only">
                                    Artist
                                </label>
                                <input
                                    id="artist"
                                    type="text"
                                    value={artist}
                                    onChange={(e) => setArtist(e.target.value)}
                                    placeholder="Artist name..."
                                    className="px-3 py-1 rounded-full text-[#FFE6D4] focus:outline-none bg-[#CD2C58]"
                                />
                            </>
                        )}
                        <input
                            id="search"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={mode === "artist" ? "Search an artist..." : "Song title..."}
                            className="px-3 py-1 rounded-full text-[#FFE6D4] focus:outline-none bg-[#CD2C58]"
                        />
                        <button
                            type="submit"
                            className="bg-[#CD2C58] text-[#FFE6D4] px-4 py-1 rounded-full"
                        >
                            Search
                        </button>
                    </div>
                </form>

                <img
                    src={catDance2Gif}
                    alt="Right dancing cat"
                    className="w-20 sm:w-24 object-contain"
                />
            </div>

            <div className="w-full flex justify-center">
                {loading && <p className="text-[#CD2C58] font-puff">Searching...</p>}
                {error && <p className="text-red-500 font-puff">{error}</p>}

                {!loading && !error && result && (
                    <div className="bg-white/50 rounded-2xl p-6 w-80 text-center">

                        {result.image && (
                            <img
                                src={result.image}
                                alt={result.title}
                                className="w-40 h-40 object-cover rounded-xl mx-auto mb-4"
                            />
                        )}

                        <h2 className="text-2xl font-bold text-[#CD2C58] font-puff">
                            {result.title}
                        </h2>

                        {result.subtitle && (
                            <p className="text-[#CD2C58] font-medium mb-2 font-puff">
                                {result.subtitle}
                            </p>
                        )}

                        {result.paragraph && (
                            <p className="text-[#CD2C58] text-sm mt-3 leading-relaxed text-left">
                                {result.paragraph}
                            </p>
                        )}

                        <div className="mt-4 text-left text-sm text-[#CD2C58]">
                            {result.fields.map(
                                (f) =>
                                    f.value && (
                                        <p key={f.label}>
                                            <span className="font-bold">{f.label}:</span> {f.value}
                                        </p>
                                    )
                            )}
                        </div>

                    </div>
                )}
            </div>

        </div>
    );
}