"use server";

import { AddPostRequestBody } from "@/app/api/posts/route";
import generateSASToken, { containerName } from "@/lib/generateSASToken";
import { Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
import { BlobServiceClient } from "@azure/storage-blob";
import { currentUser } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export default async function createPostAction(formData: FormData) {
  const user = await currentUser();
  const postInput = formData.get("postInput") as string;
  const image = formData.get("image") as File;
  const video = formData.get("video") as File;
  let image_url = undefined;
  let video_url = undefined;

  if (!postInput) {
    throw new Error("Post input is required");
  }

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };

  try {
    const accountName = process.env.AZURE_STORAGE_NAME;

    if (!accountName) {
      throw new Error("Azure Storage Account name is missing in environment variables");
    }

    const sasToken = await generateSASToken();
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net?${sasToken}`
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Upload image if exists
    if (image && image.size > 0) {
      console.log("Uploading image to Azure Blob Storage...", image);
      const timestamp = new Date().getTime();
      const fileName = `${randomUUID()}_${timestamp}.png`;
      const blockBlobClient = containerClient.getBlockBlobClient(fileName);
      const imageBuffer = await image.arrayBuffer();
      const res = await blockBlobClient.uploadData(imageBuffer);
      image_url = res._response.request.url;
      console.log("Image uploaded successfully!", image_url);
    }

    // Upload video if exists
    if (video && video.size > 0) {
      console.log("Uploading video to Azure Blob Storage...", video);
      const timestamp = new Date().getTime();
      const fileName = `${randomUUID()}_${timestamp}.mp4`;
      const blockBlobClient = containerClient.getBlockBlobClient(fileName);
      const videoBuffer = await video.arrayBuffer();
      const res = await blockBlobClient.uploadData(videoBuffer);
      video_url = res._response.request.url;
      console.log("Video uploaded successfully!", video_url);
    }

    const body: AddPostRequestBody = {
      user: userDB,
      text: postInput,
      imageUrl: image_url,
      videoUrl: video_url,
    };

    await Post.create(body);

    revalidatePath("/");
  } catch (error) {
    console.error("Failed to create post", error);
    throw new Error("Failed to create post");
  }
}
