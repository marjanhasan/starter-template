import React from "react";

export const Spinner: React.FC<{ size?: "sm" | "md" | "lg" }> = ({
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-4 border-t-blue-500 dark:border-t-blue-400 border-gray-200 dark:border-gray-600 rounded-full animate-spin`}
      />
    </div>
  );
};
