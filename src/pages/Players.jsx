import { useEffect, useState } from "react";
import { getGames } from "../services/gameService";
import { getPlayers } from "../services/playerService";
import { calculatePlayerStats } from "../utils/calculatePlayerStats";
import PlayerCard from "../components/PlayerCard";

function Players() {
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [playersData, gamesData] = await Promise.all([
      getPlayers(),
      getGames(),
    ]);
    setPlayers(playersData);
    setGames(gamesData);
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Players</h2>
      {players.length === 0 ? (
        <div className="bg-slate-900 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-slate-300">
            No Players Available
          </h3>
          <p className="text-slate-500 mt-2">
            Create a player from the Admin Games page.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {players.map((player) => {
            const stats = calculatePlayerStats(games, player.name);
            return (
              <PlayerCard
                key={player.id}
                name={player.name}
                rapidRating={player.rapidRating}
                blitzRating={player.blitzRating}
                wins={stats.wins}
                draws={stats.draws}
                losses={stats.losses}
                titles={player.titles}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Players;
