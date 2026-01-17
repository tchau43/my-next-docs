# Cẩm Nang Next.js: Dynamic Routes (Tuyến Đường Động)

Tài liệu tổng hợp về cách tạo các route động trong Next.js App Router để xử lý URL với tham số không cố định (Cập nhật chuẩn Next.js 15).

---

## 1. Khái Niệm Cốt Lõi (Concept)

**Dynamic Routes** cho phép bạn tạo các trang với URL động, thay vì phải tạo từng file riêng cho mỗi route.

- **Vấn đề:** Không thể tạo file cho mỗi bài viết/blog post (có thể có hàng nghìn bài).
- **Giải pháp:** Dùng Dynamic Routes để bắt tất cả URL theo pattern và xử lý trong 1 file duy nhất.

---

## 2. Ba Loại Dynamic Routes

Next.js hỗ trợ 3 loại dynamic routes với mức độ linh hoạt khác nhau:

| Loại | Cú pháp | Kiểu dữ liệu | Bắt buộc | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Single Segment** | `[slug]` | `string` | ✅ Có | Blog post, Product detail |
| **Catch-all** | `[...slug]` | `string[]` | ✅ Có | Docs, File browser |
| **Optional Catch-all** | `[[...slug]]` | `string[] \| undefined` | ❌ Không | Shop (vừa trang chủ vừa filter) |

---

## 3. Cấu Trúc Thư Mục

```text
app/
└── dynamic-routes/
    ├── blog/
    │   └── [slug]/              <-- (1) Single Dynamic Segment
    │       └── page.tsx
    │
    ├── docs/
    │   └── [...slug]/           <-- (2) Catch-all Segment
    │       └── page.tsx
    │
    └── shop/
        └── [[...slug]]/         <-- (3) Optional Catch-all Segment
            └── page.tsx
```

---

## 4. Chi Tiết Từng Loại

### 4.1. `[slug]` - Single Dynamic Segment

**Ý nghĩa:** Chỉ nhận đúng **1 tham số duy nhất**.

**Use Case:** Trang chi tiết bài viết, sản phẩm, profile user.

**Ví dụ URL:**
- ✅ `/blog/react-native` → `slug = "react-native"`
- ✅ `/blog/nextjs-15` → `slug = "nextjs-15"`
- ❌ `/blog/react-native/error` → **404 ERROR** (vì có 2 đoạn, vượt quá 1)

**Code:** `app/dynamic-routes/blog/[slug]/page.tsx`

```tsx
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="p-10 border border-blue-500 rounded-xl">
      <h1 className="text-2xl font-bold text-blue-600">Bài viết: {slug}</h1>
      <p>Đây là trang chi tiết bài viết. Nó chỉ nhận đúng 1 tham số.</p>
    </div>
  );
}
```

**Lưu ý:**
- `slug` là `string` (không phải array)
- Next.js 15 yêu cầu `await params` và component phải là `async`

---

### 4.2. `[...slug]` - Catch-all Segments

**Ý nghĩa:** Bắt **tất cả** các đoạn URL, nhưng **bắt buộc phải có ít nhất 1 đoạn**.

**Use Case:** Trang tài liệu phân cấp, file browser, breadcrumb navigation.

**Ví dụ URL:**
- ✅ `/docs/getting-started` → `slug = ['getting-started']`
- ✅ `/docs/getting-started/installation` → `slug = ['getting-started', 'installation']`
- ✅ `/docs/api/auth/login` → `slug = ['api', 'auth', 'login']`
- ❌ `/docs` → **404 ERROR** (vì bắt buộc phải có ít nhất 1 đoạn)

**Code:** `app/dynamic-routes/docs/[...slug]/page.tsx`

```tsx
export default async function DocsPage({ params }: { params: Promise<{ slug: string[] }> }) {
  // Lưu ý: slug ở đây là Mảng chuỗi (string[])
  const { slug } = await params;

  return (
    <div className="p-10 border border-green-500 rounded-xl mt-4">
      <h1 className="text-2xl font-bold text-green-600">Tài liệu kỹ thuật</h1>
      
      {/* Giả lập Breadcrumb */}
      <div className="text-sm text-gray-500 mt-2">
        Đường dẫn: Docs {slug.map(s => ` > ${s}`)}
      </div>

      <p className="mt-4">
        Bạn đang đọc mục: <strong>{slug[slug.length - 1]}</strong>
      </p>
      <p>Cấp độ sâu: {slug.length} tầng.</p>
    </div>
  );
}
```

**Lưu ý:**
- `slug` là `string[]` (mảng)
- Luôn có ít nhất 1 phần tử trong mảng
- Dùng để tạo breadcrumb hoặc phân cấp tài liệu

---

### 4.3. `[[...slug]]` - Optional Catch-all Segments

**Ý nghĩa:** Bắt **tất cả** các đoạn URL, nhưng **không bắt buộc** (có thể không có).

