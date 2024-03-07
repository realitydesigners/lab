"use client";
import { SanityImage } from "@/components/global/Images";
import { monomaniac } from "@/fonts";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import React from "react";

const SplineBlock = ({ block }) => {
    const { className, url } = block;

    switch (className) {
        case "dark": {
            const renderCategory = block.category ? (
                <span
                    className={`${monomaniac.className} mr-1  h-auto items-center   justify-center whitespace-nowrap bg-gray-200 p-1 pl-2 pr-2 text-xs font-semibold uppercase tracking-widest text-black`}
                >
                    {block.category.title}
                </span>
            ) : null;

            return (
                <div className="h-auto w-full bg-black pb-20 pt-20 lg:pb-0 lg:pt-32">
                    <div className="flex w-full flex-wrap justify-center">
                        <div className="flex-cols flex w-11/12 flex-wrap items-center justify-between">
                            {renderCategory}
                        </div>

                        <div className="w-full flex-col lg:w-1/2">
                            {block.heading && (
                                <h1 className="leading-tightest p-4 text-5xl font-bold  text-gray-200 md:text-7xl">
                                    {block.heading}
                                </h1>
                            )}
                            {block.subheading && (
                                <h2 className="w-full p-4 text-2xl  font-bold  leading-7 tracking-wide text-gray-300">
                                    {block.subheading}
                                </h2>
                            )}
                        </div>

                        <div className="h-[70vh] w-full overflow-hidden  p-2 lg:w-3/4">
                            <div className="h-full w-full overflow-hidden rounded-[1em] shadow-lg">
                                <Spline scene={url} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        default:
            return null;
    }
};

export default React.memo(SplineBlock);
