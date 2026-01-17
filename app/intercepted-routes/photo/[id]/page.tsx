// app/intercepted-routes/photo/[id]/page.tsx

export default async function PhotoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
      <div className="p-10 bg-white h-screen">
        <h1 className="text-4xl font-bold text-black">Trang chi tiết ảnh {id} (Full Page)</h1>
        <p className="mt-4 text-gray-700">
          Đây là trang hiển thị khi bạn truy cập trực tiếp URL hoặc nhấn F5.
        </p>
      </div>
    );
  }