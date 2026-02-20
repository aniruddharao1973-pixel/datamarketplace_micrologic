// // src\components\modal\CreateDatasetModal.jsx
// import { useState } from "react";
// import { createDataset } from "../../api/datasets.api";

// export default function CreateDatasetModal({ open, onClose, onCreated }) {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     datasetType: "FILE",
//     accessType: "restricted",
//     priceInr: 0,
//     tags: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   if (!open) return null;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       const payload = {
//         name: form.name,
//         description: form.description,
//         datasetType: form.datasetType,
//         accessType: form.accessType,
//         priceInr: form.priceInr,
//         tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
//       };

//       const res = await createDataset(payload);

//       onCreated?.(res.data); // refresh list
//       onClose();
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to create dataset");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//       <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b">
//           <h2 className="text-lg font-semibold text-gray-800">
//             Create Dataset
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Dataset Name *
//             </label>
//             <input
//               type="text"
//               name="name"
//               required
//               value={form.name}
//               onChange={handleChange}
//               className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Description
//             </label>
//             <textarea
//               name="description"
//               rows={3}
//               value={form.description}
//               onChange={handleChange}
//               className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
//             />
//           </div>

//           {/* Dataset Type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Dataset Type *
//             </label>
//             <select
//               name="datasetType"
//               value={form.datasetType}
//               onChange={handleChange}
//               className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
//             >
//               <option value="FILE">FILE</option>
//               <option value="TABLE">TABLE</option>
//               <option value="VIEW">VIEW</option>
//               <option value="DATABASE_SNAPSHOT">DATABASE SNAPSHOT</option>
//             </select>
//           </div>

//           {/* Access Type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Access Type
//             </label>
//             <select
//               name="accessType"
//               value={form.accessType}
//               onChange={handleChange}
//               className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
//             >
//               <option value="restricted">Restricted</option>
//               <option value="public">Public</option>
//             </select>
//           </div>

//           {/* price */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Price (INR) *
//             </label>
//             <input
//               type="number"
//               min="0"
//               value={form.priceInr}
//               onChange={(e) =>
//                 setForm({ ...form, priceInr: Number(e.target.value) })
//               }
//               placeholder="0 for free, e.g. 499"
//               className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//             />
//           </div>

//           {/* Tags */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Tags (comma separated)
//             </label>
//             <input
//               type="text"
//               name="tags"
//               value={form.tags}
//               onChange={handleChange}
//               className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
//               placeholder="finance, sales, india"
//             />
//           </div>

//           {/* Error */}
//           {error && (
//             <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
//               {error}
//             </p>
//           )}

//           {/* Actions */}
//           <div className="flex justify-end gap-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
//             >
//               {loading ? "Creating..." : "Create Dataset"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// src/components/modal/CreateDatasetModal.jsx
import { useState } from "react";
import { createDataset } from "../../api/datasets.api";

