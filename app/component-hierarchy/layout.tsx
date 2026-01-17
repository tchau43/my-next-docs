// app/component-hierarchy/layout.tsx

'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function HierarchyLayout({ children }: { children: React.ReactNode }) {
  const [globalCount, setGlobalCount] = useState(0);

  return (
    <div className="border-4 border-green-500 p-8 m-4 rounded-xl">
      <h2 className="text-green-700 font-bold text-xl mb-4">
        🟩 LAYOUT (Persistent Layer)
      </h2>
      
      <div className="flex gap-4 items-center mb-6">
        <p>Global Counter (Sẽ giữ nguyên khi đổi trang):</p>
        <button 
          onClick={() => setGlobalCount(globalCount + 1)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Đếm: {globalCount}
        </button>
      </div>

      <nav className="flex gap-4 mb-4 text-blue-600 underline">
        <Link href="/component-hierarchy">Về Trang 1</Link>
        <Link href="/component-hierarchy/step-2">Sang Trang 2</Link>
      </nav>

      {/* Template và Page sẽ nằm trong children này */}
      {children}
    </div>
  );
}