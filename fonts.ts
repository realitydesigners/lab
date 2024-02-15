import {
	Monomaniac_One,
	Play,
	Space_Grotesk,
	Staatliches,
} from "next/font/google";

export const play = Play({
	weight: ["400", "700"],
	subsets: ["latin"],
	display: "swap",
});

export const staatliches = Staatliches({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

export const monomaniac = Monomaniac_One({
	weight: ["400"],
	style: ["normal"],
	subsets: ["latin"],
});
export const space = Space_Grotesk({
	weight: ["400", "600"],
	style: ["normal"],
	subsets: ["latin"],
});
