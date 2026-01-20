export default function Page1() {
  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-3xl font-bold mb-4 text-green-600">
        ⚡ Page 1 - Fast Loading
      </h2>
      
      <div className="prose max-w-none">
        <p className="text-gray-700">
          Page này load ngay lập tức, không có delay.
        </p>
        
        <div className="mt-6 bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Thông tin:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Loading time: Instant</li>
            <li>Status: ✅ Ready</li>
            <li>Type: Static page</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
