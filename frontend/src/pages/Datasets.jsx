// // frontend/src/pages/Datasets.jsx
// import { useEffect, useState } from "react";
// import { getDatasets, deleteDataset } from "../api/datasets.api";
// import { Link } from "react-router-dom";
// import CreateDatasetModal from "../components/modal/CreateDatasetModal";
// import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";
// import { useAuth } from "../auth/AuthContext";

// export default function Datasets() {
//   const [data, setDatasets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openCreate, setOpenCreate] = useState(false);
//   const { user } = useAuth();
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [deleting, setDeleting] = useState(false);

//   const handleDelete = async () => {
//     if (!deleteTarget) return;
//     setDeleting(true);
//     try {
//       await deleteDataset(deleteTarget.id);
//       setDatasets((prev) => prev.filter((d) => d.id !== deleteTarget.id));
//       setDeleteTarget(null);
//     } catch (err) {
//       alert(err?.response?.data?.message || "Failed to delete dataset");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   useEffect(() => {
//     async function load() {
//       const res = await getDatasets();
//       setDatasets(res.data || []);
//       setLoading(false);
//     }
//     load();
//   }, []);

//   const cardColors = [
//     {
//       bg: "from-indigo-500 to-violet-600",
//       light: "bg-indigo-50",
//       border: "border-indigo-100",
//       text: "text-indigo-600",
//       icon: "text-indigo-500",
//     },
//     {
//       bg: "from-violet-500 to-purple-600",
//       light: "bg-violet-50",
//       border: "border-violet-100",
//       text: "text-violet-600",
//       icon: "text-violet-500",
//     },
//     {
//       bg: "from-blue-500 to-indigo-600",
//       light: "bg-blue-50",
//       border: "border-blue-100",
//       text: "text-blue-600",
//       icon: "text-blue-500",
//     },
//     {
//       bg: "from-cyan-500 to-blue-600",
//       light: "bg-cyan-50",
//       border: "border-cyan-100",
//       text: "text-cyan-600",
//       icon: "text-cyan-500",
//     },
//     {
//       bg: "from-emerald-500 to-teal-600",
//       light: "bg-emerald-50",
//       border: "border-emerald-100",
//       text: "text-emerald-600",
//       icon: "text-emerald-500",
//     },
//     {
//       bg: "from-amber-500 to-orange-600",
//       light: "bg-amber-50",
//       border: "border-amber-100",
//       text: "text-amber-600",
//       icon: "text-amber-500",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
//       {/* Decorative background blobs */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl" />
//         <div className="absolute top-1/3 -left-20 w-72 h-72 bg-violet-100/30 rounded-full blur-3xl" />
//         <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl" />
//       </div>

//       <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto">
//         {/* Page header */}
//         <div className="mb-10 sm:mb-14">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200/50">
//               <svg
//                 className="w-5 h-5 sm:w-6 sm:h-6 text-white"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={1.8}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75"
//                 />
//               </svg>
//             </div>
//             <div>
//               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
//                 Datasets
//               </h1>
//               <p className="text-sm sm:text-base text-gray-400 mt-0.5">
//                 Browse and explore available data
//               </p>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
//             <p className="text-sm text-gray-500 leading-relaxed max-w-lg">
//               Discover datasets across the platform. Select any dataset to view
//               details and request access if needed.
//             </p>
//             {data.length > 0 && (
//               <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 px-4 py-2.5 flex-shrink-0">
//                 <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
//                 <span className="text-sm font-semibold text-gray-700">
//                   {data.length}
//                 </span>
//                 <span className="text-sm text-gray-400">
//                   dataset{data.length !== 1 ? "s" : ""} available
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Loading state */}
//         {loading && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
//             {[...Array(6)].map((_, i) => (
//               <div
//                 key={i}
//                 className="relative bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 overflow-hidden"
//               >
//                 <div className="animate-pulse space-y-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-11 h-11 rounded-xl bg-gray-200/70" />
//                     <div className="flex-1 space-y-2">
//                       <div className="h-3 bg-gray-200/70 rounded-full w-3/4" />
//                       <div className="h-2 bg-gray-100/70 rounded-full w-1/2" />
//                     </div>
//                   </div>
//                   <div className="h-px bg-gray-100" />
//                   <div className="flex justify-between items-center">
//                     <div className="h-2.5 bg-gray-100/70 rounded-full w-16" />
//                     <div className="h-7 bg-gray-100/70 rounded-lg w-20" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {["admin", "producer"].includes(user?.role) && (
//           <button
//             onClick={() => setOpenCreate(true)}
//             className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
//           >
//             + Create Dataset
//           </button>
//         )}

