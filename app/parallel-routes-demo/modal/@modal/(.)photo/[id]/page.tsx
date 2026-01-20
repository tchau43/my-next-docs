import Link from 'next/link';

export default function PhotoModal({ params }: { params: { id: string } }) {
  return (
    <div className="pointer-events-auto fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl space-y-3 max-w-md w-full">
        <h1 className="text-xl font-bold">📸 Đây là MODAL xịn!</h1>
        <p className="text-sm text-gray-600">
          Nền trang danh sách vẫn ở dưới. URL đã đổi thành /photo/{params.id}.
        </p>
        <div className="h-40 bg-blue-100 rounded flex items-center justify-center text-blue-800">
          Ảnh xem nhanh #{params.id}
        </div>
        <Link
          href="/parallel-routes-demo/modal"
          className="inline-block text-sm text-gray-600 underline"
        >
          ⬅ Đóng modal (về danh sách)
        </Link>
      </div>
    </div>
  );
}