import React from "react";
import cn from "@/lib/classnames";

type FormFieldProps = {
  children: React.ReactNode;
  className?: string;
};

const FormField = ({ children, className }: FormFieldProps) => {
  return <div className={cn("space-y-1.5", className)}>{children}</div>;
};

type FormLabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
};

const FormLabel = ({ children, htmlFor, className }: FormLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-sm font-medium text-[var(--text-primary)]",
        className,
      )}>
      {children}
    </label>
  );
};

type FormTextProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
};

const FormHelpText = ({ children, id, className }: FormTextProps) => {
  return (
    <p id={id} className={cn("text-xs text-[var(--text-muted)]", className)}>
      {children}
    </p>
  );
};

const FormErrorText = ({ children, id, className }: FormTextProps) => {
  return (
    <p id={id} className={cn("text-xs text-red-400", className)}>
      {children}
    </p>
  );
};

export { FormField, FormLabel, FormHelpText, FormErrorText };
