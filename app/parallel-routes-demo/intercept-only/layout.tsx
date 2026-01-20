import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-8 space-y-4 bg-blue-50 min-h-screen">
      <div className="flex items-center gap-3">
        <Link href="/parallel-routes-demo" className="text-sm underline text-gray-600">
          ⬅ Back
        </Link>
        <h2 className="text-xl font-semibold">Case 1: Intercept-only</h2>
      </div>
      <p className="text-sm text-gray-600">
        Khi bấm link, nội dung cũ bị thay thế hoàn toàn (không có slot để giữ lại).
      </p>
      <div className="border rounded-lg p-4 bg-white shadow-sm">{children}</div>
    </div>
  );
}