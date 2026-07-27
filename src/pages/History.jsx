import { useEffect, useState } from "react";
import { getSeasons } from "../services/seasonService";
import SeasonHistoryCard from "../components/SeasonHistoryCard";

function History() {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    loadSeasons();
  }, []);

  async function loadSeasons() {
    const data = await getSeasons();
    setSeasons(data);
  }
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">History</h2>
      {seasons.length === 0 ? (
        <div className="bg-slate-900 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-slate-300">
            No Seasons Available
          </h3>
          <p className="text-slate-500 mt-2">
            Create a season from the Admin Games page.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {seasons.map((season) => (
            <SeasonHistoryCard key={season.id} season={season} />
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
