"use client";

import { useState } from "react";
import cn from "@/lib/classnames";
import { Avatar, AvatarPicker } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import EditIcon from "@/components/icons/EditIcon";

type ProfileCardProps = {
  nickname: string;
  avatarEmoji?: string;
  onSave?: (data: { nickname: string; avatarEmoji: string }) => void;
  className?: string;
};

export default function ProfileCard({
  nickname: initialNickname,
  avatarEmoji: initialEmoji = "👤",
  onSave,
  className,
}: ProfileCardProps) {
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState(initialNickname);
  const [emoji, setEmoji] = useState(initialEmoji);

  const handleSave = () => {
    if (!nickname.trim()) return;
    onSave?.({ nickname: nickname.trim(), avatarEmoji: emoji });
    setEditing(false);
  };

  if (editing) {
    return (
      <div
        className={cn(
          "rounded-xl border border-[var(--border-card-default)] bg-[var(--surface-muted)] p-6 space-y-4",
          className,
        )}>
        <h3 className="text-base font-semibold text-[var(--text-primary)]">
          Edit Profile
        </h3>
        <AvatarPicker selected={emoji} onSelect={setEmoji} />
        <Input
          name="nickname"
          label="Nickname"
          placeholder="Choose a nickname..."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={!nickname.trim()}
            onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--border-card-default)] bg-[var(--surface-muted)] p-6",
        className,
      )}>
      <div className="flex items-center gap-4">
        <Avatar emoji={emoji} size="lg" />
        <div className="flex-1">
          <p className="text-base font-semibold text-[var(--text-primary)]">
            {nickname}
          </p>
          <p className="text-xs text-[var(--text-muted)]">Anonymous user</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setEditing(true)}
          aria-label="Edit profile">
          <EditIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
