import { seasons } from "../data/seasons";
import SeasonHistoryCard from "../components/SeasonHistoryCard";

function History() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">History</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {seasons.map((season) => (
          <SeasonHistoryCard
            key={season.id}
            season={season.season}
            rapidChampion={season.rapidChampion}
            blitzChampion={season.blitzChampion}
          />
        ))}
      </div>
    </div>
  );
}

export default History;
