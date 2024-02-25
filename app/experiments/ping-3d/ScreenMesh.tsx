import { Html, Text } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "./AppContext";
import { useSelectedName } from "./NameContext";

interface ScreenMeshProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

const ScreenMesh: React.FC<ScreenMeshProps> = ({ position, rotation }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const { screenSize } = useAppContext();
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    if (screenSize.width === 1440 && screenSize.height === 960) {
      setScale(1.35);
    } else if (screenSize.width === 960 && screenSize.height === 960) {
      setScale(2.05);
    } else {
      setScale(1);
    }
  }, [screenSize.width, screenSize.height]);

  const topOffset = (screenSize.height - screenSize.height * scale) / 2;
  const leftOffset = (screenSize.width - screenSize.width * scale) / 2;

  const containerStyle: React.CSSProperties = {
    width: `${screenSize.width}px`,
    height: `${screenSize.height}px`,
    overflow: "hidden",
    position: "relative",
  };

  const iframeStyle: React.CSSProperties = {
    position: "absolute",
    top: `${topOffset}px`,
    left: `${leftOffset}px`,
    width: `${screenSize.width * scale}px`,
    height: `${screenSize.height * scale}px`,
    border: "none",
    transform: "scale(1)",
    transformOrigin: "top left",
    transition: "transform 0.3s ease",
  };

  const videoURL =
    "https://ping.gg/quick/h6a013z7t7adnqp?view=cl7bfavf735090hjq2s2rxnwx";

  const { selectedScreen } = useSelectedName();

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.style.width = `${screenSize.width * scale}px`;
      iframeRef.current.style.height = `${screenSize.height * scale}px`;
    }
  }, [scale, screenSize.width, screenSize.height]);

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

export default ScreenMesh;
