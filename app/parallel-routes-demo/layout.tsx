import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-8 space-y-6 bg-yellow-50 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Parallel Routes Demo</h1>
        <Link href="/" className="text-sm text-blue-600 underline">
          Về trang chủ
        </Link>
      </div>
      <p className="text-sm text-gray-600">
        Chọn một scenario để xem sự khác biệt giữa Intercept-only và Intercept + Parallel Slot.
      </p>
      {children}
    </div>
  );
}