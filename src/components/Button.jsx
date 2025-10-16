import React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(({
  className,
  variant = "contained",
  color = "default",
  size = "default",
  fullWidth = false,
  children,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
  };

  const colorVariants = {
    primary: {
      contained: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm",
      outlined: "border border-blue-600 bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
      text: "bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    },
    success: {
      contained: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm",
      outlined: "border border-green-600 bg-transparent text-green-600 hover:bg-green-50 focus:ring-green-500",
      text: "bg-transparent text-green-600 hover:bg-green-50 focus:ring-green-500",
    },
    error: {
      contained: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm",
      outlined: "border border-red-600 bg-transparent text-red-600 hover:bg-red-50 focus:ring-red-500",
      text: "bg-transparent text-red-600 hover:bg-red-50 focus:ring-red-500",
    },
    default: {
      contained: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400 shadow-sm",
      outlined: "border border-gray-300 bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-400",
      text: "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-400",
    },
  };

  const colorStyles = colorVariants[color]?.[variant] || colorVariants.default.contained;
  const sizeStyles = sizes[size];

  return (
    <button
      ref={ref}
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
});

Button.displayName = "Button";

export default Button;