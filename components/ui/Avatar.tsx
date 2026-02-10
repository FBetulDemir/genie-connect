import * as React from "react";
import cn from "@/lib/classnames";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  emoji?: string;
  size?: AvatarSize;
  initials?: string;
  status?: "online" | "offline" | "away";
}

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
}

const AVATAR_OPTIONS = [
  "👤", // person
  "😺", // cat
  "😸", // grinning cat
  "😹", // cat with tears
  "😻", // heart cat
  "😼", // cat with mouth
  "😽", // kissing cat
  "🙀", // weary cat
  "😿", // crying cat
  "😾", // pouting cat
  "🐱", // cat face
  "👨", // man
  "👩", // woman
  "👦", // boy
  "👧", // girl
  "🧑", // person
  "👱", // blonde person
  "👨‍🦰", // man red hair
  "👨‍🦱", // man curly hair
  "👰", // bride
  "🤴", // prince
  "👸", // princess
];

const getSizeClasses = (size: AvatarSize): string => {
  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };
  return sizes[size];
};

function Avatar({
  emoji,
  size = "md",
  initials,
  status,
  className,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full",
        "bg-[var(--surface)] border border-[var(--border-card-default)]",
        "text-[var(--text-primary)] font-semibold",
        getSizeClasses(size),
        className,
      )}
      {...props}>
      {emoji ? (
        <span className="text-center">{emoji}</span>
      ) : initials ? (
        <span className="text-center">{initials.toUpperCase()}</span>
      ) : (
        <span className="text-center">👤</span>
      )}

      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[var(--surface)]",
            status === "online" && "bg-green-500",
            status === "offline" && "bg-gray-500",
            status === "away" && "bg-yellow-500",
          )}
        />
      )}
    </div>
  );
}

function AvatarGroup({ children, max = 3, className, ...props }: AvatarGroupProps) {
  const childArray = React.Children.toArray(children);
  const displayChildren = childArray.slice(0, max);
  const remaining = childArray.length - max;

  return (
    <div className={cn("flex -space-x-2", className)} {...props}>
      {displayChildren}
      {remaining > 0 && (
        <div
          className={cn(
            "inline-flex items-center justify-center rounded-full",
            "bg-[var(--surface)] border border-[var(--border-card-default)]",
            "text-[var(--text-secondary)] font-semibold text-sm",
            "w-10 h-10",
          )}>
          +{remaining}
        </div>
      )}
    </div>
  );
}

interface AvatarPickerProps {
  onSelect: (emoji: string) => void;
  selected?: string;
}

function AvatarPicker({ onSelect, selected }: AvatarPickerProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-[var(--text-primary)]">
        Choose Your Avatar
      </p>
      <div className="grid grid-cols-6 gap-3">
        {AVATAR_OPTIONS.map((emoji, index) => (
          <button
            key={index}
            onClick={() => onSelect(emoji)}
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-lg",
              "transition-colors border-2",
              selected === emoji
                ? "border-[var(--accent-blue-500)] bg-[var(--accent-blue-200)]"
                : "border-[var(--border-card-default)] bg-[var(--surface)] hover:bg-[var(--surface-muted)]",
            )}>
            <span className="text-2xl">{emoji}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export { Avatar, AvatarGroup, AvatarPicker, AVATAR_OPTIONS };
