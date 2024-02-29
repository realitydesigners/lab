const categoryStyles = {
	"Consciousness Exploration": "bg-red-400 border border-red-300 border-2 ",
	"Self Development": "bg-teal-400 border border-teal-300 border-2 ",
	Spirituality: "bg-purple-400 border border-purple-300 border-2 ",
};

export const oldschemaConfig = {
	posts: [
		{ key: "block[0].heading", label: "Heading" },
		{ key: "block[0].publicationDate", label: "Publication Date" },
		{ key: "slug.current", label: "Slug" },
		{
			key: "block[0].category.title",
			label: "Category",
			getCategoryStyle: (category) =>
				categoryStyles[category] || "default-style", // Function t
		},
	],
	categories: [
		{ key: "title", label: "Title" },
		{ key: "_createdAt", label: "Created At" },
		{ key: "slug.current", label: "Slug" },
	],
};

export const getNestedValue = (obj, path) => {
	return path.split(".").reduce((acc, part) => {
		if (acc === "N/A" || acc === null || acc === undefined) return "N/A";
		const [key, index] = part.split(/\[|\]/).filter(Boolean);
		const nextAcc = acc instanceof Object ? acc[key] : undefined;
		if (index !== undefined) {
			return Array.isArray(nextAcc) && index < nextAcc.length
				? nextAcc[parseInt(index, 10)]
				: "N/A";
		}
		return nextAcc !== undefined ? nextAcc : "N/A";
	}, obj);
};
