import * as React from "react";
import cn from "@/lib/classnames";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "tag"
  | "interaction";
type ButtonSize = "sm" | "md" | "lg" | "icon";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  asChild?: boolean;
};

export default function Button({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  isLoading,
  asChild,
  disabled,
  className,
  children,
  ...props
}: Props) {
  const isDisabled = disabled || isLoading;
  const buttonClassName = cn(
    // base
    "inline-flex items-center justify-center rounded-[var(--button-radius)]",
    "gap-[var(--button-gap)] px-[var(--button-padding-x)] py-[var(--button-padding-y)]",
    "text-[var(--button-font-size)] leading-[var(--button-line-height)] font-[var(--button-font-weight)]",
    "cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "ring-offset-background",

    // sizes
    size === "sm" && "h-8 px-3 text-[var(--text-size-sm)]",
    size === "md" && "h-[var(--button-height-md)]",
    size === "lg" &&
      "h-[var(--button-height-lg)] px-[var(--button-padding-x-lg)] py-[var(--button-padding-y-lg)] text-[var(--button-font-size-lg)] leading-[var(--button-line-height-lg)]",
    size === "icon" && "h-10 w-10 p-0",

    // variants
    variant === "primary" &&
      "bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] hover:opacity-90 focus-visible:ring-[var(--button-primary-bg)]",
    variant === "secondary" &&
      "bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] border border-[var(--button-secondary-border)] hover:bg-black/5 focus-visible:ring-black/20",
    variant === "outline" &&
      "bg-transparent text-[var(--text-primary)] border border-[var(--border-card-strong)] hover:bg-black/5 focus-visible:ring-black/20",
    variant === "ghost" &&
      "bg-[var(--button-ghost-bg)] text-[var(--button-ghost-text)] border border-[var(--button-ghost-border)] hover:bg-black/5 focus-visible:ring-black/20",
    variant === "link" &&
      "text-[var(--text-secondary)] underline-offset-4 hover:underline h-auto p-0 focus-visible:ring-0",
    variant === "tag" &&
      "border border-[var(--border-card-strong)] text-[var(--text-secondary)] rounded-full hover:bg-black/5 focus-visible:ring-black/20",
    variant === "interaction" &&
      "bg-[var(--surface-muted)] border border-[var(--border-card-default)] text-[var(--text-body)] hover:bg-black/5 focus-visible:ring-black/20",

    // disabled
    isDisabled &&
      "cursor-not-allowed bg-[var(--button-disabled-bg)] text-[var(--button-disabled-text)] border-transparent hover:opacity-100",

    className,
  );

  const resolvedChildren =
    asChild && React.isValidElement(children)
      ? (children.props as { children?: React.ReactNode }).children
      : children;

  const inner = isLoading ? (
    <span className="inline-flex items-center gap-2">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      <span>{resolvedChildren}</span>
    </span>
  ) : (
    <>
      {leftIcon ? <span className="inline-flex">{leftIcon}</span> : null}
      <span>{resolvedChildren}</span>
      {rightIcon ? <span className="inline-flex">{rightIcon}</span> : null}
    </>
  );

  if (asChild) {
    const child = React.Children.only(children);
    if (!React.isValidElement(child)) return null;

    // Avoid passing button-only props to non-button elements (e.g. <a> via next/link).
    const { type: _type, ...restProps } = props;

    return React.cloneElement(child as React.ReactElement<any>, {
      className: cn((child as any).props?.className, buttonClassName),
      "aria-disabled": isDisabled || undefined,
      tabIndex: isDisabled ? -1 : (child as any).props?.tabIndex,
      ...restProps,
      children: inner,
    });
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={isDisabled}
      className={buttonClassName}
      {...props}>
      {inner}
    </button>
  );
}
