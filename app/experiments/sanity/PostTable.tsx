"use client";
import React, { useState } from "react";
import { PostsPayload } from "./types"; // Ensure this path is correct

interface PostTableProps {
    posts: PostsPayload[];
}

const PostTable: React.FC<PostTableProps> = ({ posts }) => {
    const [showPosts, setShowPosts] = useState(false);
    const [selectedPost, setSelectedPost] = useState<PostsPayload | null>(null);

    return (
        <div className="flex h-full flex-col">
            <div className="p-4">
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button
                    onClick={() => setShowPosts(!showPosts)}
                    className="hover:bg-gray/700/50 rounded bg-gray-600/50 px-4 py-2 font-bold text-white"
                >
                    {showPosts ? "Hide Posts" : "Show Posts"}
                </button>
            </div>

            {showPosts && (
                <div className="flex flex-1">
                    {/* Left panel for listing posts */}
                    <div className="w-1/2 overflow-auto">
                        <div className="flex flex-col p-4">
                            {posts.map((post) => (
                                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                                <div
                                    key={post._id}
                                    className="flex w-full cursor-pointer border-b border-gray-700 hover:bg-gray-700/50"
                                    onClick={() => setSelectedPost(post)}
                                >
                                    <div className="text-md p-2 font-bold uppercase tracking-wide text-gray-200">
                                        {post.block?.[0]?.heading ||
                                            "No Heading"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Right panel for showing selected post details */}
                    <div className="w-1/2 flex-col p-6">
                        {selectedPost && (
                            <div className="rounded-xl border border-gray-700 p-4">
                                <h2 className="text-3xl font-bold capitalize text-gray-200">
                                    {selectedPost.block?.[0]?.heading}
                                </h2>
                                <p className="text-lg font-bold text-gray-400">
                                    {selectedPost.block?.[0]?.subheading}
                                </p>
                                {/* Add more content details from selectedPost here */}
                            </div>
                        )}
                        {!selectedPost && (
                            <p className="text-gray-400">
                                Select a post to see its details.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostTable;
