function LeaderboardCard({ title, players }) {
  return (
    <div className="bg-slate-900 p-5 rounded-lg">
      <h3 className="text-xl font-semibold mb-3">{title} Leaderboard</h3>

      {players.length === 0 ? (
        <div className="p-8 text-center">
          <h3 className="text-xl font-semibold text-slate-300">
            No {title} standings available
          </h3>
          <p className="text-slate-500 mt-2">
            Complete a {title} game from the Admin Games page.
          </p>
        </div>
      ) : (
        players.map((player) => (
          <div
            key={player.name}
            className="flex justify-between py-2 border-b border-slate-700"
          >
            <span>{player.name}</span>
            <span>{player.points} pts</span>
          </div>
        ))
      )}
    </div>
  );
}

export default LeaderboardCard;
