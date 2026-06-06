"use client";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <header className="border-b border-gray-800 bg-gray-950 px-4 sm:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-bold">X</span>
        </div>
        <span className="text-white font-semibold">XOrithm Status</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="hidden sm:block text-sm text-gray-400">
          {session?.user?.email}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800 cursor-pointer"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
