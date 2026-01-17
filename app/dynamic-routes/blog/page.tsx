// app/dynamic-routes/blog/page.tsx

import Link from 'next/link';

export default function BlogIndex() {
  const posts = [
    { slug: 'react-native', title: 'React Native Basics' },
    { slug: 'nextjs-15', title: 'Next.js 15 Features' },
    { slug: 'typescript-tips', title: 'TypeScript Tips & Tricks' },
  ];

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">📝 Blog</h1>
      <p className="mb-6 text-gray-600">Chọn một bài viết để xem chi tiết:</p>
      
      <div className="space-y-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/dynamic-routes/blog/${post.slug}`}
            className="block p-4 border border-blue-300 rounded-lg hover:bg-blue-50 transition"
          >
            <h2 className="font-semibold text-blue-700">{post.title}</h2>
            <p className="text-sm text-gray-500">/blog/{post.slug}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
