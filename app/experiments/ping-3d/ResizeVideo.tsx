import { useAppContext } from "./AppContext";

const ResizeVideo = () => {
	const { videoSize, setVideoSize } = useAppContext();

	const toggleVideoSize = () => {
		setVideoSize((currentSize) => ({
			width: currentSize.width === currentSize.height ? 1280 : 960,
			height: currentSize.width === currentSize.height ? 960 : 960,
			scale: currentSize.width === currentSize.height ? 1.34 : 1.79,
		}));
	};

	return (
		<button
			type="button"
			onClick={toggleVideoSize}
			className="text-md uppercase pl-4 pr-4 p-2 font-bold font-mono rounded-full z-10 relative  text-gray-200  bg-white/10 p-1 pl-2 pr-2"
		>
			Resize Video
		</button>
	);
};

export default ResizeVideo;
