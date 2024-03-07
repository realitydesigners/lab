"use client";

import Spline from "@splinetool/react-spline";
import React from "react";

const SplineBlock = ({ block }) => {
    const { className, subheading, heading } = block;
    const { splineTitle, splineUrl, splineImage, splineSubHeading } =
        block.splineDetails || {};

    switch (className) {
        case "dark": {
            return (
                <div className="flex h-screen w-screen flex-col bg-black">
                    <div className="flex h-full w-full">
                        {splineUrl && (
                            <div className="h-full w-full ">
                                <Spline scene={splineUrl} />
                            </div>
                        )}
                    </div>
                    {(heading || subheading) && (
                        <div className="absolute bottom-0 left-0 z-10 m-4 rounded-lg border border-gray-700 bg-black/50 p-8">
                            {splineTitle && (
                                <h2 className="text-3xl font-bold text-white">
                                    {heading}
                                </h2>
                            )}
                            {subheading && (
                                <p className="text-md mt-2 text-gray-400">
                                    {subheading}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            );
        }
        default:
            return null;
    }
};

export default React.memo(SplineBlock);
