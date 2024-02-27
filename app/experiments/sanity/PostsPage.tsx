"use client";
import React, { useState } from "react";
import Navigation from "./Navigation";

import { CategoryPayload, PostsPayload } from "./types";

interface ContentPageProps {
    posts: PostsPayload[];
    category: CategoryPayload[];
}

const ContentPage: React.FC<ContentPageProps> = ({ posts, category }) => {
    const [selectedContentType, setSelectedContentType] = useState("");

    const onSelectContentType = (contentType: string) => {
        setSelectedContentType(contentType);
    };

    return (
        <main className="flex min-h-screen w-full flex-col items-center bg-black">
            <Navigation
                initialSelection={selectedContentType}
                contentTypes={[
                    "posts",
                    "category",
                    "videos",
                    "images",
                    "quotes",
                    "animations",
                ]}
                onSelectContentType={onSelectContentType}
            />
            {/* Conditional rendering based on selectedContentType */}
            {selectedContentType === "posts" && <PostTable posts={posts} />}
            {selectedContentType === "category" && (
                <CategoryTable category={category} />
            )}
        </main>
    );
};

export default ContentPage;

interface PostTableProps {
    posts: PostsPayload[];
}

const PostTable: React.FC<PostTableProps> = ({ posts }) => {
    const [selectedPost, setSelectedPost] = useState<PostsPayload | null>(null);

    return (
        <div className="flex h-full ">
            <div className="flex w-1/2 flex-col p-4">
                {posts.map((post) => (
                    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                    <div
                        key={post._id}
                        className="flex w-full cursor-pointer border-b border-gray-700 hover:bg-gray-700/50"
                        onClick={() => setSelectedPost(post)}
                    >
                        <div className="text-md p-2 font-bold uppercase tracking-wide text-gray-200">
                            {post.block?.[0]?.heading || "No Heading"}
                        </div>
                    </div>
                ))}
            </div>
            <div className=" flex w-1/2  flex-col p-6">
                {selectedPost && (
                    <div className="rounded-xl border border-gray-700 p-4">
                        <h2 className="text-4xl font-bold capitalize text-gray-200">
                            {selectedPost.block?.[0]?.heading}
                        </h2>
                        <p className="text-xl font-bold text-gray-400">
                            {selectedPost.block?.[0]?.subheading}
                        </p>
                    </div>
                )}
                {!selectedPost && (
                    <p className="w-1/2 text-gray-400">Select a post</p>
                )}
            </div>
        </div>
    );
};

interface CategoryTableProps {
    category: CategoryPayload[];
}

const CategoryTable: React.FC<CategoryTableProps> = ({ category }) => {
    const [selectedPost, setSelectedPost] = useState<CategoryPayload | null>(
        null,
    );

    return (
        <div className="flex h-full">
            <div className="w-1/2 overflow-auto">
                <div className="flex flex-col p-4">
                    {category.map((category) => (
                        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                        <div
                            key={category._id}
                            className="flex w-full cursor-pointer border-b border-gray-700 hover:bg-gray-700/50"
                            onClick={() => setSelectedPost(category)}
                        >
                            <div className="text-md p-2 font-bold uppercase tracking-wide text-gray-200">
                                {category.title || "No Heading"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-1/2 flex-col p-6">
                {selectedPost && (
                    <div className="rounded-xl border border-gray-700 p-4">
                        <h2 className="text-4xl font-bold capitalize text-gray-200">
                            {selectedPost.title || "No Heading"}
                        </h2>
                    </div>
                )}
                {!selectedPost && (
                    <p className="text-gray-400">Select a category</p>
                )}
            </div>
        </div>
    );
};
