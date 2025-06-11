export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <p>© {new Date().getFullYear()} Next.js Auth with NeonDB. All rights reserved.</p>
          <p className="mt-2 text-gray-400">Built with Next.js and PostgreSQL by Arun Rawoor</p>
        </div>
      </div>
    </footer>
  );
}