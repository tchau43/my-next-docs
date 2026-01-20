import Link from 'next/link';

const Card = ({ title, desc, href }: { title: string; desc: string; href: string }) => (
  <div className="p-4 border rounded-lg shadow-sm bg-white space-y-2">
    <div className="text-lg font-semibold">{title}</div>
    <p className="text-sm text-gray-600">{desc}</p>
    <Link href={href} className="inline-block text-blue-600 underline">
      Mở demo
    </Link>
  </div>
);

export default function Page() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card
        title="Case 1: Intercept-only (fail)"
        desc="Không có slot parallel, nội dung cũ bị thay thế hoàn toàn."
        href="/parallel-routes-demo/intercept-only"
      />
      <Card
        title="Case 2: Intercept + Parallel @modal (success)"
        desc="Có slot modal riêng, nền cũ vẫn giữ nguyên khi URL đổi."
        href="/parallel-routes-demo/modal"
      />
    </div>
  );
}