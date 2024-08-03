"use client";

import createPostAction from "@/actions/createPostAction";
import { useUser } from "@clerk/nextjs";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ImageIcon, VideoIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

function PostForm() {
  const ref = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { user, isSignedIn, isLoaded } = useUser();

  const handlePostAction = async (formData: FormData): Promise<void> => {
    ref.current?.reset();

    const text = formData.get("postInput") as string;

    if (!text) {
      throw new Error("You must provide a post input");
    }

    setPreview(null);

    try {
      await createPostAction(formData);
      toast.success("Post created!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error creating post: ${error.message}`);
      } else {
        toast.error(`Error creating post: ${String(error)}`);
      }
    }
  };

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith("video/");
      setPreview(URL.createObjectURL(file));

      if (isVideo && file.size > 100 * 1024 * 1024) { // 100 MB limit
        setPreview(null);
        toast.error("Video size exceeds 100MB limit");
        return;
      }
    }
  };

  return (
    <div className="mb-2">
      <form
        ref={ref}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(ref.current!);
          handlePostAction(formData);
        }}
        className="p-3 bg-white rounded-lg border"
      >
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <input
            type="text"
            name="postInput"
            placeholder="Start writing a post..."
            className="flex-1 outline-none rounded-full py-3 px-4 border"
          />

          {/* Input file selector for images */}
          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            hidden
            onChange={handleInputChange}
          />

          {/* Input file selector for videos */}
          <input
            ref={videoInputRef}
            type="file"
            name="video"
            accept="video/*"
            hidden
            onChange={handleInputChange}
          />

          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            variant={preview ? "secondary" : "outline"}
          >
            <Image src="/addimage.png" alt="" width={20} height={20} />
            {preview ? "Change" : "Add"} image
          </Button>

          <Button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            variant={preview ? "secondary" : "outline"}
          >
            
            <Image src="/addVideo.png" alt="" width={20} height={20} />
            {preview ? "Change" : "Add"} Video
            
          </Button>
        </div>

        {preview && (
          <div className="mt-2">
            <video
              src={preview}
              controls
              className="w-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        <div className="flex justify-end mt-2">
          {preview && (
            <Button
              type="button"
              onClick={() => setPreview(null)}
              variant="outline"
              className="ml-2"
            >
              <XIcon className="mr-2" size={16} color="currentColor" />
              Remove
            </Button>
          )}
        </div>
      </form>

      <hr className="mt-2 border-gray-300" />
    </div>
  );
}

export default PostForm;
