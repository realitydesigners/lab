import React, { createContext, useContext, useState } from "react";

const screenOptions = ["@raymondreamer", "Zac", "Mitch"]; // Updated options

const SelectedNameContext = createContext({
	selectedScreen: screenOptions[0], // default screen
	setSelectedScreen: (screen: string) => {},
	screenOptions,
});

export const SelectedNameProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [selectedScreen, setSelectedScreen] = useState(screenOptions[0]);

	return (
		<SelectedNameContext.Provider
			value={{ selectedScreen, setSelectedScreen, screenOptions }}
		>
			{children}
		</SelectedNameContext.Provider>
	);
};

export const useSelectedName = () => useContext(SelectedNameContext);
