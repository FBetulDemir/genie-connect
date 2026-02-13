import React from "react";
import cn from "@/lib/classnames";
import Navbar from "./Navbar";

import { CreatePostData } from "./CreatePost";

type AppShellProps = {
  nickname?: string;
  avatarEmoji?: string;
  onPublished?: (post: CreatePostData) => void;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
};

const AppShell = ({
  nickname,
  avatarEmoji,
  onPublished,
  children,
  sidebar,
  className,
}: AppShellProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Navbar
        nickname={nickname}
        avatarEmoji={avatarEmoji}
        onPublished={onPublished}
      />

      <div
        className={cn(
          "mx-auto flex w-full max-w-7xl flex-1 gap-6 px-6 py-6",
          className,
        )}>
        {/* Main content */}
        <main className="flex-1 space-y-6">{children}</main>

        {/* Sidebar */}
        {sidebar && (
          <aside className="hidden w-80 shrink-0 space-y-6 lg:block">
            {sidebar}
          </aside>
        )}
      </div>
    </div>
  );
};

export default AppShell;
