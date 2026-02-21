// // frontend/src/App.jsx
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/Login";
// import Datasets from "./pages/Datasets";
// import DatasetDetails from "./pages/DatasetDetails";
// import AccessRequests from "./components/AccessRequests";

// import ProtectedRoute from "./auth/ProtectedRoute";
// import Navbar from "./components/Navbar";
// import { useAuth } from "./auth/AuthContext";

// /**
//  * Layout wrapper to show Navbar only after login
//  */
// function AppLayout({ children }) {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Top navigation */}
//       <Navbar />

//       {/* Main content area */}
//       <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//         {children}
//       </main>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* PUBLIC */}
//         <Route path="/login" element={<Login />} />

//         {/* DATASETS LIST */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <AppLayout>
//                 <Datasets />
//               </AppLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* DATASET DETAILS */}
//         <Route
//           path="/datasets/:id"
//           element={
//             <ProtectedRoute>
//               <AppLayout>
//                 <DatasetDetails />
//               </AppLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* ADMIN – ACCESS REQUESTS */}
//         <Route
//           path="/access-requests"
//           element={
//             <ProtectedRoute roles={["admin"]}>
//               <AppLayout>
//                 <AccessRequests />
//               </AppLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* FALLBACK */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// frontend/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Datasets from "./pages/Datasets";
import DatasetDetails from "./pages/DatasetDetails";
// import AccessRequests from "./components/AccessRequests";

import ProtectedRoute from "./auth/ProtectedRoute";
import Navbar from "./components/Navbar";
import { useAuth } from "./auth/AuthContext";

function AppLayout({ children }) {
  // const { user } = useAuth();

  // if (!user) {
  //   return <Navigate to="/login" />;
  // }

  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />

        {/* ROOT */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* DATASETS */}
        <Route
          path="/datasets"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Datasets />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* DATASET DETAILS */}
        <Route
          path="/datasets/:id"
          element={
            <ProtectedRoute>
              <AppLayout>
                <DatasetDetails />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN – ACCESS REQUESTS */}
        {/* <Route
          path="/access-requests"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AppLayout>
                <AccessRequests />
              </AppLayout>
            </ProtectedRoute>
          }
        /> */}

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
