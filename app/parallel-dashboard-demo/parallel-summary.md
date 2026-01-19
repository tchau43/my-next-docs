# Cẩm Nang: Parallel Routes & default.tsx

Tài liệu tóm tắt về cách chia nhỏ màn hình và xử lý lỗi 404 khi Refresh trang trong Next.js App Router.

---

## 1. Parallel Routes là gì?

Là kỹ thuật hiển thị **nhiều trang (Pages) cùng một lúc** trên cùng một Layout.

* **Cú pháp:** Đặt tên thư mục bắt đầu bằng `@` (ví dụ: `@analytics`, `@team`).
* **Slot:** Các thư mục này được gọi là "Slot" và được truyền vào `layout.tsx` dưới dạng **Props**.

### Khi nào dùng?

* Khi bạn muốn chia màn hình thành nhiều phần độc lập (Dashboard, Feed, Sidebar).
* Khi bạn muốn **một phần màn hình thay đổi URL**, còn phần kia **giữ nguyên trạng thái** (không bị load lại).

---

## 2. Cấu Trúc Thư Mục Chuẩn

Ví dụ: Trang Dashboard có 2 phần là `@analytics` (cố định) và `@notifications` (thay đổi được).

```text
app/
└── dashboard/
    ├── layout.tsx           <-- Nhận props: { children, analytics, notifications }
    ├── page.tsx             <-- Nội dung chính (children)
    ├── default.tsx          <-- QUAN TRỌNG: Dự phòng cho children
    │
    ├── @analytics/          <-- Slot 1
    │   ├── page.tsx
    │   └── default.tsx      <-- QUAN TRỌNG: Dự phòng cho Slot 1
    │
    └── @notifications/      <-- Slot 2
        ├── page.tsx         <-- Trang mặc định
        ├── default.tsx      <-- QUAN TRỌNG: Dự phòng cho Slot 2
        │
        └── archived/        <-- Trang con (Khi vào /dashboard/archived)
            └── page.tsx
```

---

## 3. Vấn đề "Cú lừa 404" (Hard vs Soft Navigation)(Nếu không có default.tsx)

### Tại sao bấm Link thì chạy ngon, nhưng F5 (Refresh) lại lỗi 404?

| Hành động | Loại điều hướng | Cơ chế hoạt động của Next.js | Kết quả |
|-----------|-----------------|------------------------------|---------|
| Bấm `<Link>` | Soft Navigation | Next.js giữ nguyên trạng thái cũ của các Slot không liên quan. | ✅ Không lỗi. |
| F5 / Nhập URL | Hard Navigation | Next.js xóa sạch bộ nhớ, vẽ lại từ đầu. Nó bắt buộc tìm file để hiển thị cho TẤT CẢ các Slot tại URL hiện tại. | ❌ Lỗi 404 (Nếu thiếu file). |

### Ví dụ cụ thể:

Bạn đang ở URL: `/dashboard/archived`.

* **Slot @notifications:** Có folder `archived` → Hiển thị tốt.
* **Slot @analytics:** Không có folder `archived` → Cần tìm cái gì đó để hiển thị.
* **Main Page (children):** Không có folder `archived` → Cần tìm cái gì đó để hiển thị.

→ Nếu không có file dự phòng (`default.tsx`), Next.js không biết điền gì vào chỗ trống → Sập trang (404).

---

## 4. Giải pháp: File default.tsx

`default.tsx` là "bánh xe dự phòng". Nó chỉ được hiển thị khi Next.js không tìm thấy đường dẫn khớp với URL hiện tại trong Slot đó.

### Quy tắc vàng:

> **"Luôn luôn tạo file `default.tsx` cho mọi Slot (kể cả Slot chính `children`) khi sử dụng Parallel Routes."**

### Code mẫu cho default.tsx

Thường thì ta muốn nó hiển thị y hệt như trang chủ của Slot đó.

```typescript
// app/@analytics/default.tsx
// Hoặc app/dashboard/default.tsx

// Cách 1: Import trang page chính và export lại
import Page from './page';
export default Page;

// Cách 2: Trả về null (nếu muốn ô đó trống trơn)
export default function Default() {
  return null;
}
```

---

## 5. So sánh Component thường vs. Parallel Routes

| Tiêu chí | Component thường + Suspense | Parallel Routes |
|----------|----------------------------|-----------------|
| **Mục đích** | Load từng phần (Streaming). | Chia luồng điều hướng (Routing). |
| **URL** | Chung 1 URL duy nhất. | Mỗi Slot có thể có URL con riêng. |
| **Trạng thái** | Mất hết khi chuyển trang/F5. | Giữ được trạng thái của Slot khác khi Slot này đổi trang. |
| **Khi F5** | Load lại toàn bộ. | Load lại toàn bộ (nhưng giữ đúng nội dung theo URL). |

---

## 6. Tổng kết

* Dùng Parallel Routes để chia layout phức tạp.
* Tạo folder bắt đầu bằng `@`.
* **BẮT BUỘC** tạo `default.tsx` để tránh lỗi 404 khi Refresh trang.
