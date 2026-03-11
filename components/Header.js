import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-3xl font-black tracking-tighter italic text-slate-900">
              UV<span className="text-red-600">NEWS</span>
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            {["India", "International", "Tech", "Sports"].map((item) => (
              <Link
                key={item}
                href="/"
                className="text-sm font-bold text-slate-600 hover:text-red-600 transition-colors uppercase tracking-widest"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Subscribe Button */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-bold text-slate-900 border-2 border-slate-900 px-4 py-2 rounded-md hover:bg-slate-900 hover:text-white transition-all">
              Login
            </button>
            <button className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-md hover:bg-red-700 shadow-lg shadow-red-200 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
