import React from "react";
import sadCatGif from "../assets/sad_cat.gif";

export default function SyncPage() {
    return (
        <div className="text-center py-40">
            <h1 className="text-3xl text-[#CD2C58] font-bold font-puff">
                New Feature will be added soon
            </h1>
            <p className="text-[#CD2C58] mt-4 font-[cursive]">
                (After learning about WebSockets)
            </p>
            <img
                src={sadCatGif}
                alt="sad cat"
                className="mx-auto mt-6 w-32"
            />
        </div>
    );
}