//         {/* Dataset grid */}
//         {/* Dataset grid */}
//         {!loading && data.length > 0 && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
//             {data.map((d, index) => {
//               const color = cardColors[index % cardColors.length];
//               const canDelete =
//                 user?.role === "admin" || d.owner_id === user?.id;

//               return (
//                 <Link
//                   key={d.id}
//                   to={`/datasets/${d.id}`}
//                   className="group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 overflow-hidden no-underline transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100/40 hover:-translate-y-1 hover:border-gray-300/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
//                 >
//                   {/* 🔴 DELETE BUTTON (NEW, NON-INTRUSIVE) */}
//                   {canDelete && (
//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                         setDeleteTarget(d);
//                       }}
//                       title="Delete dataset"
//                       className="absolute top-3 right-3 z-10 rounded-lg p-1.5
//                          bg-white/80 backdrop-blur
//                          text-gray-400 hover:text-red-600
//                          hover:bg-red-50 transition"
//                     >
//                       🗑
//                     </button>
//                   )}

//                   {/* Top gradient bar */}
//                   <div
//                     className={`h-1 bg-gradient-to-r ${color.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
//                   />

//                   <div className="p-5 sm:p-6">
//                     {/* Header row */}
//                     <div className="flex items-start gap-4 mb-4">
//                       <div
//                         className={`relative w-11 h-11 rounded-xl ${color.light} ${color.border} border flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
//                       >
//                         <svg
//                           className={`w-5 h-5 ${color.icon}`}
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           strokeWidth={1.8}
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375"
//                           />
//                         </svg>
//                         <div
//                           className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
//                         />
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <h2
//                           className={`text-base font-semibold text-gray-800 group-hover:${color.text} transition-colors duration-300 truncate`}
//                         >
//                           {d.name}
//                         </h2>
//                         <p className="text-xs text-gray-400 mt-0.5">
//                           Dataset #{d.id}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="h-px bg-gray-100 group-hover:bg-gray-200/80 transition-colors duration-300 mb-4" />

//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-1.5">
//                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
//                         <span className="text-xs text-gray-400 font-medium">
//                           Available
//                         </span>
//                       </div>

//                       <div
//                         className={`flex items-center gap-1.5 text-xs font-semibold text-gray-400 group-hover:${color.text} transition-all duration-300`}
//                       >
//                         <span>Explore</span>
//                         <svg
//                           className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           strokeWidth={2}
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
//                           />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>

//                   <div
//                     className={`absolute inset-0 bg-gradient-to-br ${color.bg} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300 pointer-events-none`}
//                   />
//                 </Link>
//               );
//             })}
//           </div>
//         )}

//         {/* Empty state */}
//         {!loading && data.length === 0 && (
//           <div className="flex flex-col items-center justify-center py-20 sm:py-28">
//             {/* Illustration */}
//             <div className="relative mb-6">
//               <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200/60 flex items-center justify-center">
//                 <svg
//                   className="w-9 h-9 sm:w-11 sm:h-11 text-gray-300"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={1.2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75"
//                   />
//                 </svg>
//               </div>
//               {/* Decorative dots */}
//               <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-indigo-100 border border-indigo-200/50" />
//               <div className="absolute -bottom-1 -left-3 w-3 h-3 rounded-full bg-violet-100 border border-violet-200/50" />
//               <div className="absolute top-1/2 -right-5 w-2 h-2 rounded-full bg-blue-100 border border-blue-200/50" />
//             </div>

//             <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
//               No datasets yet
//             </h3>
//             <p className="text-sm text-gray-400 text-center max-w-sm leading-relaxed">
//               There are no datasets available at the moment. Check back later
//               for new data to explore.
//             </p>

//             {/* Decorative line */}
//             <div className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
//           </div>
//         )}
//       </div>
//       <ConfirmDeleteModal
//         open={!!deleteTarget}
//         title="Delete Dataset"
//         message="This dataset will be removed immediately and permanently deleted after 30 days. Are you sure?"
//         loading={deleting}
//         onCancel={() => setDeleteTarget(null)}
//         onConfirm={handleDelete}
//       />
//       <CreateDatasetModal
//         open={openCreate}
//         onClose={() => setOpenCreate(false)}
//         onCreated={(newDataset) => setDatasets((prev) => [newDataset, ...prev])}
//       />
//     </div>
//   );
// }

