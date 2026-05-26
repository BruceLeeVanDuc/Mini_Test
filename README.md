This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Vertical Video Feed - Mini Test

## Mô tả

Dự án xây dựng trang xem video dạng cuộn dọc bằng Next.js, TypeScript và Tailwind CSS.

Ứng dụng mô phỏng giao diện short-video feed, mỗi video chiếm toàn bộ màn hình hoặc khung 9:16 ở desktop.

## Công nghệ sử dụng

- Next.js App Router
- TypeScript
- Tailwind CSS
- Intersection Observer API
- CSS Scroll Snap

## Chức năng

- Hiển thị danh sách video từ mock data
- Cuộn dọc từng video bằng CSS Scroll Snap
- Click vào video để Play/Pause
- Tự động Play video khi video nằm trong viewport
- Tự động Pause video khi cuộn qua
- Nút Like đổi trạng thái và tăng/giảm số lượng like
- Có các nút tương tác: Like, Comment, Share
- Responsive giao diện mobile/desktop

## Logic Play/Pause khi cuộn

Mỗi video được quản lý trong component `VideoCard`.

Component sử dụng `useRef` để tham chiếu tới thẻ `video` và container của video.

Khi component mount, `IntersectionObserver` được khởi tạo để theo dõi video card. Nếu video xuất hiện trong viewport theo ngưỡng `threshold: 0.6`, hàm `play()` của HTMLVideoElement sẽ được gọi để phát video.

Khi video rời khỏi viewport, ứng dụng gọi `pause()` để dừng video, reset `currentTime = 0`, đồng thời cập nhật state `isPlaying` về `false`.

Ngoài ra, người dùng có thể click trực tiếp vào vùng video để chuyển trạng thái Play/Pause thủ công.

## Cách chạy project

```bash
npm install
npm run dev