import { Link, Navigate, useNavigate } from "react-router-dom";

function AdminHome() {
  const isAuthenticated =
    sessionStorage.getItem("adminAuthenticated") === "true";
  if (!isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  const navigate = useNavigate();
  function handleLogout() {
    const confirmed = window.confirm("Logout from admin?");

    if (!confirmed) {
      return;
    }

    sessionStorage.removeItem("adminAuthenticated");
    navigate("/");
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Link to="/admin/players" className="bg-slate-900 p-6 rounded-lg">
          <h3 className="text-xl font-bold">Players</h3>
          <p className="text-slate-400 mt-2">Manage Players</p>
        </Link>
        <Link to="/admin/games" className="bg-slate-900 p-6 rounded-lg">
          <h3 className="text-xl font-bold">Games</h3>
          <p className="text-slate-400 mt-2">Manage Games</p>
        </Link>
        <Link to="/admin/seasons" className="bg-slate-900 p-6 rounded-lg">
          <h3 className="text-xl font-bold">Seasons</h3>
          <p className="text-slate-400 mt-2">Manage Seasons</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminHome;
