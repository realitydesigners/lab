import React from "react";
import { useSelectedName } from "./NameContext";

const ScreenSelector = () => {
	const { selectedScreen, setSelectedScreen, screenOptions } =
		useSelectedName();

	return (
		<select
			value={selectedScreen}
			onChange={(e) => setSelectedScreen(e.target.value)}
			className="bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
		>
			{screenOptions.map((screen) => (
				<option key={screen} value={screen}>
					{screen}
				</option>
			))}
		</select>
	);
};

export default ScreenSelector;
