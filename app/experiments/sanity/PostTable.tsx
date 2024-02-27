"use client";
import React, { useState } from "react";
import { PostsPayload } from "./types";

interface PostTableProps {
	posts: PostsPayload[];
}

const PostTable: React.FC<PostTableProps> = ({ posts }) => {
	const [selectedPost, setSelectedPost] = useState<PostsPayload | null>(null);

	return (
		<div className="flex h-full">
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
								{post.block?.[0]?.heading || "No Heading"}
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="w-1/2 flex-col p-6">
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
					<p className="text-gray-400">Select a post to see its details.</p>
				)}
			</div>
		</div>
	);
};

export default PostTable;
