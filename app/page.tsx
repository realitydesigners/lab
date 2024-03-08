"use client";
import { play } from "@/app/fonts";
import Spline from "@splinetool/react-spline";

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="block h-screen w-full  overflow-hidden">
                <Spline scene="https://prod.spline.design/iKmFxJxXHvp6KcMb/scene.splinecode" />
            </div>
        </main>
    );
}
