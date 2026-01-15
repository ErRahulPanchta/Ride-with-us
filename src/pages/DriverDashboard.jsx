import { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const DriverDashboard = () => {
  const [driver, setDriver] = useState(null);
  const [status, setStatus] = useState("offline");
  const [availableRides, setAvailableRides] = useState([]);
  const [activeRide, setActiveRide] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDriver();
  }, []);

  useEffect(() => {
    if (status === "available") {
      fetchAvailableRides();
    }
  }, [status]);

  const fetchDriver = async () => {
    try {
      const res = await Axios.get("/api/drivers/me");
      setDriver(res.data.data);
      setStatus(res.data.data.status || "offline");
    } catch {
      toast.error("Failed to load driver");
    }
  };

  const fetchAvailableRides = async () => {
    try {
      const res = await Axios.get("/api/rides/available");
      setAvailableRides(res.data.data);
    } catch {
      toast.error("Failed to fetch rides");
    }
  };

  const updateDriverStatus = async (newStatus) => {
    try {
      setLoading(true);
      await Axios.post("/api/drivers/status", { status: newStatus });
      setStatus(newStatus);
    } catch {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const acceptRide = async (rideId) => {
    try {
      const res = await Axios.post(`/api/rides/${rideId}/accept`);
      setActiveRide(res.data.data);
      setAvailableRides([]);
      toast.success("Ride accepted");
    } catch {
      toast.error("Failed to accept ride");
    }
  };

  const updateRideStatus = async (newStatus) => {
    try {
      const res = await Axios.patch(
        `/api/rides/${activeRide.id}/status`,
        { status: newStatus }
      );
      setActiveRide(res.data.data);
      toast.success(`Ride ${newStatus}`);
    } catch {
      toast.error("Failed to update ride");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!driver) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Driver Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>

      {/* DRIVER INFO */}
      <div className="bg-white p-4 rounded shadow">
        <p><strong>Name:</strong> {driver.full_name}</p>
        <p><strong>License:</strong> {driver.license_number}</p>
      </div>

      {/* STATUS */}
      <div className="bg-white p-4 rounded shadow flex justify-between items-center">
        <span>
          Status: <strong>{status}</strong>
        </span>
        <div className="flex gap-2">
          <button
            disabled={status === "available"}
            onClick={() => updateDriverStatus("available")}
            className="px-3 py-2 bg-green-600 text-white rounded"
          >
            Go Available
          </button>
          <button
            disabled={status === "offline"}
            onClick={() => updateDriverStatus("offline")}
            className="px-3 py-2 bg-gray-600 text-white rounded"
          >
            Go Offline
          </button>
        </div>
      </div>

      {/* ACTIVE RIDE */}
      {activeRide && (
        <div className="bg-white p-6 rounded shadow space-y-3">
          <h2 className="text-xl font-semibold">Active Ride</h2>
          <p><strong>Pickup:</strong> {activeRide.pickup_address}</p>
          <p><strong>Drop:</strong> {activeRide.dropoff_address}</p>
          <p><strong>Status:</strong> {activeRide.status}</p>

          {activeRide.status === "accepted" && (
            <button
              onClick={() => updateRideStatus("in_progress")}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Start Ride
            </button>
          )}

          {activeRide.status === "in_progress" && (
            <button
              onClick={() => updateRideStatus("completed")}
              className="px-4 py-2 bg-green-700 text-white rounded"
            >
              Complete Ride
            </button>
          )}
        </div>
      )}

      {/* AVAILABLE RIDES */}
      {!activeRide && status === "available" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Rides</h2>

          {availableRides.length === 0 && (
            <p className="text-gray-500">No ride requests yet</p>
          )}

          {availableRides.map((ride) => (
            <div
              key={ride.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p><strong>Pickup:</strong> {ride.pickup_address}</p>
                <p><strong>Drop:</strong> {ride.dropoff_address}</p>
                <p>₹{ride.fare_amount}</p>
              </div>

              <button
                onClick={() => acceptRide(ride.id)}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Accept
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
