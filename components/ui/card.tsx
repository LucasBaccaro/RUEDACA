import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  // Base styles
  "rounded-2xl transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-white border border-[hsl(var(--border))] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)]",
        elevated:
          "bg-white shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-large)] hover:-translate-y-1",
        static: "bg-white shadow-[var(--shadow-soft)]",
        glass:
          "bg-white/70 backdrop-blur-md border border-[hsl(var(--border)_/_0.5)]",
        gradient:
          "bg-gradient-to-br from-[hsl(var(--primary)_/_0.1)] to-[hsl(var(--accent)_/_0.1)] border border-[hsl(var(--border))]",
        soft: "bg-[hsl(var(--soft-bg))] border border-[hsl(var(--border))]",
        "3d": "bg-white border border-[hsl(var(--border))] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-large)] card-3d",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        className={cn(cardVariants({ variant, padding, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

// Card sub-components for better composition
const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
));

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-bold tracking-tight", className)}
    {...props}
  />
));

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[hsl(var(--muted-foreground))]", className)}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-4", className)} {...props} />
));

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));

CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};
