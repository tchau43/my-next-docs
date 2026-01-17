// app/intercepted-routes/gallery/(..)photo/[id]/page.tsx

export default async function PhotoInterceptor({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
  return (
    <div className="border-4 border-red-500 bg-yellow-100 p-10 rounded-xl mt-4">
      <h2 className="text-2xl font-bold text-red-600">⚠️ INTERCEPTED: Ảnh {id}</h2>
      <p>
        Giao diện này chỉ hiện ra khi bạn click từ Gallery. <br/>
        Hãy nhìn URL, nó đã đổi thành <code>/photo/{id}</code> nhưng bạn vẫn thấy Gallery ở dưới (nếu dùng parallel route) hoặc thay thế nội dung này.
      </p>
    </div>
  );
}