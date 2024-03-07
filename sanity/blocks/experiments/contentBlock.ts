import {
	BookIcon,
	ImageIcon,
	LinkIcon,
	PlayIcon,
	UserIcon,
} from "@sanity/icons";
import { defineField } from "sanity";

export default {
	type: "object",
	name: "contentBlock",
	title: "Case Study",
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
			name: "content",
			title: "Content",
			type: "array",
			of: [
				{
					type: "block",
					lists: [
						{ title: "Bullet", value: "bullet" },
						{ title: "Numbered", value: "number" },
					],

					styles: [
						{ title: "Normal", value: "normal" },
						{ title: "Quote", value: "blockquote" },
						{ title: "H1", value: "h1" },
						{ title: "H2", value: "h2" },
						{ title: "H3", value: "h3" },
						{ title: "H4", value: "h4" },
					],
					marks: {
						annotations: [
							defineField({
								type: "object",
								name: "internalLink",
								title: "Internal link",
								icon: UserIcon,
								fields: [
									{
										name: "reference",
										type: "reference",
										title: "Reference",
										to: [{ type: "experiment" }],
									},
									{
										name: "theme",
										type: "string",
										title: "Theme",
										options: {
											list: [
												{ title: "Internal Link | Light", value: "light" },
												{ title: "Internal Link | Dark", value: "dark" },
											],
										},
									},
								],
								preview: {
									select: {
										title: "reference.title",
										media: "reference.mainImage",
										theme: "theme",
									},
									prepare(selection) {
										const { title, media, theme } = selection;
										const themeTitles = {
											light: "Internal Link | Light",
											dark: "Internal Link | Dark",
										};
										const themeTitle =
											themeTitles[theme] || "No theme selected";

										return {
											title: title || "Untitled",
											subtitle: themeTitle,
											media: media,
										};
									},
								},
							}),
						],
					},
				},
				defineField({
					type: "object",
					name: "postsRef",
					title: "Post",
					preview: {
						select: {
							title: "experiment.block.0.heading",
							excerpt: "experiment.block.0.subheading",
							publicationDate: "experiment.block.0.publicationDate",
							media: "experiment.block.0.image",
						},
						prepare(selection) {
							const { title, excerpt, publicationDate, media } = selection;
							const formattedDate = publicationDate
								? new Date(publicationDate).toLocaleDateString()
								: "No date";

							const subtitle = `${
								excerpt ? excerpt : "No excerpt"
							} | ${formattedDate}`;
							return {
								title: title || "Untitled",
								subtitle: subtitle,
								media: media,
							};
						},
					},
					fields: [
						defineField({
							type: "reference",
							name: "experiments",
							title: "Referenced Post",
							to: [{ type: "experiment" }],
						}),
					],
				}),

				defineField({
					type: "image",
					icon: ImageIcon,
					name: "image",
					title: "Image",
					options: {
						hotspot: true,
					},

					fields: [
						defineField({
							name: "alt",
							type: "string",
							title: "Alt text",
							description:
								"Alternative text for screenreaders. Falls back on caption if not set",
						}),
						{
							name: "className",
							title: "CSS Class",
							type: "string",
							options: {
								list: [
									{ title: "img-dark", value: "img-dark" },
									{ title: "img-light", value: "img-light" },
								],
							},
						},
					],
					preview: {
						select: {
							media: "asset",
							title: "alt",
							className: "className",
						},
						prepare(selection) {
							const { title, media, className } = selection;
							const classNameTitles = {
								"img-dark": "img-dark",
								"img-light": "img-light",
							};
							const classNameTitle =
								classNameTitles[className] || "No class selected";

							return {
								title: title || "Untitled",
								subtitle: classNameTitle,
								media,
							};
						},
					},
				}),

				defineField({
					type: "object",
					icon: LinkIcon,
					name: "spline",
					title: "Spline",
					fields: [
						defineField({
							type: "url",
							name: "url",
							title: "URL",
							validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
						}),
					],
				}),
			],
		},
	],

	preview: {
		select: {
			contentArray: "content",
			layout: "layout",
			media: "block.0.image",
		},
		prepare(selection) {
			const { contentArray, layout, media } = selection;

			const firstContentType =
				contentArray?.length > 0 ? contentArray[0]._type : "Unknown";
			let firstWords = "";
			if (firstContentType === "block") {
				const blockText = contentArray[0].children
					?.map((child) => child.text)
					.join(" ");
				firstWords = blockText
					? `${blockText.split(" ").slice(0, 10).join(" ")}...`
					: "No text content...";
			}

			const contentSummary = contentArray?.reduce((acc, curr) => {
				const type = curr._type;
				if (acc[type]) {
					acc[type] += 1;
				} else {
					acc[type] = 1;
				}
				return acc;
			}, {});

			const contentDiversity = Object.entries(contentSummary || {})
				.map(([type, count]) => `${count} ${type}`)
				.join(", ");

			return {
				title: firstWords || firstContentType,
				subtitle: `${
					Object.keys(contentArray || {}).length
				} items | ${contentDiversity} | Layout: ${layout}`,
				media: media,
			};
		},
	},
};
