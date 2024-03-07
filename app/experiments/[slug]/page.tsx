import Blocks from "@/components/blocks/Blocks";
import { BlockProps } from "@/components/blocks/types";
import { experimentSlugQuery } from "@/sanity/lib//queries";
import { sanityFetch } from "@/sanity/lib/client";
import { generateStaticSlugs } from "@/sanity/lib/generateStaticSlugs";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { ExperimentsPayload } from "@/types";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

type Props = {
	params: { slug: string };
};

export function generateStaticParams() {
	return generateStaticSlugs("experiments");
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const metadataBaseUrl =
		process.env.NEXT_PUBLIC_METADATA_BASE || "http://localhost:3000";
	const post = await sanityFetch<ExperimentsPayload>({
		query: experimentSlugQuery,
		tags: ["experiments"],
		qParams: { slug: params.slug },
	});
	//@ts-ignore
	const ogImage = urlForOpenGraphImage(post?.block?.[0]?.image);
	const metadataBase = new URL(metadataBaseUrl);

	return {
		title: post?.block?.[0]?.heading,
		description: post?.block?.[0]?.subheading || (await parent).description,
		openGraph: ogImage
			? {
					images: [ogImage, ...((await parent).openGraph?.images || [])],
			  }
			: {},
		metadataBase,
	};
}
export default async function PageSlugRoute({ params }) {
	const currentPost = await sanityFetch<ExperimentsPayload>({
		query: experimentSlugQuery,
		tags: ["experiments"],
		qParams: { slug: params.slug },
	});
	console.log(currentPost);

	const blocks = currentPost?.block || [];

	return (
		<>
			{currentPost && (
				<>
					<main>
						{blocks?.map((block) => (
							<Blocks block={block as BlockProps} />
						))}
					</main>
				</>
			)}
		</>
	);
}
