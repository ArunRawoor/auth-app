// // src/app/layout.jsx
import './globals.css';

export const metadata = {
  title: 'Arun-App | Next.js & NeonDB',
  description: 'User authentication with Next.js and NeonDB',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}

