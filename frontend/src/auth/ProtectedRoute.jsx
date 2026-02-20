// // frontend\src\auth\ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// export default function ProtectedRoute({ children, roles }) {
//   const { user } = useAuth();

//   if (!user) return <Navigate to="/login" />;

//   if (roles && !roles.includes(user.role)) {
//     return <div className="p-6 text-red-600">Forbidden</div>;
//   }

//   return children;
// }

// frontend/src/auth/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.role)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <h2 className="text-lg font-semibold text-red-700">Access Denied</h2>
          <p className="mt-2 text-sm text-red-600">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  return children;
}
