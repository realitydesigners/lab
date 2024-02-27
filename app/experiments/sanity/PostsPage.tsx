"use client";
// ContentPage.tsx
import React, { useState } from "react";
import Navigation from "./Navigation";
import PostTable from "./PostTable";
import { PostsPayload } from "./types";

interface ContentPageProps {
	posts: PostsPayload[];
}

const ContentPage: React.FC<ContentPageProps> = ({ posts }) => {
	const [selectedContentType, setSelectedContentType] = useState("");

	const onSelectContentType = (contentType: string) => {
		setSelectedContentType(contentType);
	};

	return (
		<main className="flex min-h-screen w-full flex-col items-center bg-black">
			<Navigation
				initialSelection={selectedContentType}
				contentTypes={["posts", "videos", "images", "quotes", "animations"]}
				onSelectContentType={onSelectContentType}
			/>
			{/* Conditional rendering based on selectedContentType */}
			{selectedContentType === "posts" && <PostTable posts={posts} />}
			{/* {selectedContentType === "videos" && (
                <VideoComponent videos={videos} />
            )}
            {selectedContentType === "images" && (
                <ImageGallery images={images} />
            )}
            {selectedContentType === "quotes" && <QuoteList quotes={quotes} />}
            {selectedContentType === "animations" && (
                <AnimationViewer animations={animations} />
            )} */}
			Add more conditions as needed
		</main>
	);
};

export default ContentPage;
