import React from "react";
import cn from "@/lib/classnames";

type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

const PageTitle = ({ className, children }: TitleProps) => {
  return (
    <h1
      className={cn(
        "text-[length:var(--title-size-xl)] text-[var(--color-text-primary)] leading-[var(--line-height-xl)] font-[var(--font-weight-semibold)]",
        className
      )}>
      {children}
    </h1>
  );
};

const SectionTitle = ({ className, children }: TitleProps) => {
  return (
    <h2
      className={cn(
        "text-[length:var(--title-size-lg)] text-[var(--color-text-primary)] leading-[var(--line-height-lg)] font-[var(--font-weight-semibold)]",
        className
      )}>
      {children}
    </h2>
  );
};

const SubTitle = ({ className, children }: TitleProps) => {
  return (
    <h3
      className={cn(
        "text-[length:var(--text-body-size)] text-[var(--color-text-primary)] leading-[var(--line-height-md)] font-[var(--font-weight-semibold)]",
        className
      )}>
      {children}
    </h3>
  );
};

const SmallTitle = ({ className, children }: TitleProps) => {
  return (
    <h4
      className={cn(
        "text-[length:var(--text-size-sm)] text-[var(--color-text-primary)] leading-[var(--line-height-sm)] font-[var(--font-weight-semibold)]",
        className
      )}>
      {children}
    </h4>
  );
};

type TextProps = {
  children: React.ReactNode;
  className?: string;
};

const BodyText = ({ className, children }: TextProps) => {
  return (
    <p
      className={cn(
        "text-[length:var(--text-body-size)] text-[var(--color-text-body)] leading-[var(--text-body-line-height)]",
        className
      )}>
      {children}
    </p>
  );
};

const SmallText = ({ className, children }: TextProps) => {
  return (
    <p
      className={cn(
        "text-[length:var(--text-size-sm)] text-[var(--color-text-body)] leading-[var(--line-height-sm)]",
        className
      )}>
      {children}
    </p>
  );
};

type LabelProps = {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
};

const Label = ({ className, children, htmlFor }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-[length:var(--text-size-sm)] text-[var(--color-text-secondary)] leading-[var(--line-height-sm)] font-[var(--font-weight-medium)]",
        className
      )}>
      {children}
    </label>
  );
};

export { PageTitle, SectionTitle, SubTitle, SmallTitle, BodyText, SmallText, Label };
