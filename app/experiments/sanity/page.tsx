import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import PostsPage from "./PostsPage";
import { PostsPayload } from "./types";

export default async function Page() {
	const posts: PostsPayload[] = await sanityFetch({
		query: postsQuery,
		tags: ["posts"],
	});

	return (
		<main className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
			<PostsPage posts={posts} />
		</main>
	);
}
