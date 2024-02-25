import Link from "next/link";
import Audio from "./Audio";
import ResizeScreen from "./ResizeScreen";
import ResizeVideo from "./ResizeVideo";
import ScreenName from "./ScreenName";

const GithubIcon = () => (
	<Link href="https://github.com/realitydesigners/studio" target="_blank">
		<svg
			className="fill-current text-white/10 hover:text-white/50"
			height="25"
			width="25"
			viewBox="0 0 16 16"
			version="1.1"
			aria-hidden="true"
		>
			<path
				fillRule="evenodd"
				d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.69-.01-1.35-2.01.44-2.42-.49-2.58-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.6-.01 1.03.56 1.17.79.69 1.17 1.81.83 2.25.64.07-.5.27-.83.49-1.02-1.76-.2-3.63-.88-3.63-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.6 7.6 0 018 4.77c.68-.09 1.37-.13 2.05-.13.68 0 1.37.04 2.05.13 1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.63 3.95.28.24.53.71.53 1.43 0 1.03-.01 1.86-.01 2.12 0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"
			/>
		</svg>
	</Link>
);

export default function Menu() {
	return (
		<div className=" w-full h-auto p-4 justify-center gap-4  absolute bottom-4 z-80 flex justify-center items-center">
			<ResizeScreen />
			<ResizeVideo />
			<Audio />
			<ScreenName />

			<div className="w-auto absolute z-20 right-6 bottom-2 h-auto">
				<GithubIcon />
			</div>
		</div>
	);
}
