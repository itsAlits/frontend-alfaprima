import React from "react";

export default function Button({
  btnText,
  isLoading,
}: {
  btnText: string;
  isLoading: boolean;
}) {
  return (
    <button
      type="submit"
      className={
        isLoading
          ? "w-full cursor-not-allowed bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg opacity-50"
          : "w-full cursor-pointer bg-[#0b59a1] hover:bg-[#0a4e8c] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
      }
    >
      {isLoading && <span className="loading loading-spinner me-4"></span>}
      {isLoading ? "" : btnText}
    </button>
  );
}
