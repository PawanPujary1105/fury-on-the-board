function SeasonHistoryCard({ season }) {
  return (
    <div className="bg-slate-900 p-5 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-amber-400">{season.name}</h3>

        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            season.active
              ? "bg-emerald-900 text-emerald-400"
              : "bg-slate-800 text-slate-400"
          }`}
        >
          {season.active ? "ACTIVE" : "COMPLETED"}
        </span>
      </div>

      <p className="text-sm text-slate-400 mb-4">
        {season.startDate} → {season.endDate}
      </p>

      <div className="space-y-2">
        <p>🏆 Rapid Champion: {season.rapidChampion ?? "TBD"}</p>
        <p>⚡ Blitz Champion: {season.blitzChampion ?? "TBD"}</p>
      </div>
    </div>
  );
}

export default SeasonHistoryCard;
