// src\components\RazorpayButton.jsx
import { createOrder, verifyPayment } from "../api/payments.api";

export default function RazorpayButton({ datasetId, onSuccess }) {
  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    try {
      const loaded = await loadRazorpay();
      if (!loaded) {
        alert("Razorpay SDK failed to load");
        return;
      }

      // 1. Create order
      const { data } = await createOrder(datasetId);

      const options = {
        key: data.key,
        amount: data.amount * 100,
        currency: "INR",
        order_id: data.razorpayOrderId,
        name: "Micrologic Data Marketplace",
        description: "Dataset Purchase",
        handler: async (response) => {
          // 2. Verify payment
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          alert("Payment successful. Download unlocked.");
          onSuccess?.();
        },
        theme: { color: "#2563eb" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Buy & Download
    </button>
  );
}