export default function CreateDatasetModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    datasetType: "FILE",
    accessType: "restricted",
    priceInr: 0,
    tags: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = {
        name: form.name,
        description: form.description,
        datasetType: form.datasetType,
        accessType: form.accessType,
        priceInr: form.priceInr,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
      };

      const res = await createDataset(payload);
      onCreated?.(res.data);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create dataset");
    } finally {
      setLoading(false);
    }
  };

  const datasetTypes = [
    {
      value: "FILE",
      label: "File",
      icon: (
        <svg
          className="w-4.5 h-4.5"
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
    },
    {
      value: "TABLE",
      label: "Table",
      icon: (
        <svg
          className="w-4.5 h-4.5"
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
    },
    {
      value: "VIEW",
      label: "View",
      icon: (
        <svg
          className="w-4.5 h-4.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.6}
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
      ),
    },
    {
      value: "DATABASE_SNAPSHOT",
      label: "DB Snapshot",
      icon: (
        <svg
          className="w-4.5 h-4.5"
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
    },
  ];

  const accessTypes = [
    {
      value: "restricted",
      label: "Restricted",
      desc: "Requires purchase",
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
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      ),
    },
    {
      value: "public",
      label: "Public",
      desc: "Free for everyone",
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
            d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      ),
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
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-200/60 shadow-2xl shadow-gray-300/30 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top gradient bar */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 flex-shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3.5">
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                Create Dataset
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Add a new dataset to the marketplace
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-100/80 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
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
        </div>

        {/* Scrollable form body */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="overflow-y-auto flex-1 px-6 sm:px-8 py-5 sm:py-6 space-y-6">
            {/* Name */}
            <div>
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
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h.008v.008H6V6z"
                  />
                </svg>
                Dataset Name
                <span className="text-red-400 text-[0.6rem]">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. India Census 2024"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 sm:py-3.5 text-sm text-gray-800 placeholder-gray-300 transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white hover:border-gray-300"
              />
            </div>

            {/* Description */}
            <div>
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
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                  />
                </svg>
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                placeholder="Briefly describe this dataset…"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 sm:py-3.5 text-sm text-gray-800 placeholder-gray-300 transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white hover:border-gray-300 resize-none"
              />
            </div>

            {/* Dataset Type — visual selector */}
            <div>
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
                    d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25-9.75 5.25-9.75-5.25 4.179-2.25"
                  />
                </svg>
                Dataset Type
                <span className="text-red-400 text-[0.6rem]">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {datasetTypes.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setForm({ ...form, datasetType: t.value })}
                    className={`relative flex flex-col items-center gap-2 p-3 sm:p-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-1 ${
                      form.datasetType === t.value
                        ? "border-indigo-400 bg-indigo-50/70 shadow-md shadow-indigo-100/50"
                        : "border-gray-200/80 bg-gray-50/30 hover:border-gray-300 hover:bg-gray-50/60"
                    }`}
                  >
                    {form.datasetType === t.value && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 text-white"
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
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                        form.datasetType === t.value
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {t.icon}
                    </div>
                    <span
                      className={`text-xs font-bold transition-colors duration-200 ${
                        form.datasetType === t.value
                          ? "text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Access Type — visual selector */}
            <div>
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
                Access Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {accessTypes.map((a) => (
                  <button
                    key={a.value}
                    type="button"
                    onClick={() => setForm({ ...form, accessType: a.value })}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-1 ${
                      form.accessType === a.value
                        ? a.value === "restricted"
                          ? "border-amber-400 bg-amber-50/70 shadow-md shadow-amber-100/50"
                          : "border-emerald-400 bg-emerald-50/70 shadow-md shadow-emerald-100/50"
                        : "border-gray-200/80 bg-gray-50/30 hover:border-gray-300 hover:bg-gray-50/60"
                    }`}
                  >
                    {form.accessType === a.value && (
                      <div
                        className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center ${
                          a.value === "restricted"
                            ? "bg-amber-500"
                            : "bg-emerald-500"
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
                        form.accessType === a.value
                          ? a.value === "restricted"
                            ? "bg-amber-100 text-amber-600"
                            : "bg-emerald-100 text-emerald-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {a.icon}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-bold transition-colors duration-200 ${
                          form.accessType === a.value
                            ? "text-gray-900"
                            : "text-gray-600"
                        }`}
                      >
                        {a.label}
                      </p>
                      <p
                        className={`text-[0.65rem] mt-0.5 leading-snug transition-colors duration-200 ${
                          form.accessType === a.value
                            ? "text-gray-500"
                            : "text-gray-400"
                        }`}
                      >
                        {a.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
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
                    d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Price (INR)
                <span className="text-red-400 text-[0.6rem]">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">
                  ₹
                </div>
                <input
                  type="number"
                  min="0"
                  value={form.priceInr}
                  onChange={(e) =>
                    setForm({ ...form, priceInr: Number(e.target.value) })
                  }
                  placeholder="0"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-9 pr-4 py-3 sm:py-3.5 text-sm text-gray-800 placeholder-gray-300 transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white hover:border-gray-300"
                />
                {form.priceInr === 0 && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <span className="text-[0.65rem] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/60 rounded-md px-2 py-0.5 uppercase tracking-wider">
                      Free
                    </span>
                  </div>
                )}
              </div>
              <p className="text-[0.68rem] text-gray-400 mt-1.5">
                Set to 0 for free datasets
              </p>
            </div>

            {/* Tags */}
            <div>
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
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h.008v.008H6V6z"
                  />
                </svg>
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="finance, sales, india"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 sm:py-3.5 text-sm text-gray-800 placeholder-gray-300 transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white hover:border-gray-300"
              />
              {form.tags && (
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {form.tags
                    .split(",")
                    .filter(Boolean)
                    .map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center text-[0.65rem] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 rounded-lg px-2.5 py-1 uppercase tracking-wider"
                      >
                        <span className="w-1 h-1 rounded-full bg-indigo-400 mr-1.5" />
                        {tag.trim()}
                      </span>
                    ))}
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2.5 bg-red-50 border border-red-200/60 rounded-xl px-4 py-3">
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
          </div>

          {/* Footer actions — pinned */}
          <div className="flex-shrink-0 border-t border-gray-100 px-6 sm:px-8 py-4 sm:py-5 bg-gray-50/50">
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
                    Create Dataset
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
