// // frontend\src\components\modal\PreviewModal.jsx
// import React from "react";

// export default function PreviewModal({ open, onClose, preview }) {
//   if (!open || !preview) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <div className="bg-white w-full max-w-5xl rounded-lg shadow-lg overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-3 border-b">
//           <h2 className="text-sm font-semibold uppercase tracking-wide">
//             File Preview
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 text-lg"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-5 max-h-[75vh] overflow-auto text-sm">
//           {/* PDF */}
//           {preview.type === "pdf" && preview.url && (
//             <iframe
//               src={preview.url}
//               title="PDF Preview"
//               className="w-full h-[70vh] border rounded"
//             />
//           )}

//           {/* CSV */}
//           {preview.type === "csv" && preview.rows && (
//             <table className="min-w-full border text-xs">
//               <thead className="bg-gray-100">
//                 <tr>
//                   {Object.keys(preview.rows[0] || {}).map((key) => (
//                     <th key={key} className="border px-2 py-1 text-left">
//                       {key}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {preview.rows.map((row, i) => (
//                   <tr key={i}>
//                     {Object.values(row).map((val, j) => (
//                       <td key={j} className="border px-2 py-1">
//                         {String(val)}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}

//           {/* Excel */}
//           {preview.type === "excel" && preview.rows && (
//             <table className="min-w-full border text-xs">
//               <tbody>
//                 {preview.rows.map((row, i) => (
//                   <tr key={i}>
//                     {row.map((cell, j) => (
//                       <td key={j} className="border px-2 py-1">
//                         {cell ?? ""}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}

//           {/* JSON */}
//           {preview.type === "json" && preview.lines && (
//             <pre className="bg-gray-50 border rounded p-3 text-xs">
//               {preview.lines.join("\n")}
//             </pre>
//           )}

//           {/* SQL */}
//           {preview.type === "sql" && preview.lines && (
//             <>
//               {preview.note && (
//                 <p className="mb-2 text-xs text-gray-500">{preview.note}</p>
//               )}
//               <pre className="bg-gray-50 border rounded p-3 text-xs">
//                 {preview.lines.join("\n")}
//               </pre>
//             </>
//           )}

//           {/* ZIP */}
//           {preview.type === "zip" && preview.files && (
//             <ul className="border rounded divide-y text-xs">
//               {preview.files.map((f, i) => (
//                 <li key={i} className="flex justify-between px-3 py-2">
//                   <span>
//                     {f.isDirectory ? "📁" : "📄"} {f.name}
//                   </span>
//                   {!f.isDirectory && (
//                     <span className="text-gray-400">{f.size_kb} KB</span>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className="px-5 py-3 border-t text-xs text-gray-400">
//           Preview only · Purchase required for full download
//         </div>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import RazorpayButton from "../RazorpayButton";

// export default function PreviewModal({ open, onClose, preview }) {
//   if (!open || !preview) return null;

//   const isLocked = preview.locked === true;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <div className="relative bg-white w-full max-w-5xl rounded-xl shadow-lg overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-3 border-b">
//           <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
//             File Preview
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 text-lg"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Content */}
//         <div className="relative p-5 max-h-[75vh] overflow-auto text-sm">
//           {/* PDF */}
//           {preview.type === "pdf" && preview.url && (
//             <iframe
//               src={preview.url}
//               title="PDF Preview"
//               className="w-full h-[70vh] border rounded"
//             />
//           )}

//           {/* CSV */}
//           {preview.type === "csv" && preview.rows && (
//             <table className="min-w-full border text-xs">
//               <thead className="bg-gray-100">
//                 <tr>
//                   {Object.keys(preview.rows[0] || {}).map((key) => (
//                     <th key={key} className="border px-2 py-1 text-left">
//                       {key}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {preview.rows.map((row, i) => (
//                   <tr key={i}>
//                     {Object.values(row).map((val, j) => (
//                       <td key={j} className="border px-2 py-1">
//                         {String(val)}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}

//           {/* Excel */}
//           {preview.type === "excel" && preview.rows && (
//             <table className="min-w-full border text-xs">
//               <tbody>
//                 {preview.rows.map((row, i) => (
//                   <tr key={i}>
//                     {row.map((cell, j) => (
//                       <td key={j} className="border px-2 py-1">
//                         {cell ?? ""}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}

//           {/* JSON */}
//           {preview.type === "json" && preview.lines && (
//             <pre className="bg-gray-50 border rounded p-3 text-xs whitespace-pre-wrap">
//               {preview.lines.join("\n")}
//             </pre>
//           )}

//           {/* SQL */}
//           {preview.type === "sql" && preview.lines && (
//             <>
//               {preview.note && (
//                 <p className="mb-2 text-xs text-gray-500">{preview.note}</p>
//               )}
//               <pre className="bg-gray-50 border rounded p-3 text-xs whitespace-pre-wrap">
//                 {preview.lines.join("\n")}
//               </pre>
//             </>
//           )}

//           {/* ZIP */}
//           {preview.type === "zip" && preview.files && (
//             <ul className="border rounded divide-y text-xs">
//               {preview.files.map((f, i) => (
//                 <li key={i} className="flex justify-between px-3 py-2">
//                   <span>
//                     {f.isDirectory ? "📁" : "📄"} {f.name}
//                   </span>
//                   {!f.isDirectory && (
//                     <span className="text-gray-400">{f.size_kb} KB</span>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           )}

