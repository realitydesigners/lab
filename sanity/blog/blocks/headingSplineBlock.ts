import { defineField } from "sanity";

export default {
	type: "object",
	name: "headingSplineBlock",
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
			name: "publicationDate",
			title: "Publication Date",
			type: "date",
			options: {
				dateFormat: "DD-MM-YYYY",
			},
		}),

		defineField({
			type: "url",
			name: "url",
			title: "URL",
			validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
		}),
		defineField({
			type: "image",
			name: "image",
			title: "Image",
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: "alt",
					title: "Alt Text",
					type: "string",
				},
			],
		}),
		defineField({
			name: "team",
			title: "Team",
			type: "reference",
			to: [{ type: "team" }],
		}),

		defineField({
			name: "category",
			title: "Category",
			type: "reference",
			to: [{ type: "category" }],
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
