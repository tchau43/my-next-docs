// app/parallel-routes/layout.tsx
import { Suspense } from 'react';

export default function ParallelLayout({
    children,
    analytics,
    chat,
  }: {
    children: React.ReactNode;
    analytics: React.ReactNode;
    chat: React.ReactNode;
  }) {
    return (
      <div className="p-10 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-6">Demo Parallel Routes</h1>
        
        {/* Chia lưới layout thành 3 cột */}
        <div className="grid grid-cols-3 gap-6">
          
          {/* Cột 1: Analytics (Slot @analytics) với Suspense */}
          <div className="col-span-1">
            <Suspense fallback={
              <div className="p-6 rounded-xl shadow-lg h-full border-t-4 border-gray-300 bg-gray-100 animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="space-y-2 mt-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </div>
                <p className="mt-4 text-sm text-gray-500">Đang tải Analytics...</p>
              </div>
            }>
              {analytics}
            </Suspense>
          </div>
  
          {/* Cột 2: Nội dung chính (page.tsx) */}
          <div className="col-span-1">
              {children}
          </div>
  
          {/* Cột 3: Chat (Slot @chat) */}
          <div className="col-span-1">
              {chat}
          </div>
  
        </div>
      </div>
    );
  }