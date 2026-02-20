// // src\pages\ProducerHome.jsx
// import Dashboard from "./Dashboard";

// export default function ProducerHome() {
//   return (
//     <>
//       {/* Base dashboard */}
//       <Dashboard />

//       {/* Producer-specific section */}
//       <div className="max-w-[1280px] mx-auto px-6 pb-12">
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
//           <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-6">
//             <p className="text-[0.62rem] tracking-[0.14em] uppercase text-white/30 mb-3">
//               Producer actions
//             </p>

//             <ul className="space-y-2 text-[0.72rem] text-white/60">
//               <li>• Create and manage datasets</li>
//               <li>• Upload and attach files</li>
//               <li>• Control consumer access</li>
//             </ul>
//           </div>

//           <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-6">
//             <p className="text-[0.62rem] tracking-[0.14em] uppercase text-white/30 mb-3">
//               Dataset visibility
//             </p>

//             <p className="text-[0.72rem] text-white/40 leading-relaxed">
//               Monitor who has requested access to your datasets and approve or
//               reject requests to control distribution.
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// src/pages/ProducerHome.jsx
import Dashboard from "./Dashboard";

export default function ProducerHome() {
  return (
    <>
      {/* Base dashboard */}
      <Dashboard />

      {/* Producer-specific section */}
      <div className="font-mono max-w-[1280px] mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Producer actions card */}
          <div className="relative rounded-lg border border-gray-200 bg-white shadow-sm p-6 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />

            <p className="text-[0.62rem] tracking-[0.14em] uppercase text-gray-400 mb-4">
              Producer actions
            </p>

            <ul className="space-y-3">
              {[
                "Create and manage datasets",
                "Upload and attach files",
                "Control consumer access",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
                  <span className="text-[0.75rem] tracking-[0.02em] text-gray-600">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dataset visibility card */}
          <div className="relative rounded-lg border border-gray-200 bg-white shadow-sm p-6 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />

            <p className="text-[0.62rem] tracking-[0.14em] uppercase text-gray-400 mb-4">
              Dataset visibility
            </p>

            <p className="text-[0.75rem] tracking-[0.02em] text-gray-500 leading-relaxed">
              Monitor who has requested access to your datasets and approve or
              reject requests to control distribution.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
