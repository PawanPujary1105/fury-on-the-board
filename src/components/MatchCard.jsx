function MatchCard({ matches }) {
  return (
    <div className="bg-slate-900 p-5 rounded-lg md:col-span-2">
      <h3 className="text-xl font-semibold mb-3">Upcoming Matches</h3>

      {matches.length === 0 ? (
        <div className="p-8 text-center">
          <h3 className="text-xl font-semibold text-slate-300">
            No Upcoming Games
          </h3>
          <p className="text-slate-500 mt-2">
            Create a game from the Admin Games page.
          </p>
        </div>
      ) : (
        matches.map((match) => (
          <div key={match.id} className="py-2 border-b border-slate-700">
            {match.white} vs {match.black}
          </div>
        ))
      )}
    </div>
  );
}

export default MatchCard;
