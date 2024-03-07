import { sanityFetch } from "@/sanity/lib/client";
import {
    categoryQuery,
    experimentQuery,
    postsQuery,
    videosQuery,
} from "@/sanity/lib/queries";
import ContentPage from "./ContentPage";
import {
    CategoryPayload,
    ExperimentPayload,
    PostsPayload,
    VideoPayload,
} from "./types";

export default async function Page() {
    const posts: PostsPayload[] = await sanityFetch({
        query: postsQuery,
        tags: ["posts"],
    });
    console.log(posts);

    const categories: CategoryPayload[] = await sanityFetch({
        query: categoryQuery,
        tags: ["category"],
    });

    const videos: VideoPayload[] = await sanityFetch({
        query: videosQuery,
        tags: ["videos"],
    });

    const experiments: ExperimentPayload[] = await sanityFetch({
        query: experimentQuery,
        tags: ["experiments"],
    });

    const allQueries = { posts, categories, videos, experiments };

    return <ContentPage data={allQueries} />;
}
