"use client";

// Navigation.tsx
import React from "react";

interface NavigationProps {
	initialSelection: string;
	contentTypes: string[]; // Array of content types
	onSelectContentType: (contentType: string) => void; // Callback to select content type
}

const Navigation: React.FC<NavigationProps> = ({
	contentTypes,
	onSelectContentType,
}) => {
	const handleSelect = (contentType: string) => {
		onSelectContentType(contentType);
	};

	return (
		<div className="flex space-x-4 bg-black p-4">
			{/* Dynamically generate buttons for each content type */}
			{contentTypes.map((contentType) => (
				// biome-ignore lint/a11y/useButtonType: <explanation>
				<button
					key={contentType}
					onClick={() => handleSelect(contentType)}
					className="rounded-xl border border-gray-600/50 p-4 text-gray-600"
				>
					{contentType.charAt(0).toUpperCase() + contentType.slice(1)}
				</button>
			))}
		</div>
	);
};

export default Navigation;
