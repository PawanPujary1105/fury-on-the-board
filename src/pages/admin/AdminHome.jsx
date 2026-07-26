import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Admin</h2>
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
