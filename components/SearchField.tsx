 "use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchField() {
  const router = useRouter();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <div className="relative">
        <div
          className={`flex items-center bg-gray-100 p-2 rounded-md transition-all duration-300 ease-in-out ${
            isSearchExpanded ? "flex-1 max-w-full" : "w-10"
          }`}
        >
          <SearchIcon
            className="h-4 text-gray-600 cursor-pointer"
            onClick={() => setIsSearchExpanded(true)}
          />
          <input
            name="q"
            type="text"
            placeholder="Search iBLink"
            className={`bg-transparent outline-none transition-all duration-300 ease-in-out ${
              isSearchExpanded ? "flex-1" : "w-0"
            }`}
            onBlur={() => setIsSearchExpanded(false)}
          />
        </div>
      </div>
    </form>
  );
}
