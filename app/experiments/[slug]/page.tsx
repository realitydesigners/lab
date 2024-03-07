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

export default async function PageSlugRoute({ params }) {
    const currentExperiment = await sanityFetch<ExperimentsPayload>({
        query: experimentSlugQuery,
        tags: ["experiments"],
        qParams: { slug: params.slug },
    });
    console.log(currentExperiment);

    const blocks = currentExperiment?.block || [];

    return (
        <>
            {currentExperiment && (
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
