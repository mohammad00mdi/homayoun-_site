// pages/_app.js
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-black text-white antialiased">
        {/* فقط این div اسکرول میشه */}
        <div className="h-dvh overflow-y-auto overflow-x-hidden scrollbar-hide">
          <Component {...pageProps} />
        </div>
      </body>
    </html>
  );
}
