import Link from 'next/link';

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="relative p-8 space-y-4 bg-green-50 min-h-screen">
      <div className="flex items-center gap-3">
        <Link href="/parallel-routes-demo" className="text-sm underline text-gray-600">
          ⬅ Back
        </Link>
        <h2 className="text-xl font-semibold">Case 2: Intercept + Parallel @modal</h2>
      </div>
      <p className="text-sm text-gray-600">
        Khi bấm link, modal được render vào slot @modal. Nền cũ vẫn giữ nguyên.
      </p>
      <div className="border rounded-lg p-4 bg-white shadow-sm">{children}</div>

      {/* Slot modal nằm đè lên trên */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        {modal}
      </div>
    </div>
  );
}