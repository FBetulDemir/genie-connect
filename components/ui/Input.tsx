import * as React from "react";
import { FormErrorText, FormField, FormHelpText, FormLabel } from "@/components/ui/Form";
import cn from "@/lib/classnames";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  description?: string;
  error?: string;
  containerClassName?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, description, error, containerClassName, className, id, name, ...props },
  ref,
) {
  const inputId = id ?? name;
  const describedByIds: string[] = [];
  if (description && inputId) describedByIds.push(`${inputId}-help`);
  if (error && inputId) describedByIds.push(`${inputId}-error`);

  return (
    <FormField className={containerClassName}>
      {label ? (
        <FormLabel htmlFor={inputId} className={cn(!inputId && "cursor-default")}>
          {label}
        </FormLabel>
      ) : null}

      <input
        ref={ref}
        id={inputId}
        name={name}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedByIds.length ? describedByIds.join(" ") : undefined}
        className={cn(
          "w-full rounded-lg border border-[var(--border-card-default)] bg-[var(--surface)] px-3 py-2",
          "text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]",
          "focus:outline-none focus:border-[var(--accent-blue-500)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-400 focus:border-red-400",
          className,
        )}
        {...props}
      />

      {description && inputId ? <FormHelpText id={`${inputId}-help`}>{description}</FormHelpText> : null}
      {error && inputId ? <FormErrorText id={`${inputId}-error`}>{error}</FormErrorText> : null}
      {description && !inputId ? <FormHelpText>{description}</FormHelpText> : null}
      {error && !inputId ? <FormErrorText>{error}</FormErrorText> : null}
    </FormField>
  );
});

export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  description?: string;
  error?: string;
  containerClassName?: string;
};

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, description, error, containerClassName, className, id, name, rows = 4, ...props },
  ref,
) {
  const inputId = id ?? name;
  const describedByIds: string[] = [];
  if (description && inputId) describedByIds.push(`${inputId}-help`);
  if (error && inputId) describedByIds.push(`${inputId}-error`);

  return (
    <FormField className={containerClassName}>
      {label ? (
        <FormLabel htmlFor={inputId} className={cn(!inputId && "cursor-default")}>
          {label}
        </FormLabel>
      ) : null}

      <textarea
        ref={ref}
        id={inputId}
        name={name}
        rows={rows}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedByIds.length ? describedByIds.join(" ") : undefined}
        className={cn(
          "w-full rounded-lg border border-[var(--border-card-default)] bg-[var(--surface)] px-3 py-2",
          "text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]",
          "focus:outline-none focus:border-[var(--accent-blue-500)] resize-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-400 focus:border-red-400",
          className,
        )}
        {...props}
      />

      {description && inputId ? <FormHelpText id={`${inputId}-help`}>{description}</FormHelpText> : null}
      {error && inputId ? <FormErrorText id={`${inputId}-error`}>{error}</FormErrorText> : null}
      {description && !inputId ? <FormHelpText>{description}</FormHelpText> : null}
      {error && !inputId ? <FormErrorText>{error}</FormErrorText> : null}
    </FormField>
  );
});

export { Input, TextArea };
