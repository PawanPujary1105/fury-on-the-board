import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getSeasons,
  addSeason,
  updateSeason,
  deleteSeason,
  deactivateOtherSeasons,
} from "../../services/seasonService";

function AdminSeasons() {
  const [seasons, setSeasons] = useState([]);
  const [editingSeason, setEditingSeason] = useState(null);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [active, setActive] = useState(false);
  const inputClass =
    "w-full p-2 rounded bg-slate-800 text-white border border-slate-700 placeholder-slate-400";

  useEffect(() => {
    loadSeasons();
  }, []);

  async function loadSeasons() {
    const data = await getSeasons();
    setSeasons(
      data.sort((a, b) => {
        if (a.active !== b.active) {
          return b.active - a.active;
        }

        return new Date(b.startDate) - new Date(a.startDate);
      }),
    );
  }

  function clearForm() {
    setName("");
    setStartDate("");
    setEndDate("");
    setActive(false);
    setEditingSeason(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const seasonData = {
      name: name.trim(),
      startDate,
      endDate,
      active,
    };

    try {
      if (active) {
        await deactivateOtherSeasons(editingSeason?.id);
      }
      if (editingSeason) {
        await updateSeason(editingSeason.id, seasonData);
        alert("Season updated successfully!");
      } else {
        await addSeason(seasonData);
        alert("Season added successfully!");
      }

      await loadSeasons();
      clearForm();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  }

  function handleEdit(season) {
    setEditingSeason(season);

    setName(season.name);
    setStartDate(season.startDate || "");
    setEndDate(season.endDate || "");
    setActive(season.active);
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Delete this season?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteSeason(id);
      await loadSeasons();
      alert("Season deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete season");
    }
  }

  const isFormValid = name.trim();

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Manage Seasons</h2>
      <Link to="/admin" className="text-amber-400 hover:underline">
        ← Back to Admin
      </Link>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-6 rounded-lg mt-6"
      >
        <h3 className="text-xl font-bold mb-4">
          {editingSeason ? "Edit Season" : "Add Season"}
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">
              Season Name
            </label>
            <input
              type="text"
              placeholder="Season Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={inputClass}
            />
          </div>
          <label className="flex items-center gap-3 text-white">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
            Active Season
          </label>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`mt-6 px-4 py-2 rounded font-semibold transition ${
            !isFormValid
              ? "bg-slate-700 text-slate-500 cursor-not-allowed"
              : "bg-amber-500 text-black hover:bg-amber-400"
          }`}
        >
          {editingSeason ? "Update Season" : "Add Season"}
        </button>
      </form>

      <div className="bg-slate-900 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-bold mb-4">Current Seasons</h3>
        {seasons.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="text-xl font-semibold text-slate-300">
              No Seasons Available
            </h3>
            <p className="text-slate-500 mt-2">Create your first season.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {seasons.map((season) => (
              <div
                key={season.id}
                className="flex justify-between items-center bg-slate-800 p-3 rounded"
              >
                <div>
                  <h4 className="font-semibold">
                    {season.name}
                    {season.active && (
                      <span className="ml-2 text-emerald-400">(Active)</span>
                    )}
                  </h4>
                  <p className="text-sm text-slate-400">
                    {season.startDate} → {season.endDate || "Ongoing"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(season)}
                    className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(season.id)}
                    className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSeasons;
