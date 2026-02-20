// // frontend\src\components\AccessRequests.jsx
// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { decideAccess } from "../api/access.api";

// export default function AccessRequests() {
//   const [requests, setRequests] = useState([]);

//   const loadRequests = async () => {
//     const res = await api.get("/admin/access-requests");
//     setRequests(res.data);
//   };

//   useEffect(() => {
//     loadRequests();
//   }, []);

//   const handleDecision = async (datasetId, userId, decision) => {
//     await decideAccess(datasetId, userId, decision);
//     loadRequests();
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">Pending Access Requests</h1>

//       {requests.length === 0 && (
//         <p className="text-gray-500">No pending requests</p>
//       )}

//       {requests.map((r, idx) => (
//         <div key={idx} className="border p-4 rounded mb-3 bg-white">
//           <p>
//             <strong>User:</strong> {r.email}
//           </p>
//           <p>
//             <strong>Dataset:</strong> {r.name}
//           </p>

//           <div className="mt-3 flex gap-3">
//             <button
//               onClick={() =>
//                 handleDecision(r.dataset_id, r.user_id, "approved")
//               }
//               className="bg-green-600 text-white px-3 py-1 rounded"
//             >
//               Approve
//             </button>

//             <button
//               onClick={() =>
//                 handleDecision(r.dataset_id, r.user_id, "rejected")
//               }
//               className="bg-red-600 text-white px-3 py-1 rounded"
//             >
//               Reject
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// frontend/src/components/AccessRequests.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import { decideAccess } from "../api/access.api";

export default function AccessRequests() {
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    const res = await api.get("/admin/access-requests");
    setRequests(res.data);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleDecision = async (datasetId, userId, decision) => {
    await decideAccess(datasetId, userId, decision);
    loadRequests();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Pending Access Requests
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Review and manage dataset access requests.
        </p>
      </div>

      {/* Empty state */}
      {requests.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 py-12 text-center text-sm text-gray-500">
          No pending access requests
        </div>
      )}

      {/* Requests list */}
      <div className="space-y-4">
        {requests.map((r, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">User:</span>{" "}
                {r.email}
              </p>

              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">Dataset:</span>{" "}
                {r.name}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() =>
                  handleDecision(r.dataset_id, r.user_id, "approved")
                }
                className="inline-flex items-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  handleDecision(r.dataset_id, r.user_id, "rejected")
                }
                className="inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
