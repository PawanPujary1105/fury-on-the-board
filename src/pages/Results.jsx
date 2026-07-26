import { useEffect, useState } from "react";
import { getGames } from "../services/gameService";

function Results() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    const data = await getGames();
    setGames(data);
  }
  const results = games
    .filter((game) => game.status === "Completed")
    .sort((a, b) => new Date(b.gameDate) - new Date(a.gameDate));
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Results</h2>
      {results.length === 0 ? (
        <div className="bg-slate-900 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-slate-300">
            No Results Yet
          </h3>
          <p className="text-slate-500 mt-2">
            Complete a game from the Admin Games page.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {results.map((match) => (
            <div key={match.id} className="bg-slate-900 p-5 rounded-lg">
              <div className="flex justify-between mb-3">
                <span className="text-slate-400">{match.format}</span>
                <span className="text-emerald-400">{match.status}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{match.white}</span>
                <span className="font-bold text-amber-400">{match.result}</span>
                <span>{match.black}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Results;
