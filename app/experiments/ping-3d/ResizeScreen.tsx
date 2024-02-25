import { useAppContext } from "./AppContext";

const ResizeScreen = () => {
	const { videoSize, setScreenSize } = useAppContext();

	const toggleScreenSize = () => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		setScreenSize((currentSize: { width: any; height: any }) => ({
			width: currentSize.width === currentSize.height ? 1440 : 960,
			height: currentSize.width === currentSize.height ? 960 : 960,
			scale: currentSize.width === currentSize.height ? 1.34 : 1.79,
		}));
	};

	return (
		<button
			type="button"
			onClick={toggleScreenSize}
			className="text-md uppercase pl-4 pr-4 p-2 font-bold font-mono rounded-full z-10 relative  text-gray-200  bg-white/10 p-1 pl-2 pr-2 "
		>
			Resize Screen
		</button>
	);
};

export default ResizeScreen;
