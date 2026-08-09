import React from "react";

export const EditorialGridLines: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => {
  const lineClass = isDark ? "bg-[#383735]/40" : "bg-[#C9C6BE]/40";
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12"
      aria-hidden="true"
    >
      <div className="grid h-full w-full grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`h-full w-px ${lineClass} ${i >= 6 ? "hidden lg:block" : "block"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EditorialGridLines;
