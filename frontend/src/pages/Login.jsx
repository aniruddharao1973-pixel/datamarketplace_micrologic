// // frontend/src/pages/Login.jsx
// import { useState } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const { login } = useAuth();
//   const nav = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const submit = async (e) => {
//     e.preventDefault();
//     await login(email, password);
//     nav("/");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md">
//         {/* Brand mark above card */}
//         <div className="flex flex-col items-center mb-8">
//           <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-[8px] flex items-center justify-center mb-4">
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 12 12"
//               xmlns="http://www.w3.org/2000/svg"
//               className="fill-white"
//             >
//               <rect x="1" y="1" width="4" height="4" rx="0.5" />
//               <rect x="7" y="1" width="4" height="4" rx="0.5" opacity="0.6" />
//               <rect x="1" y="7" width="4" height="4" rx="0.5" opacity="0.6" />
//               <rect x="7" y="7" width="4" height="4" rx="0.5" opacity="0.4" />
//             </svg>
//           </div>
//           <p className="text-[0.62rem] tracking-[0.18em] uppercase text-indigo-500/70 font-mono">
//             Data Marketplace
//           </p>
//         </div>

//         {/* Card */}
//         <form
//           onSubmit={submit}
//           className="relative rounded-lg bg-white border border-gray-200 shadow-sm p-8 overflow-hidden font-mono"
//         >
//           {/* Top accent line */}
//           <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />

//           {/* Header */}
//           <div className="mb-8">
//             <p className="text-[0.62rem] tracking-[0.18em] uppercase text-gray-400 mb-1">
//               Welcome back
//             </p>
//             <h2
//               className="text-2xl font-bold text-gray-900 uppercase tracking-wide"
//               style={{ fontFamily: "'Syne', sans-serif" }}
//             >
//               Sign In
//             </h2>
//             <div className="mt-2 h-px w-10 bg-gradient-to-r from-indigo-500 to-violet-500" />
//           </div>

//           {/* Email */}
//           <div className="mb-5">
//             <label className="block text-[0.62rem] tracking-[0.12em] uppercase text-gray-400 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full rounded border border-gray-200 bg-gray-50 px-3 py-2.5 text-[0.78rem] tracking-[0.02em] text-gray-800 placeholder-gray-300 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 focus:bg-white transition-all duration-150"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-8">
//             <label className="block text-[0.62rem] tracking-[0.12em] uppercase text-gray-400 mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="••••••••"
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full rounded border border-gray-200 bg-gray-50 px-3 py-2.5 text-[0.78rem] tracking-[0.02em] text-gray-800 placeholder-gray-300 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 focus:bg-white transition-all duration-150"
//               required
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full font-mono text-[0.72rem] tracking-[0.1em] uppercase text-white bg-indigo-600 border border-indigo-600 rounded py-2.5 cursor-pointer transition-all duration-150 hover:bg-indigo-700 hover:border-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
//           >
//             Login
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="mt-6 text-center text-[0.62rem] tracking-[0.1em] uppercase text-gray-300 font-mono">
//           © {new Date().getFullYear()} Data Marketplace
//         </p>
//       </div>
//     </div>
//   );
// }

// frontend/src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    await login(email, password);
    nav("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 px-4 py-8 sm:py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-100/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand header */}
        <div className="flex flex-col items-center mb-8 sm:mb-10">
          <div className="relative group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200/50 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
              <svg
                width="28"
                height="28"
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
            <div className="absolute -inset-2 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />
          </div>

          <h1 className="mt-5 text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
            Data
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Marketplace
            </span>
          </h1>
          <p className="mt-1.5 text-sm text-gray-400">
            Sign in to your account
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={submit}
          className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/60 shadow-xl shadow-gray-200/40 overflow-hidden"
        >
          {/* Top gradient bar */}
          <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

          <div className="p-6 sm:p-8 lg:p-10">
            {/* Header */}
            <div className="mb-7 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Welcome
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                Enter your credentials to continue
              </p>
            </div>

            {/* Email field */}
            <div className="mb-5">
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2.5">
                <svg
                  className={`w-3.5 h-3.5 transition-colors duration-200 ${focused === "email" ? "text-indigo-500" : "text-gray-400"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 sm:py-3.5 text-sm text-gray-800 placeholder-gray-300 transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white hover:border-gray-300"
                  required
                />
                {email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                      className="w-4.5 h-4.5 text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Password field */}
            <div className="mb-8">
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2.5">
                <svg
                  className={`w-3.5 h-3.5 transition-colors duration-200 ${focused === "password" ? "text-indigo-500" : "text-gray-400"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 sm:py-3.5 text-sm text-gray-800 placeholder-gray-300 transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white hover:border-gray-300 pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer p-0.5"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg
                      className="w-4.5 h-4.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4.5 h-4.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="group relative w-full flex items-center justify-center gap-2.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl py-3.5 sm:py-4 cursor-pointer transition-all duration-300 hover:from-indigo-600 hover:to-violet-700 hover:shadow-xl hover:shadow-indigo-200/60 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <span>Sign In</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>

            {/* Secure indicator */}
            <div className="flex items-center justify-center gap-2 mt-5">
              <svg
                className="w-3.5 h-3.5 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              <span className="text-xs text-gray-400">
                Secured with encryption
              </span>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <p className="text-xs text-gray-300 tracking-wide">
            © {new Date().getFullYear()} Data Marketplace — All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}
