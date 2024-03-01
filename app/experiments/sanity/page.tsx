import { sanityFetch } from "@/sanity/lib/client";
import { categoryQuery, postsQuery, videosQuery } from "@/sanity/lib/queries";
import ContentPage from "./ContentPage";
import { CategoryPayload, PostsPayload, VideoPayload } from "./types";

export default async function Page() {
	const posts: PostsPayload[] = await sanityFetch({
		query: postsQuery,
		tags: ["posts"],
	});

	const categories: CategoryPayload[] = await sanityFetch({
		query: categoryQuery,
		tags: ["category"],
	});

	const videos: VideoPayload[] = await sanityFetch({
		query: videosQuery,
		tags: ["videos"],
	});

	return <ContentPage posts={posts} categories={categories} videos={videos} />;
}
