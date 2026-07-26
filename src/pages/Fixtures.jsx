import { useEffect, useState } from "react";
import { getGames } from "../services/gameService";
import FixtureCard from "../components/FixtureCard";

function Fixtures() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    const data = await getGames();
    setGames(data);
  }
  const fixtures = games
    .filter((game) => game.status === "Scheduled")
    .sort((a, b) => new Date(a.gameDate) - new Date(b.gameDate));
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Fixtures</h2>
      {fixtures.length === 0 ? (
        <div className="bg-slate-900 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-slate-300">
            No Upcoming Games
          </h3>
          <p className="text-slate-500 mt-2">
            Create a game from the Admin Games page.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {fixtures.map((fixture) => (
            <FixtureCard
              key={fixture.id}
              day={fixture.day}
              format={fixture.format}
              white={fixture.white}
              black={fixture.black}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Fixtures;
