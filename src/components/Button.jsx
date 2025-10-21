import React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(
  (
    {
      className,
      variant = "contained",
      color = "default",
      size = "default",
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const sizes = {
      sm: "h-8 px-3 rounded-md text-sm",
      md: "h-9 px-4 rounded-md text-sm",
      lg: "h-11 px-6 rounded-md text-base",
      xl: "h-12 px-8 rounded-lg text-lg",
      default: "h-9 px-4 rounded-md text-sm",
    };

    const colorVariants = {
      primary: {
        contained:
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm",
        outlined:
          "border border-blue-600 bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
        text: "bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
      },
      success: {
        contained:
          "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm",
        outlined:
          "border border-green-600 bg-transparent text-green-600 hover:bg-green-50 focus:ring-green-500",
        text: "bg-transparent text-green-600 hover:bg-green-50 focus:ring-green-500",
      },
      error: {
        contained:
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm",
        outlined:
          "border border-red-600 bg-transparent text-red-600 hover:bg-red-50 focus:ring-red-500",
        text: "bg-transparent text-red-600 hover:bg-red-50 focus:ring-red-500",
      },
      default: {
        contained:
          "border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring-gray-300 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:focus:ring-gray-600",
        outlined:
          "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-500",
        text:
          "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-500",
      }
      
      
    };

    const colorStyles =
      colorVariants[color]?.[variant] || colorVariants.default.contained;
    const sizeStyles = sizes[size];

    return (
      <button
        ref={ref}
        type={props.type || "button"}
        className={cn(
          baseStyles,
          colorStyles,
          sizeStyles,
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
