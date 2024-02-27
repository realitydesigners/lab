import {
	apiVersion,
	dataset,
	hookSecret,
	projectId,
	token,
} from "@/sanity/lib/api";

import {
	type ClientConfig,
	type QueryParams,
	createClient,
} from "@sanity/client";

const config: ClientConfig = {
	projectId,
	dataset,
	apiVersion,
	useCdn: hookSecret ? false : true,
	token,
};

export const client = createClient(config);

export async function sanityMutate<MutationResponse>({
	mutations,
}: {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	mutations: any[]; // Array of mutations as per the Sanity API
}): Promise<MutationResponse> {
	try {
		const response = await fetch(
			`https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ mutations }),
			},
		);

		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}

		const result = await response.json();
		console.log("Mutation successful:", result);
		return result;
	} catch (error) {
		console.error("Mutation failed:", error);
		throw error;
	}
}

// The API route handler for POST requests
export async function POST(req, res) {
	if (req.method !== "POST") {
		// Only allow POST requests; reject others with 405 Method Not Allowed
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
		return;
	}

	try {
		// Extract the necessary data from the request body
		const { mutations } = req.body;

		// Validate the incoming data (optional but recommended)
		if (!mutations || !Array.isArray(mutations)) {
			res.status(400).json({ message: "Invalid mutations data" });
			return;
		}

		// Update the post in the database
		const updatedPost = await sanityMutate({
			mutations,
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
