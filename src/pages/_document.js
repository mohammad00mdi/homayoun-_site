// _document.js
import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head />
      <body className="bg-black text-white antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
