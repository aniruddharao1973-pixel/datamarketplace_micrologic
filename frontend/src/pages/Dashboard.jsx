// // frontend/src/pages/Dashboard.jsx
// import { useState } from "react";
// import { useAuth } from "../auth/AuthContext";
// import CreateUserModal from "../components/modal/CreateUserModal";

// export default function Dashboard() {
//   const { user, logout } = useAuth();
//   const [openCreateUser, setOpenCreateUser] = useState(false);

//   return (
//     <div className="font-mono px-6 py-10 max-w-[1280px] mx-auto">
//       {/* Page header */}
//       <div className="mb-10">
//         <p className="text-[0.62rem] tracking-[0.18em] uppercase text-indigo-500/70 mb-2">
//           Overview
//         </p>
//         <h1
//           className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase tracking-wide"
//           style={{ fontFamily: "'Syne', sans-serif" }}
//         >
//           Dashboard
//         </h1>
//         <div className="mt-3 h-px w-16 bg-gradient-to-r from-indigo-500 to-violet-500" />
//         <p className="mt-3 text-[0.75rem] tracking-[0.04em] text-gray-500">
//           Overview of your account and access
//         </p>
//       </div>

//       {/* Content grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//         {/* User info card */}
//         <div className="relative rounded-lg border border-gray-200 bg-white shadow-sm p-6 overflow-hidden">
//           <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />

//           <p className="text-[0.62rem] tracking-[0.14em] uppercase text-gray-400 mb-4">
//             Signed in user
//           </p>

//           <div className="space-y-3">
//             <div>
//               <p className="text-[0.6rem] tracking-[0.1em] uppercase text-gray-400 mb-1">
//                 Email
//               </p>
//               <p className="text-sm text-gray-800 tracking-[0.02em]">
//                 {user.email}
//               </p>
//             </div>

//             <div className="w-full h-px bg-gray-100" />

//             <div className="flex items-center justify-between">
//               <p className="text-[0.6rem] tracking-[0.1em] uppercase text-gray-400">
//                 Role
//               </p>
//               <span className="inline-flex items-center text-[0.62rem] tracking-[0.12em] uppercase text-indigo-500 border border-indigo-200 rounded-[3px] px-[0.55rem] py-[0.2rem] bg-indigo-50">
//                 {user.role}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Actions card */}
//         <div className="relative rounded-lg border border-gray-200 bg-white shadow-sm p-6 flex flex-col justify-between overflow-hidden">
//           <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />

//           <div>
//             <p className="text-[0.62rem] tracking-[0.14em] uppercase text-gray-400 mb-4">
//               Account actions
//             </p>
//             <p className="text-[0.75rem] tracking-[0.02em] text-gray-500 leading-relaxed">
//               Manage your session and platform access.
//             </p>

//             {/* Admin only — Create User */}
//             {user.role === "admin" && (
//               <button
//                 onClick={() => setOpenCreateUser(true)}
//                 className="mt-5 font-mono text-[0.7rem] tracking-[0.08em] uppercase text-indigo-500 border border-indigo-200 rounded px-4 py-[0.5rem] bg-transparent cursor-pointer transition-all duration-150 hover:text-indigo-700 hover:border-indigo-400 hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
//               >
//                 Create User
//               </button>
//             )}
//           </div>

//           <button
//             onClick={logout}
//             className="mt-8 font-mono text-[0.7rem] tracking-[0.08em] uppercase text-gray-500 bg-transparent border border-gray-200 rounded px-4 py-[0.5rem] cursor-pointer whitespace-nowrap transition-all duration-150 hover:text-red-600 hover:border-red-300 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 self-start"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Create User Modal */}
//       <CreateUserModal
//         open={openCreateUser}
//         onClose={() => setOpenCreateUser(false)}
//       />
//     </div>
//   );
// }

