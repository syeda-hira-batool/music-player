const concepts = [
    {
        title: "React Router — Client-Side Navigation",
        body: "BrowserRouter, Routes, and Route (in App.jsx) drive page switching between Home, Sync, Info, and About without a full page reload. Link (in NavBar.jsx and MyFooter.jsx) swaps the anchor tag for router-aware navigation, and the Home link also scrolls back to the top on click.",
    },
    {
        title: "React Hooks — useState",
        body: "useState powers almost every interactive moment in the app: isHovered and isOpen control the NavBar's reveal-on-hover behaviour in App.jsx, while InfoPage.jsx tracks search, artist, mode, loading, error, and result independently to manage a full search flow.",
    },
    {
        title: "Component Composition & Props Drilling",
        body: "App.jsx owns the shared isHovered / isOpen state and passes it down as props to both NavBar and HomePage, so a hover on the nav can trigger a message on the home page. This is a classic 'lift state up, drill props down' pattern.",
    },
    {
        title: "Conditional Rendering",
        body: "The && operator and ternaries decide what's on screen at any moment: HomePage shows different text depending on isHovered / isOpen, NavBar expands its height and reveals menu items conditionally, and InfoPage swaps between loading, error, and result states.",
    },
    {
        title: "Tailwind CSS & Custom Theming",
        body: "Styling is entirely utility-first with Tailwind. index.css defines a custom @theme block registering --font-puff as a design token, which shows up everywhere as the font-puff class — a clean way to extend Tailwind's defaults with a brand font.",
    },
    {
        title: "Fetching Data — Fetch API & Async/Await",
        body: "InfoPage.jsx talks to the TheAudioDB API using async/await. Depending on the selected mode, it hits either the artist search or track search endpoint, and even chains a second fetch to pull album artwork when a track has none of its own.",
    },
    {
        title: "Controlled Form Inputs",
        body: "The search and artist text inputs in InfoPage.jsx are fully controlled — their value comes from state and onChange keeps that state in sync — paired with an onSubmit handler that calls preventDefault before running the search.",
    },
    {
        title: "Event Handling",
        body: "The app responds to a range of DOM events: onClick for buttons and mode toggles, onChange for inputs, onSubmit for the search form, and onMouseEnter / onMouseLeave in NavBar.jsx to create the hover-to-expand navigation bar.",
    },
    {
        title: "Rendering Lists with Array.map()",
        body: "NavBar.jsx maps over an items array to render each mood (Dreaminess, Joy, Party, Sad, Cozy) as a list entry, and InfoPage.jsx maps over result.fields to render only the metadata fields that actually have a value.",
    },
    {
        title: "Error Handling & Loading States",
        body: "InfoPage.jsx wraps its API calls in try/catch/finally, capturing failures into an error state and toggling a loading state throughout the request — giving the user clear feedback instead of a silent or broken UI.",
    },
    {
        title: "Dynamic Classnames with Template Literals",
        body: "Template literals build conditional Tailwind classes on the fly — the Artist/Song toggle buttons in InfoPage.jsx swap colors based on the active mode, and NavBar.jsx's nav bar changes height (h-8 / h-32 / h-96) depending on hover and open state.",
    },
    {
        title: "Static Asset Imports",
        body: "Gifs are imported directly as JS modules (helloKittyGif, catDance2Gif, sadCatGif) rather than referenced by path string, letting the bundler handle and optimize each asset before it's used in an <img> tag.",
    },
];

export default function AboutPage() {
    return (
        <div className="px-6 py-10 sm:px-12">
            <h1 className="text-[#CD2C58] font-puff font-bold text-5xl sm:text-6xl text-center pb-3">
                Every Feature I Used
            </h1>
            <p className="text-[#CD2C58] font-[cursive] text-center max-w-xl mx-auto pb-10">
                A behind-the-scenes look at the concepts and tools that hold this project together.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 max-w-5xl mx-auto">
                {concepts.map((concept) => (
                    <div
                        key={concept.title}
                        className="bg-white/50 rounded-2xl p-6 text-left"
                    >
                        <h2 className="text-[#CD2C58] font-puff font-bold text-xl pb-2">
                            {concept.title}
                        </h2>
                        <p className="text-[#CD2C58] font-[cursive] text-sm leading-relaxed">
                            {concept.body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}