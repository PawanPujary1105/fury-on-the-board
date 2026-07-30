import { formatDate } from "../utils/dateUtils";

function UpcomingMatchesCard({ matches }) {
  return (
    <div className="bg-slate-900 p-5 rounded-lg">
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
          <div
            key={match.id}
            className="py-3 border-b border-slate-700 last:border-b-0"
          >
            <p className="font-medium">
              {match.white} vs {match.black}
            </p>
            <p className="text-sm text-slate-400">
              {match.format} • Round {match.round} •{" "}
              {formatDate(match.gameDate)}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default UpcomingMatchesCard;
