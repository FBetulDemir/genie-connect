import React from "react";
import cn from "@/lib/classnames";
import LogoIcon from "../icons/LogoIcon";
import { Avatar } from "./Avatar";
import CreatePost from "./CreatePost";

type NavbarProps = {
  nickname?: string;
  avatarEmoji?: string;
  onPublish?: (post: { content: string; hashtag: string }) => void;
  className?: string;
};

const Navbar = ({
  nickname = "NickName",
  avatarEmoji,
  onPublish,
  className,
}: NavbarProps) => {
  return (
    <nav
      className={cn(
        "flex items-center justify-between px-6 py-3",
        "bg-[var(--surface-muted)] border-b border-[var(--border-card-default)]",
        className,
      )}>
      {/* Left: logo + text */}
      <div className="flex items-center gap-3">
        <LogoIcon className="h-9 w-9" />
        <div>
          <p className="text-sm font-semibold text-[var(--accent-blue-500)]">
            GENIE Connect
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Building Gender Equality in Academia
          </p>
        </div>
      </div>

      {/* Right: avatar + new post */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar emoji={avatarEmoji} size="sm" />
          <span className="text-sm text-[var(--text-primary)]">{nickname}</span>
        </div>
        <CreatePost onPublish={onPublish} />
      </div>
    </nav>
  );
};

export default Navbar;
