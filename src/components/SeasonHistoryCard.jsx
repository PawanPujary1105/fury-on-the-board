function SeasonHistoryCard({ season, rapidChampion, blitzChampion }) {
  return (
    <div className="bg-slate-900 p-5 rounded-lg">
      <h3 className="text-2xl font-bold text-amber-400 mb-4">{season}</h3>

      <div className="space-y-2">
        <p>🏆 Rapid Champion: {rapidChampion}</p>

        <p>🏆 Blitz Champion: {blitzChampion}</p>
      </div>
    </div>
  );
}

export default SeasonHistoryCard;
