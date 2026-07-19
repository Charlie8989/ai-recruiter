import { Skeleton } from "@/components/ui/skeleton";

export function InterviewCardSkeleton() {
  return (
    <div className="min-h-[220px] rounded-xl border border-[#dfe5f2] bg-[#f8fafc] p-6 shadow-[0_14px_30px_rgba(15,23,42,0.06)]">
      <div className="mb-5 flex items-center justify-between border-b border-[#dfe5f2] pb-4">
        <Skeleton className="h-8 w-8 rounded-full bg-[#e4e9f5]" />
        <Skeleton className="h-4 w-24 bg-[#e4e9f5]" />
      </div>
      <Skeleton className="mb-4 h-6 w-3/4 bg-[#e4e9f5]" />
      <Skeleton className="mb-6 h-4 w-20 bg-[#e4e9f5]" />
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-11 w-32 bg-[#e4e9f5]" />
        <Skeleton className="h-11 w-32 bg-[#d8def0]" />
      </div>
    </div>
  );
}

export function InterviewGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <InterviewCardSkeleton key={index} />
      ))}
    </div>
  );
}
