import { theme } from "https://themer.sanity.build/api/hues?default=darkest:000000&primary=59595f;600;lightest:e3e3e3&transparent=7d838c";
import {
	contentBlock,
	fileBlock,
	headingBlock,
	headingSplineBlock,
	imageCanvasBlock,
	splineBlock,
	teamBlock,
} from "@/sanity/blocks/experiments/index";
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import {
	category,
	img,
	model,
	posts,
	quote,
	team,
	video,
} from "@/sanity/schemas";

import { experiment, spline, tags } from "@/sanity/lab/index";
import CustomItem from "@/sanity/ui/CustomItem";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { contentGraphView } from "sanity-plugin-graph-view";
import { media } from "sanity-plugin-media";
import { vercelDeployTool } from "sanity-plugin-vercel-deploy";
import { deskTool } from "sanity/desk";

import CustomField from "./sanity/ui/CustomField";

const title =
	process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "Reality Designers";

export default defineConfig({
	theme,
	basePath: studioUrl,
	projectId: projectId || "",
	dataset: dataset || "",
	title,

	schema: {
		types: [
			// Blog
			posts,
			team,
			img,
			video,
			quote,
			category,
			model,

			// Blog Blocks
			headingBlock,
			headingSplineBlock,
			teamBlock,
			fileBlock,
			contentBlock,
			imageCanvasBlock,

			// Lab
			experiment,
			tags,
			spline,

			// Lab Blocks
			splineBlock,
		],
	},
	form: {
		components: {
			item: CustomItem,
			field: CustomField,
		},
	},
	plugins: [
		deskTool({}),

		visionTool({ defaultApiVersion: apiVersion }),

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		media() as any,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		vercelDeployTool() as any,
	],
});
