# Cẩm Nang Next.js: Parallel Routes (Tuyến Đường Song Song)

Tài liệu tổng hợp về kỹ thuật chia màn hình thành nhiều phần độc lập trong Next.js App Router.

---

## 1. Khái Niệm Cốt Lõi (Concept)

**Parallel Routes** cho phép bạn render nhiều trang (Page) cùng một lúc trong cùng một Layout.

- **Tư duy:** Thay vì Layout chỉ nhận một `children`, giờ đây nó có thể nhận nhiều "cái lỗ" (slots) khác nhau.
- **Cú pháp:** Đặt tên thư mục bắt đầu bằng dấu `@` (Ví dụ: `@analytics`, `@team`).
- **URL:** Tên folder `@` **không ảnh hưởng** đến URL của trình duyệt.

---

## 2. Cấu Trúc Thư Mục Chuẩn

Giả sử bạn muốn chia màn hình Dashboard thành 3 phần: Nội dung chính, Biểu đồ (Analytics) và Tin nhắn (Chat).

```text
app/
└── dashboard/
    ├── layout.tsx          <-- (1) Nơi sắp xếp bố cục
    ├── page.tsx            <-- Tương ứng prop {children}
    │
    ├── @analytics/         <-- Slot 1
    │   ├── page.tsx        <-- Nội dung của Analytics
    │   ├── loading.tsx     <-- Loading riêng cho ô này
    │   ├── error.tsx       <-- Xử lý lỗi riêng cho ô này
    │   └── default.tsx     <-- (QUAN TRỌNG) Fallback khi F5
    │
    └── @chat/              <-- Slot 2
        ├── page.tsx
        └── default.tsx     <-- (QUAN TRỌNG) Fallback khi F5
```

---

## 3. Triển Khai Code

### Bước 1: Layout Tổng (`app/dashboard/layout.tsx`)

Next.js tự động truyền các slot vào Layout dưới dạng props.

```tsx
export default function DashboardLayout({
  children,
  analytics,
  chat,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  chat: React.ReactNode;
}) {
  return (
    <div className="p-10">
      <h1>Dashboard Tổng</h1>
      
      {/* Chia layout thành các khu vực */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Khu vực chính (children) */}
        <div className="col-span-2 bg-gray-100 p-4">
            {children}
        </div>

        {/* Khu vực Analytics */}
        <div className="col-span-1 bg-blue-50 p-4">
            {analytics}
        </div>

        {/* Khu vực Chat */}
        <div className="col-span-1 bg-green-50 p-4">
            {chat}
        </div>

      </div>
    </div>
  );
}
```

### Bước 2: Các Page Con

Tạo file `page.tsx` trong `@analytics` và `@chat` như bình thường.

---

## 4. Tại Sao Nên Dùng? (Lợi Ích)

So với việc import component thường (`<Analytics />`), Parallel Routes mạnh hơn ở 2 điểm:

### A. Independent Streaming (Loading độc lập)

Mỗi slot có thể có file `loading.tsx` riêng.

- Nếu `@analytics` load dữ liệu chậm (5 giây), người dùng vẫn thấy `@chat` và `children` ngay lập tức.
- Không bị tình trạng "cả trang web xoay vòng vòng" chỉ vì một thành phần nhỏ bị chậm.

### B. Independent Error Handling (Cô lập lỗi)

Mỗi slot có thể có file `error.tsx` riêng.

- Nếu `@chat` bị sập (crash), chỉ cái khung chat hiện thông báo lỗi.
- Các phần còn lại của trang web vẫn hoạt động bình thường → Trải nghiệm người dùng tốt hơn.

---

## 5. Quy Tắc Sống Còn: `default.tsx`

Đây là phần dễ gây lỗi 404 nhất nếu bỏ qua.

### Vấn đề (The 404 Trap)

Khi bạn điều hướng đến một trang con (ví dụ `/dashboard/settings`):

1. **Main:** Render `settings/page.tsx`.
2. **@analytics:** Next.js tìm thư mục `settings` trong folder `@analytics`. → Không thấy!

**Kết quả:**

- Nếu bấm Link (Soft Nav): Next.js giữ nguyên UI cũ của Analytics.
- Nếu F5 (Hard Nav): Lỗi 404 toàn trang.

### Giải pháp (The Fix)

Luôn tạo file `default.tsx` cho mọi slot. Next.js sẽ dùng file này nếu không tìm thấy nội dung khớp với URL hiện tại.

**Code mẫu cho `default.tsx` (Ẩn đi):**

```tsx
// app/dashboard/@analytics/default.tsx
export default function Default() {
  return null; // Không hiện gì cả
}
```

**Code mẫu cho `default.tsx` (Giữ nguyên trang chủ):**

```tsx
// app/dashboard/@analytics/default.tsx
import AnalyticsPage from './page';

export default AnalyticsPage;
```

---

## 6. Ứng Dụng Thực Tế

- **Dashboard phức tạp:** Chia nhỏ các widget.
- **Modal Routing:** Kết hợp `@modal` với Intercepting Routes `(.)` để làm modal Login/Preview ảnh.
- **Conditional Layout:** Hiển thị Sidebar khác nhau cho User (`@user`) và Guest (`@guest`) dựa trên logic kiểm tra quyền (thường check trong `layout.tsx`).

---

## 7. Tóm Tắt Logic Điều Hướng

| Hành động | Slot có folder khớp URL? | Có `default.tsx`? | Kết quả hiển thị |
| :--- | :--- | :--- | :--- |
| **Bấm Link** | ✅ Có | Không quan tâm | Nội dung trang mới. |
| **Bấm Link** | ❌ Không | ❌ Không | Giữ nguyên nội dung cũ (Stale state). |
| **F5 (Refresh)** | ❌ Không | ✅ Có | Nội dung của `default.tsx`. |
| **F5 (Refresh)** | ❌ Không | ❌ Không | **LỖI 404 NOT FOUND.** |
