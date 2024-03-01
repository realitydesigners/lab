export const renderBlockContent = (blocks) => {
	if (!blocks || blocks.length === 0) return "No Content";
	const headings = blocks
		.filter((block) => block.heading)
		.map((block) => block.heading)
		.join(", ");
	return headings || "";
};

export const renderFileOrImage = (fieldValue) => {
	return fieldValue?.asset ? "Yes" : "No";
};

export const renderTitles = (items) => {
	return items && items.length > 0
		? items.map((item) => item.title || "Unnamed").join(", ")
		: "N/A";
};

export const renderFieldValue = (item, field) => {
	switch (field) {
		case "block":
			return renderBlockContent(item[field]);
		case "subcategories":
			return renderTitles(item[field]);
		case "model":
			return item[field]?.title || "No Model Title";
		case "image":
		case "video":
			return renderFileOrImage(item[field]);
		default: {
			const fieldValue = item[field];
			if (typeof fieldValue === "object" && fieldValue !== null) {
				return fieldValue.current || JSON.stringify(fieldValue);
			}
			return fieldValue || "N/A";
		}
	}
};

export const getDataForContentType = (selectedContentType, allData) => {
	switch (selectedContentType) {
		case "posts":
			return allData.posts;
		case "categories":
			return allData.categories;
		case "videos":
			return allData.videos;

		default:
			return [];
	}
};

export const fieldLabels = {
	block: "Heading",
	subcategories: "Subcategories",
	model: "Model",
	image: "Image",
	video: "Video",
	_createdAt: "Created",
};

export const fieldOrder = {
	posts: ["block", "_createdAt", "slug", "subcategories", "model"],
	categories: ["title", "_createdAt", "slug"],
	videos: ["title", "_createdAt", "model", "subcategories", "image", "videos"],
};
