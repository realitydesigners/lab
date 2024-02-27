import PostTable from "@/app/experiments/sanity/PostTable";
import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import { PostsPayload } from "./types";

export default async function PostsPage() {
    const posts: PostsPayload[] = await sanityFetch({
        query: postsQuery,
        tags: ["posts"],
    });

    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
            <PostTable posts={posts} />
        </main>
    );
}
