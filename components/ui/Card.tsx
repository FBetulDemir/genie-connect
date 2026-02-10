import * as React from "react";
import cn from "@/lib/classnames";

type CardVariant = "default" | "bordered" | "interactive";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
};

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

function Card({
  variant = "default",
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl transition-colors text-[var(--text-body)]",

        // variants
        variant === "default" &&
          "bg-[var(--surface-muted)] border border-[var(--border-card-default)]",
        variant === "bordered" &&
          "bg-[var(--surface-muted)] border border-[var(--border-card-strong)]",
        variant === "interactive" &&
          "bg-[var(--surface-muted)] border border-[var(--border-card-default)] hover:border-[var(--border-card-strong)] cursor-pointer",

        // padding
        padding === "none" && "p-0",
        padding === "sm" && "p-3",
        padding === "md" && "p-4",
        padding === "lg" && "p-6",

        className,
      )}
      {...props}>
      {children}
    </div>
  );
}

function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-1.5", className)} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-[var(--text-primary)]",
        className,
      )}
      {...props}>
      {children}
    </h3>
  );
}

function CardDescription({
  className,
  children,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={cn("text-sm text-[var(--text-secondary)]", className)}
      {...props}>
      {children}
    </p>
  );
}

function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn("pt-0", className)} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div className={cn("flex items-center pt-4", className)} {...props}>
      {children}
    </div>
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
