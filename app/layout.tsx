import { monomaniac, play } from "@/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Reality Designers | LAB",
	description:
		"Reality Designers is a collective of artists, designers, and engineers who are building the next generation of immersive experiences.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${play.className} bg-black`}>
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body>{children}</body>
		</html>
	);
}
