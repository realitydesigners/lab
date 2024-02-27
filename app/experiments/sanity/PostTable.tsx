"use client";
// import updatePost from "@/app/api/updatePost";
import React, { useState, useEffect } from "react";
import { PostsPayload } from "./types";

interface PostTableProps {
    posts: PostsPayload[];
}

const PostTable: React.FC<PostTableProps> = ({ posts }) => {
    const [selectedPost, setSelectedPost] = useState<PostsPayload | null>(null);
    const [editedTitle, setEditedTitle] = useState("");

    // Update the edited title state whenever a new post is selected
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (selectedPost) {
            setEditedTitle(selectedPost.block?.[0]?.heading || "");
        }
    }, [selectedPost]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        if (!selectedPost || selectedPost.block == null) return; // Ensure there is a selected post and it has a block

        const postId = selectedPost._id;
        const updatedTitle = editedTitle; // This value comes from your state

        // Assuming you're updating the first block for simplicity
        // You might want to pass a specific block index or identifier if updating a different block
        const blockIndex = 0; // or the index of the block you're updating

        try {
            // Adjust your API endpoint or payload as needed
            const response = await fetch("/api/updatepost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId,
                    blockIndex,
                    title: updatedTitle,
                }),
            });
            console.log("Response:", response);

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            console.log("Update successful:", result);

            // Update logic here as needed based on the response
            // This might involve updating local state to reflect the change
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    return (
        <div className="flex h-full">
            {/* Left panel for listing posts */}
            <div className="w-1/2 overflow-auto">
                <div className="flex flex-col p-4">
                    <div className="flex text-xs uppercase text-gray-200">
                        <div className="text-md p-2  font-bold uppercase text-gray-400">
                            Heading
                        </div>
                    </div>
                    <div>
                        {posts.map((post) => (
                            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                            <div
                                className="flex w-full cursor-pointer border-b border-gray-700 hover:bg-gray-700/50"
                                onClick={() => setSelectedPost(post)}
                            >
                                <div
                                    key={post._id}
                                    className=" text-md p-2 font-bold uppercase tracking-wide text-gray-200"
                                >
                                    {post.block?.[0]?.heading || "No Heading"}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Right panel for showing selected post details */}
            <div className="flex w-1/2 flex-col p-6">
                {selectedPost ? (
                    <>
                        <div className="rounded-xl border border-gray-700 p-4">
                            <h2 className="text-3xl font-bold capitalize text-gray-200">
                                {selectedPost.block?.[0]?.heading}
                            </h2>
                            <p className="text-lg font-bold text-gray-400">
                                {selectedPost.block?.[0]?.subheading}
                            </p>
                        </div>

                        <form className="bg-gray-200 " onSubmit={handleSubmit}>
                            <input
                                type="hidden"
                                name="postId"
                                value={selectedPost._id} // Make sure this correctly references the post ID
                            />
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                            />
                            <button type="submit">Save Changes</button>
                        </form>
                    </>
                ) : (
                    <p className="text-gray-400">
                        Select a post to see its details.
                    </p>
                )}
            </div>
        </div>
    );
};

export default PostTable;
