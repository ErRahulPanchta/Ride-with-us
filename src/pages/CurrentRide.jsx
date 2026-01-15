import { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom"
const CurrentRide = () => {
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);

  const [paid, setPaid] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [paying, setPaying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    fetchRide();
    const interval = setInterval(fetchRide, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchRide = async () => {
    try {
      const res = await Axios.get("/api/rides/my-active");
      const data = res.data.data;

      if (!data) {
        setRide(null);
        return;
      }

      setRide(data);

      if (data.payment_status === "paid") {
        setPaid(true);
      }
    } catch {
      toast.error("Failed to fetch ride");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (paying) return;

    try {
      setPaying(true);

      await Axios.post("/api/payments/create-intent", {
        ride_id: ride.id,
        amount: ride.fare_amount,
        payment_method: "upi"
      });

      toast.success("Payment successful");
      setPaid(true);
      fetchRide();
    } catch {
      toast.error("Payment failed");
    } finally {
      setPaying(false);
    }
  };

  const submitRating = async () => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    try {
      setSubmitting(true);

      await Axios.post("/api/ratings", {
        ride_id: ride.id,
        driver_id: ride.driver.id,
        rating,
        feedback
      });

      toast.success("Rating submitted");

      // Clear ride AFTER rating
      setRide(null);
      navigate("/");
    } catch {
      toast.error("Failed to submit rating");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading ride...</div>;
  }

  if (!ride) {
    return (
      <div className="p-6 text-center text-gray-500">
        No active ride
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Your Ride</h1>

      {/* Ride Info */}
      <div className="bg-white rounded-xl shadow p-6 space-y-2">
        <p><strong>Status:</strong> {ride.status}</p>
        <p><strong>Pickup:</strong> {ride.pickup_address}</p>
        <p><strong>Drop:</strong> {ride.dropoff_address}</p>
        <p><strong>Fare:</strong> ₹{ride.fare_amount}</p>
      </div>

      {/* Driver */}
      {ride.driver && (
        <div className="bg-white rounded-xl shadow p-6 space-y-2">
          <h2 className="text-xl font-semibold">Driver Details</h2>
          <p><strong>Name:</strong> {ride.driver.full_name}</p>
          <p><strong>Phone:</strong> {ride.driver.phone_number}</p>
          <p><strong>License:</strong> {ride.driver.license_number}</p>
        </div>
      )}

      {/* Status Text */}
      {ride.status === "requested" && (
        <p className="text-indigo-600 font-medium">
          Waiting for a driver to accept…
        </p>
      )}

      {ride.status === "accepted" && (
        <p className="text-green-600 font-medium">
          Driver accepted your ride 🚗
        </p>
      )}

      {ride.status === "in_progress" && (
        <p className="text-indigo-700 font-medium">
          Ride in progress…
        </p>
      )}

      {/* Payment */}
      {ride.status === "completed" && !paid && (
        <div className="bg-white rounded-xl shadow p-6">
          <button
            disabled={paying}
            onClick={handlePayment}
            className="w-full py-3 bg-indigo-600 text-white rounded disabled:opacity-50"
          >
            {paying ? "Processing..." : `Pay ₹${ride.fare_amount}`}
          </button>
        </div>
      )}

      {/* Rating */}
      {ride.status === "completed" && paid && ride.driver && (
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold">Rate Driver</h2>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                onClick={() => setRating(n)}
                className={`w-10 h-10 rounded-full border ${
                  rating >= n ? "bg-yellow-400 text-white" : "bg-gray-100"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            placeholder="Feedback (optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full border rounded px-4 py-2"
          />

          <button
            onClick={submitRating}
            disabled={submitting}
            className="w-full py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Rating"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CurrentRide;
