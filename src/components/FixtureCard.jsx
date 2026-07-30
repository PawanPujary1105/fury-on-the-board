import { formatDate } from "../utils/dateUtils";

function FixtureCard({ game }) {
  return (
    <div className="bg-slate-900 p-5 rounded-lg">
      <p className="text-sm text-amber-400 font-medium">
        {game.format} • Round {game.round}
      </p>
      <h3 className="text-xl font-bold my-3">
        {game.white} vs {game.black}
      </h3>
      <p className="text-slate-400">{formatDate(game.gameDate)}</p>
    </div>
  );
}

export default FixtureCard;
