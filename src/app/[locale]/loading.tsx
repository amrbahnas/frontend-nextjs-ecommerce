import Container from "@/components/container";
import LoadingPage from "@/components/loadingPage";

export default function Loading() {
  return (
    <Container>
      <div className="animate-pulse space-y-8 py-8">
        {/* Hero Section Skeleton */}
        <div className="h-64 bg-gray-200 rounded-lg w-full" />
        
        {/* Categories Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-32 bg-gray-200 rounded-lg" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
        
        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-48 bg-gray-200 rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
                <div className="h-4 bg-gray-200 rounded w-3/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
