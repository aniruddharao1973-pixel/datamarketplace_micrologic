// // frontend/src/components/Navbar.jsx
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-[#0a0a0f] border-b border-white/[0.06] font-mono relative">
//       {/* Indigo gradient line at bottom of nav */}
//       <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

//       <div className="max-w-[1280px] mx-auto px-6">
//         <div className="flex items-center justify-between h-14 gap-8">
//           {/* Left */}
//           <div className="flex items-center gap-10">
//             {/* Brand */}
//             <Link to="/" className="flex items-center gap-2 no-underline">
//               <div className="w-[22px] h-[22px] bg-gradient-to-br from-indigo-500 to-violet-500 rounded-[5px] flex items-center justify-center shrink-0">
//                 <svg
//                   width="12"
//                   height="12"
//                   viewBox="0 0 12 12"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="fill-white"
//                 >
//                   <rect x="1" y="1" width="4" height="4" rx="0.5" />
//                   <rect
//                     x="7"
//                     y="1"
//                     width="4"
//                     height="4"
//                     rx="0.5"
//                     opacity="0.6"
//                   />
//                   <rect
//                     x="1"
//                     y="7"
//                     width="4"
//                     height="4"
//                     rx="0.5"
//                     opacity="0.6"
//                   />
//                   <rect
//                     x="7"
//                     y="7"
//                     width="4"
//                     height="4"
//                     rx="0.5"
//                     opacity="0.4"
//                   />
//                 </svg>
//               </div>
//               <span
//                 className="font-bold text-[0.95rem] tracking-wide text-white uppercase"
//                 style={{ fontFamily: "'Syne', sans-serif" }}
//               >
//                 Data Marketplace
//               </span>
//             </Link>

//             {/* Desktop nav links */}
//             <div className="hidden md:flex items-center gap-1">
//               <Link
//                 to="/datasets"
//                 className="no-underline text-[0.72rem] tracking-[0.08em] uppercase text-white/45 px-[0.65rem] py-[0.35rem] rounded hover:text-white/90 hover:bg-white/5 transition-colors duration-150"
//               >
//                 Datasets
//               </Link>
//               {user?.role === "admin" && (
//                 <Link
//                   to="/access-requests"
//                   className="no-underline text-[0.72rem] tracking-[0.08em] uppercase text-violet-400/70 px-[0.65rem] py-[0.35rem] rounded hover:text-violet-400 hover:bg-violet-500/[0.08] transition-colors duration-150"
//                 >
//                   Access Requests
//                 </Link>
//               )}
//             </div>
//           </div>

//           {/* Right */}
//           <div className="flex items-center gap-4">
//             {/* User info */}
//             <div className="hidden sm:flex flex-col items-end gap-px">
//               <span className="text-[0.62rem] tracking-[0.1em] uppercase text-white/25">
//                 Signed in as
//               </span>
//               <span className="text-[0.72rem] tracking-[0.02em] text-white/70">
//                 {user.email}
//               </span>
//             </div>

//             {/* Divider */}
//             <div className="hidden sm:block w-px h-5 bg-white/[0.08]" />

//             {/* Role badge */}
//             <span className="hidden sm:inline-flex items-center text-[0.62rem] tracking-[0.12em] uppercase text-indigo-400/90 border border-indigo-500/30 rounded-[3px] px-[0.55rem] py-[0.2rem] bg-indigo-500/[0.06]">
//               {user.role}
//             </span>

//             {/* Logout */}
//             <button
//               onClick={handleLogout}
//               className="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-white/50 bg-transparent border border-white/[0.12] rounded px-3 py-[0.4rem] cursor-pointer whitespace-nowrap transition-all duration-150 hover:text-red-500 hover:border-red-500/40 hover:bg-red-500/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Mobile nav */}
//         <div className="md:hidden flex flex-col gap-1 pt-2 pb-3 border-t border-white/[0.04]">
//           <Link
//             to="/datasets"
//             className="no-underline text-[0.7rem] tracking-[0.08em] uppercase text-white/40 px-2 py-[0.4rem] rounded hover:text-white/85 hover:bg-white/5 transition-colors duration-150"
//           >
//             Datasets
//           </Link>
//           {user?.role === "admin" && (
//             <Link
//               to="/access-requests"
//               className="no-underline text-[0.7rem] tracking-[0.08em] uppercase text-violet-500/60 px-2 py-[0.4rem] rounded hover:text-violet-400 hover:bg-violet-500/[0.08] transition-colors duration-150"
//             >
//               Access Requests
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// frontend/src/components/Navbar.jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 font-sans">
      {/* Glass background */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/60" />

      {/* Gradient accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center gap-8 lg:gap-10">
            {/* Brand */}
            <Link
              to="/"
              className="flex items-center gap-2.5 no-underline group"
            >
              <div className="relative">
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-indigo-500/30">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-white"
                  >
                    <rect x="2" y="2" width="5.5" height="5.5" rx="1.5" />
                    <rect
                      x="10.5"
                      y="2"
                      width="5.5"
                      height="5.5"
                      rx="1.5"
                      opacity="0.7"
                    />
                    <rect
                      x="2"
                      y="10.5"
                      width="5.5"
                      height="5.5"
                      rx="1.5"
                      opacity="0.7"
                    />
                    <rect
                      x="10.5"
                      y="10.5"
                      width="5.5"
                      height="5.5"
                      rx="1.5"
                      opacity="0.45"
                    />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-20" />
              </div>
              <span className="font-bold text-base sm:text-lg tracking-tight text-gray-900">
                Data
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Marketplace
                </span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/datasets"
                className={`no-underline relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive("/datasets")
                    ? "text-indigo-700 bg-indigo-50"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/70"
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75"
                    />
                  </svg>
                  Datasets
                </span>
                {isActive("/datasets") && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
                )}
              </Link>

              {/* {user?.role === "admin" && (
                <Link
                  to="/access-requests"
                  className={`no-underline relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive("/access-requests")
                      ? "text-violet-700 bg-violet-50"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/70"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                      />
                    </svg>
                    Access Requests
                  </span>
                  {isActive("/access-requests") && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
                  )}
                </Link>
              )} */}
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* User info - desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-3 bg-gray-50/80 rounded-xl pl-1 pr-4 py-1 border border-gray-100">
                {/* Mini avatar */}
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-white uppercase">
                    {user.email?.charAt(0)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-800 leading-tight truncate max-w-[140px]">
                    {user.email?.split("@")[0]}
                  </span>
                  <span className="text-[0.65rem] text-gray-400 leading-tight truncate max-w-[140px]">
                    {user.email}
                  </span>
                </div>
              </div>

              {/* Role badge */}
              <span
                className={`inline-flex items-center text-[0.65rem] font-bold uppercase tracking-wider rounded-lg px-2.5 py-1.5 ${
                  user.role === "admin"
                    ? "text-amber-700 bg-amber-50 border border-amber-200/70"
                    : "text-indigo-600 bg-indigo-50 border border-indigo-200/70"
                }`}
              >
                {user.role === "admin" && (
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )}
                {user.role}
              </span>

              {/* Divider */}
              <div className="w-px h-8 bg-gray-200" />
            </div>

            {/* Logout button - desktop */}
            <button
              onClick={handleLogout}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-xl px-4 py-2 cursor-pointer transition-all duration-200 hover:text-red-600 hover:border-red-200 hover:bg-red-50 hover:shadow-sm hover:shadow-red-100/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 active:scale-[0.97]"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              <span className="hidden lg:inline">Logout</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col items-center justify-center w-5 h-5 gap-[5px]">
                <span
                  className={`block h-[2px] w-5 bg-current rounded-full transition-all duration-300 ${
                    mobileOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`block h-[2px] w-5 bg-current rounded-full transition-all duration-300 ${
                    mobileOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`block h-[2px] w-5 bg-current rounded-full transition-all duration-300 ${
                    mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden relative overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-white/90 backdrop-blur-xl" />
        <div className="relative border-t border-gray-200/60 px-4 pt-3 pb-5 space-y-1">
          {/* Mobile user card */}
          <div className="flex items-center gap-3 bg-gray-50/80 rounded-xl p-3 mb-4 border border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-200/40">
              <span className="text-sm font-bold text-white uppercase">
                {user.email?.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {user.email?.split("@")[0]}
              </p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
            <span
              className={`inline-flex items-center text-[0.6rem] font-bold uppercase tracking-wider rounded-lg px-2 py-1 flex-shrink-0 ${
                user.role === "admin"
                  ? "text-amber-700 bg-amber-50 border border-amber-200/70"
                  : "text-indigo-600 bg-indigo-50 border border-indigo-200/70"
              }`}
            >
              {user.role}
            </span>
          </div>

          {/* Mobile nav links */}
          <Link
            to="/datasets"
            onClick={() => setMobileOpen(false)}
            className={`no-underline flex items-center gap-3 text-sm font-medium px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive("/datasets")
                ? "text-indigo-700 bg-indigo-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75"
              />
            </svg>
            Datasets
            {isActive("/datasets") && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
            )}
          </Link>

          {/* {user?.role === "admin" && (
            <Link
              to="/access-requests"
              onClick={() => setMobileOpen(false)}
              className={`no-underline flex items-center gap-3 text-sm font-medium px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive("/access-requests")
                  ? "text-violet-700 bg-violet-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              Access Requests
              {isActive("/access-requests") && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />
              )}
            </Link>
          )} */}

          {/* Divider */}
          <div className="h-px bg-gray-100 my-2" />

          {/* Mobile logout */}
          <button
            onClick={() => {
              setMobileOpen(false);
              handleLogout();
            }}
            className="w-full flex items-center gap-3 text-sm font-medium text-gray-500 px-4 py-3 rounded-xl transition-all duration-200 hover:text-red-600 hover:bg-red-50 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}
