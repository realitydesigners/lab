"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface NavigationProps {
	initialSelection: string;
	togglePostsVisibility: () => void; // Add this prop
}

const Navigation: React.FC<NavigationProps> = ({
	initialSelection,
	togglePostsVisibility,
}) => {
	const router = useRouter();

	const onSelect = (selected: string) => {
		router.push(`/experiments/sanity/?selection=${selected}`);
	};

	return (
		<div className=" flex space-x-4 bg-black p-4">
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				onClick={() => onSelect("posts")}
				className=" rounded-xl border border-gray-600/50 p-4 text-gray-600"
			>
				Posts
			</button>
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				onClick={togglePostsVisibility}
				className=" rounded-xl border border-gray-600/50 p-4 text-gray-600"
			>
				Posts
			</button>
		</div>
	);
};

export default Navigation;
