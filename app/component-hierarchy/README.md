# Cẩm Nang Next.js: Component Hierarchy & Templates

Tài liệu tổng hợp về cách Next.js sắp xếp các file đặc biệt và cách sử dụng Template để xử lý trạng thái khi chuyển trang.

---

## 1. Thứ Bậc Thành Phần (Component Hierarchy)

Trong Next.js App Router, bạn không cần tự tay viết code để lồng ghép các component. Bạn chỉ cần tạo file theo đúng tên quy định, Next.js sẽ tự động "lắp ghép" chúng theo thứ tự sau:

### Cấu trúc lồng ghép tự động (The Magic)

Khi bạn tạo các file trong cùng một thư mục (ví dụ `app/dashboard`), Next.js sẽ render chúng theo mô hình "Củ hành tây" từ ngoài vào trong:

```jsx
<Layout>                  {/* (1) layout.tsx - Ngoài cùng, bền vững */}
  <Template>              {/* (2) template.tsx - Tái tạo lại mỗi lần đổi route */}
    <ErrorBoundary>       {/* (3) error.tsx - Xử lý lỗi cho phần con */}
      <Suspense>          {/* (4) loading.tsx - Hiệu ứng chờ khi tải data */}
        <NotFound>        {/* (5) not-found.tsx - Xử lý lỗi 404 cụ thể */}
          
          <Page />        {/* (6) page.tsx - Nội dung chính (Nhân) */}
          
        </NotFound>
      </Suspense>
    </ErrorBoundary>
  </Template>
</Layout>
```

### Ý nghĩa các file đặc biệt

- **`layout.tsx`**: Khung sườn chung (Header, Sidebar). Không bị vẽ lại khi chuyển trang con.
- **`template.tsx`**: Giống Layout nhưng bị vẽ lại (remount) mỗi khi chuyển trang.
- **`error.tsx`**: Tự động tạo React Error Boundary. Nếu `page.tsx` lỗi, UI này sẽ hiện ra thay thế để không làm sập cả web.
- **`loading.tsx`**: Tự động tạo React Suspense. Hiện ra ngay lập tức trong khi chờ `page.tsx` tải dữ liệu xong.
- **`not-found.tsx`**: Hiện ra khi hàm `notFound()` được gọi trong Page.

---

## 2. Layout vs. Template

Đây là hai khái niệm dễ nhầm lẫn nhất. Về mặt hình thức, chúng đều bọc lấy `page.tsx`, nhưng hành vi thì trái ngược.

| Đặc điểm | Layout (`layout.tsx`) | Template (`template.tsx`) |
| :--- | :--- | :--- |
| **Tính chất** | Persistent (Bền vững). | Transient (Tạm thời). |
| **Khi chuyển trang** | Giữ nguyên, không render lại. | Hủy bỏ (Unmount) và tạo mới (Mount). |
| **State (`useState`)** | Được bảo lưu (Giữ giá trị cũ). | Reset về mặc định. |
| **`useEffect`** | Chạy 1 lần duy nhất khi vào web. | Chạy lại mỗi lần chuyển trang. |
| **DOM** | Giữ nguyên DOM cũ. | Xóa DOM cũ, tạo DOM mới. |

### Khi nào dùng cái nào?

#### 1. Dùng `layout.tsx` (90% trường hợp):

- Header, Footer, Sidebar.
- Music Player (bạn muốn nhạc vẫn chạy khi chuyển trang).
- Giỏ hàng (Cart state) muốn giữ nguyên trạng thái đóng/mở.

#### 2. Dùng `template.tsx` (Trường hợp đặc biệt):

- **Animation chuyển trang**: Muốn trang mới Fade-in mỗi khi bấm link.
- **Tracking**: Gửi log lên Google Analytics mỗi khi user xem một trang mới (`useEffect`).
- **Reset Form**: Muốn ô input trống trơn mỗi khi chuyển sang trang khác.

---

## 3. Ví dụ Code: Template Animation

Dưới đây là mẫu code chuẩn để tạo hiệu ứng chuyển trang mượt mà sử dụng `template.tsx` và thư viện `framer-motion`.

### Cài đặt:

```bash
npm install framer-motion
```

### File: `app/template.tsx`

```tsx
'use client'; // Template animation bắt buộc chạy ở Client

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      // Trạng thái ban đầu: Ẩn và lệch sang trái
      initial={{ opacity: 0, x: -20 }}
      
      // Trạng thái kết thúc: Hiện rõ và về giữa
      animate={{ opacity: 1, x: 0 }}
      
      // Độ mượt
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.main>
  );
}
```

---

## 4. Tổng kết

- Bạn không cần viết code lồng nhau (`<Layout><Page/></Layout>`). Next.js tự làm dựa trên tên file.
- Mặc định hãy dùng **Layout**.
- Chỉ đổi tên file thành **Template** nếu bạn cần hiệu ứng chuyển cảnh hoặc muốn reset state.
