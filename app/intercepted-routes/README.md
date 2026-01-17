# Cẩm Nang Next.js: Intercepting & Parallel Routes (Modal Pattern)

Tài liệu tổng hợp kiến thức về cách tạo Modal thay đổi URL nhưng không tải lại trang trong Next.js App Router (Cập nhật chuẩn Next.js 15).

---

## 1. Cơ chế hoạt động (Concept)

### Mục tiêu

Người dùng click vào ảnh trong Gallery → URL đổi sang `/photo/1` → Hiện Modal đè lên trang Gallery → Khi F5 hoặc copy link gửi bạn bè → Vào trang chi tiết ảnh (Full page).

### Hai tính năng cốt lõi

1. **Intercepting Routes `(..)folder`**: Đánh chặn hành động chuyển trang để hiển thị một UI khác (thường là Modal).
2. **Parallel Routes `@slot`**: Tạo một "cái lỗ" (slot) trên Layout cha để chứa Modal, giúp giữ nguyên UI của trang Gallery bên dưới.

---

## 2. Quy tắc đặt tên thư mục

Hoạt động giống lệnh `cd` trong Terminal, tính từ thư mục hiện tại đến thư mục muốn chặn (Destination).

| Ký hiệu | Ý nghĩa | Giải thích |
| :--- | :--- | :--- |
| **`(.)`** | Cùng cấp | Chặn route nằm cùng thư mục hoặc là con trực tiếp. |
| **`(..)`** | Lên 1 cấp | Chặn route nằm ở thư mục cha (anh em hàng xóm). |
| **`(..)(..)`** | Lên 2 cấp | Chặn route nằm ở thư mục ông nội. |
| **`(...)`** | Gốc (Root) | Chặn route tính từ thư mục `app/` (Root). |

---

## 3. Cấu trúc thư mục chuẩn (Full Pattern)

Giả sử chúng ta làm tính năng Gallery tại trang chủ.

```text
app/
├── layout.tsx              <-- (1) Nhận props @modal
├── page.tsx                <-- Trang chủ (Gallery) chứa Link
├── default.tsx             <-- (Quan trọng) Xử lý khi không có modal (trang chủ gốc)
│
├── @modal/                 <-- PARALLEL ROUTE (Cái lỗ chứa modal)
│   ├── default.tsx         <-- Trả về null (để ẩn lỗ này khi không có modal)
│   │
│   └── (.)photo/           <-- INTERCEPTING ROUTE (Nằm trong slot @modal)
│       └── [id]/
│           └── page.tsx    <-- UI Modal (Chỉ hiện khi click link)
│
└── photo/                  <-- DESTINATION (Trang gốc)
    └── [id]/
        └── page.tsx        <-- UI Full Page (Hiện khi F5 / vào thẳng Link)
```

---

## 4. Triển khai Code (Next.js 15)

### Bước 1: Cấu hình Layout (`app/layout.tsx`)

Layout phải nhận thêm prop `modal` (tương ứng với folder `@modal`).

```tsx
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* children là nội dung chính (Gallery) */}
        {children} 
        
        {/* modal là slot hiển thị đè lên trên */}
        {modal}    
      </body>
    </html>
  );
}
```

### Bước 2: Tạo file Default cho Slot (`app/@modal/default.tsx`)

**Cực kỳ quan trọng**: File này đảm bảo khi người dùng F5 trang chủ (không có modal), Next.js sẽ không báo lỗi 404 cho cái slot `@modal`.

```tsx
// Trả về null nghĩa là "không hiện gì cả"
export default function Default() {
  return null;
}
```

### Bước 3: Trang Gallery (`app/page.tsx`)

Dùng thẻ `<Link>` để kích hoạt Soft Navigation (Điều hướng mềm).

```tsx
import Link from "next/link";

export default function GalleryPage() {
  const photos = [1, 2, 3];
  return (
    <div className="p-10">
      <h1>Gallery</h1>
      <div className="flex gap-4">
        {photos.map((id) => (
          <Link key={id} href={`/photo/${id}`} className="p-4 border bg-gray-100">
            Mở ảnh {id}
          </Link>
        ))}
      </div>
    </div>
  );
}
```

### Bước 4: Trang Interceptor/Modal (`app/@modal/(.)photo/[id]/page.tsx`)

Đây là Server Component. Nó sẽ fetch data ảnh (nếu cần) và gọi Client Component để hiển thị UI (nút đóng, overlay).

```tsx
import { ModalOverlay } from "@/components/modal-overlay"; 

// Lưu ý: Next.js 15 yêu cầu async và await params
export default async function PhotoModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
       <div className="bg-white p-10 rounded-lg max-w-lg w-full">
          <h2 className="text-xl font-bold">Intercepted Photo {id}</h2>
          <p className="my-4">Đây là Modal. URL đã đổi nhưng trang cũ vẫn ở dưới.</p>
          
          {/* Nút đóng nên dùng router.back() ở Client Component */}
          <ModalOverlay /> 
       </div>
    </div>
  );
}
```

**Gợi ý file `components/modal-overlay.tsx`**:

```tsx
'use client';
import { useRouter } from 'next/navigation';

export function ModalOverlay() {
  const router = useRouter();
  return (
    <button 
      onClick={() => router.back()} // Quan trọng: Đóng modal bằng cách quay lại
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Đóng Modal
    </button>
  );
}
```

### Bước 5: Trang Gốc (`app/photo/[id]/page.tsx`)

Trang hiển thị khi F5 hoặc share link.

```tsx
export default async function PhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-white p-20">
      <h1 className="text-4xl font-bold text-blue-600">Trang Chi Tiết Gốc {id}</h1>
      <p className="mt-4">Bạn đang thấy trang này vì bạn đã Refresh hoặc nhập trực tiếp URL.</p>
    </div>
  );
}
```

---

## 5. Lưu ý quan trọng về Next.js 15 & TypeScript

### Về `params`

Từ Next.js 15, các API động (`cookies`, `headers`, `params`) chuyển sang dạng **Asynchronous**.

- ❌ **SAI** (Next 14 cũ): `const { id } = params;`
- ✅ **ĐÚNG** (Next 15): `const { id } = await params;` và component phải là `async function`.

### Về Client Component (`'use client'`)

Interceptor Page (`page.tsx`) nên giữ là **Server Component** để SEO tốt. Chỉ những phần tương tác (nút đóng, sự kiện click, form) mới tách ra file riêng có `'use client'`.

---

## 6. Logic Điều Hướng (Tại sao lúc Modal, lúc Full page?)

| Hành động | Loại Navigation | Next.js xử lý thế nào? |
| :--- | :--- | :--- |
| **Click `<Link>`** | Soft Navigation | Router thấy có thư mục `(.)photo`. Nó giữ nguyên Layout cũ, render file trong `(.)photo` vào slot `@modal`. → **Hiện Modal**. |
| **F5 / Nhập URL** | Hard Navigation | Browser gửi request mới. Server không biết ngữ cảnh cũ. Nó tìm đến file `photo/[id]/page.tsx` gốc. → **Hiện Full Page**. |
