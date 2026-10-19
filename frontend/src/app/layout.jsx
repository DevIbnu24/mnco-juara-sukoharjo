import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
