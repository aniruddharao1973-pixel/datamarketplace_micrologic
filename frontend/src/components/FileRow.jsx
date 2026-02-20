// // frontend\src\components\FileRow.jsx
// import { downloadFile } from "../api/files.api";

// export default function FileRow({ file }) {
//   const handleDownload = async () => {
//     const res = await downloadFile(file.id);

//     const blob = new Blob([res.data]);
//     const url = window.URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = file.relative_path.split("/").pop();
//     a.click();

//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="flex justify-between items-center border p-2 rounded mt-2">
//       <div>
//         <p className="font-medium">{file.file_type.toUpperCase()}</p>
//         <p className="text-xs text-gray-500">{file.file_size_mb} MB</p>
//       </div>

//       <button
//         onClick={handleDownload}
//         className="text-blue-600 hover:underline"
//       >
//         Download
//       </button>
//     </div>
//   );
// }

// frontend/src/components/FileRow.jsx
import { downloadFile } from "../api/files.api";

export default function FileRow({ file }) {
  const handleDownload = async () => {
    const res = await downloadFile(file.id);

    const blob = new Blob([res.data]);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = file.relative_path.split("/").pop();
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3 transition hover:bg-gray-50">
      {/* File info */}
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {file.file_type.toUpperCase()}
        </p>
        <p className="mt-0.5 text-xs text-gray-500">{file.file_size_mb} MB</p>
      </div>

      {/* Action */}
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition"
      >
        Download
      </button>
    </div>
  );
}
