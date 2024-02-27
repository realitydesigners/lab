import { client } from "./client";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
type MutationResponse = {};

export async function sanityMutate<MutationResponse>({
	mutations,
}: {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	mutations: any[];
}): Promise<MutationResponse> {
	try {
		const response = await client.transaction(mutations).commit();
		return response as MutationResponse; // Adjust this line based on the actual response type
	} catch (error) {
		console.error("Mutation failed:", error);
		throw error;
	}
}
