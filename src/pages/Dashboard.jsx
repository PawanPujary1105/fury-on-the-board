import { useEffect, useState } from "react";
import { getGames } from "../services/gameService";
import { getPlayers } from "../services/playerService";
import { getSeasons } from "../services/seasonService";
import { calculateStandings } from "../utils/calculateStandings";
import StatCard from "../components/StatCard";
import SeasonCard from "../components/SeasonCard";
import LeaderboardCard from "../components/LeaderboardCard";
import MatchCard from "../components/MatchCard";
import RecentResultsCard from "../components/RecentResultsCard";

function Dashboard() {
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);
  const [activeSeason, setActiveSeason] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [playersData, gamesData, seasonsData] = await Promise.all([
      getPlayers(),
      getGames(),
      getSeasons(),
    ]);
    const activeSeason = seasonsData.find((season) => season.active) || null;
    setPlayers(playersData);
    setGames(gamesData);
    setActiveSeason(activeSeason);
  }

  const totalPlayers = players.length;
  const rapidStandings = calculateStandings(games, "Rapid");
  const blitzStandings = calculateStandings(games, "Blitz");
  const rapidLeader = rapidStandings[0]?.name || "-";
  const blitzLeader = blitzStandings[0]?.name || "-";

  const upcomingMatches = games
    .filter((game) => game.status === "Scheduled")
    .sort((a, b) => new Date(a.gameDate) - new Date(b.gameDate));
  const completedGames = games
    .filter((game) => game.status === "Completed")
    .sort((a, b) => new Date(b.gameDate) - new Date(a.gameDate));
  const recentResults = completedGames.slice(0, 5);
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <StatCard title="Players" value={totalPlayers} />
        <StatCard title="Completed Games" value={completedGames.length} />
        <StatCard title="Scheduled Games" value={upcomingMatches.length} />
        <StatCard title="Rapid Leader" value={rapidLeader} />
        <StatCard title="Blitz Leader" value={blitzLeader} />
        <SeasonCard value={activeSeason?.name || "-"} />
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <LeaderboardCard title="Rapid" players={rapidStandings} />
        <LeaderboardCard title="Blitz" players={blitzStandings} />
      </div>
      <div className="grid gap-6">
        <MatchCard matches={upcomingMatches} />
        <RecentResultsCard results={recentResults} />
      </div>
    </div>
  );
}

export default Dashboard;
