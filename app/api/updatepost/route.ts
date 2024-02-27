"use server";
// Import the Sanity client configured for server-side usage
import { client } from "@/sanity/lib/client"; // Adjust the path as necessary
import type { NextApiRequest, NextApiResponse } from "next";

// The actual database update function using the imported Sanity client
export async function updatePostInDatabase({ postId, blockIndex, title }) {
	try {
		const result = await client
			.patch(postId) // Document ID to patch
			.set({ [`block[${blockIndex}].heading`]: title }) // Specify the path to update
			.commit(); // Perform the update operation
		return result;
	} catch (error) {
		// Create a detailed error message and throw a new error
		const errorMessage = `Failed to update post in database: ${error.message}`;
		throw new Error(errorMessage);
	}
}

// The API route handler
export async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		// Only allow POST requests; reject others with 405 Method Not Allowed
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
		return;
	}

	try {
		// Extract the necessary data from the request body
		const { postId, blockIndex, title } = req.body;

		// Validate the incoming data (optional but recommended)
		if (!postId || blockIndex === undefined || !title) {
			res.status(400).json({ message: "Missing required fields" });
			return;
		}

		// Update the post in the database
		const updatedPost = await updatePostInDatabase({
			postId,
			blockIndex,
			title,
		});

		// Respond with the updated post data
		res.status(200).json(updatedPost);
	} catch (error) {
		// Handle any errors that occur during the update
		res
			.status(500)
			.json({ message: "Failed to update the post", error: error.message });
	}
}