// frontend/src/pages/Dashboard.jsx
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import CreateUserModal from "../components/modal/CreateUserModal";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [openCreateUser, setOpenCreateUser] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-violet-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14 max-w-6xl mx-auto">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 sm:mb-14">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200/50">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Welcome, manage your account
              </p>
            </div>
          </div>
        </div>

        {/* Stats / Quick Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10">
          {/* Status Card */}
          <div className="group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100/40 hover:border-indigo-200/60 hover:-translate-y-0.5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Status
              </p>
            </div>
            <p className="text-lg sm:text-xl font-bold text-gray-800">Active</p>
            <p className="text-xs text-gray-400 mt-1">Session is running</p>
          </div>

          {/* Role Card */}
          <div className="group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:shadow-violet-100/40 hover:border-violet-200/60 hover:-translate-y-0.5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-violet-500"
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
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Role
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <p className="text-lg sm:text-xl font-bold text-gray-800 capitalize">
                {user.role}
              </p>
              <span
                className={`inline-flex items-center text-[0.625rem] font-bold uppercase tracking-widest rounded-full px-2.5 py-0.5 ${
                  user.role === "admin"
                    ? "text-amber-700 bg-amber-100/80"
                    : "text-indigo-600 bg-indigo-100/80"
                }`}
              >
                {user.role === "admin" ? "★ Admin" : "Member"}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Access level assigned</p>
          </div>

          {/* Account Card */}
          <div className="group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-5 sm:p-6 sm:col-span-2 lg:col-span-1 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/40 hover:border-blue-200/60 hover:-translate-y-0.5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-500"
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
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Account
              </p>
            </div>
            <p className="text-sm sm:text-base font-bold text-gray-800 truncate">
              {user.email}
            </p>
            <p className="text-xs text-gray-400 mt-1">Primary email</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-3 relative bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100/30">
            {/* Gradient top border */}
            <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

            <div className="p-5 sm:p-7">
              <div className="flex items-start gap-4 sm:gap-5 mb-6">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200/40">
                    <span className="text-xl sm:text-2xl font-bold text-white uppercase">
                      {user.email?.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white" />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                    {user.email?.split("@")[0]}
                  </h2>
                  <p className="text-sm text-gray-400 truncate">{user.email}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span
                      className={`inline-flex items-center text-[0.625rem] font-bold uppercase tracking-wider rounded-full px-2.5 py-1 ${
                        user.role === "admin"
                          ? "text-amber-700 bg-amber-50 border border-amber-200/60"
                          : "text-indigo-600 bg-indigo-50 border border-indigo-200/60"
                      }`}
                    >
                      {user.role}
                    </span>
                    <span className="inline-flex items-center text-[0.625rem] font-medium text-emerald-600 bg-emerald-50 border border-emerald-200/60 rounded-full px-2.5 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5" />
                      Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-0 divide-y divide-gray-100">
                <div className="flex items-center justify-between py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <svg
                        className="w-3.5 h-3.5 text-gray-400"
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
                    </div>
                    <span className="text-sm text-gray-500">Email</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800 truncate max-w-[50%] text-right">
                    {user.email}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <svg
                        className="w-3.5 h-3.5 text-gray-400"
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
                    </div>
                    <span className="text-sm text-gray-500">Role</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800 capitalize">
                    {user.role}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <svg
                        className="w-3.5 h-3.5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-500">Session</span>
                  </div>
                  <span className="text-sm font-medium text-emerald-600">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Panel */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Quick Actions */}
            <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-violet-100/30 flex-1">
              <div className="h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

              <div className="p-5 sm:p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-violet-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                    Quick Actions
                  </h3>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-5">
                  Manage your session and platform access from here.
                </p>

                <div className="space-y-3 mt-auto">
                  {/* Admin only — Create User */}
                  {user.role === "admin" && (
                    <button
                      onClick={() => setOpenCreateUser(true)}
                      className="group w-full flex items-center gap-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl px-5 py-3.5 cursor-pointer transition-all duration-200 hover:from-indigo-600 hover:to-violet-700 hover:shadow-lg hover:shadow-indigo-200/50 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:scale-[0.98]"
                    >
                      <svg
                        className="w-4.5 h-4.5 transition-transform duration-200 group-hover:rotate-90"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      Create New User
                    </button>
                  )}

                  <button
                    onClick={logout}
                    className="group w-full flex items-center gap-3 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl px-5 py-3.5 cursor-pointer transition-all duration-200 hover:text-red-600 hover:border-red-200 hover:bg-red-50/80 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 active:scale-[0.98]"
                  >
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
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
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Info tip card */}
            <div className="relative bg-gradient-to-br from-indigo-500/[0.04] to-violet-500/[0.06] backdrop-blur-sm rounded-2xl border border-indigo-200/40 p-5">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-100/80 flex items-center justify-center mt-0.5">
                  <svg
                    className="w-4 h-4 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-indigo-900/70 mb-1">
                    Need help?
                  </p>
                  <p className="text-[0.7rem] leading-relaxed text-indigo-700/50">
                    Your session is securely managed. Use the actions above to
                    manage users or sign out safely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create User Modal */}
      <CreateUserModal
        open={openCreateUser}
        onClose={() => setOpenCreateUser(false)}
      />
    </div>
  );
}
