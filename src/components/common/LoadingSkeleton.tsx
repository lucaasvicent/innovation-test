interface LoadingSkeletonProps {
  count?: number;
}
    
export default function LoadingSkeleton({ count = 1 }: LoadingSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse bg-gray-100 rounded-lg p-6 h-[450px]">
          <div className="h-40 w-full rounded-md bg-gray-200"></div>
          <div className="mt-4 h-4 w-3/4 rounded-md bg-gray-200"></div>
          <div className="mt-2 h-4 w-1/2 rounded-md bg-gray-200"></div>
          <div className="mt-4 h-10 w-full rounded-md bg-gray-200"></div>
        </div>
      ))}
    </div>
  );
}