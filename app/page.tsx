"use client";
import { monomaniac, play } from "@/fonts";
import Spline from "@splinetool/react-spline";

export default function HomePage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<div className="w-full block h-screen  overflow-hidden">
				<Spline scene="https://prod.spline.design/iKmFxJxXHvp6KcMb/scene.splinecode" />
			</div>
		</main>
	);
}
