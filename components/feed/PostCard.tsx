import cn from "@/lib/classnames";
import { Avatar } from "@/components/ui/Avatar";
import IconButton from "@/components/ui/IconButton";
import HeartIcon from "@/components/icons/HeartIcon";
import CommentIcon from "@/components/icons/CommentIcon";
import LikeIcon from "@/components/icons/LikeIcon";
import Hashtag from "@/components/ui/Hashtag";

type PostCardProps = {
  id: string;
  avatarEmoji?: string;
  name: string;
  timeAgo: string;
  title: string;
  content: string;
  hashtags?: string[];
  likes?: number;
  commentCount?: number;
  helpful?: number;
  onClick?: () => void;
  onLike?: (id: string) => void;
  onHelpful?: (id: string) => void;
  className?: string;
};

export default function PostCard({
  id,
  avatarEmoji,
  name,
  timeAgo,
  title,
  content,
  hashtags,
  likes,
  commentCount,
  helpful,
  onClick,
  onLike,
  onHelpful,
  className,
}: PostCardProps) {
  const snippet =
    content.length > 150 ? content.slice(0, 150).trimEnd() + "..." : content;

  return (
    <article
      className={cn(
        "rounded-xl border border-[var(--border-card-default)] bg-[var(--surface-muted)] p-4",
        "transition-colors hover:border-[var(--border-card-strong)]",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Avatar emoji={avatarEmoji} size="sm" />
        <span className="text-sm font-medium text-[var(--text-primary)]">
          {name}
        </span>
        <span className="text-xs text-[var(--text-muted)]">
          &middot; {timeAgo}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">
        {title}
      </h3>

      {/* Snippet */}
      <p className="text-sm text-[var(--text-body)] mb-3">{snippet}</p>

      {/* Hashtags */}
      {hashtags && hashtags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {hashtags.map((tag) => (
            <Hashtag
              key={tag}
              size="sm"
              onClick={(e) => e.stopPropagation()}>
              {tag}
            </Hashtag>
          ))}
        </div>
      )}

      {/* Action bar */}
      <div
        className="flex items-center gap-4"
        onClick={(e) => e.stopPropagation()}>
        <IconButton
          icon={<HeartIcon />}
          aria-label="Like"
          count={likes}
          onClick={() => onLike?.(id)}
        />
        <IconButton
          icon={<CommentIcon />}
          aria-label="Comments"
          count={commentCount}
        />
        <IconButton
          icon={<LikeIcon />}
          aria-label="Helpful"
          count={helpful}
          label="helpful"
          onClick={() => onHelpful?.(id)}
        />
      </div>
    </article>
  );
}
