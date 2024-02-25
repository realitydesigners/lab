"use client";
import { AppProvider } from "./AppContext";
import Menu from "./Menu";
import { SelectedNameProvider } from "./NameContext";
import Scene from "./Scene";

const Ping = () => {
	return (
		<AppProvider>
			<SelectedNameProvider>
				<div className="bg-black w-full h-screen relative flex flex-col">
					<Menu />
					<Scene />
				</div>
			</SelectedNameProvider>
		</AppProvider>
	);
};

export default Ping;
