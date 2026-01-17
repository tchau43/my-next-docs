// app/parallel-routes/@analytics/page.tsx

export default async function AnalyticsPage() {
    // Giả lập loading chậm 2 giây để thấy sự độc lập
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return (
      <div className="p-6 rounded-xl shadow-lg h-full border-t-4 bg-green-500 text-white">
        <h2 className="text-xl font-bold ">@Analytics</h2>
        <div className="mt-4 space-y-2">
            <div className="h-4 bg-white rounded w-3/4"></div>
            <div className="h-4 bg-white rounded w-1/2"></div>
            <div className="h-4 bg-white rounded w-full"></div>
        </div>
        <p className="mt-4 text-sm text-white">
            Phần này tải xong sau 2 giây (Streaming).
        </p>
      </div>
    );
}