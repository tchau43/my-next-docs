import Link from 'next/link';

export default function Feed() {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Danh sách ảnh</h3>
      <p className="text-sm text-gray-600">Bấm xem ảnh, modal đè lên nhưng nền cũ không mất.</p>
      <Link
        href="/parallel-routes-demo/modal/photo/1"
        className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Xem Ảnh 1 (Modal slot)
      </Link>

      {/* Khối nền này vẫn CÒN khi modal mở (nhìn xuyên overlay sẽ thấy) */}
      <div className="mt-6 p-6 rounded-lg bg-green-50 border border-green-200 text-green-800">
        <div className="font-semibold">Nền gốc (Parallel @modal)</div>
        <p className="text-sm">
          Khi bấm link, modal mở đè lên nhưng khối này vẫn tồn tại phía sau nhờ slot @modal.
        </p>
      </div>
    </div>
  );
}