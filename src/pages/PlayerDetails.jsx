import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGames } from "../services/gameService";
import { getPlayers } from "../services/playerService";
import { calculatePlayerStats } from "../utils/calculatePlayerStats";

function PlayerDetails() {
  const { playerName } = useParams();

  const [player, setPlayer] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [players, gamesData] = await Promise.all([getPlayers(), getGames()]);
    const selectedPlayer = players.find(
      (p) => p.name.toLowerCase() === playerName.toLowerCase(),
    );
    setPlayer(selectedPlayer);
    setGames(gamesData);
  }

  const stats = calculatePlayerStats(games, player.name);
  const recentGames = games
    .filter(
      (game) =>
        (game.white === player.name || game.black === player.name) &&
        game.status === "Completed",
    )
    .sort((a, b) => new Date(b.gameDate) - new Date(a.gameDate))
    .slice(0, 5);
  const upcomingGames = games
    .filter(
      (game) =>
        (game.white === player.name || game.black === player.name) &&
        game.status === "Scheduled",
    )
    .sort((a, b) => new Date(a.gameDate) - new Date(b.gameDate));

  if (!player) {
    return <h2>Player not found</h2>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">{player.name}</h2>
      <div className="bg-slate-900 p-6 rounded-lg">
        <p>Rapid Rating: {player.rapidRating}</p>
        <p>Blitz Rating: {player.blitzRating}</p>
        <p>Titles: {player.titles}</p>
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2"> Stats </h3>
          <p>Wins: {stats.wins}</p> <p>Draws: {stats.draws}</p>
          <p>Losses: {stats.losses}</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-bold text-emerald-400 mb-3">
          Recent Games
        </h3>
        {recentGames.length === 0 ? (
          <div className="bg-slate-900 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-300">
              No Results Yet
            </h3>
            <p className="text-slate-500 mt-2">
              Complete a game from the Admin Games page.
            </p>
          </div>
        ) : (
          recentGames.map((game) => (
            <div key={game.id} className="bg-slate-900 p-4 rounded-lg mb-2">
              <p>
                {game.white} vs {game.black}
              </p>
              <p>Result: {game.result}</p>
              <p>Format: {game.format}</p>
              <p className="text-sm text-slate-400 mt-2">
                {new Date(game.gameDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          ))
        )}
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-bold text-blue-400 mb-3">Upcoming Games</h3>
        {upcomingGames.length === 0 ? (
          <div className="bg-slate-900 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-300">
              No Upcoming Games
            </h3>
            <p className="text-slate-500 mt-2">
              Create a game from the Admin Games page.
            </p>
          </div>
        ) : (
          upcomingGames.map((game) => (
            <div key={game.id} className="bg-slate-900 p-4 rounded-lg mb-2">
              <div className="flex justify-between items-center">
                <span>
                  {game.white} vs {game.black}
                </span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
                  Scheduled
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-2">
                {game.format} • Round {game.round}
              </p>
              <p className="text-sm text-slate-400 mt-2">
                {new Date(game.gameDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PlayerDetails;
