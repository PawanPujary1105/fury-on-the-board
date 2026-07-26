function RecentResultsCard({ results }) {
  return (
    <div className="bg-slate-900 p-5 rounded-lg md:col-span-2">
      <h3 className="text-xl font-semibold mb-3">Recent Results</h3>

      {results.length === 0 ? (
        <div className="p-8 text-center">
          <h3 className="text-xl font-semibold text-slate-300">
            No Results Yet
          </h3>
          <p className="text-slate-500 mt-2">
            Complete a game from the Admin Games page.
          </p>
        </div>
      ) : (
        results.map((game) => (
          <div
            key={game.id}
            className="flex justify-between py-2 border-b border-slate-700"
          >
            <span>
              {game.white} vs {game.black}
            </span>

            <span>{game.result}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentResultsCard;
