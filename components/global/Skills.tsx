"use client";
import { monomaniac, play } from "@/fonts";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import React, { ReactElement, useEffect, useState } from "react";

export function SkillSection() {
	return (
		<>
			<div className="w-full ">
				<ServiceSection />
			</div>
		</>
	);
}

const Skills = [
	{
		label: "React",
		icon: "lock",
	},
	{
		label: "Next.js",
		icon: "lock",
	},
	{
		label: "Typescript",
		icon: "lock",
	},
	{
		label: "Spline",
		icon: "lock",
	},
	{
		label: "Three.js",
		icon: "lock",
	},
	{
		label: "React-Three-Fiber",
		icon: "lock",
	},
	{
		label: "Tailwind",
		icon: "lock",
	},
	{
		label: "Sanity",
		icon: "lock",
	},
	{
		label: "Figma",
		icon: "lock",
	},
	{
		label: "TRPC",
		icon: "lock",
	},
];

const ServiceSection = () => {
	return (
		<div className="flex flex-col lg:flex-row px-4 md:px-40 py-20 text-white w-full justify-between ">
			<h2 className={`${monomaniac.className} text-3xl uppercase mb-4 `}>
				Our Favorite
				<br />
				Technologies
			</h2>
			<ul className="grid grid-cols-2 lg:grid-cols-5 gap-1">
				{Skills.map(({ label, icon }) => (
					<li
						key={label}
						className="flex items-center border  border-gray-600/50"
					>
						<div className="min-w-10 min-h-10 pl-2 pr-2 flex items-center ">
							{getIcon(icon)}
						</div>
						<span className=" text-sm pr-4">{label}</span>
					</li>
				))}
			</ul>
		</div>
	);
};
type IconName = "lock";

const icons: Record<IconName, ReactElement> = {
	lock: (
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg
			width="20"
			height="20"
			viewBox="0 0 18 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M1 11C1 9.11438 1 8.17157 1.58579 7.58579C2.17157 7 3.11438 7 5 7H13C14.8856 7 15.8284 7 16.4142 7.58579C17 8.17157 17 9.11438 17 11V13C17 15.8284 17 17.2426 16.1213 18.1213C15.2426 19 13.8284 19 11 19H7C4.17157 19 2.75736 19 1.87868 18.1213C1 17.2426 1 15.8284 1 13V11Z"
				stroke="#444"
				strokeWidth="2"
			/>
			<path
				d="M13 6V5C13 2.79086 11.2091 1 9 1V1C6.79086 1 5 2.79086 5 5V6"
				stroke="#444"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<circle cx="9" cy="13" r="2" fill="#444" />
		</svg>
	),
};

const getIcon = (name: string): ReactElement => {
	if (name in icons) {
		return icons[name as IconName];
	}
	return <svg />;
};
