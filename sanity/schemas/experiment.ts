import { defineField, defineType } from "sanity";

export default defineType({
	type: "document",
	name: "experiment",
	title: "Experiment",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			description:
				"Represents the title or name of the category. This field is used to identify the category in the user interface and in URLs.",
			validation: (rule) => rule.required(),
		}),

		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "block.0.heading",
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
				{
					type: "fileBlock",
					title: "GLTF File Block",
				},
				{
					type: "contentBlock",
					title: "Content Block",
				},
			],
		}),
	],
	preview: {
		select: {
			title: "block.0.heading",
			subheading: "block.0.subheading",
			media: "block.0.image",
		},
		prepare(selection) {
			const { title, media, subheading } = selection;
			return {
				title: title || "Untitled",
				media: media,
				subtitle: subheading,
			};
		},
	},
});
