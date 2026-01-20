export default function PhotoDetail({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Photo Detail (Full page) #{params.id}</h3>
      <p className="text-sm text-gray-600">Trang thật khi F5 hoặc vào thẳng URL.</p>
      <div className="h-48 bg-blue-200 rounded flex items-center justify-center text-blue-800">
        Ảnh gốc #{params.id}
      </div>
    </div>
  );
}