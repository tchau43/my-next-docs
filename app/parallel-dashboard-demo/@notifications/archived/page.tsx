import Link from 'next/link';

export default function Archived() {
  return (
    <div className="bg-yellow-50 p-4 rounded border border-yellow-300">
      <h3 className="font-bold text-yellow-800">📂 Kho Lưu Trữ</h3>
      <ul className="mt-2 list-disc pl-5 text-sm text-yellow-700">
        <li>Tin cũ từ năm 2023...</li>
        <li>Tin cũ từ năm 2022...</li>
      </ul>

      <div className="mt-4">
        {/* Nút quay về */}
        <Link 
          href="/parallel-dashboard-demo" 
          className="text-sm underline text-gray-500 hover:text-black"
        >
          ⬅ Quay lại tin mới
        </Link>
      </div>
    </div>
  );
}
