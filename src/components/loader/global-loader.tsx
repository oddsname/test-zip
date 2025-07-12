'use client';

import { useGlobalLoader } from "@/components/loader/global-loader-provider";

export function GlobalLoader() {
  const { isLoading } = useGlobalLoader();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
        <p className="mt-2 text-center text-sm">Loading, please wait...</p>
      </div>
    </div>
  );
}