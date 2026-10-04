"use client";

const FadeLoading = () => {
  return (
    <div className="animate-pulse w-full space-y-4 p-6">
      <div className="h-24 w-[80%] rounded bg-gray-200" />
      <div className="h-12 w-[60%] rounded bg-gray-200" />
      <div className="h-12 w-[40%] rounded bg-gray-200" />
      <div className="h-12 w-[20%] rounded bg-gray-200" />
    </div>
  );
};

export default FadeLoading;
