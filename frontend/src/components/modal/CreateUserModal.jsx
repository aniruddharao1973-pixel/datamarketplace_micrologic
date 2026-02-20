// // src\components\modal\CreateUserModal.jsx
// import { useState } from "react";
// import api from "../../api/axios";

// export default function CreateUserModal({ open, onClose }) {
//   const [role, setRole] = useState("consumer");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   if (!open) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);
//     setLoading(true);

//     try {
//       await api.post("/admin/users", { email, role });
//       setSuccess("User created and email sent.");
//       setEmail("");
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to create user");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
//       <div className="w-full max-w-md rounded-lg border border-white/[0.08] bg-[#0a0a0f] p-6">
//         <h2 className="text-lg font-semibold text-white tracking-wide mb-4">
//           Create User
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Role */}
//           <div>
//             <label className="block text-[0.65rem] uppercase tracking-widest text-white/40 mb-1">
//               Role
//             </label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full bg-black/40 border border-white/[0.12] text-white text-sm px-3 py-2 rounded focus:outline-none"
//             >
//               <option value="consumer">Consumer</option>
//               <option value="producer">Producer</option>
//             </select>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-[0.65rem] uppercase tracking-widest text-white/40 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full bg-black/40 border border-white/[0.12] text-white text-sm px-3 py-2 rounded focus:outline-none"
//               placeholder="user@company.com"
//             />
//           </div>

//           {/* Error / Success */}
//           {error && <p className="text-xs text-red-400">{error}</p>}
//           {success && <p className="text-xs text-green-400">{success}</p>}

//           {/* Actions */}
//           <div className="flex justify-end gap-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="text-[0.7rem] uppercase tracking-widest text-white/50 border border-white/[0.12] px-4 py-2 rounded hover:bg-white/[0.04]"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={loading}
//               className="text-[0.7rem] uppercase tracking-widest text-indigo-300 border border-indigo-500/40 px-4 py-2 rounded hover:bg-indigo-500/10 disabled:opacity-50"
//             >
//               {loading ? "Creating..." : "Create"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// src/components/modal/CreateUserModal.jsx
import { useState } from "react";
import api from "../../api/axios";

export default function CreateUserModal({ open, onClose }) {
  const [role, setRole] = useState("consumer");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await api.post("/admin/users", { email, role });
      setSuccess("User created and email sent.");
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      value: "consumer",
      label: "Consumer",
      desc: "Can browse and purchase datasets",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.6}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      ),
      color: "indigo",
    },
    {
      value: "producer",
      label: "Producer",
      desc: "Can create and manage datasets",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.6}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75"
          />
        </svg>
      ),
      color: "violet",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-200/60 shadow-2xl shadow-gray-300/30 overflow-hidden animate-in">
        {/* Top gradient bar */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-xl bg-gray-100/80 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 z-10"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200/50 flex-shrink-0">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.6}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                Create User
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Invite a new user to the platform
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
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
                Select Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 ${
                      role === r.value
                        ? r.color === "indigo"
                          ? "border-indigo-400 bg-indigo-50/70 shadow-md shadow-indigo-100/50"
                          : "border-violet-400 bg-violet-50/70 shadow-md shadow-violet-100/50"
                        : "border-gray-200/80 bg-gray-50/30 hover:border-gray-300 hover:bg-gray-50/60"
                    }`}
                  >
                    {/* Checkmark */}
                    {role === r.value && (
                      <div
                        className={`absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center ${
                          r.color === "indigo"
                            ? "bg-indigo-500"
                            : "bg-violet-500"
                        }`}
                      >
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </div>
                    )}

                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                        role === r.value
                          ? r.color === "indigo"
                            ? "bg-indigo-100 text-indigo-600"
                            : "bg-violet-100 text-violet-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {r.icon}
                    </div>

                    <div>
                      <p
                        className={`text-sm font-bold transition-colors duration-200 ${
                          role === r.value ? "text-gray-900" : "text-gray-600"
                        }`}
                      >
                        {r.label}
                      </p>
                      <p
                        className={`text-[0.65rem] mt-0.5 leading-snug transition-colors duration-200 ${
                          role === r.value ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        {r.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2.5">
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
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 sm:py-3.5 text-sm text-gray-800 placeholder-gray-300 transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white hover:border-gray-300 pr-10"
                  placeholder="user@company.com"
                />
                {email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                      className="w-4 h-4 text-emerald-400"
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

            {/* Error message */}
            {error && (
              <div className="mb-5 flex items-center gap-2.5 bg-red-50 border border-red-200/60 rounded-xl px-4 py-3">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="mb-5 flex items-center gap-2.5 bg-emerald-50 border border-emerald-200/60 rounded-xl px-4 py-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-emerald-700">
                  {success}
                </p>
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-gray-100 mb-5" />

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl px-5 py-2.5 sm:py-3 cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 active:scale-[0.97]"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl px-6 py-2.5 sm:py-3 cursor-pointer transition-all duration-300 hover:from-indigo-600 hover:to-violet-700 hover:shadow-xl hover:shadow-indigo-200/50 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating…
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
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
                    Create User
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
