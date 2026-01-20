export default function LinkStatusDemoLayout({
  children,
  navigation,
}: {
  children: React.ReactNode
  navigation: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🔗 useLinkStatus Demo
          </h1>
          <p className="text-gray-600">
            Test tính năng mới của Next.js 15.3+ - Hook theo dõi trạng thái navigation
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Navigation Slot */}
          <div className="lg:col-span-1 bg-red-500">
            {navigation}
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
