// app/dynamic-routes/shop/[[...slug]]/page.tsx

export default async function ShopPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  // Lưu ý: slug ở đây có thể undefined (dấu ?)
  const { slug } = await params;

  if (!slug) {
    return (
      <div className="p-10 border border-purple-500 bg-purple-50 rounded-xl mt-4">
        <h1 className="text-2xl font-bold">🛒 Cửa hàng tổng hợp (Trang chủ Shop)</h1>
        <p>Đang hiển thị toàn bộ sản phẩm hot nhất.</p>
        
        {/* Debug info */}
        <div className="mt-6 p-4 bg-white rounded border border-purple-300">
          <p className="text-sm font-mono text-gray-600">
            <strong>Debug:</strong> slug = <code className="bg-gray-100 px-2 py-1 rounded">undefined</code>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            URL: <code>/dynamic-routes/shop</code> → Không có phần nào sau "shop" → slug = undefined
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 border border-purple-500 rounded-xl mt-4">
      <h1 className="text-2xl font-bold">🛒 Bộ lọc sản phẩm</h1>
      <p>Bạn đang lọc theo danh mục: <strong>{slug.join(' / ')}</strong></p>
      
      {/* Debug info */}
      <div className="mt-6 p-4 bg-purple-50 rounded border border-purple-300">
        <p className="text-sm font-mono text-gray-600">
          <strong>Debug:</strong> slug = <code className="bg-white px-2 py-1 rounded">[{slug.map(s => `"${s}"`).join(', ')}]</code>
        </p>
        <p className="text-xs text-gray-500 mt-2">
          URL: <code>/dynamic-routes/shop/{slug.join('/')}</code>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Next.js đã extract phần sau <code>/shop/</code> thành mảng: {slug.length} phần tử
        </p>
      </div>
    </div>
  );
}
