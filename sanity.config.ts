import {
	contentBlock,
	headingBlock,
	headingSplineBlock,
	imageCanvasBlock,
	teamBlock,
} from "@/sanity/blocks/experiments/index";
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import {
	audio,
	category,
	experiment,
	img,
	model,
	posts,
	quote,
	tags,
	team,
	video,
} from "@/sanity/schemas";
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
	basePath: studioUrl,
	projectId: projectId || "",
	dataset: dataset || "",
	title,

	schema: {
		types: [
			posts,
			img,
			audio,
			video,
			quote,
			team,
			category,
			experiment,
			model,
			tags,
			headingBlock,
			headingSplineBlock,
			contentBlock,
			teamBlock,
			imageCanvasBlock,
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
