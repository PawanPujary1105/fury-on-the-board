import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAdminPIN } from "../../services/adminService";

function AdminLogin({ onSuccess }) {
  const isAuthenticated =
    sessionStorage.getItem("adminAuthenticated") === "true";

  if (isAuthenticated) {
    return <Navigate to="/admin-home" />;
  }
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [adminPin, setAdminPin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadAdminPIN();
  }, []);

  async function loadAdminPIN() {
    const data = await getAdminPIN();
    setAdminPin(data.adminPin);
    setIsLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (Number(pin) === adminPin) {
        sessionStorage.setItem("adminAuthenticated", "true");
        navigate("/admin-home");
      } else {
        alert("Invalid PIN");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to verify admin PIN");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-slate-900 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Admin Access</h2>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm text-slate-400 mb-1">
            Enter Admin PIN
          </label>

          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700"
          />

          <button
            type="submit"
            disabled={isLoading || !pin}
            className={`mt-4 px-4 py-2 rounded font-semibold transition ${isLoading || !pin ? "bg-slate-700 text-slate-500 cursor-not-allowed" : "bg-amber-500 text-black hover:bg-amber-400"}`}
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
