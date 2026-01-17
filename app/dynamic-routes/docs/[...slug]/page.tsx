// app/dynamic-routes/docs/[...slug]/page.tsx

export default async function DocsPage({ params }: { params: Promise<{ slug: string[] }> }) {
  // Lưu ý: slug ở đây là Mảng chuỗi (string[])
  const { slug } = await params;

  return (
    <div className="p-10 border border-green-500 rounded-xl mt-4">
      <h1 className="text-2xl font-bold text-green-600">Tài liệu kỹ thuật</h1>
      
      {/* Giả lập Breadcrumb */}
      <div className="text-sm text-gray-500 mt-2">
        Đường dẫn: Docs {slug.map(s => ` > ${s}`)}
      </div>

      <p className="mt-4">
        Bạn đang đọc mục: <strong>{slug[slug.length - 1]}</strong>
      </p>
      <p>Cấp độ sâu: {slug.length} tầng.</p>
    </div>
  );
}
