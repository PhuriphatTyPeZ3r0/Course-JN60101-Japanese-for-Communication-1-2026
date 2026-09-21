import type { Metadata, Viewport } from "next";
import { Kanit, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-jp",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: "Hanase AI (話せ AI) — Interactive Japanese Speaking Coach",
  description:
    "โค้ช AI ฝึกพูดภาษาญี่ปุ่นแบบโต้ตอบเรียลไทม์ ตรวจสำเนียงแม่นยำด้วยคณิตศาสตร์ (Phonetics) พร้อมระบบจำลองการสอบพูด 0ms latency",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${kanit.variable} ${notoSansJP.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('unhandledrejection', function(event) {
                if (event && event.reason && event.reason.message && event.reason.message.indexOf('message channel closed before a response was received') !== -1) {
                  event.preventDefault();
                }
              });
            `,
          }}
        />
      </head>
      <body className="bg-slate-50 text-slate-800 font-sans min-h-screen flex flex-col antialiased selection:bg-rose-100 selection:text-rose-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
