import { Link } from "react-router-dom";
function PlayerCard({ name, rapidRating, blitzRating, wins, losses, titles }) {
  return (
    <div className="bg-slate-900 p-5 rounded-lg hover:bg-slate-800 transition">
      <Link
        to={`/players/${name.toLowerCase()}`}
        className="text-2xl font-bold text-amber-400 mb-4 block"
      >
        {" "}
        ♟️ {name}
      </Link>
      <div className="space-y-1">
        <p>Rapid Rating: {rapidRating}</p>
        <p>Blitz Rating: {blitzRating}</p>
        <p>Wins: {wins}</p>
        <p>Losses: {losses}</p>
        <p>🏆 Titles: {titles}</p>
      </div>
    </div>
  );
}

export default PlayerCard;
