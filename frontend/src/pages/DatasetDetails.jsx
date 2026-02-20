// // frontend/src/pages/DatasetDetails.jsx
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getDataset } from "../api/datasets.api";
// import { downloadFile, previewFile } from "../api/files.api";
// import { useAuth } from "../auth/AuthContext";
// import RazorpayButton from "../components/RazorpayButton";
// import PreviewModal from "../components/modal/PreviewModal";
// import { uploadFile, attachFileToDataset } from "../api/files.api";

// export default function DatasetDetails() {
//   const { id: datasetId } = useParams();
//   const { user } = useAuth();

//   const [ds, setDs] = useState(null);
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewData, setPreviewData] = useState(null);

//   const loadDataset = () => {
//     getDataset(datasetId).then((res) => setDs(res.data));
//   };

//   const handleUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const ext = file.name.split(".").pop().toLowerCase();
//     const typeMap = {
//       csv: "csv",
//       pdf: "pdf",
//       json: "json",
//       xlsx: "excel",
//       pptx: "ppt",
//     };

//     const fileType = typeMap[ext] || "other";

//     const uploadRes = await uploadFile(fileType, file);
//     const fileId = uploadRes.data.id;

//     await attachFileToDataset(datasetId, fileId);
//     loadDataset();
//   };

//   useEffect(() => {
//     loadDataset();
//   }, [datasetId]);

//   if (!ds) return null;

//   const isProducer = user?.role === "producer";

//   const canDownload =
//     ds.isOwner || ds.hasAccess || ds.access_type === "public" || isProducer;

//   return (
//     <div className="font-mono px-6 py-10 max-w-[1280px] mx-auto">
//       {/* Header */}
//       <div className="mb-10">
//         <p className="text-[0.62rem] tracking-[0.18em] uppercase text-indigo-500/70 mb-2">
//           Dataset
//         </p>
//         <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase tracking-wide">
//           {ds.name}
//         </h1>
//         {ds.description && (
//           <p className="mt-3 text-[0.78rem] text-gray-500 max-w-2xl">
//             {ds.description}
//           </p>
//         )}
//       </div>

//       {/* Upload */}
//       {ds.canUpload && (
//         <div className="mb-4 flex items-center gap-4">
//           <label className="cursor-pointer text-sm text-indigo-600 border border-indigo-300 px-4 py-2 rounded hover:bg-indigo-50">
//             Upload File
//             <input type="file" className="hidden" onChange={handleUpload} />
//           </label>

//           <span className="text-xs text-gray-400">
//             Upload CSV, PDF, JSON, Excel, PPT
//           </span>
//         </div>
//       )}

//       {/* Files */}
//       <div className="rounded-lg border bg-white shadow-sm">
//         <div className="divide-y">
//           {ds.files.map((f) => (
//             <div
//               key={f.id}
//               className="flex items-center justify-between px-6 py-4"
//             >
//               <div>
//                 <p className="text-sm font-medium">{f.file_type}</p>
//                 <p className="text-xs text-gray-400">{f.file_size_mb} MB</p>
//               </div>

//               <div className="flex items-center gap-3">
//                 {/* Preview */}
//                 <button
//                   onClick={async () => {
//                     if (f.file_type === "pdf") {
//                       setPreviewData({
//                         type: "pdf",
//                         url: `${import.meta.env.VITE_API_URL}/files/preview/${datasetId}/${f.id}`,
//                       });
//                       setPreviewOpen(true);
//                       return;
//                     }

//                     const res = await previewFile(datasetId, f.id);
//                     setPreviewData({
//                       type: f.file_type,
//                       ...res.data,
//                     });
//                     setPreviewOpen(true);
//                   }}
//                   className="text-gray-500 border px-3 py-1 rounded hover:bg-gray-50"
//                 >
//                   Preview
//                 </button>

//                 {/* Download */}
//                 {canDownload ? (
//                   <button
//                     onClick={() =>
//                       downloadFile(datasetId, f.id).then((res) => {
//                         const url = window.URL.createObjectURL(
//                           new Blob([res.data]),
//                         );
//                         const a = document.createElement("a");
//                         a.href = url;
//                         a.download = f.relative_path.split("/").pop();
//                         a.click();
//                         window.URL.revokeObjectURL(url);
//                       })
//                     }
//                     className="text-indigo-600 border px-3 py-1 rounded hover:bg-indigo-50"
//                   >
//                     Download
//                   </button>
//                 ) : (
//                   // 👇 IMPORTANT: hide purchase text for producer
//                   !isProducer && (
//                     <span className="text-xs text-gray-400">
//                       Purchase required
//                     </span>
//                   )
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Buy Action */}
//       {!canDownload && user && !isProducer && (
//         <div className="mt-6">
//           <RazorpayButton datasetId={datasetId} onSuccess={loadDataset} />
//         </div>
//       )}

//       {!user && (
//         <p className="mt-6 text-sm text-gray-400">
//           Login to purchase and download this dataset
//         </p>
//       )}

