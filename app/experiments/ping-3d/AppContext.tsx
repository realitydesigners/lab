// AppContext.js
import React, { createContext, useContext, useState } from "react";

// Define interfaces for the combined context
interface IframeSize {
	width: number;
	height: number;
	scale: number;
}

interface AppContextType {
	screenSize: IframeSize;
	setScreenSize: React.Dispatch<React.SetStateAction<IframeSize>>;
	videoSize: IframeSize;
	setVideoSize: React.Dispatch<React.SetStateAction<IframeSize>>;
}

// Create a combined context with default values
const AppContext = createContext<AppContextType>({
	screenSize: { width: 1440, height: 960, scale: 1.34 },
	setScreenSize: () => {},
	videoSize: { width: 1280, height: 960, scale: 1.34 },
	setVideoSize: () => {},
});

// Provider component
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [screenSize, setScreenSize] = useState<IframeSize>({
		width: 1440,
		height: 960,
		scale: 1.34,
	});
	const [videoSize, setVideoSize] = useState<IframeSize>({
		width: 1280,
		height: 960,
		scale: 1.34,
	});

	const value = {
		screenSize,
		setScreenSize,
		videoSize,
		setVideoSize,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook for easy access to the context
export const useAppContext = () => useContext(AppContext);

export default AppContext;
