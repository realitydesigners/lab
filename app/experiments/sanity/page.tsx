import { sanityFetch } from "@/sanity/lib/client";
import { categoryQuery, postsQuery } from "@/sanity/lib/queries";
import ContentPage from "./ContentPage";
import { CategoryPayload, PostsPayload } from "./types";

export default async function Page() {
	const posts: PostsPayload[] = await sanityFetch({
		query: postsQuery,
		tags: ["posts"],
	});

	const categories: CategoryPayload[] = await sanityFetch({
		query: categoryQuery,
		tags: ["category"],
	});

	// console.log(posts, categories);

	return <ContentPage posts={posts} categories={categories} />;
}
