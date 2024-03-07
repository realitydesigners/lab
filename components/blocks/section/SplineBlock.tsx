"use client";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import React, { useState } from "react";

const SplineBlock = ({ block }) => {
	const [showDetails, setShowDetails] = useState(false);

	const { className, heading, subheading, splineDetails, tagDetails } = block;
	const { splineTitle, splineUrl, splineImage, splineSubHeading } =
		splineDetails || {};

	const toggleDetails = () => setShowDetails(!showDetails);

	switch (className) {
		case "dark": {
			return (
				<div className="relative flex h-screen w-screen flex-col bg-black">
					<div className="absolute left-4 top-20 flex gap-3">
						{splineTitle && (
							<button
								onClick={toggleDetails}
								type="button"
								className="rounded-md bg-gray-200 px-2 py-3 text-lg font-bold text-black hover:bg-gray-400"
							>
								{splineTitle}
							</button>
						)}
						<Link
							href="/experiments"
							className="rounded-md bg-gray-200 px-2 py-3 text-lg font-bold text-black hover:bg-gray-400"
						>
							Back
						</Link>
					</div>
					<div className="flex h-full w-full">
						{splineUrl && (
							<div className="h-full w-full">
								<Spline scene={splineUrl} />
							</div>
						)}
					</div>
					<div className="absolute left-0 top-32 z-10 m-4">
						{showDetails && (
							<div className="relative mb-2 max-w-[50vw] flex-wrap rounded-lg border border-white bg-gray-200 p-4 ">
								{tagDetails && tagDetails.length > 0 && (
									<div className="mb-2 flex w-full gap-2">
										{tagDetails.map((tag) => (
											<span
												key={tag.id}
												className="rounded-full bg-black px-2 py-1 text-xs text-gray-200"
											>
												{tag.tagName}
											</span>
										))}
									</div>
								)}
								{heading && (
									<h2 className="text-5xl font-bold uppercase text-black">
										{heading}
									</h2>
								)}
								{subheading && (
									<p className="mt-2 text-lg leading-[1.2em] text-black">
										{subheading}
									</p>
								)}
							</div>
						)}
					</div>
				</div>
			);
		}
		default: {
			// Handle other class names or a fallback view
			return (
				<div className="flex h-screen w-screen items-center justify-center">
					<span className="text-xl text-white">
						No specific layout defined for class: {className}
					</span>
				</div>
			);
		}
	}
};

export default React.memo(SplineBlock);
