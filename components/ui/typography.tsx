import { cn } from "@/lib/utils";
import { forwardRef, ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

// H1
export const H1 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn(
          "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
          className
        )}
      >
        {children}
      </h1>
    );
  }
);

H1.displayName = "H1";

// H2
export const H2 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
          className,
          "text-btv-blue mb-4"
        )}
      >
        {children}
      </h2>
    );
  }
);

H2.displayName = "H2";

// H3
export const H3 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          "scroll-m-20 text-2xl font-semibold tracking-tight",
          className
        )}
      >
        {children}
      </h3>
    );
  }
);

H3.displayName = "H3";

// Paragraph
export const Paragraph = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ children, className }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      >
        {children}
      </p>
    );
  }
);

Paragraph.displayName = "Paragraph";

// Subtitle
export const Subtitle = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ children, className }, ref) => {
    return (
      <p ref={ref} className={cn("text-xl text-muted-foreground", className)}>
        {children}
      </p>
    );
  }
);

Subtitle.displayName = "Subtitle";

// UL
export const UL = forwardRef<HTMLUListElement, TypographyProps>(
  ({ children, className }, ref) => {
    return (
      <ul
        ref={ref}
        className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
      >
        {children}
      </ul>
    );
  }
);

UL.displayName = "UL";

// OL
export const OL = forwardRef<HTMLOListElement, TypographyProps>(
  ({ children, className }, ref) => {
    return (
      <ol
        ref={ref}
        className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)}
      >
        {children}
      </ol>
    );
  }
);

OL.displayName = "OL";

// LI
export const LI = forwardRef<HTMLLIElement, TypographyProps>(
  ({ children, className }, ref) => {
    return (
      <li ref={ref} className={cn("mt-2", className)}>
        {children}
      </li>
    );
  }
);

LI.displayName = "LI";
