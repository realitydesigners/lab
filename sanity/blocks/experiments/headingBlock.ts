import { defineField } from "sanity";
import tagType from "../../schemas/tag";

export default {
	type: "object",
	name: "headingBlock",
	title: "Heading",
	fields: [
		defineField({
			name: "layout",
			title: "Layout",
			type: "string",
			options: {
				list: [
					{ title: "Dark", value: "dark" },
					{ title: "Light", value: "light" },
					{ title: "Transparent", value: "transparent" },
				],
			},
		}),
		{
			name: "heading",
			title: "Heading",
			type: "string",
		},
		{
			name: "subheading",
			title: "Subheading",
			type: "text",
		},

		defineField({
			type: "image",
			name: "image",
			title: "Image",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "subcategories",
			title: "Subcategories",
			type: "array",
			of: [{ type: "reference", to: [{ type: tagType.name }] }],
		}),
	],
	preview: {
		select: {
			title: "heading",
			subtitle: "subheading",
			media: "image",
		},
	},
};
