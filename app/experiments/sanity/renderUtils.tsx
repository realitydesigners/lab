export const renderNestedContent = (
	block: any,
	key: string,
): JSX.Element | string => {
	const truncateString = (str: string, num: number): string => {
		if (str && str.length > num) {
			return `${str.slice(0, num)}...`;
		}
		return str || "";
	};

	const content = block[key];

	if (typeof content === "object") {
		let result = "";
		if (content.title) {
			result += truncateString(content.title, 80);
		}
		if (content.name) {
			result += ` ${truncateString(content.name, 80)}`;
		}

		return result.trim();
	}

	if (typeof content === "string") {
		return truncateString(content, 80);
	}

	// Image handling
	if (key === "image" && typeof content === "string") {
		// Assuming the content is the URL of the image
		return <div className="h-12 w-12 bg-gray-200" />;
	}

	return "N/A";
};

const fields = [
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

export const preprocessDataForTable = (data: any[]): any[] => {
	return data.map((item) => {
		const processedItem: any = {};
		// biome-ignore lint/complexity/noForEach: <explanation>
		fields.forEach((field) => {
			if (item[field]) {
				if (field === "slug") {
					processedItem.slug = item[field].current;
				} else {
					processedItem[field] = item[field];
				}
			} else if (item.block && Array.isArray(item.block)) {
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
