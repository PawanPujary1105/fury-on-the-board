import { useEffect, useState } from "react";
import { getGames } from "../services/gameService";
import { formatDate } from "../utils/dateUtils";

function Results() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    const data = await getGames();
    const sortedGames = data
      .filter((game) => game.status === "Completed")
      .sort((a, b) => {
        const dateComparison = new Date(b.gameDate) - new Date(a.gameDate);
        if (dateComparison !== 0) {
          return dateComparison;
        }
        return b.round - a.round;
      });
    setGames(sortedGames);
  }
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Results</h2>
      {games.length === 0 ? (
        <div className="bg-slate-900 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-slate-300">
            No Results Yet
          </h3>
          <p className="text-slate-500 mt-2">
            Complete a game from the Admin Games page.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {games.map((game) => (
            <div key={game.id} className="bg-slate-900 p-5 rounded-lg">
              <p className="text-sm text-amber-400 font-medium">
                {game.format} • Round {game.round}
              </p>
              <h3 className="text-xl font-bold my-3">
                {game.white}
                <span className="mx-3 text-amber-400">{game.result}</span>
                {game.black}
              </h3>
              <p className="text-slate-400">{formatDate(game.gameDate)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Results;
