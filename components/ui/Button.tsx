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
    "inline-flex items-center justify-center rounded-lg",
    "gap-2 font-medium",
    "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "ring-offset-background",

    // sizes
    size === "sm" && "h-8 px-3 text-sm",
    size === "md" && "h-10 px-4 text-base",
    size === "lg" && "h-12 px-6 text-lg",
    size === "icon" && "h-10 w-10 p-0",

    // variants
    variant === "primary" &&
      "bg-blue-600 text-white hover:opacity-90 focus-visible:ring-blue-500",
    variant === "secondary" &&
      "bg-gray-600 text-white hover:opacity-90 focus-visible:ring-gray-500",
    variant === "outline" &&
      "border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 focus-visible:ring-blue-500",
    variant === "ghost" &&
      "text-blue-400 hover:bg-blue-500/10 focus-visible:ring-blue-500",
    variant === "link" &&
      "text-blue-400 underline-offset-4 hover:underline h-auto p-0 focus-visible:ring-0",
    variant === "tag" &&
      "border border-blue-500 text-blue-400 rounded-full hover:bg-blue-500/20 focus-visible:ring-blue-500",
    variant === "interaction" &&
      "bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 focus-visible:ring-gray-500",

    // disabled
    isDisabled && "cursor-not-allowed opacity-50 hover:opacity-50",

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

    return React.cloneElement(child as React.ReactElement, {
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