**Use Case:** Trang vừa là trang chủ vừa là trang con (Shop, Dashboard với filter).

**Ví dụ URL:**
- ✅ `/shop` → `slug = undefined` (trang chủ shop)
- ✅ `/shop/iphone` → `slug = ['iphone']`
- ✅ `/shop/iphone/14-pro` → `slug = ['iphone', '14-pro']`
- ✅ `/shop/quan-ao/mua-he` → `slug = ['quan-ao', 'mua-he']`

**Code:** `app/dynamic-routes/shop/[[...slug]]/page.tsx`

```tsx
export default async function ShopPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  // Lưu ý: slug ở đây có thể undefined (dấu ?)
  const { slug } = await params;

  if (!slug) {
    // Trường hợp: /shop (trang chủ)
    return (
      <div className="p-10 border border-purple-500 bg-purple-50 rounded-xl mt-4">
        <h1 className="text-2xl font-bold">🛒 Cửa hàng tổng hợp (Trang chủ Shop)</h1>
        <p>Đang hiển thị toàn bộ sản phẩm hot nhất.</p>
      </div>
    );
  }

  // Trường hợp: /shop/iphone hoặc /shop/iphone/14-pro
  return (
    <div className="p-10 border border-purple-500 rounded-xl mt-4">
      <h1 className="text-2xl font-bold">🛒 Bộ lọc sản phẩm</h1>
      <p>Bạn đang lọc theo danh mục: <strong>{slug.join(' / ')}</strong></p>
    </div>
  );
}
```

**Lưu ý:**
- `slug` là `string[] | undefined` (có thể undefined)
- Phải kiểm tra `if (!slug)` để phân biệt trang chủ và trang con
- Giúp gộp logic trang chủ và trang con vào 1 file

---

## 5. Cách Next.js Parse URL

### Quy trình xử lý:

1. **Tách URL thành segments:**
   ```
   URL: /dynamic-routes/shop/iphone/14-pro
        ↓
   Segments: ['dynamic-routes', 'shop', 'iphone', '14-pro']
   ```

2. **Tìm file route phù hợp:**
   ```
   app/dynamic-routes/shop/[[...slug]]/page.tsx
   ```

3. **Extract params:**
   - Phần cố định: `dynamic-routes/shop`
   - Phần động: `iphone/14-pro`
   - → `slug = ['iphone', '14-pro']`

### Ví dụ cụ thể:

| URL | Folder Route | Phần cố định | Phần động | Giá trị `slug` |
| :--- | :--- | :--- | :--- | :--- |
| `/blog/react-native` | `blog/[slug]` | `/blog` | `react-native` | `"react-native"` |
| `/docs/getting-started/install` | `docs/[...slug]` | `/docs` | `getting-started/install` | `['getting-started', 'install']` |
| `/shop` | `shop/[[...slug]]` | `/shop` | (không có) | `undefined` |
| `/shop/iphone` | `shop/[[...slug]]` | `/shop` | `iphone` | `['iphone']` |

---

## 6. Lưu ý Quan Trọng về Next.js 15

### Về `params` (Bắt buộc)

Từ Next.js 15, `params` là **Promise** và phải `await`:

```tsx
// ❌ SAI (Next.js 14 cũ)
export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params; // Lỗi!
}

// ✅ ĐÚNG (Next.js 15)
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Đúng!
}
```

### Về TypeScript Types

- `[slug]` → `params: Promise<{ slug: string }>`
- `[...slug]` → `params: Promise<{ slug: string[] }>`
- `[[...slug]]` → `params: Promise<{ slug?: string[] }>` (có dấu `?`)

---

## 7. So Sánh và Khi Nào Dùng

### Khi nào dùng `[slug]`?

- ✅ Trang chi tiết với **1 tham số duy nhất**
- ✅ Blog post, Product detail, User profile
- ✅ URL có độ sâu cố định: `/blog/{slug}`

### Khi nào dùng `[...slug]`?

- ✅ Trang có **phân cấp nhiều tầng**
- ✅ Docs, File browser, Breadcrumb navigation
- ✅ URL có độ sâu **không cố định** nhưng **bắt buộc phải có**

### Khi nào dùng `[[...slug]]`?

- ✅ Trang vừa là **trang chủ** vừa là **trang con**
- ✅ Shop với filter, Dashboard với dynamic sections
- ✅ Muốn gộp logic trang chủ và trang con vào **1 file duy nhất**

---

## 8. Tổng Kết

1. **`[slug]`**: 1 tham số, kiểu `string` → Dùng cho trang chi tiết đơn giản
2. **`[...slug]`**: Nhiều tham số, kiểu `string[]`, bắt buộc → Dùng cho phân cấp tài liệu
3. **`[[...slug]]`**: Nhiều tham số, kiểu `string[] | undefined`, tùy chọn → Dùng cho trang chủ + trang con

**Quan trọng:** Next.js 15 yêu cầu `await params` và component phải là `async function`.
