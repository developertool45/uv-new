export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-slate-800 pb-12">
          {/* About Section */}
          <div>
            <h2 className="text-2xl font-black italic mb-4">
              UV<span className="text-red-600">NEWS</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Leading the way in news aggregation. We bring you the most
              reliable stories from global sources, delivered in real-time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-red-600">
              Resources
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-white cursor-pointer transition-colors">
                About Us
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Privacy Policy
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Contact Support
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-red-600">
              Stay Updated
            </h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-slate-800 border-none text-white px-4 py-2 rounded-l-md w-full focus:ring-1 focus:ring-red-600 outline-none"
              />
              <button className="bg-red-600 px-4 py-2 rounded-r-md font-bold text-sm hover:bg-red-700 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-slate-500 text-xs font-medium">
          © {new Date().getFullYear()} UV NEWS. Built with Next.js for
          Performance.
        </div>
      </div>
    </footer>
  );
}
