import { defineField } from "sanity";

export default {
	type: "object",
	name: "fileBlock",
	title: "File Block",
	fields: [
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
	],
};
