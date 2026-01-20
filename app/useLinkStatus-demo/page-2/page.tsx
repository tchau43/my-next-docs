async function fetchDataWithDelay() {
  // Simulate slow data fetching
  await new Promise(resolve => setTimeout(resolve, 2000))
  return {
    title: 'Data loaded successfully!',
    timestamp: new Date().toISOString()
  }
}

export default async function Page2() {
  const data = await fetchDataWithDelay()
  
  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-3xl font-bold mb-4 text-orange-600">
        ⏱️ Page 2 - Slow Loading (2s delay)
      </h2>
      
      <div className="prose max-w-none">
        <p className="text-gray-700">
          Page này có delay 2 giây để bạn dễ quan sát loading indicator.
        </p>
        
        <div className="mt-6 bg-orange-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Loaded Data:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Title: {data.title}</li>
            <li>Loaded at: {data.timestamp}</li>
            <li>Delay: 2 seconds</li>
          </ul>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <p className="text-sm text-gray-600">
            💡 Khi bạn click vào link này, loading indicator sẽ hiện trong 2 giây
          </p>
        </div>
      </div>
    </div>
  )
}