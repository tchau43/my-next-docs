import Link from 'next/link';

export default function Notifications() {
  return (
    <div>
      <ul className="space-y-2">
        <li className="bg-white p-2 rounded shadow">🔔 Có đơn hàng mới</li>
        <li className="bg-white p-2 rounded shadow">🔔 Server bảo trì</li>
      </ul>
      
      <div className="mt-6 pt-4 border-t border-purple-200">
        <p className="mb-2 text-sm text-gray-600">Muốn xem tin cũ?</p>
        
        {/* Nút bấm chuyển hướng sang trang con */}
        <Link 
          href="/parallel-dashboard-demo/archived" 
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 inline-block"
        >
          📂 Xem Lưu Trữ (Archived)
        </Link>
      </div>
    </div>
  );
}
