import Sidebar from "./Sidebar";

export default function SanityLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="bg-black">
			<Sidebar />
			{children}
		</div>
	);
}
