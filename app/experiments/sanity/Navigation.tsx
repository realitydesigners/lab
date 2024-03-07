"use client";
import React from "react";

interface NavigationProps {
	initialSelection: string;
	contentTypes: string[];
	onSelectContentType: (contentType: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
	contentTypes,
	onSelectContentType,
}) => {
	const handleSelect = (contentType: string) => {
		onSelectContentType(contentType);
	};

	return (
		<div className="flex gap-2  py-10">
			{contentTypes.map((contentType) => (
				// biome-ignore lint/a11y/useButtonType: <explanation>
				<button
					key={contentType}
					onClick={() => handleSelect(contentType)}
					className="rounded-xl border  border-gray-700 px-3 py-1 text-gray-200 hover:bg-gray-700/50"
				>
					{contentType.charAt(0).toUpperCase() + contentType.slice(1)}
				</button>
			))}
		</div>
	);
};

export default Navigation;
