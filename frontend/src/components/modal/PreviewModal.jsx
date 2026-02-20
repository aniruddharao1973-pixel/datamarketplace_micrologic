// frontend\src\components\modal\PreviewModal.jsx
import React from "react";

export default function PreviewModal({ open, onClose, preview }) {
  if (!open || !preview) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <h2 className="text-sm font-semibold uppercase tracking-wide">
            File Preview
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[75vh] overflow-auto text-sm">
          {/* PDF */}
          {preview.type === "pdf" && preview.url && (
            <iframe
              src={preview.url}
              title="PDF Preview"
              className="w-full h-[70vh] border rounded"
            />
          )}

          {/* CSV */}
          {preview.type === "csv" && preview.rows && (
            <table className="min-w-full border text-xs">
              <thead className="bg-gray-100">
                <tr>
                  {Object.keys(preview.rows[0] || {}).map((key) => (
                    <th key={key} className="border px-2 py-1 text-left">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.rows.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((val, j) => (
                      <td key={j} className="border px-2 py-1">
                        {String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Excel */}
          {preview.type === "excel" && preview.rows && (
            <table className="min-w-full border text-xs">
              <tbody>
                {preview.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="border px-2 py-1">
                        {cell ?? ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* JSON */}
          {preview.type === "json" && preview.lines && (
            <pre className="bg-gray-50 border rounded p-3 text-xs">
              {preview.lines.join("\n")}
            </pre>
          )}

          {/* SQL */}
          {preview.type === "sql" && preview.lines && (
            <>
              {preview.note && (
                <p className="mb-2 text-xs text-gray-500">{preview.note}</p>
              )}
              <pre className="bg-gray-50 border rounded p-3 text-xs">
                {preview.lines.join("\n")}
              </pre>
            </>
          )}

          {/* ZIP */}
          {preview.type === "zip" && preview.files && (
            <ul className="border rounded divide-y text-xs">
              {preview.files.map((f, i) => (
                <li key={i} className="flex justify-between px-3 py-2">
                  <span>
                    {f.isDirectory ? "📁" : "📄"} {f.name}
                  </span>
                  {!f.isDirectory && (
                    <span className="text-gray-400">{f.size_kb} KB</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="px-5 py-3 border-t text-xs text-gray-400">
          Preview only · Purchase required for full download
        </div>
      </div>
    </div>
  );
}
