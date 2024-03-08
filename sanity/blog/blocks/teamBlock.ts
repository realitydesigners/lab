import { defineField } from "sanity";

export default {
	type: "object",
	name: "teamBlock",
	title: "Team Block",
	fields: [
		defineField({
			name: "team",
			title: "Team",
			type: "reference",
			to: [{ type: "team" }],
		}),
	],
	preview: {
		select: {
			title: "team.name",
			subtitle: "team.role",
			media: "team.image",
		},
	},
};
