import { useEffect, useState } from "react";
import { getGames } from "../services/gameService";
import { calculateStandings } from "../utils/calculateStandings";
import LeaderboardTable from "../components/LeaderboardTable";

function Leaderboard() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    const data = await getGames();
    setGames(data);
  }
  const rapidStandings = calculateStandings(games, "Rapid");
  const blitzStandings = calculateStandings(games, "Blitz");
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Leaderboard</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <LeaderboardTable title="Rapid" players={rapidStandings} />
        <LeaderboardTable title="Blitz" players={blitzStandings} />
      </div>
    </div>
  );
}

export default Leaderboard;
