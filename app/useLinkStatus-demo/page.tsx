export default function LinkStatusHomePage() {
  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        Welcome! 👋
      </h2>
      
      <div className="space-y-4 text-gray-700">
        <p>
          Đây là demo cho <code className="bg-gray-100 px-2 py-1 rounded">useLinkStatus</code> hook
          trong Next.js 15.3+
        </p>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <h3 className="font-semibold mb-2">📌 Cách test:</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>Click vào các link ở menu bên trái</li>
            <li>Quan sát loading indicator (spinner) xuất hiện</li>
            <li>Page 2 và Page 3 có delay để bạn dễ thấy effect</li>
          </ol>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h3 className="font-semibold mb-2">🔧 Các tính năng:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Hiển thị loading state khi navigate</li>
            <li>Active state highlighting</li>
            <li>Parallel Routes (@navigation slot)</li>
            <li>Prefetch disabled để thấy rõ effect</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
