import React, { useState } from "react";
import { Icon } from "@iconify/react";

const Input = React.forwardRef(
  ({ className = "", type = "text", onKeyDown, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

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
      ${type === "password" ? "pr-10" : ""}
      ${className}
    `.trim();

    return (
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          ref={ref}
          onKeyDown={handleKeyDown}
          className={combinedClassName}
          {...props}
        />

        {type === "password" && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Icon
              icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
              className="w-5 h-5"
            />
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
