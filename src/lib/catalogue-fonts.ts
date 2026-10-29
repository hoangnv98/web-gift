import localFont from "next/font/local";

/**
 * Bộ font riêng cho trang catalogue (theo mẫu in): SVN-Poppins (bản Việt hoá của Poppins,
 * Poppins gốc trên Google Fonts không có dấu tiếng Việt) + Bodoni Moda cho tên set quà.
 * Dùng `catalogueFonts.className` bọc ngoài vùng cần font; tiện ích Tailwind: font-cat-sans / font-cat-serif.
 */
export const poppins = localFont({
  variable: "--font-poppins",
  display: "swap",
  src: [
    { path: "../fonts/SVN-Poppins-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/SVN-Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/SVN-Poppins-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/SVN-Poppins-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/SVN-Poppins-Bold.ttf", weight: "700", style: "normal" },
  ],
});

export const bodoni = localFont({
  variable: "--font-bodoni",
  display: "swap",
  src: [{ path: "../fonts/BodoniModa-Variable.ttf", weight: "400 900", style: "normal" }],
});

export const catalogueFontsClassName = `${poppins.variable} ${bodoni.variable}`;
