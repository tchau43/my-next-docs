// app/dynamic-routes/blog/[slug]/page.tsx

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="p-10 border border-blue-500 rounded-xl">
      <h1 className="text-2xl font-bold text-blue-600">Bài viết: {slug}</h1>
      <p>Đây là trang chi tiết bài viết. Nó chỉ nhận đúng 1 tham số.</p>
    </div>
  );
}
