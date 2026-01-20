import Link from 'next/link';

export default function InterceptedPhoto({ params }: { params: { id: string } }) {
  return (
    <div className="pointer-events-auto fixed inset-0 bg-red-500/40 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl space-y-3 max-w-md w-full border border-red-300">
        <h1 className="text-xl font-bold text-red-700">📸 Intercept-only (KHÔNG có Parallel Slot)</h1>
        <p className="text-sm text-gray-700">
          UI này đang chiếm luôn chỗ của trang cũ. Không có slot riêng nên nền feed đã biến mất.
        </p>
        <div className="h-40 bg-red-100 rounded flex items-center justify-center text-red-800">
          Intercept-only photo #{params.id}
        </div>
        <p className="text-xs text-red-700 font-medium">
          So sánh với case @modal: Ở đó modal đè lên nhưng nền vẫn còn. Ở đây thì KHÔNG.
        </p>
        <Link
          href="/parallel-routes-demo/intercept-only"
          className="inline-block text-sm text-red-700 underline"
        >
          ⬅ Quay lại danh sách (nhưng sẽ reload toàn vùng hiển thị)
        </Link>
      </div>
    </div>
  );
}