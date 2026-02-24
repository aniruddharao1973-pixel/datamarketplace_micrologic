// // frontend\src\components\CheckoutDrawer.jsx
// import RazorpayButton from "./RazorpayButton";

// export default function CheckoutDrawer({ open, onClose, dataset, onSuccess }) {
//   if (!open || !dataset) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-scale-in">
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b">
//           <h2 className="text-sm font-bold tracking-wide uppercase">
//             Checkout
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 text-lg"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-6">
//           {/* Dataset Summary */}
//           <div>
//             <h3 className="text-lg font-bold text-gray-900">{dataset.name}</h3>
//             <p className="text-sm text-gray-500 mt-1">
//               Unlock full dataset access instantly.
//             </p>
//           </div>

//           {/* Trust Signals */}
//           <div className="space-y-2 text-sm text-gray-600">
//             <div>✔ Buy once · Access forever</div>
//             <div>✔ Instant download after payment</div>
//             <div>✔ Re-download anytime</div>
//           </div>

//           {/* ✅ Price (FIXED) */}
//           <div className="flex items-center justify-between border rounded-xl px-4 py-3 bg-gray-50">
//             <span className="text-sm text-gray-500">Price</span>
//             <span className="text-lg font-bold text-gray-900">
//               ₹{dataset.price_inr}
//             </span>
//           </div>

//           {/* Razorpay */}
//           <RazorpayButton
//             datasetId={dataset.id}
//             onSuccess={() => {
//               onSuccess();
//               onClose();
//             }}
//           />
//         </div>

//         <div className="px-6 py-4 border-t text-xs text-gray-400 text-center">
//           Secure payments powered by Razorpay
//         </div>
//       </div>
//     </div>
//   );
// }

import RazorpayButton from "./RazorpayButton";

export default function CheckoutDrawer({ open, onClose, dataset, onSuccess }) {
  if (!open || !dataset) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-slide-up sm:animate-scale-in">
        {/* Decorative top gradient bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400" />

        {/* Mobile drag handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-4 sm:pt-5 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
              <svg
                className="w-4.5 h-4.5 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </div>
            <h2 className="text-base font-semibold text-gray-800 tracking-tight">
              Checkout
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 group"
            aria-label="Close"
          >
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="mx-6 border-t border-gray-100" />

        {/* Content */}
        <div className="px-6 py-5 space-y-5">
          {/* Dataset Summary Card */}
          <div className="bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 rounded-2xl p-4 border border-blue-100/60">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-blue-100/80 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-gray-900 leading-snug truncate">
                  {dataset.name}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                  Unlock full dataset access instantly
                </p>
              </div>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="space-y-2.5">
            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                ),
                text: "Buy once · Access forever",
                color: "text-emerald-500",
                bg: "bg-emerald-50",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                ),
                text: "Instant download after payment",
                color: "text-blue-500",
                bg: "bg-blue-50",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182"
                  />
                ),
                text: "Re-download anytime",
                color: "text-violet-500",
                bg: "bg-violet-50",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}
                >
                  <svg
                    className={`w-3.5 h-3.5 ${item.color}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    {item.icon}
                  </svg>
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between rounded-2xl px-5 py-4 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200/80">
            <span className="text-sm font-medium text-gray-500">
              Total Price
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                ₹{dataset.price_inr}
              </span>
              <span className="text-xs text-gray-400 font-medium">INR</span>
            </div>
          </div>

          {/* Razorpay Button */}
          <div className="pt-1">
            <RazorpayButton
              datasetId={dataset.id}
              onSuccess={() => {
                onSuccess();
                onClose();
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <svg
              className="w-3.5 h-3.5 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
            <span>Secure payments powered by Razorpay</span>
          </div>
        </div>
      </div>
    </div>
  );
}
