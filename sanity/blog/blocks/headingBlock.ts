import { defineField } from "sanity";
import tagType from "../../lab/schemas/tag";

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
		defineField({
			name: "block",
			title: "Blocks",
			type: "array",
			of: [
				{
					type: "splineBlock",
					title: "Spline Block",
				},
			],
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
			type: "url",
			name: "splineUrl",
			title: "Spline URL",
			validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
		}),
		defineField({
			name: "video",
			title: "Video Clip",
			type: "file",
			options: {
				accept: "video/*",
			},
		}),
		defineField({
			name: "modelFile",
			title: "GLB / GLTT File",
			type: "file",
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
