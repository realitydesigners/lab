// Navigation.tsx
import React from "react";

interface NavigationProps {
    onSelect: (selected: string) => void; // Callback function to handle selection
}

const Navigation: React.FC<NavigationProps> = ({ onSelect }) => {
    return (
        <div className="flex space-x-4 bg-gray-800 p-4">
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button onClick={() => onSelect("posts")} className="text-white">
                Posts
            </button>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button onClick={() => onSelect("images")} className="text-white">
                Images
            </button>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button onClick={() => onSelect("videos")} className="text-white">
                Videos
            </button>
            {/* Add more navigation buttons as needed */}
        </div>
    );
};

export default Navigation;
