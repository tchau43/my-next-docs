// app/intercepted-routes/gallery/page.tsx
import Link from 'next/link';

export default function GalleryPage() {
  const photos = [1, 2, 3];

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Bộ sưu tập (Gallery)</h1>
      <div className="flex gap-4">
        {photos.map((id) => (
          <Link 
            key={id} 
            href={`/intercepted-routes/photo/${id}`} 
            className="block p-6 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
          >
            Xem ảnh {id}
          </Link>
        ))}
      </div>
    </div>
  );
}