import React from "react";

const Input = React.forwardRef(
  ({ className = "", type = "text", onKeyDown, ...props }, ref) => {
    const handleKeyDown = (e) => {
      if (type === "number" && ["e", "E"].includes(e.key)) {
        e.preventDefault();
      }
      onKeyDown?.(e);
    };

    const combinedClassName = `
      w-full h-10 px-3 rounded-md border text-sm 
      focus:outline-none focus:ring-1 focus:ring-blue-200
      bg-white text-black placeholder-gray-400 border-gray-300
      dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600
      ${className}
    `.trim();

    return (
      <input
        type={type}
        ref={ref}
        onKeyDown={handleKeyDown}
        className={combinedClassName}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
