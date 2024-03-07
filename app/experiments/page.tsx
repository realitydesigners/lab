import ExperimentsList from "@/app/experiments/[slug]/ExperimentList";
import { sanityFetch } from "@/sanity/lib/client";
import { experimentQuery } from "@/sanity/lib/queries";
import { ExperimentsPayload } from "@/types";

export default async function PostsPage() {
    const experiments: ExperimentsPayload[] = await sanityFetch({
        query: experimentQuery,
        tags: ["posts"],
    });

    const postsListData = experiments.slice(0, 30);

    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
            <ExperimentsList post={postsListData} />
        </main>
    );
}
