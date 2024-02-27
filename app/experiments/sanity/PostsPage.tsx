"use client";
import React, { useState } from "react";
import Navigation from "./Navigation";
import PostTable from "./PostTable";
import { PostsPayload } from "./types";

interface PostsPageProps {
	posts: PostsPayload[];
}

const PostsPage: React.FC<PostsPageProps> = ({ posts }) => {
	const [showPosts, setShowPosts] = useState(false);

	const togglePostsVisibility = () => {
		setShowPosts(!showPosts);
	};

	return (
		<main className="flex min-h-screen w-full flex-col items-center bg-black">
			<Navigation
				initialSelection="posts"
				togglePostsVisibility={togglePostsVisibility}
			/>
			{showPosts && <PostTable posts={posts} />}
		</main>
	);
};

export default PostsPage;
