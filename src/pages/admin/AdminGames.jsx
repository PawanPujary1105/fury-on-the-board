import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingOverlay from "../../components/LoadingOverlay";
import {
  addGame,
  updateGame,
  getGames,
  deleteGame,
} from "../../services/gameService";
import { getPlayers } from "../../services/playerService";
import { getSeasons } from "../../services/seasonService";
import { formatDate } from "../../utils/dateUtils";

function AdminGames() {
  const isAuthenticated =
    sessionStorage.getItem("adminAuthenticated") === "true";
  if (!isAuthenticated) {
    return <Navigate to="/admin" />;
  }
  const [loadingMessage, setLoadingMessage] = useState("");
  const [gameDate, setGameDate] = useState("");
  const [editingGame, setEditingGame] = useState(null);
  const [activeSeason, setActiveSeason] = useState(null);
  const [round, setRound] = useState("");
  const [format, setFormat] = useState("Rapid");
  const [white, setWhite] = useState("");
  const [black, setBlack] = useState("");
  const [status, setStatus] = useState("Scheduled");
  const [result, setResult] = useState("Pending");
  const inputClass =
    "w-full p-2 mb-3 rounded bg-slate-800 text-white border border-slate-700 placeholder-slate-400";

  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);
  const [seasons, setSeasons] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoadingMessage("Loading Admin Games...");
    const [playersData, gamesData, seasonsData] = await Promise.all([
      getPlayers(),
      getGames(),
      getSeasons(),
    ]);
    const active = seasonsData.find((season) => season.active);
    const sortedGames = gamesData.sort((a, b) => {
      const dateComparison = new Date(b.gameDate) - new Date(a.gameDate);
      if (dateComparison !== 0) {
        return dateComparison;
      }
      return b.round - a.round;
    });
    setPlayers(playersData);
    setGames(sortedGames);
    setActiveSeason(active || null);
    setSeasons(seasonsData);
    setLoadingMessage("");
  }

  async function loadGames() {
    const data = await getGames();
    const sortedGames = data.sort((a, b) => {
      const dateComparison = new Date(b.gameDate) - new Date(a.gameDate);

      if (dateComparison !== 0) {
        return dateComparison;
      }

      return b.round - a.round;
    });
    setGames(sortedGames);
  }

  function clearForm() {
    setGameDate("");
    setEditingGame(null);
    setRound("");
    setFormat("Rapid");
    setWhite("");
    setBlack("");
    setStatus("Scheduled");
    setResult("Pending");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoadingMessage(
      editingGame ? "Updating Game..." : setLoadingMessage("Adding Game..."),
    );

    if (white === black) {
      alert("White and Black players cannot be the same");
      return;
    }

    if (status === "Completed" && result === "Pending") {
      alert("Please select a result for completed games");
      return;
    }

    const gameData = {
      seasonId: editingGame?.seasonId ?? activeSeason.id,
      gameDate,
      round: Number(round),
      format,
      white,
      black,
      status,
      result: status === "Scheduled" ? "Pending" : result,
    };

    try {
      if (editingGame) {
        await updateGame(editingGame.id, gameData);
        alert("Game updated successfully!");
      } else {
        await addGame(gameData);
        alert("Game added successfully!");
      }

      await loadGames();
      clearForm();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
    setLoadingMessage("");
  }

  async function handleDelete(id) {
    setLoadingMessage("Deleting Game...");
    const confirmed = window.confirm("Delete this game?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteGame(id);
      await loadGames();
      alert("Game deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete game");
    }
    setLoadingMessage("");
  }

  function handleEdit(game) {
    setEditingGame(game);
    setGameDate(game.gameDate);
    setRound(game.round);
    setFormat(game.format);
    setWhite(game.white);
    setBlack(game.black);
    setStatus(game.status);
    setResult(game.result);
  }

  function getSeasonName(seasonId) {
    const season = seasons.find((season) => season.id === seasonId);
    return season?.name || "Unknown Season";
  }

  const isFormValid = gameDate && round && white && black;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Manage Games</h2>
      <Link to="/admin" className="text-amber-400 hover:underline">
        ← Back to Admin
      </Link>
      {!activeSeason ? (
        <div className="bg-slate-900 rounded-lg p-8 text-center mt-8">
          <h3 className="text-xl font-semibold text-slate-300">
            No Active Season
          </h3>
          <p className="text-slate-500 mt-2">
            Create or activate a season before creating or editing games.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 p-6 rounded-lg mt-6"
        >
          <h3 className="text-xl font-bold mb-4">
            {editingGame ? "Edit Game" : "Add Game"}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Season
              </label>
              <input
                value={
                  editingGame
                    ? getSeasonName(editingGame.seasonId)
                    : activeSeason?.name || ""
                }
                disabled
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Game Date
              </label>
              <input
                type="date"
                value={gameDate}
                onChange={(e) => setGameDate(e.target.value)}
                className={inputClass}
              />
            </div>
            <input
              type="number"
              placeholder="Round"
              value={round}
              onChange={(e) => setRound(e.target.value)}
              className={inputClass}
            />
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className={inputClass}
            >
              <option>Rapid</option>
              <option>Blitz</option>
            </select>
            <select
              value={white}
              onChange={(e) => setWhite(e.target.value)}
              className={inputClass}
            >
              <option value="">Select White Player</option>

              {players.map((player) => (
                <option key={player.id} value={player.name}>
                  {player.name}
                </option>
              ))}
            </select>
            <select
              value={black}
              onChange={(e) => setBlack(e.target.value)}
              className={inputClass}
            >
              <option value="">Select Black Player</option>

              {players.map((player) => (
                <option key={player.id} value={player.name}>
                  {player.name}
                </option>
              ))}
            </select>
            {editingGame && (
              <select
                value={status}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  setStatus(newStatus);
                  if (newStatus === "Scheduled") {
                    setResult("Pending");
                  }
                }}
                className={inputClass}
              >
                <option>Scheduled</option>
                <option>Completed</option>
              </select>
            )}
            {editingGame && (
              <select
                value={result}
                onChange={(e) => setResult(e.target.value)}
                className={inputClass}
                disabled={status === "Scheduled"}
              >
                <option>Pending</option>
                <option>1-0</option>
                <option>0-1</option>
                <option>1-1</option>
              </select>
            )}
          </div>
          <button
            type="submit"
            className={`mt-6 px-4 py-2 rounded font-semibold transition ${!isFormValid ? "bg-slate-700 text-slate-500 cursor-not-allowed" : "bg-amber-500 text-black hover:bg-amber-400"}`}
            disabled={!isFormValid}
          >
            {editingGame ? "Update Game" : "Add Game"}
          </button>
        </form>
      )}
      <div className="bg-slate-900 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-bold mb-4">Current Games</h3>
        {games.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-300">
              No Games Available
            </h3>
            <p className="text-slate-500 mt-2">
              Create your first game from the form above.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {games.map((game) => (
              <div key={game.id} className="bg-slate-800 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg">
                      {game.white} vs {game.black}
                    </h4>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      game.status === "Scheduled"
                        ? "bg-amber-900 text-amber-400"
                        : "bg-emerald-900 text-emerald-400"
                    }`}
                  >
                    {game.status.toUpperCase()}
                  </span>
                </div>
                <div className="mt-3 space-y-1 text-sm text-slate-400">
                  <p>
                    {getSeasonName(game.seasonId)} • {formatDate(game.gameDate)}{" "}
                    • {game.format} • Round {game.round}
                  </p>
                  {game.status === "Completed" && <p>Result: {game.result}</p>}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(game)}
                    className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(game.id)}
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

export default AdminGames;
