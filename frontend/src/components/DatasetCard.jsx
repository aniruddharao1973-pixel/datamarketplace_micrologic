// // frontend/src/components/DatasetCard.jsx
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import ConfirmDeleteModal from "./modal/ConfirmDeleteModal";
// import { deleteDataset } from "../api/datasets.api";

// export default function DatasetCard({ dataset, canDelete, onDeleted }) {
//   const [openDelete, setOpenDelete] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleDelete = async () => {
//     setLoading(true);
//     try {
//       await deleteDataset(dataset.id);
//       onDeleted?.(dataset.id);
//       setOpenDelete(false);
//     } catch (err) {
//       alert(err?.response?.data?.message || "Failed to delete dataset");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="relative group rounded-lg border border-gray-200 bg-white p-4 hover:shadow-sm">
//         {/* Delete button */}
//         {canDelete && (
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               setOpenDelete(true);
//             }}
//             className="absolute top-3 right-3 rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
//             title="Delete dataset"
//           >
//             🗑
//           </button>
//         )}

//         <Link to={`/datasets/${dataset.id}`} className="block">
//           <h3 className="text-base font-semibold text-gray-900">
//             {dataset.name}
//           </h3>

//           {dataset.description && (
//             <p className="mt-1 text-sm text-gray-600 line-clamp-2">
//               {dataset.description}
//             </p>
//           )}

//           <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
//             <span className="rounded-full bg-gray-100 px-2 py-0.5">
//               {dataset.dataset_type}
//             </span>
//           </div>
//         </Link>
//       </div>

//       {/* Confirm delete modal */}
//       <ConfirmDeleteModal
//         open={openDelete}
//         title="Delete Dataset"
//         message="This dataset will be removed immediately and permanently deleted after 30 days. Are you sure?"
//         loading={loading}
//         onCancel={() => setOpenDelete(false)}
//         onConfirm={handleDelete}
//       />
//     </>
//   );
// }

// frontend/src/components/DatasetCard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDeleteModal from "./modal/ConfirmDeleteModal";
import { deleteDataset } from "../api/datasets.api";

export default function DatasetCard({ dataset, canDelete, onDeleted }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteDataset(dataset.id);
      onDeleted?.(dataset.id);
      setOpenDelete(false);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete dataset");
    } finally {
      setLoading(false);
    }
  };

  const typeColors = {
    public: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200/60",
      dot: "bg-emerald-400",
    },
    premium: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200/60",
      dot: "bg-amber-400",
    },
    private: {
      bg: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-200/60",
      dot: "bg-rose-400",
    },
  };

  const typeColor = typeColors[dataset.dataset_type] || {
    bg: "bg-gray-50",
    text: "text-gray-600",
    border: "border-gray-200/60",
    dot: "bg-gray-400",
  };

  return (
    <>
      <div className="group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100/40 hover:-translate-y-1 hover:border-gray-300/60">
        {/* Top gradient accent — visible on hover */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Delete button */}
        {canDelete && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpenDelete(true);
            }}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-xl
              bg-white/90 backdrop-blur-sm border border-gray-200/60
              text-gray-400 hover:text-red-500
              hover:bg-red-50 hover:border-red-200
              flex items-center justify-center
              opacity-0 group-hover:opacity-100
              transition-all duration-200
              cursor-pointer shadow-sm hover:shadow-md
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            title="Delete dataset"
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

        <Link
          to={`/datasets/${dataset.id}`}
          className="block no-underline p-5 sm:p-6"
        >
          {/* Header with icon */}
          <div className="flex items-start gap-4 mb-4">
            {/* Dataset icon */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
              <svg
                className="w-5 h-5 text-indigo-500"
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
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </div>

            {/* Title & description */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-800 truncate transition-colors duration-200 group-hover:text-gray-900">
                {dataset.name}
              </h3>

              {dataset.description && (
                <p className="mt-1.5 text-sm text-gray-400 leading-relaxed line-clamp-2">
                  {dataset.description}
                </p>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 group-hover:bg-gray-200/80 transition-colors duration-300 mb-4" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Type badge */}
            <div
              className={`inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-wider rounded-lg px-2.5 py-1.5 ${typeColor.bg} ${typeColor.text} ${typeColor.border} border`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${typeColor.dot}`} />
              {dataset.dataset_type}
            </div>

            {/* Explore CTA */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-500 opacity-60 group-hover:opacity-100 transition-all duration-300">
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
        </Link>

        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-600 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Confirm delete modal */}
      <ConfirmDeleteModal
        open={openDelete}
        title="Delete Dataset"
        message="This dataset will be removed immediately and permanently deleted after 30 days. Are you sure?"
        loading={loading}
        onCancel={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
