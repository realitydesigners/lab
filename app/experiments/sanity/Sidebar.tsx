import Link from "next/link";
import React, { useState } from "react";
export default function Sidebar() {
	const Links = [
		{ href: "/story", label: "Story", icon: "lock" },
		{ href: "/projects", label: "Projects", icon: "lock" },
		{ href: "#", label: "Blog", icon: "lock" },
		{ href: "#", label: "Contact", icon: "lock" },
	];
	const getIcon = (name) => {
		const icons = {
			logo: (
				// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
				<svg
					width="35"
					height="35"
					viewBox="0 0 80 80"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M47.1279 70.8731L33.5967 55.3087M43.4729 23.3416L10.6978 28.9689L33.5967 55.3087M43.4729 23.3416L33.5967 55.3087M43.4729 23.3416L68.3831 51.4708L33.5967 55.3087M43.4729 23.3416L30.6805 9.58502"
						stroke="#fff" //{logoColor}
						strokeWidth="6"
					/>
				</svg>
			),
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
		return icons[name] || <path />;
	};

	return (
		<div className="fixed flex h-screen w-[80px] flex-col items-center justify-center  border-r border-gray-700/50 bg-black">
			<div className="absolute top-4">
				{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
				<svg
					width="35"
					height="35"
					viewBox="0 0 80 80"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M47.1279 70.8731L33.5967 55.3087M43.4729 23.3416L10.6978 28.9689L33.5967 55.3087M43.4729 23.3416L33.5967 55.3087M43.4729 23.3416L68.3831 51.4708L33.5967 55.3087M43.4729 23.3416L30.6805 9.58502"
						stroke="#fff" //{logoColor}
						strokeWidth="6"
					/>
				</svg>
			</div>
			<div className="flex   justify-center ">
				<ul className="flex flex-col justify-center gap-2  ">
					{Links.map(({ href, label, icon }) => (
						<li key={label} className="flex">
							<Link
								href={href}
								className=" h-[60px] w-[60px] rounded-[.5em] border border-gray-700/50 hover:bg-gray-700/25"
							>
								<div className="flex h-full w-full items-center justify-center">
									{getIcon(icon)}
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>

			<div />
		</div>
	);
}
