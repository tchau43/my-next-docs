// app/parallel-routes/page.tsx

export default function MainPage() {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg h-full border-t-4 border-blue-500">
        <h2 className="text-xl font-bold text-blue-600">Main Content</h2>
        <p className="mt-4 text-gray-600">
          Đây là nội dung chính của trang. <br />
          Nó tương ứng với file <code>page.tsx</code> thông thường.
        </p>
      </div>
    );
  }