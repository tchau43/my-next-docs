// app/dynamic-routes/docs/page.tsx

import Link from 'next/link';

export default function DocsIndex() {
  const docPaths = [
    { path: 'getting-started', title: 'Getting Started' },
    { path: 'getting-started/installation', title: 'Installation Guide' },
    { path: 'api/authentication', title: 'API Authentication' },
    { path: 'advanced/performance/optimization', title: 'Performance Optimization' },
  ];

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-green-600 mb-6">📚 Tài liệu</h1>
      <p className="mb-6 text-gray-600">
        Catch-all route: Có thể điều hướng đến bất kỳ cấp độ sâu nào.
      </p>
      
      <div className="space-y-3">
        {docPaths.map((doc) => (
          <Link
            key={doc.path}
            href={`/dynamic-routes/docs/${doc.path}`}
            className="block p-4 border border-green-300 rounded-lg hover:bg-green-50 transition"
          >
            <h2 className="font-semibold text-green-700">{doc.title}</h2>
            <p className="text-sm text-gray-500">/docs/{doc.path}</p>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
        <p className="text-sm text-yellow-800">
          ⚠️ Lưu ý: Route <code>/docs</code> (không có slug) sẽ báo 404 vì catch-all bắt buộc phải có ít nhất 1 đoạn.
        </p>
      </div>
    </div>
  );
}
