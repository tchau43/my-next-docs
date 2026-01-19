// app/parallel-dashboard-demo/layout.tsx
import Link from 'next/link';

export default function Layout({
  children,
  analytics,
  notifications,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  notifications: React.ReactNode;
}) {
  return (
    <div className="p-10 min-h-screen bg-gray-100">
      <Link href="/parallel-dashboard-demo" className="text-2xl font-bold mb-6 block hover:underline">
         🏠 Dashboard Demo (Click để về gốc)
      </Link>
      
      {/* Nội dung chính (page.tsx) */}
      <div className="mb-6">{children}</div>

      <div className="grid grid-cols-2 gap-6">
        {/* Cột Analytics (Màu Xanh) */}
        <div className="border-4 border-blue-500 rounded-xl p-4 bg-blue-50">
           <h2 className="text-blue-700 font-bold mb-4">SLOT: @analytics</h2>
           {analytics}
        </div>

        {/* Cột Notifications (Màu Tím) */}
        <div className="border-4 border-purple-500 rounded-xl p-4 bg-purple-50">
           <h2 className="text-purple-700 font-bold mb-4">SLOT: @notifications</h2>
           {notifications}
        </div>
      </div>
    </div>
  );
}
