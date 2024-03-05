export const truncateString = (str: string, num: number): string => {
	if (str && str.length > num) {
		return `${str.slice(0, num)}...`;
	}
	return str || "";
};

export const renderContent = (value: any): string => {
	if (typeof value === "string") {
		return truncateString(value, 50);
	}
	return value || "N/A";
};

export const renderNestedContent = (block: any, key: string): string => {
	const content = block[key];

	if (key === "team" && typeof content === "object" && content !== null) {
		return content.name ? truncateString(content.name, 80) : "Team Member";
	}

	if (typeof content === "object" && content.title) {
		return truncateString(content.title, 80);
	}

	if (typeof content === "string") {
		return truncateString(content, 80);
	}

	return "N/A";
};

export const preprocessDataForTable = (data: any[]): any[] => {
	const fieldOrder = [
		"heading",
		"title",
		"subheading",
		"layout",
		"team",
		"publicationDate",
		"image",
		"content",
		"slug",
		"url",
		"category",
	];

	return data.map((item) => {
		const processedItem: any = {};

		// biome-ignore lint/complexity/noForEach: <explanation>
		fieldOrder.forEach((field) => {
			if (item[field]) {
				if (field === "slug") {
					processedItem.slug = item[field].current;
				} else {
					processedItem[field] = item[field];
				}
			} else if (item.block && Array.isArray(item.block)) {
				// Replace forEach with for...of loop
				for (const block of item.block) {
					if (block[field]) {
						processedItem[field] = renderNestedContent(block, field);
					}
				}
			}
		});

		return processedItem;
	});
};

export const extractKeysFromData = (data: any[]): string[] => {
	const keys = new Set<string>();

	// Replace forEach with for...of loop
	for (const item of data) {
		for (const key of Object.keys(item)) {
			keys.add(key);
		}
	}

	return Array.from(keys);
};

export const getDataForContentType = (
	selectedContentType: string,
	allData: { posts: any; categories: any; videos: any; experiments: any },
): any[] => {
	return allData[selectedContentType] || [];
};
