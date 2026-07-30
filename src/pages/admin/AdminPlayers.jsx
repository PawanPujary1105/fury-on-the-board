import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingOverlay from "../../components/LoadingOverlay";
import {
  addPlayer,
  updatePlayer,
  getPlayers,
  deletePlayer,
} from "../../services/playerService";

function AdminPlayers() {
  const isAuthenticated =
    sessionStorage.getItem("adminAuthenticated") === "true";
  if (!isAuthenticated) {
    return <Navigate to="/admin" />;
  }
  const [loadingMessage, setLoadingMessage] = useState("");
  const [name, setName] = useState("");
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [rapidRating, setRapidRating] = useState("");
  const [blitzRating, setBlitzRating] = useState("");
  const [titles, setTitles] = useState("");
  const inputClass =
    "w-full p-2 mb-3 rounded bg-slate-800 text-white border border-slate-700 placeholder-slate-400";
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    async function initialize() {
      setLoadingMessage("Loading Admin Players...");
      await loadPlayers();
      setLoadingMessage("");
    }

    initialize();
  }, []);

  async function loadPlayers() {
    const data = await getPlayers();
    const sortedPlayers = data.sort((a, b) => a.name.localeCompare(b.name));
    setPlayers(sortedPlayers);
  }

  function clearForm() {
    setName("");
    setRapidRating("");
    setBlitzRating("");
    setEditingPlayer(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoadingMessage(
      editingPlayer
        ? "Updating Player..."
        : setLoadingMessage("Adding Player..."),
    );

    const playerData = {
      name: name.trim(),
      rapidRating: Number(rapidRating),
      blitzRating: Number(blitzRating),
    };

    try {
      if (editingPlayer) {
        await updatePlayer(editingPlayer.id, playerData);
        alert("Player updated successfully!");
      } else {
        await addPlayer(playerData);
        alert("Player added successfully!");
      }

      await loadPlayers();
      clearForm();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
    setLoadingMessage("");
  }

  async function handleDelete(id) {
    setLoadingMessage("Deleting Player...");
    const confirmed = window.confirm("Delete this player?");

    if (!confirmed) {
      return;
    }

    try {
      await deletePlayer(id);

      await loadPlayers();

      alert("Player deleted successfully!");
    } catch (error) {
      console.error(error);

      alert("Failed to delete player");
    }
    setLoadingMessage("");
  }

  function handleEdit(player) {
    setEditingPlayer(player);

    setName(player.name);
    setRapidRating(player.rapidRating);
    setBlitzRating(player.blitzRating);
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Manage Players</h2>
      <Link to="/admin" className="text-amber-400 hover:underline">
        ← Back to Admin
      </Link>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-6 rounded-lg mt-6"
      >
        <h3 className="text-xl font-bold mb-4">
          {editingPlayer ? "Edit Player" : "Add Player"}
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Player Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
          <input
            type="number"
            placeholder="Rapid Rating"
            value={rapidRating}
            onChange={(e) => setRapidRating(e.target.value)}
            className={inputClass}
          />
          <input
            type="number"
            placeholder="Blitz Rating"
            value={blitzRating}
            onChange={(e) => setBlitzRating(e.target.value)}
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          className={`mt-6 px-4 py-2 rounded font-semibold transition ${!name || !rapidRating || !blitzRating ? "bg-slate-700 text-slate-500 cursor-not-allowed" : "bg-amber-500 text-black hover:bg-amber-400"}`}
          disabled={!name || !rapidRating || !blitzRating}
        >
          {editingPlayer ? "Update Player" : "Add Player"}
        </button>
      </form>
      <div className="bg-slate-900 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-bold mb-4">Current Players</h3>
        {players.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-300">
              No Players Available
            </h3>
            <p className="text-slate-500 mt-2">
              Create your first player from the form above.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {players.map((player) => (
              <div
                key={player.id}
                className="flex justify-between items-center bg-slate-800 p-3 rounded"
              >
                <div>
                  <span>♟️ {player.name}</span>
                  <p className="text-slate-400 text-sm">
                    Rapid: {player.rapidRating}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(player)}
                    className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(player.id)}
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
      {loadingMessage && <LoadingOverlay message={loadingMessage} />}
    </div>
  );
}

export default AdminPlayers;