//       {/* Preview Modal */}
//       <PreviewModal
//         open={previewOpen}
//         preview={previewData}
//         onClose={() => {
//           setPreviewOpen(false);
//           setPreviewData(null);
//         }}
//       />
//     </div>
//   );
// }

// frontend/src/pages/DatasetDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDataset } from "../api/datasets.api";
import { downloadFile, previewFile } from "../api/files.api";
import { useAuth } from "../auth/AuthContext";
import RazorpayButton from "../components/RazorpayButton";
import PreviewModal from "../components/modal/PreviewModal";
import { uploadFile, attachFileToDataset } from "../api/files.api";

export default function DatasetDetails() {
  const { id: datasetId } = useParams();
  const { user } = useAuth();

  const [ds, setDs] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const loadDataset = () => {
    getDataset(datasetId).then((res) => setDs(res.data));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const ext = file.name.split(".").pop().toLowerCase();
    const typeMap = {
      csv: "csv",
      pdf: "pdf",
      json: "json",
      xlsx: "excel",
      pptx: "ppt",
      sql: "sql",
    };

    const fileType = typeMap[ext] || "other";

    const uploadRes = await uploadFile(fileType, file);
    const fileId = uploadRes.data.id;

    await attachFileToDataset(datasetId, fileId);
    setUploading(false);
    loadDataset();
  };

  useEffect(() => {
    loadDataset();
  }, [datasetId]);

  if (!ds)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading dataset…</p>
        </div>
      </div>
    );

  const isProducer = user?.role === "producer";

  // ✅ STRICT + CORRECT RULES
  const canDownload = ds.isOwner || ds.access_type === "public" || ds.hasAccess;

  const fileIcons = {
    csv: (
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
          d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 0v.75"
        />
      </svg>
    ),
    pdf: (
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
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    ),
    json: (
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
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
    ),
    excel: (
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
          d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 0v.75"
        />
      </svg>
    ),
    ppt: (
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
          d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
        />
      </svg>
    ),
  };

  const fileColorMap = {
    csv: {
      bg: "bg-emerald-50",
      border: "border-emerald-200/60",
      text: "text-emerald-600",
      badge: "bg-emerald-100 text-emerald-700",
    },
    pdf: {
      bg: "bg-red-50",
      border: "border-red-200/60",
      text: "text-red-500",
      badge: "bg-red-100 text-red-700",
    },
    json: {
      bg: "bg-amber-50",
      border: "border-amber-200/60",
      text: "text-amber-600",
      badge: "bg-amber-100 text-amber-700",
    },
    excel: {
      bg: "bg-green-50",
      border: "border-green-200/60",
      text: "text-green-600",
      badge: "bg-green-100 text-green-700",
    },
    ppt: {
      bg: "bg-orange-50",
      border: "border-orange-200/60",
      text: "text-orange-500",
      badge: "bg-orange-100 text-orange-700",
    },
  };

  const getFileColor = (type) =>
    fileColorMap[type] || {
      bg: "bg-gray-50",
      border: "border-gray-200/60",
      text: "text-gray-500",
      badge: "bg-gray-100 text-gray-600",
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Decorative blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-violet-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <a
              href="/datasets"
              className="text-sm text-gray-400 hover:text-indigo-500 transition-colors duration-200 no-underline"
            >
              Datasets
            </a>
            <svg
              className="w-3.5 h-3.5 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            <span className="text-sm text-gray-600 font-medium truncate">
              {ds.name}
            </span>
          </div>

          {/* Title card */}
          <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                {/* Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200/50 flex-shrink-0">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75"
                    />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                      {ds.name}
                    </h1>
                    <span
                      className={`inline-flex items-center text-[0.65rem] font-bold uppercase tracking-wider rounded-full px-3 py-1 ${
                        ds.access_type === "public"
                          ? "text-emerald-700 bg-emerald-50 border border-emerald-200/60"
                          : "text-amber-700 bg-amber-50 border border-amber-200/60"
                      }`}
                    >
                      {ds.access_type === "public" ? (
                        <>
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                          Public
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                          Premium
                        </>
                      )}
                    </span>
                  </div>

                  {ds.description && (
                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl">
                      {ds.description}
                    </p>
                  )}

                  {/* Stats row */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                        <svg
                          className="w-3.5 h-3.5 text-indigo-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        {ds.files.length}
                      </span>
                      <span className="text-sm text-gray-400">
                        file{ds.files.length !== 1 ? "s" : ""}
                      </span>
                    </div>

                    {canDownload && (
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                          <svg
                            className="w-3.5 h-3.5 text-emerald-500"
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
                        <span className="text-sm font-medium text-emerald-600">
                          Access granted
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        {ds.canUpload && (
          <div className="mb-8">
            <label
              className={`group relative flex flex-col items-center justify-center w-full h-40 sm:h-44 bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
                dragOver
                  ? "border-indigo-400 bg-indigo-50/50 scale-[1.01]"
                  : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30"
              } ${uploading ? "pointer-events-none opacity-60" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files[0];
                if (file) handleUpload({ target: { files: [file] } });
              }}
            >
              <input
                type="file"
                className="hidden"
                onChange={handleUpload}
                disabled={uploading}
              />

              {uploading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
                  <p className="text-sm font-medium text-indigo-600">
                    Uploading…
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                    <svg
                      className="w-6 h-6 text-indigo-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.6}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    <span className="text-indigo-600">Click to upload</span>
                    <span className="hidden sm:inline"> or drag and drop</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    CSV, PDF, JSON, Excel, PPT
                  </p>
                </>
              )}
            </label>
          </div>
        )}

        {/* Files Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
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
                  d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-800">Files</h2>
            <span className="text-xs font-semibold text-gray-400 bg-gray-100 rounded-full px-2.5 py-0.5">
              {ds.files.length}
            </span>
          </div>

          {ds.files.length > 0 ? (
            <div className="space-y-3">
              {ds.files.map((f) => {
                const color = getFileColor(f.file_type);
                return (
                  <div
                    key={f.id}
                    className="group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100/30 hover:border-gray-300/60"
                  >
                    {/* Left color accent */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${color.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 lg:p-6">
                      {/* File info */}
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${color.bg} ${color.border} border flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
                        >
                          <span className={color.text}>
                            {fileIcons[f.file_type] || (
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
                                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                />
                              </svg>
                            )}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <p className="text-sm sm:text-base font-semibold text-gray-800 capitalize">
                              {f.file_type} File
                            </p>
                            <span
                              className={`inline-flex items-center text-[0.6rem] font-bold uppercase tracking-wider rounded-md px-2 py-0.5 ${color.badge}`}
                            >
                              {f.file_type}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                                />
                              </svg>
                              {f.file_size_mb} MB
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2.5 sm:gap-3 ml-15 sm:ml-0">
                        {/* Preview button */}
                        <button
                          onClick={async () => {
                            if (f.file_type === "pdf") {
                              setPreviewData({
                                type: "pdf",
                                url: `${import.meta.env.VITE_API_URL}/files/preview/${datasetId}/${f.id}`,
                              });
                              setPreviewOpen(true);
                              return;
                            }
                            const res = await previewFile(datasetId, f.id);
                            setPreviewData({
                              type: f.file_type,
                              ...res.data,
                            });
                            setPreviewOpen(true);
                          }}
                          className="group/btn inline-flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl px-4 py-2.5 cursor-pointer transition-all duration-200 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 active:scale-[0.97]"
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
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="hidden xs:inline">Preview</span>
                        </button>

                        {/* Download or Purchase */}
                        {canDownload ? (
                          <button
                            onClick={() =>
                              downloadFile(datasetId, f.id).then((res) => {
                                const url = window.URL.createObjectURL(
                                  new Blob([res.data]),
                                );
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = f.relative_path.split("/").pop();
                                document.body.appendChild(a);
                                a.click();
                                a.remove();
                                window.URL.revokeObjectURL(url);
                              })
                            }
                            className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-white
               bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl
               px-4 py-2.5 cursor-pointer transition-all duration-200
               hover:from-indigo-600 hover:to-violet-700
               hover:shadow-lg hover:shadow-indigo-200/50
               hover:-translate-y-0.5
               focus-visible:outline-none focus-visible:ring-2
               focus-visible:ring-indigo-500 focus-visible:ring-offset-2
               active:scale-[0.97]"
                          >
                            <svg
                              className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-y-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                              />
                            </svg>
                            <span className="hidden xs:inline">Download</span>
                          </button>
                        ) : (
                          ds.access_type === "restricted" &&
                          user && (
                            <div
                              className="flex items-center gap-2 text-xs font-medium text-amber-600
                 bg-amber-50 border border-amber-200/60
                 rounded-xl px-3.5 py-2.5"
                            >
                              <svg
                                className="w-3.5 h-3.5"
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
                              Purchase required
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-10 sm:p-14 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-500">
                No files in this dataset yet
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Files will appear here once uploaded
              </p>
            </div>
          )}
        </div>

        {/* Buy Action */}
        {!canDownload && user && !isProducer && (
          <div className="relative bg-gradient-to-br from-indigo-500/[0.03] to-violet-500/[0.06] backdrop-blur-sm rounded-2xl border border-indigo-200/50 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100/80 flex items-center justify-center">
                    <svg
                      className="w-4.5 h-4.5 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Get Full Access
                  </h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                  Purchase this dataset to unlock downloads for all files.
                  Instant access after payment.
                </p>
              </div>
              <div className="flex-shrink-0">
                <RazorpayButton datasetId={datasetId} onSuccess={loadDataset} />
              </div>
            </div>
          </div>
        )}

        {!user && (
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl border border-gray-200/60 p-6 sm:p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-gray-200/60 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-gray-400"
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
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              Sign in to access this dataset
            </p>
            <p className="text-xs text-gray-400">
              Login to purchase and download files
            </p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <PreviewModal
        open={previewOpen}
        preview={previewData}
        onClose={() => {
          setPreviewOpen(false);
          setPreviewData(null);
        }}
      />
    </div>
  );
}
