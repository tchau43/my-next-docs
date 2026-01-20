import Link from 'next/link';

export default function Feed() {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Danh sách ảnh</h3>
      <p className="text-sm text-gray-600">Bấm xem ảnh, bạn sẽ thấy trang cũ biến mất.</p>
      <Link
        href="/parallel-routes-demo/intercept-only/photo/1"
        className="inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Xem Ảnh 1 (Intercept-only)
      </Link>

      {/* Khối nền này sẽ BIẾN MẤT khi bạn click link (vì bị thay thế toàn bộ) */}
      <div className="mt-6 p-6 rounded-lg bg-red-50 border border-red-200 text-red-800">
        <div className="font-semibold">Nền gốc (Intercept-only)</div>
        <p className="text-sm">
          Khi bạn bấm link, khối này biến mất hoàn toàn vì không có parallel slot để giữ lại.
        </p>
      </div>
    </div>
  );
}