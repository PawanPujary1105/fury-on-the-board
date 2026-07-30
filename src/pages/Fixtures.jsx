import { useEffect, useState } from "react";
import { getGames } from "../services/gameService";
import FixtureCard from "../components/FixtureCard";

function Fixtures() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    const data = await getGames();
    const sortedGames = data
      .filter((game) => game.status === "Scheduled")
      .sort((a, b) => {
        const dateComparison = new Date(a.gameDate) - new Date(b.gameDate);
        if (dateComparison !== 0) {
          return dateComparison;
        }
        return a.round - b.round;
      });
    setGames(sortedGames);
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Fixtures</h2>
      {games.length === 0 ? (
        <div className="bg-slate-900 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-slate-300">
            No Upcoming Games
          </h3>
          <p className="text-slate-500 mt-2">
            Create a game from the Admin Games page.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {games.map((game) => (
            <FixtureCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Fixtures;
