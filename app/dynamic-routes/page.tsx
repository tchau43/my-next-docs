// app/dynamic-routes/page.tsx

import Link from 'next/link';

export default function DynamicRoutesIndex() {
  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">🔄 Dynamic Routes Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Blog - Single Dynamic Segment */}
        <Link
          href="/dynamic-routes/blog"
          className="block p-6 bg-white border-2 border-blue-500 rounded-xl hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-3">📝 Blog</h2>
          <p className="text-gray-600 mb-2">
            <code className="bg-gray-100 px-2 py-1 rounded">[slug]</code>
          </p>
          <p className="text-sm text-gray-500">
            Single Dynamic Segment - Chỉ nhận 1 tham số duy nhất
          </p>
        </Link>

        {/* Docs - Catch-all Segment */}
        <Link
          href="/dynamic-routes/docs/getting-started"
          className="block p-6 bg-white border-2 border-green-500 rounded-xl hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold text-green-600 mb-3">📚 Docs</h2>
          <p className="text-gray-600 mb-2">
            <code className="bg-gray-100 px-2 py-1 rounded">[...slug]</code>
          </p>
          <p className="text-sm text-gray-500">
            Catch-all Segment - Bắt tất cả, bắt buộc có ít nhất 1 đoạn
          </p>
        </Link>

        {/* Shop - Optional Catch-all */}
        <Link
          href="/dynamic-routes/shop"
          className="block p-6 bg-white border-2 border-purple-500 rounded-xl hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold text-purple-600 mb-3">🛒 Shop</h2>
          <p className="text-gray-600 mb-2">
            <code className="bg-gray-100 px-2 py-1 rounded">[[...slug]]</code>
          </p>
          <p className="text-sm text-gray-500">
            Optional Catch-all - Có thể là trang chủ hoặc trang con
          </p>
        </Link>

      </div>

      <div className="mt-8 p-6 bg-white rounded-xl border border-gray-300">
        <h3 className="text-xl font-bold mb-4">📖 Hướng dẫn sử dụng:</h3>
        <ul className="space-y-2 text-gray-700">
          <li>
            <strong>Blog:</strong> Thử truy cập <code className="bg-gray-100 px-2 py-1 rounded">/dynamic-routes/blog/react-native</code>
          </li>
          <li>
            <strong>Docs:</strong> Thử truy cập <code className="bg-gray-100 px-2 py-1 rounded">/dynamic-routes/docs/getting-started/installation</code>
          </li>
          <li>
            <strong>Shop:</strong> Thử truy cập <code className="bg-gray-100 px-2 py-1 rounded">/dynamic-routes/shop</code> hoặc <code className="bg-gray-100 px-2 py-1 rounded">/dynamic-routes/shop/iphone</code>
          </li>
        </ul>
      </div>
    </div>
  );
}
