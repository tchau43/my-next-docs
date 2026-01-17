// app/component-hierarchy/template.tsx

'use client'; // Animation bắt buộc phải chạy ở Client

// 1. Import motion từ framer-motion
import { AnimationGeneratorType, motion } from 'framer-motion';

// 2. Định nghĩa các trạng thái animation (Variants)
// Giúp code gọn gàng và dễ tái sử dụng
const variants = {
  hidden: { opacity: 0, x: -50, y: 0 }, // Trạng thái ban đầu: Ẩn, dịch sang trái 50px
  enter: { opacity: 1, x: 0, y: 0 },    // Trạng thái kết thúc: Hiện rõ, về vị trí gốc
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    // 3. Thay thẻ HTML thường (div/main) bằng motion.div/motion.main
    <motion.main
      // Áp dụng variants đã định nghĩa ở trên
      variants={variants}
      
      // Trạng thái bắt đầu khi component được mount
      initial="hidden" 
      
      // Trạng thái mong muốn animation chạy tới
      animate="enter" 
      
      // Cấu hình độ mượt của chuyển động
      transition={{ type: 'easeInOut' as AnimationGeneratorType, duration: 0.5 }}
      
      // Thêm chút style để dễ nhìn cái khung template
      className="border-2 border-red-400 border-dashed p-6 mt-4 rounded-lg bg-red-50"
    >
      <p className="text-red-500 mb-4 text-sm font-bold">
        ⚡ Khung Template này đang chạy Animation Fade-in
      </p>
      
      {/* Nội dung trang con (Page) */}
      {children}
    </motion.main>
  );
}