//           {/* 🔒 LOCK OVERLAY */}
//           {isLocked && (
//             <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
//               <div className="max-w-sm text-center p-6 rounded-xl border bg-white shadow-lg">
//                 <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
//                   <svg
//                     className="w-6 h-6 text-indigo-600"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
//                     />
//                   </svg>
//                 </div>

//                 <h3 className="text-sm font-semibold text-gray-800 mb-2">
//                   Preview Locked
//                 </h3>

//                 <p className="text-xs text-gray-500 mb-4">
//                   Purchase this dataset to unlock the full preview and download
//                   all files instantly.
//                 </p>

//                 <RazorpayButton
//                   datasetId={preview.datasetId}
//                   onSuccess={() => {
//                     onClose();
//                     // simple & reliable for now
//                     window.location.reload();
//                   }}
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="px-5 py-3 border-t text-xs text-gray-400">
//           {preview.hasAccess
//             ? "Full preview available · You own this dataset"
//             : "Preview only · Purchase required for full access"}
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import RazorpayButton from "../RazorpayButton";

export default function PreviewModal({ open, onClose, preview }) {
  if (!open || !preview) return null;

  const isLocked = preview.locked === true;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-3 py-4 sm:px-4">
      <div className="relative bg-white w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-gray-50/60 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-500">
              File Preview
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="relative p-3 sm:p-5 overflow-auto flex-1 text-sm bg-white">
          {/* PDF */}
          {preview.type === "pdf" && preview.url && (
            <iframe
              src={preview.url}
              title="PDF Preview"
              className="w-full h-[50vh] sm:h-[60vh] md:h-[65vh] border border-gray-100 rounded-xl"
            />
          )}

          {/* CSV */}
          {preview.type === "csv" && preview.rows && (
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="min-w-full text-xs">
                <thead className="bg-indigo-50/70">
                  <tr>
                    {Object.keys(preview.rows[0] || {}).map((key) => (
                      <th
                        key={key}
                        className="border-b border-gray-100 px-3 py-2 text-left font-semibold text-indigo-700 whitespace-nowrap"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.rows.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}
                    >
                      {Object.values(row).map((val, j) => (
                        <td
                          key={j}
                          className="border-b border-gray-100 px-3 py-2 text-gray-600 whitespace-nowrap"
                        >
                          {String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Excel */}
          {preview.type === "excel" && preview.rows && (
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="min-w-full text-xs">
                <tbody>
                  {preview.rows.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-emerald-50/40"}
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className="border-b border-gray-100 px-3 py-2 text-gray-600 whitespace-nowrap"
                        >
                          {cell ?? ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* JSON */}
          {preview.type === "json" && preview.lines && (
            <pre className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 text-xs whitespace-pre-wrap text-slate-700 leading-relaxed overflow-x-auto">
              {preview.lines.join("\n")}
            </pre>
          )}

          {/* SQL */}
          {preview.type === "sql" && preview.lines && (
            <>
              {preview.note && (
                <p className="mb-2 text-xs text-indigo-400 font-medium">
                  {preview.note}
                </p>
              )}
              <pre className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 text-xs whitespace-pre-wrap text-slate-700 leading-relaxed overflow-x-auto">
                {preview.lines.join("\n")}
              </pre>
            </>
          )}

          {/* ZIP */}
          {preview.type === "zip" && preview.files && (
            <ul className="border border-gray-100 rounded-xl divide-y divide-gray-100 text-xs overflow-hidden">
              {preview.files.map((f, i) => (
                <li
                  key={i}
                  className={`flex justify-between items-center px-3 sm:px-4 py-2 sm:py-3 transition-colors hover:bg-indigo-50/40 ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <span className="text-gray-700 truncate max-w-[70%]">
                    {f.isDirectory ? "📁" : "📄"}{" "}
                    <span className="ml-1">{f.name}</span>
                  </span>
                  {!f.isDirectory && (
                    <span className="text-gray-400 ml-2 flex-shrink-0">
                      {f.size_kb} KB
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* 🔒 LOCK OVERLAY */}
          {isLocked && (
            <div className="absolute inset-0 bg-white/75 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-xs sm:max-w-sm text-center p-5 sm:p-7 rounded-2xl border border-indigo-100 bg-white shadow-xl">
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-full bg-indigo-50 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </div>

                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 sm:mb-2">
                  Preview Locked
                </h3>

                <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                  Purchase this dataset to unlock the full preview and download
                  all files instantly.
                </p>

                <RazorpayButton
                  datasetId={preview.datasetId}
                  onSuccess={() => {
                    onClose();
                    window.location.reload();
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-2 sm:py-3 border-t border-gray-100 bg-gray-50/60 flex-shrink-0 flex items-center gap-2">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              preview.hasAccess ? "bg-emerald-400" : "bg-amber-400"
            }`}
          ></div>
          <p className="text-xs text-gray-400">
            {preview.hasAccess
              ? "Full preview available · You own this dataset"
              : "Preview only · Purchase required for full access"}
          </p>
        </div>
      </div>
    </div>
  );
}
