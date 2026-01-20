import NavLink from '../components/NavLink'

export default function NavigationSlot() {
  return (
    <nav className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        📍 Navigation Menu
      </h2>
      <div className="flex flex-col gap-3">
        <NavLink href="/useLinkStatus-demo">
          🏠 Home
        </NavLink>
        <NavLink href="/useLinkStatus-demo/page-1">
          📄 Page 1 (Fast)
        </NavLink>
        <NavLink href="/useLinkStatus-demo/page-2">
          ⏱️ Page 2 (Slow - 2s)
        </NavLink>
        <NavLink href="/useLinkStatus-demo/page-3">
          🐌 Page 3 (Very Slow - 3s)
        </NavLink>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-600">
          💡 <strong>Tip:</strong> Click vào các link để thấy loading indicator
        </p>
      </div>
    </nav>
  )
}