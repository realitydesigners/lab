import { defineField } from "sanity";
import splineType from "../schemas/spline";
import tagType from "../schemas/tag";

export default {
	type: "object",
	name: "splineBlock",
	title: "Spline Block",
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
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
		}),
		defineField({
			name: "subheading",
			title: "Subheading",
			type: "text",
		}),
		defineField({
			name: "spline",
			title: "Spline",
			type: "array",
			of: [{ type: "reference", to: [{ type: splineType.name }] }],
		}),
		defineField({
			type: "image",
			name: "image",
			title: "Image",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "tags",
			title: "Tags",
			type: "array",
			of: [{ type: "reference", to: [{ type: tagType.name }] }],
		}),
	],
};
