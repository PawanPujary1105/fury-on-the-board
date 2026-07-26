function LeaderboardTable({ title, players }) {
  return (
    <div className="bg-slate-900 rounded-lg p-5">
      <h3 className="text-xl font-bold mb-4">{title} Standings</h3>
      {players.length === 0 ? (
        <div className="p-8 text-center">
          <div className="text-4xl mb-3">♟️</div>
          <h3 className="text-xl font-semibold text-slate-300">
            No {title} standings available
          </h3>
          <p className="text-slate-500 mt-2">
            Complete a {title} game from the Admin Games page.
          </p>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2">Rank</th>
              <th className="text-left py-2">Player</th>
              <th className="text-right py-2">Points</th>
              <th className="text-right py-2">W</th>
              <th className="text-right py-2">D</th>
              <th className="text-right py-2">L</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player.name} className="border-b border-slate-800">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{player.name}</td>
                <td className="py-2 text-right">{player.points}</td>
                <td className="py-2 text-right"> {player.wins}</td>
                <td className="py-2 text-right"> {player.draws}</td>
                <td className="py-2 text-right"> {player.losses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LeaderboardTable;
