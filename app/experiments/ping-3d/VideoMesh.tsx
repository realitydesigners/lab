import { Html, Text } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "./AppContext";
import { useSelectedName } from "./NameContext";

interface VideoMeshProps {
	position: [number, number, number];
	rotation: [number, number, number];
}

const VideoMesh: React.FC<VideoMeshProps> = ({ position, rotation }) => {
	const iframeRef = useRef<HTMLIFrameElement | null>(null);
	const { videoSize } = useAppContext();
	const [scale, setScale] = useState<number>(1);

	useEffect(() => {
		if (videoSize.width === 1280 && videoSize.height === 960) {
			setScale(1.34);
		} else if (videoSize.width === 960 && videoSize.height === 960) {
			setScale(1.79);
		} else {
			setScale(1);
		}
	}, [videoSize.width, videoSize.height]);

	const topOffset = (videoSize.height - videoSize.height * scale) / 2;
	const leftOffset = (videoSize.width - videoSize.width * scale) / 2;

	const containerStyle: React.CSSProperties = {
		width: `${videoSize.width}px`,
		height: `${videoSize.height}px`,
		overflow: "hidden",
		position: "relative",
	};

	const iframeStyle: React.CSSProperties = {
		position: "absolute",
		top: `${topOffset}px`,
		left: `${leftOffset}px`,
		width: `${videoSize.width * scale}px`,
		height: `${videoSize.height * scale}px`,
		border: "none",
		transform: "scale(1)",
		transformOrigin: "top left",
		transition: "transform 0.3s ease",
	};

	const videoURL =
		"https://ping.gg/quick/h6a013z7t7adnqp?view=clqzurw3405290fl4bckek9bm";

	useEffect(() => {
		if (iframeRef.current) {
			iframeRef.current.style.width = `${videoSize.width * scale}px`;
			iframeRef.current.style.height = `${videoSize.height * scale}px`;
		}
	}, [scale, videoSize.width, videoSize.height]);

	const { selectedScreen } = useSelectedName();

	return (
		<group position={position} rotation={rotation}>
			<Text
				font="/fonts/Staatliches.ttf"
				position={[0, -15, 0]}
				fontSize={2}
				color="white"
				anchorX="center"
				anchorY="middle"
			>
				{selectedScreen}
			</Text>
			<Html transform style={containerStyle}>
				<iframe
					ref={iframeRef}
					src={videoURL}
					title="Live Video"
					style={iframeStyle}
					className="bg-gray-200" // debugging
				/>
			</Html>
		</group>
	);
};

export default VideoMesh;
