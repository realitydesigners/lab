import { sanityFetch } from "@/sanity/lib/client";
import { categoryQuery, postsQuery } from "@/sanity/lib/queries";
import ContentPage from "./PostsPage";
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

    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
            <ContentPage posts={posts} categories={categories} />
        </main>
    );
}
