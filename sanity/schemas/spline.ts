import { CheckmarkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import tagType from "../schemas/tag";

export default defineType({
	name: "spline",
	title: "Spline",
	icon: CheckmarkIcon,
	type: "document",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			options: {
				source: "title",
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			type: "url",
			name: "splineUrl",
			title: "Spline URL",
			validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
		}),
		defineField({
			name: "image",
			title: "Image",
			type: "image",
		}),
		defineField({
			name: "tags",
			title: "Tags",
			type: "array",
			of: [{ type: "reference", to: [{ type: tagType.name }] }],
		}),
	],
});
