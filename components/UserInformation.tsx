import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IPostDocument } from "@/mongodb/models/post";
import { Button } from "./ui/button";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { Rss } from "lucide-react";

async function UserInformation({ posts }: { posts: IPostDocument[] }) {
  const user = await currentUser();

  const firstName = user?.firstName ?? '';
  const lastName = user?.lastName ?? '';
  const imageUrl = user?.imageUrl ?? '';
  const userId = user?.id ?? '';

  const userPosts = posts?.filter((post) => post.user.userId === userId) ?? [];
  const userComments = posts?.flatMap(
    (post) =>
      post?.comments?.filter((comment) => comment.user.userId === userId) || []
  ) ?? [];

  return (
    <div className="flex flex-col justify-center items-center bg-white mr-6 rounded-lg border py-4">
      <div className="relative h-16 w-16 mb-5">
        <Avatar className="h-16 w-16 mb-5">
          <AvatarImage src={imageUrl || "https://github.com/shadcn.png"} />
          <AvatarFallback>
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
      <SignedIn>
        <div className="text-center">
          <p className="font-semibold">
            {firstName} {lastName}
          </p>
          <p className="text-xs">
            @{firstName}
            {lastName}-{userId.slice(-4)}
          </p>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="text-center space-y-2">
          <p className="font-semibold">You are not signed in</p>
          <Button asChild className="bg-[#0B63C4] text-white">
            <SignInButton>Sign in</SignInButton>
          </Button>
        </div>
      </SignedOut>
      <hr className="w-full border-gray-200 my-5" />
      <div className="flex justify-between w-full px-4 text-sm">
        <p className="font-semibold text-gray-400">Posts</p>
        <p className="text-blue-400">{userPosts.length}</p>
      </div>
      <div className="flex justify-between w-full px-4 text-sm">
        <p className="font-semibold text-gray-400">Comments</p>
        <p className="text-blue-400">{userComments.length}</p>
      </div>
      <hr className="w-full border-gray-200 my-5" />
      <div className="flex flex-col space-y-2">
        <Link
          href="/profile"
          className="font-semibold flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/profile.png" alt="B-Links" width={20} height={20} />
          <span>Profile</span>
        </Link>
        <Link
          href="/My  B-Links"
          className="font-semibold flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/group.png" alt="B-Links" width={20} height={20} />
          <span>My B-Links</span>
        </Link>
        <Link
          href="/bookmarks"
          className="font-semibold flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/bookmarks.png" alt="bookmarks" width={20} height={20} />
          <span>Bookmarks</span>
        </Link>
        <Link
          href="/settings"
          className="font-semibold flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/settings.png" alt="Settings" width={20} height={20} />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}

export default UserInformation;
