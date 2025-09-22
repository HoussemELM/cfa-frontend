import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonLoadingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="w-full border-b border-gray-200 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Skeleton className="h-8 w-24 rounded-md" />
          
          <div className="flex space-x-6">
            <Skeleton className="h-6 w-16 rounded-md" />
            <Skeleton className="h-6 w-16 rounded-md" />
            <Skeleton className="h-6 w-16 rounded-md" />
          </div>
          
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-8 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-64 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((card) => (
            <div key={card} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-grow space-y-2">
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-3 w-1/2 rounded-md" />
              </div>
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SkeletonLoadingPage;