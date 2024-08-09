"use server";

import redditApiClient from "@/lib/reddit-api-client";

export const removePost = async (postId: string): Promise<void> => {
  // await redditApiClient.remove(postId);
  console.log("Removed post", postId);
};

export const approvePost = async (postId: string): Promise<void> => {
  // await redditApiClient.approve(postId);
  console.log("Approved post", postId);
};
