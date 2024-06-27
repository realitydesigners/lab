"use client";
import { monomaniac, play } from "@/app/fonts";
import { SanityImage } from "@/components/global/Images";
import { BlockItem, PostsPayload } from "@/types";
import Link from "next/link";
import { FC } from "react";

interface PostItemProps {
	block: BlockItem;
	slug?: {
		current?: string;
	};
}

interface PostsListProps {
	post: PostsPayload[];
	slug?: {
		current?: string;
	};
}

export const Item: FC<PostItemProps> = ({ block, slug }) => {
	const { image, heading, subheading, publicationDate } = block;

	const renderHeading = () => {
		return heading || "no title";
	};

	return (
		<div className="group flex h-auto w-full flex-col overflow-hidden rounded-lg border border-gray-700/50 bg-black bg-opacity-90 from-black to-gray-700/20 p-4 shadow-lg transition duration-300 ease-in-out hover:bg-gradient-to-r">
			<Link href={`/experiments/${slug?.current}`} className="p-2">
				<h2 className="text-4xl font-bold capitalize leading-tight tracking-wide text-gray-300 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:pl-6 group-hover:text-white">
					{renderHeading()}
				</h2>
			</Link>
		</div>
	);
};

const ExperimentsList: FC<PostsListProps> = ({ post }) => {
	if (!post) {
		return <div>No posts available</div>;
	}

	return (
		<div className="custom-scrollbar fixed bottom-16 left-2 right-2 top-2 overflow-auto rounded-md bg-black bg-opacity-80 p-4 shadow-2xl shadow-inner backdrop-blur-md md:bottom-16 md:left-20 md:right-20 md:top-10 lg:p-6">
			<div className="grid grid-cols-1 gap-4">
				{post.map((postItem, index) =>
					postItem.block?.map((block, index2) =>
						block.heading && block.image ? (
							<Item
								key={`${postItem.slug?.current}-${index}-${index2}`}
								block={block}
								slug={postItem.slug}
							/>
						) : null,
					),
				)}
			</div>
		</div>
	);
};

export default ExperimentsList;