// frontend/src/pages/Datasets.jsx
import { useEffect, useState } from "react";
import { getDatasets, deleteDataset } from "../api/datasets.api";
import { Link } from "react-router-dom";
import CreateDatasetModal from "../components/modal/CreateDatasetModal";
import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";
import { useAuth } from "../auth/AuthContext";

export default function Datasets() {
  const [data, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const { user } = useAuth();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteDataset(deleteTarget.id);
      setDatasets((prev) => prev.filter((d) => d.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete dataset");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    async function load() {
      const res = await getDatasets();
      setDatasets(res.data || []);
      setLoading(false);
    }
    load();
  }, []);

  const cardColors = [
    {
      bg: "from-indigo-500 to-violet-600",
      light: "bg-indigo-50",
      border: "border-indigo-100",
      text: "text-indigo-600",
      icon: "text-indigo-500",
      shadow: "shadow-indigo-100/50",
      deleteBg: "hover:bg-indigo-50",
    },
    {
      bg: "from-violet-500 to-purple-600",
      light: "bg-violet-50",
      border: "border-violet-100",
      text: "text-violet-600",
      icon: "text-violet-500",
      shadow: "shadow-violet-100/50",
      deleteBg: "hover:bg-violet-50",
    },
    {
      bg: "from-blue-500 to-indigo-600",
      light: "bg-blue-50",
      border: "border-blue-100",
      text: "text-blue-600",
      icon: "text-blue-500",
      shadow: "shadow-blue-100/50",
      deleteBg: "hover:bg-blue-50",
    },
    {
      bg: "from-cyan-500 to-blue-600",
      light: "bg-cyan-50",
      border: "border-cyan-100",
      text: "text-cyan-600",
      icon: "text-cyan-500",
      shadow: "shadow-cyan-100/50",
      deleteBg: "hover:bg-cyan-50",
    },
    {
      bg: "from-emerald-500 to-teal-600",
      light: "bg-emerald-50",
      border: "border-emerald-100",
      text: "text-emerald-600",
      icon: "text-emerald-500",
      shadow: "shadow-emerald-100/50",
      deleteBg: "hover:bg-emerald-50",
    },
    {
      bg: "from-amber-500 to-orange-600",
      light: "bg-amber-50",
      border: "border-amber-100",
      text: "text-amber-600",
      icon: "text-amber-500",
      shadow: "shadow-amber-100/50",
      deleteBg: "hover:bg-amber-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Decorative background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-violet-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-10 sm:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200/50">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-white"
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
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl opacity-0 blur-lg animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                  Datasets
                </h1>
                <p className="text-sm text-gray-400 mt-0.5 hidden sm:block">
                  Browse, explore and manage your data
                </p>
              </div>
            </div>

            {/* Create button for admin/producer */}
            {["admin", "producer"].includes(user?.role) && (
              <button
                onClick={() => setOpenCreate(true)}
                className="group inline-flex items-center gap-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl px-5 py-3 cursor-pointer transition-all duration-300 hover:from-indigo-600 hover:to-violet-700 hover:shadow-xl hover:shadow-indigo-200/50 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:scale-[0.97] self-start"
              >
                <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:rotate-90">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </span>
                Create Dataset
              </button>
            )}
          </div>

          {/* Subheader with count */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 sm:mt-8">
            <p className="text-sm text-gray-500 leading-relaxed max-w-lg">
              Discover datasets across the platform. Select any dataset to view
              details and request access if needed.
            </p>
            {!loading && data.length > 0 && (
              <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 px-4 py-2.5 flex-shrink-0 shadow-sm">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-40" />
                </div>
                <span className="text-sm font-bold text-gray-800">
                  {data.length}
                </span>
                <span className="text-sm text-gray-400">
                  dataset{data.length !== 1 ? "s" : ""} available
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="relative bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/40 p-6 overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                <div className="space-y-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-gray-200/60 animate-pulse" />
                    <div className="flex-1 space-y-2.5">
                      <div className="h-3.5 bg-gray-200/60 rounded-full w-3/4 animate-pulse" />
                      <div className="h-2.5 bg-gray-100/60 rounded-full w-1/2 animate-pulse" />
                    </div>
                  </div>
                  <div className="h-px bg-gray-100/80" />
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-gray-100/60 rounded-full w-20 animate-pulse" />
                    <div className="h-8 bg-gray-100/60 rounded-lg w-24 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dataset grid */}
        {!loading && data.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {data.map((d, index) => {
              const color = cardColors[index % cardColors.length];
              const canDelete =
                user?.role === "admin" || d.owner_id === user?.id;

              return (
                <Link
                  key={d.id}
                  to={`/datasets/${d.id}`}
                  className={`group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 overflow-hidden no-underline transition-all duration-300 hover:shadow-xl hover:${color.shadow} hover:-translate-y-1.5 hover:border-gray-300/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2`}
                >
                  {/* Delete button */}
                  {canDelete && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setDeleteTarget(d);
                      }}
                      title="Delete dataset"
                      className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-xl
                        bg-white/90 backdrop-blur-sm border border-gray-200/60
                        text-gray-400 hover:text-red-500
                        hover:bg-red-50 hover:border-red-200
                        flex items-center justify-center
                        opacity-0 group-hover:opacity-100
                        transition-all duration-200
                        cursor-pointer
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400
                        shadow-sm hover:shadow-md"
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  )}

                  {/* Top gradient bar */}
                  <div
                    className={`h-1 bg-gradient-to-r ${color.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div className="p-5 sm:p-6">
                    {/* Header row */}
                    <div className="flex items-start gap-4 mb-5">
                      {/* Icon */}
                      <div
                        className={`relative w-12 h-12 rounded-xl ${color.light} ${color.border} border flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                      >
                        <svg
                          className={`w-5 h-5 ${color.icon} transition-all duration-300`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375"
                          />
                        </svg>
                        <div
                          className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color.bg} opacity-0 group-hover:opacity-15 transition-opacity duration-300`}
                        />
                      </div>

                      {/* Title */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <h2 className="text-base font-bold text-gray-800 transition-colors duration-300 truncate group-hover:text-gray-900">
                          {d.name}
                        </h2>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[0.68rem] text-gray-400 font-mono">
                            ID: {d.id}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-100 group-hover:bg-gray-200/80 transition-colors duration-300 mb-4" />

                    {/* Footer row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="text-xs text-gray-400 font-medium">
                          Available
                        </span>
                      </div>

                      {/* Explore CTA */}
                      <div
                        className={`flex items-center gap-1.5 text-xs font-bold ${color.text} opacity-70 group-hover:opacity-100 transition-all duration-300`}
                      >
                        <span>Explore</span>
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
                      </div>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${color.bg} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none`}
                  />
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 sm:py-32">
            <div className="relative mb-8">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200/60 flex items-center justify-center shadow-sm">
                <svg
                  className="w-11 h-11 sm:w-13 sm:h-13 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75"
                  />
                </svg>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-indigo-100/80 border border-indigo-200/50 animate-bounce" />
              <div className="absolute -bottom-2 -left-4 w-4 h-4 rounded-full bg-violet-100/80 border border-violet-200/50" />
              <div className="absolute top-1/2 -right-6 w-3 h-3 rounded-full bg-blue-100/80 border border-blue-200/50" />
              <div className="absolute -top-1 -left-2 w-2 h-2 rounded-full bg-emerald-100/80 border border-emerald-200/50" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
              No datasets yet
            </h3>
            <p className="text-sm sm:text-base text-gray-400 text-center max-w-md leading-relaxed mb-8">
              There are no datasets available at the moment. Check back later
              for new data to explore.
            </p>

            {["admin", "producer"].includes(user?.role) && (
              <button
                onClick={() => setOpenCreate(true)}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200/60 rounded-xl px-5 py-3 cursor-pointer transition-all duration-200 hover:bg-indigo-100/80 hover:border-indigo-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 active:scale-[0.97]"
              >
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90"
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
                Create your first dataset
              </button>
            )}

            <div className="mt-10 h-px w-32 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          </div>
        )}
      </div>

      <ConfirmDeleteModal
        open={!!deleteTarget}
        title="Delete Dataset"
        message="This dataset will be removed immediately and permanently deleted after 30 days. Are you sure?"
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
      <CreateDatasetModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={(newDataset) => setDatasets((prev) => [newDataset, ...prev])}
      />
    </div>
  );
}
