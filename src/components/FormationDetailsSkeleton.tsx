import { Clock, BarChart2, Users, Globe, Award, Bookmark, Share2 } from 'lucide-react';
import { Button } from './ui/button';

const FormationDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="md:hidden relative h-[40vh] max-h-[380px] bg-gradient-to-b from-gray-400 to-gray-600 animate-pulse">
        <div className="absolute inset-0 bg-black/60">
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="ghost" size="icon" className="bg-white/10 backdrop-blur">
              <Bookmark className="w-5 h-5 text-white" />
            </Button>
            <Button variant="ghost" size="icon" className="bg-white/10 backdrop-blur">
              <Share2 className="w-5 h-5 text-white" />
            </Button>
          </div>
          <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
            <div className="h-6 w-24 bg-primary/20 rounded-full mb-3 animate-pulse" />
            <div className="h-7 w-3/4 bg-white/20 rounded mb-3 animate-pulse" />
            <div className="h-4 w-full bg-white/20 rounded animate-pulse" />
          </div>
        </div>
      </div>

      <div className="md:hidden bg-white -mt-5 rounded-t-3xl relative z-10 p-4 shadow-lg">
        <div className="flex items-center gap-4 pb-4 border-b">
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
          <div className="flex-1">
            <div className="h-3 w-16 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        <div className="flex justify-around py-6 border-b">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-gray-300" />
            <div>
              <div className="h-4 w-16 bg-gray-200 rounded mb-1 animate-pulse" />
              <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-gray-300" />
            <div>
              <div className="h-4 w-16 bg-gray-200 rounded mb-1 animate-pulse" />
              <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block bg-blue-50/50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 text-sm text-gray-400 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                {i < 3 && <span className="mx-2">/</span>}
              </div>
            ))}
          </div>
          
          <div className="max-w-3xl">
            <div className="h-8 w-3/4 bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-200 rounded mb-6 animate-pulse" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                <div>
                  <div className="h-3 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid md:grid-cols-[1fr,400px] gap-8">
          <div className="space-y-8">
            <div className="flex gap-6 border-b">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-4" />
              ))}
            </div>
            
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" 
                  style={{ width: `${Math.random() * 30 + 70}%` }} />
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-8">
              <div className="aspect-video bg-gray-200 rounded-lg mb-6 animate-pulse" />
              
              <div className="space-y-4 mb-6">
                {[Clock, BarChart2, Users, Globe, Award].map((Icon, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-gray-300" />
                    <div className="flex-1">
                      <div className="h-3 w-24 bg-gray-200 rounded mb-1 animate-pulse" />
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse mb-6" />

              <div className="pt-6 border-t">
                <div className="h-4 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
                <div className="flex gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-4 md:hidden">
        <div className="h-12 w-48 bg-gray-200 rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default FormationDetailsSkeleton;