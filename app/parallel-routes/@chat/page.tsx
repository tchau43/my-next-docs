// app/parallel-routes/@chat/page.tsx

export default function ChatPage() {
    return (
      <div className="p-6 rounded-xl shadow-lg h-full border-t-4 bg-purple-500 text-white">
        <h2 className="text-xl font-bold ">@Chat</h2>
        <ul className="mt-4 space-y-3">
          <li className="bg-white p-2 rounded">User A: Hello!</li>
          <li className="bg-white p-2 rounded">User B: Parallel route hay quá.</li>
        </ul>
      </div>
    );
  }