import React, { useEffect, useState } from "react";

const AudioComponent = () => {
	const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

	useEffect(() => {
		const context =
			new // biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(window.AudioContext || (window as any).webkitAudioContext)();

		setAudioContext(context);
	}, []);

	const startAudio = () => {
		if (audioContext) {
			audioContext.resume().then(() => {
				console.log("Playback resumed successfully");
			});
		}
	};

	return (
		<div>
			<button
				type="button"
				className="text-md uppercase pl-4 pr-4 p-2 font-bold font-mono rounded-full z-10 relative  text-gray-200  bg-white/10 p-1 pl-2 pr-2 "
				onClick={startAudio}
			>
				Start Audio
			</button>
		</div>
	);
};

export default AudioComponent;
