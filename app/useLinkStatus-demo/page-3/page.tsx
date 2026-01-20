async function fetchVerySlowData() {
  // Simulate very slow data fetching
  await new Promise(resolve => setTimeout(resolve, 3000))
  return {
    title: 'Heavy data loaded!',
    items: Array.from({ length: 5 }, (_, i) => `Item ${i + 1}`),
    timestamp: new Date().toISOString()
  }
}

export default async function Page3() {
  const data = await fetchVerySlowData()
  
  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-3xl font-bold mb-4 text-red-600">
        🐌 Page 3 - Very Slow Loading (3s delay)
      </h2>
      
      <div className="prose max-w-none">
        <p className="text-gray-700">
          Page này có delay 3 giây - thời gian tối đa để test loading state.
        </p>
        
        <div className="mt-6 bg-red-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Loaded Data:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Title: {data.title}</li>
            <li>Loaded at: {data.timestamp}</li>
            <li>Items count: {data.items.length}</li>
          </ul>
          
          <div className="mt-3">
            <h4 className="font-medium mb-2">Items:</h4>
            <div className="grid grid-cols-2 gap-2">
              {data.items.map((item, i) => (
                <div key={i} className="bg-white p-2 rounded shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-yellow-50 rounded border-l-4 border-yellow-400">
          <p className="text-sm text-gray-600">
            ⚠️ <strong>Note:</strong> Loading indicator sẽ hiển thị trong 3 giây khi navigate đến page này
          </p>
        </div>
      </div>
    </div>
  )
}