export const schemaConfig = {
	posts: [
		{ key: "block[0].heading", label: "Heading" },
		{ key: "block[0].publicationDate", label: "Publication Date" },
		{
			key: "slug.current",
			label: "Slug",
			formatter: (value) => `/${value}`,
		},
		{ key: "block[0].category.title", label: "Category" },
	],
	categories: [
		{ key: "title", label: "Title" },
		{ key: "_createdAt", label: "Created At" },
		{
			key: "slug.current",
			label: "Slug",
			formatter: (value) => `/${value}`,
		},
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
