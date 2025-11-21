"use client";

export default function BackButton() {
  return (
    <button
      onClick={() => history.back()}
      className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-yellow-400 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back
    </button>
  );
}
